"use client";

import { tinaField } from "tinacms/dist/react";
import { FaqMenuItems, PageMenuItems } from "../tina/__generated__/types";

export function Menu(props: { items: Array<PageMenuItems | FaqMenuItems | null> }) {
  return (<div className="">
    {props.items?.length && <div className="flex flex-row justify-start w-50 font-mono text-sm border-y-2 border-gray-300">
      {props.items.map((item, index) => item && <p
        key={index}
        data-tina-field={tinaField(item, "url")}
        className="flex flex-col justify-center justify-between m-4"
      >
        <a href={item?.url ?? "#"}>{item?.title}</a>
      </p>)}

    </div>}
  </div>);
}
