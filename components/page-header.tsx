"use client";

import Image from "next/image";

import { tinaField } from "tinacms/dist/react";
import { PageQuery } from "../tina/__generated__/types";

export function PageHeader(props: { pageData: PageQuery | undefined; }) {
  const { page } = props.pageData ?? { page: undefined };

  if (!page) {
    return <></>;
  }

  return (<div className="mb-8 mt-4 z-10 w-full items-center justify-between font-mono text-sm flex">
    <div
      data-tina-field={tinaField(page, "header")}
      className="text-3xl mx-4"
    >
      {page.header}
    </div>

    {page.logo && <div
      data-tina-field={tinaField(page.logo, "url")}
      className="mx-4"
    >
      {page.logo?.url && <Image
        className="relative dark:drop-shadow-[0_0_0.3rem_#ffffff70] dark:invert"
        src={page.logo?.url || ""}
        alt={page.logo?.alt || ""}
        width={180}
        height={37}
        priority
      />}
    </div>}
  </div>);
}