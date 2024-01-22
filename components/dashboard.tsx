"use client";

import { tinaField } from "tinacms/dist/react";
import { PageTabsTabItemsDashboard } from "../tina/__generated__/types";

export function Dashboard(props: {
  item: PageTabsTabItemsDashboard
}) {
  const { dashboardItems, updatedAt } = props.item;

  return (
    <div

    >
      <div className="flex w-full items-stretch justify-center">
      {dashboardItems?.map(item => <div key={item?.title} className="flex flex-col p-1 border -mr-px border-black h-100">
        <div
          data-tina-field={tinaField(item!, "title")}
        >{item?.title}</div>
        <div
          data-tina-field={tinaField(item!, "value")}
          className="text-2xl mt-4 font-semibold"
        >{item?.value}</div>
      </div>)}
      </div>
      {updatedAt && <div className="flex w-full justify-end">
        Last updated: {updatedAt}
      </div>}
    </div>
  );
}
