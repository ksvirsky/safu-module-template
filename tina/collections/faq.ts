import { Collection } from "tinacms";
import { MenuField } from "../templates/menu";

export const FaqCollection: Collection = {
  name: "faq",
  label: "FAQ",
  path: "content/faq",
  format: "md",
  ui: {
    router: ({ document }) => {
      return `${document._sys.filename}`
    },
  },
  fields: [
    {
      type: "string",
      name: "header",
      label: "Header",
    },
    MenuField,
    {
      type: "object",
      list: true,
      name: "items",
      label: "FAQ Items",
      ui: {
        itemProps: (item) => {
          return {
            label: item?.header,
          };
        },
      },
      fields: [
        { type: "string", name: "header" },
        { type: "rich-text", name: "content" },
        { type: "string", name: "url" },
      ],
    },
  ],
};
