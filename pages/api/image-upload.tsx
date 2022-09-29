import { createClient } from "@supabase/supabase-js";
import { decode } from "base64-arraybuffer";
import { nanoid } from "nanoid";
import type { NextApiRequest, NextApiResponse } from "next";

const supabase = createClient(
  process.env.SUPABASE_URL as string,
  process.env.SUPABASE_KEY as string
);

export const config = {
  api: {
    bodyParser: {
      sizeLimit: "10mb",
    },
  },
};

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method === "POST") {
    try {
      let { image } = req.body;

      if (!image) {
        return res.status(500).json({ message: "No image provided" });
      }

      const contentType = image.match(/data:(.*);base64/)?.[1];
      const base64FileData = image.split("base64,")?.[1];

      if (!contentType || !base64FileData) {
        return res.status(500).json({ message: "Image data not valid" });
      }

      // Code above is unchanged
      //...
      const fileName = nanoid();
      const ext = contentType.split("/")[1];
      const path = `${fileName}.${ext}`;

      const { data, error: uploadError } = await supabase.storage
        .from(process.env.SUPABASE_BUCKET as string)
        .upload(path, decode(base64FileData), {
          contentType,
          upsert: true,
        });

      if (uploadError) {
        console.log(uploadError);
        throw new Error("Unable to upload image to storage .. up error");
      }

      if (!data) {
        throw new Error("Unable to upload image to storage .. no data");
      }

      if (!process.env.SUPABASE_URL) {
        throw new Error("Unable to upload image to storage ... no keu");
      }

      const url = `${process.env.SUPABASE_URL.replace(
        ".co",
        ".in"
      )}/storage/v1/object/public/${data.Key}`;

      return res.status(200).json({ url });
    } catch (error) {
      console.log(error);
      res.status(500).json({ message: "Something went wrong" });
    }
  } else {
    res.status(405).json({ message: "HTTP Method not allowed" });
  }
}
