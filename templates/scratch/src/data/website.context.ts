import { createContext } from "react";

/**
 * @description create global context to be used in the app.
 */
export const WebsiteContext = createContext<{
  website: WebsiteData | null;
}>({
  website: null,
}) as React.Context<{
  /**
   * @description website data, it contains the data being displayed with
   * page, sections, nav, footer etc...
   * @important this attribute is null before useBuilder hook being
   * dispatched.
   */
  website: WebsiteData;
}>;
