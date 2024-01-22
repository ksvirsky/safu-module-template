import { TinaField } from "tinacms";
import { Dashboard } from "./dashboard";

export const TabContent: TinaField = {
  label: "Tab content",
  name: "tabItems",
  type: "object",
  list: true,
  templates: [
    {
      label: "Dashboard",
      name: "dashboard",
      fields: [
        Dashboard,
        { type: "datetime", name: "updatedAt", label: "Last updated" },
      ]
    },
    {
      label: "Text Block",
      name: "text",
      fields: [
        { type: "rich-text", name: "content", label: "Text content" },
      ],
    },
    {
      label: "Market Widget",
      name: "marketWidget",
      fields: [
        { type: "string", name: "url", label: "URL" },
      ]
    },
    {
      label: "Pool Widget",
      name: "poolWidget",
      fields: [
        { type: "string", name: "url", label: "URL" },
      ]
    },
  ],
};