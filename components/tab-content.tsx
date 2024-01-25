import { tinaField } from "tinacms/dist/react";
import { PageItems, PageTabsItems, PageTabsItemsDashboard } from "../tina/__generated__/types";
import { Dashboard } from "./dashboard";
import { TinaMarkdown } from "tinacms/dist/rich-text";


export function TabContent(props: { items: Array<PageItems | PageTabsItems | null> | null | undefined }) {
  return (<>
    {props.items?.map((item, index) => {
      if (!item?.__typename) {
        return <></>;
      }

      if (["PageTabsItemsDashboard", "PageItemsDashboard"].includes(item.__typename)) {
        return <div className="mb-4" key={index + item.__typename}
          data-tina-field={tinaField(item, "dashboardItems", index)}
        ><Dashboard
            item={item}
          /></div>;
      }
      if (["PageTabsItemsText", "PageItemsText"].includes(item.__typename)) {
        return <div
          data-tina-field={tinaField(item, "content", index)}
          className="mb-2 mx-6 text-gray-600 text-base md-text"
          key={index + item?.__typename}
        >
          <TinaMarkdown content={item?.content}/>
        </div>;
      }
      if (["PageTabsItemsMarketWidget", "PageItemsMarketWidget"].includes(item.__typename)) {
        return <div className="mb-4 mx-6" key={index + item?.__typename}>
          <iframe
            data-tina-field={tinaField(item, "url", index)}
            className="w-full"
            height={"800px"}

            src={item.url ?? ""}
          /></div>;
      }
      if (["PageTabsItemsPoolWidget", "PageItemsPoolWidget"].includes(item.__typename)) {
        return <div className="mb-4 mx-6" key={index + item?.__typename}>
          <iframe
            data-tina-field={tinaField(item, "url", index)}
            className="w-full"
            height={"800px"}

            src={item.url ?? ""}
          /></div>;
      }

      return <></>;
    })}
  </>);
}