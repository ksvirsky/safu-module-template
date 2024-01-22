import { TinaField } from "tinacms";

export const MenuField: TinaField = {
  label: "Page Menu",
  name: "menuItems",
  type: "object",
  list: true,

  templates: [
    {
      label: "Home",
      name: "home",
      fields: [
        { type: "string", name: "title", label: "Title" },
        { type: "string", name: "url", label: "URL" },
      ]
    },
    {
      label: "Faq",
      name: "faq",
      fields: [
        { type: "string", name: "title", label: "Title" },
        { type: "string", name: "url", label: "URL" },
      ]
    },
  ],
};