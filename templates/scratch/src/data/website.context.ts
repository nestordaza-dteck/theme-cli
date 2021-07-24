import { createContext } from "react";
import global from "../../public/assets/data/global.website.json";

/**
 * @description create global context to be used in the app.
 */
export const WebsiteContext = createContext<{
  website: WebsiteData;
}>({
  website: global,
});
