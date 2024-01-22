"use client";

import { PageQuery } from "../tina/__generated__/types";
import { useState } from "react";
import { tinaField, useTina } from "tinacms/dist/react";
import { TinaMarkdown } from "tinacms/dist/rich-text";
import { Dashboard } from "./dashboard";
import { Menu } from "./menu";
import { PageHeader } from "./page-header";

export function Page(props: {
  data: PageQuery;
  variables: object;
  query: string;
}) {
  const { data } = useTina(props);
  const [currentTab, setCurrentTab] = useState(data.page.tabs?.[0]);

  return (
    <main className="flex min-h-screen flex-col items-center">
      <PageHeader pageData={data} />

      <div className="w-full flex flex-col">
        {data.page.menuItems && <Menu items={data.page.menuItems} />}

        <div className="w-full items-center flex flex-col">
          <div className="w-full justify-center flex flex-row border-b border-gray-300 mb-4 mt-8 ">

            {data.page.tabs?.map((tab) => {
              return (
                <div
                  key={tab?.title}
                  className={`p-4 border border-gray-300 ${tab === currentTab ? "tab-header--current-tab bg-gray-300" : "text-gray-500"}`}
                  onClick={() => setCurrentTab(tab)}
                  data-tina-field={tinaField(tab!, "title")}
                > {tab?.title}</div>);
            })
            }
          </div>
          {currentTab && <div className="mx-4" data-tina-field={tinaField(data.page, "tabs")}>
            {currentTab?.tabItems?.map((item, index) => {
              if (item?.__typename === "PageTabsTabItemsDashboard") {
                return <div className="mb-4" key={index + item?.__typename}
                  data-tina-field={tinaField(item, "dashboardItems")}

              ><Dashboard
                  item={item}
                /></div>;
              }
              if (item?.__typename === "PageTabsTabItemsText") {
                return <div
                  data-tina-field={tinaField(item, "content")}
                  className="mb-4"
                  key={index + item?.__typename}
                >
                  <TinaMarkdown content={item?.content}
                  /></div>;
              }
              if (item?.__typename === "PageTabsTabItemsMarketWidget") {
                return <div className="mb-4" key={index + item?.__typename}>
                  <iframe
                    data-tina-field={tinaField(item, "url")}
                    className="w-full"
                    height={"800px"}

                    src={item.url ?? ""}
                  /></div>;
              }
              if (item?.__typename === "PageTabsTabItemsPoolWidget") {
                return <div className="my-4" key={index + item?.__typename}>
                  <iframe
                    data-tina-field={tinaField(item, "url")}
                    className="w-full"
                    height={"800px"}

                    src={item.url ?? ""}
                  /></div>;
              }

              return <></>;
            })}
          </div>}
        </div>
      </div>
    </main >
  );
}
