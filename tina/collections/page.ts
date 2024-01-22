import { Collection } from "tinacms";
import { MenuField } from "../templates/menu";
import { Tabs } from "../templates/tabs";

export const PageCollection: Collection = {
  name: "page",
  label: "Page",
  path: "content/pages",
  format: "md",
  ui: {
    router: ({ document }) => {
      // navigate to the home page
      if (document._sys.filename === 'home') {
        return '/'
      }

      // navigate to the about page
      if (document._sys.filename === 'about') {
        return `/about`
      }

      // navigate to the post that was clicked
      return `/page/${document._sys.filename}`
    },
  },
  fields: [
    MenuField,
    {
      type: "string",
      name: "header",
      label: "Header",
    },
    {
      type: "object",
      name: "logo",
      label: "Logo",
      fields: [
        { type: "image", name: "url", label: "URL" },
        { type: "string", name: "alt", label: "Alt Text" },
      ],
    },
    Tabs,
  ],
};
