/**
 * @info This is a file which contains all the types related to a
 * theme, you will be able to find the whole website structure and
 * also some of the apis we use inside the theme for plugins like
 * the booking apis and the CRM apis;
 *
 * @IMPORTANT if you want to modify any declaration in this file
 * overide it bellow the file or create another file and overide
 * there, so we can keep the consistence of the types. 😜
 *
 * @info Also if you think we should update this file we should
 * create an issue at: https://github.com/soltivo/create-theme/issues
 */

declare module "*.svg" {
  import React = require("react");
  const ReactComponent: React.FC<React.SVGProps<SVGSVGElement>>;
  const src: string;
  export { ReactComponent };
  export default src;
}

declare namespace React {
  interface HTMLAttributes<T> extends React.HTMLAttributes<T> {
    /**
     * @description this is the type of element for editable elements in the builder.
     */
    "data-for"?: WebsiteDataFor;
    /**
     * @description data-type defines where this specific element has data stored in
     * pages.data.json
     */
    "data-type"?: string;
    /**
     * @description which type of plugin you would like to use for an specific dom element.
     * @important data-plugin attribute should be defined together with data-for="plugin"
     */
    "data-plugin"?: WebsiteDataPlugin;
  }
}

declare interface Window extends Window {
  /**
   * @description this attribute is returned from the server and it contains
   * the main global.json default or with modified attributes by an user/editor
   * of a theme.
   */
  __INITIAL__DATA__: WebsiteData;
}

/**
 * @description type of config.website.json
 */
interface WebsiteConfig {
  /**
   * @description all available fonts for this theme.
   */
  fonts: WebsiteFont[];

  /**
   * @description if nav is connected to the theme pages by id, meaning the id of a nav.data.items[index].id === pages[index].id
   */
  navChangePage?: boolean;

  /**
   * @description custom assets css/js internal and external
   * @extenal comes from a source outside the theme.
   * @internal comes from a source inside the theme relative path.
   */
  assets?: {
    css?: {
      external?: string[];
      internal?: string[];
    };
    js?: {
      external?: string[];
      internal?: string[];
    };
  };
}

/**
 * @description global default data, validation & configuration of the theme.
 */
declare interface GlobalDataFields {
  website: Required<Omit<WebsiteData, "page">>;
  validation: Required<Omit<Validation, "pages">>;
  configuration: WebsiteConfig;
}

/**
 * @description page default data & validation.
 */
declare interface PageDataFields {
  data: Required<Omit<WebsitePage, "sections" | "hidden">> &
    Partial<Pick<WebsitePage, "hidden">> & {
      /**
       * @description list of sections by name.
       */
      withSections: string[];
    };
}

/**
 * @description Section default data & validation.
 */
declare interface SectionDataFields {
  data: Required<WebsiteSection>;
  validation: Required<WebsiteSection["data"]>;
}
