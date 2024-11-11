import { Metadata } from "next";
import { notFound } from "next/navigation";
import { SliceZone } from "@prismicio/react";

import { createClient } from "@/prismicio";
import { components } from "@/slices";

type Params = { uid: string };

export default async function Page({ params }: { params: Params }) {
  const client = createClient();
  const page = await client
    .getByUID("blog_post", params.uid)
    .catch(() => notFound());


    
  return (<article className=" max-w-6xl m-auto px-4 py-14 first:pt-10 md:px-6 md:py-20 lg:py-24">
    <div className="wrapper mb-9">
  <h1 className="font-medium leading-tight tracking-tight text-5xl mb-5 md:mb-7 md:text-7xl ">{page.data.title}</h1>
        <div className="flex gap-4"> {page.tags.map((tag, index)=> (
            <span key={index} className="text-xl font-bold bg-gradient-to-b from-yellow-100 to-yellow-500 bg-clip-text not-italic text-transparent">{tag}</span>
        ))} </div>
        <p> Posted on: <i> {page.data.date} </i> </p>
  </div>
  <SliceZone slices={page.data.slices} components={components} />
  </article>)
}

export async function generateMetadata({
  params,
}: {
  params: Params;
}): Promise<Metadata> {
  const client = createClient();
  const page = await client
    .getByUID("blog_post", params.uid)
    .catch(() => notFound());

  return {
    title: page.data.meta_title,
    description: page.data.meta_description,
  };
}

export async function generateStaticParams() {
  const client = createClient();
  const pages = await client.getAllByType("blog_post");

  return pages.map((page) => {
    return { uid: page.uid };
  });
}