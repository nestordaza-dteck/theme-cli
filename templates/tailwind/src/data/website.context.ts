import { createContext } from "react";
export const WebsiteContext = createContext<{
  website: WebsiteData;
}>({
  website:
    process.env.NODE_ENV === "development"
      ? require("../../public/assets/data/global.website.json")
      : undefined,
});
