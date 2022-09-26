import { PrismaClient } from "@prisma/client";
import type { NextApiRequest, NextApiResponse } from "next";

const prisma = new PrismaClient();

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method === "POST") {
    try {
      const { image, title, description } = req.body;
      const ring = await prisma.ring.create({
        data: { imageSrc: image, description, title },
      });

      res.status(200).json(ring);
    } catch (error) {
      res.status(500).json({ message: "Something went wrong" });
    }
  } else {
    res.status(405).json({ message: "HTTP Method not allowed" });
  }
}
