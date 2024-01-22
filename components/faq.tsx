"use client";

import { useState } from "react";
import { FaqQuery, PageQuery } from "../tina/__generated__/types";
import { tinaField, useTina } from "tinacms/dist/react";
import { TinaMarkdown } from "tinacms/dist/rich-text";
import { Menu } from "./menu";
import { PageHeader } from "./page-header";

export function Faq(props: {
  data: FaqQuery;
  variables: object;
  query: string;
  pageData?: PageQuery;
}) {
  const { pageData } = props;
  const { data } = useTina(props);
  const [itemShownMap, setItemShownMap] = useState<Record<number, boolean>>({});

  return (
    <main className="flex min-h-screen flex-col items-center">
      <PageHeader pageData={pageData} />

      <div className="w-full flex flex-col">
        {data.faq.menuItems && <Menu items={data.faq.menuItems} />}
      </div>

      <div className="z-10 w-full max-w-5xl items-center justify-center font-mono text-sm flex">
        <h1
          data-tina-field={tinaField(data?.faq, "header")}
          className="my-3 text-3xl"
        >
          {data.faq.header}
        </h1>
      </div>

      <div className="mb-32 w-full flex flex-col items-start">
        {data.faq.items?.map((item, index) => {
          return (<div key={item?.header} className="mb-8 mx-4">
            <h3
              // @ts-ignore
              data-tina-field={tinaField(item, "header")}
              className={`mb-3 text-2xl font-semibold`}
              onClick={() => setItemShownMap({ ...itemShownMap, [index]: !itemShownMap[index] })}
            >
              {item?.header}
            </h3>
            {itemShownMap[index] && <div
              // @ts-ignore
              data-tina-field={tinaField(item, "content")}
            >
              <TinaMarkdown content={item?.content} />

              {item?.url && <a
                data-tina-field={tinaField(item, "url")}
                href={item.url}
              >
                (more info)
              </a>}
            </div>}
          </div>);
        })}
      </div>
    </main>
  );
}
