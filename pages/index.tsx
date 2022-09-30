import { PrismaClient, Ring } from "@prisma/client";
import Layout from "components/Layout";
import Image from "next/image";
import { useState } from "react";

const prisma = new PrismaClient();

export async function getStaticProps() {
  const rings = await prisma.ring.findMany({});

  return {
    props: {
      rings: JSON.parse(JSON.stringify(rings)),
    },
  };
}

export default function Home({ rings }: { rings: Ring[] }) {
  return (
    <Layout>
      <div className="grid grid-cols-1 gap-y-10 sm:grid-cols-2 gap-x-6 lg:grid-cols-3 xl:grid-cols-4 xl:gap-x-8">
        {rings.map((ring) => (
          <BlurImage key={ring.id} ring={ring} />
        ))}
      </div>
    </Layout>
  );
}

function cn(...classes: string[]) {
  return classes.filter(Boolean).join(" ");
}

function BlurImage({ ring }: { ring: Ring }) {
  const [isLoading, setLoading] = useState(true);

  return (
    <div className="group">
      <div className="w-full aspect-w-1 aspect-h-1 bg-gray-200 rounded-lg overflow-hidden xl:aspect-w-7 xl:aspect-h-8">
        <Image
          alt=""
          src={ring.imageSrc}
          layout="fill"
          objectFit="cover"
          className={cn(
            "group-hover:opacity-75 duration-700 ease-in-out",
            isLoading
              ? "grayscale blur-2xl scale-110"
              : "grayscale-0 blur-0 scale-100"
          )}
          onLoadingComplete={() => setLoading(false)}
        />
      </div>
      <h3 className="mt-4 text-gray-900">{ring.title}</h3>
      <p className="mt-1 text-sm text-gray-700">{ring.description}</p>
    </div>
  );
}
