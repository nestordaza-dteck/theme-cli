declare module "*.svg" {
  import React = require("react");
  const ReactComponent: React.FC<React.SVGProps<SVGSVGElement>>;
  const src: string;
  export default src;
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
 *
 * Define you custom types here.
 *
 */

declare type ThemeItem = {
  id: string;
  name: string;
  description: string;
  thumbnail: string;
};

declare type _Object = { [key: string]: any };

declare type ThemeList = ThemeItem[];

declare type Device = "desktop" | "mobile";

declare type WebsiteDataFor =
  | "text"
  | "image"
  | "icon"
  | "video"
  | "background-video"
  | "background-image"
  | "object"
  | "plugin";

declare type WebsiteDataType = string;

declare type WebsiteDataPluginType = "booking/category" | "booking/service";

declare interface ModifyConfig {
  section: any;
  dataType: WebsiteDataType;
  dataFor: WebsiteDataFor;
  placeholder?: any;
  value: any;
}

declare type PageFields =
  | "name"
  | "title"
  | "description"
  | "thumbnail"
  | "route";

declare interface PageConfig {
  name?: string;
  title: string;
  description: string;
  thumbnail: string | null;
  route?: string;
}

declare interface WebsiteSection {
  id: number;
  name: string;
  default: boolean;
  selected: boolean;
  data: any;
}

declare interface WebsitePage {
  id: number;
  name: string;
  description: string;
  title: string;
  thumbnail: string | null;
  route: string;
  selected: boolean;
  default: boolean;
  sections: WebsiteSection[];
}

declare interface WebsiteFont {
  id: number;
  name: string;
  href: string;
  cssRule: string;
}

declare interface WebsiteNav {
  data: {
    [index: string]: any;
    items: { id: number; name: string; link?: string }[];
  };
}

declare interface IWebsiteFooter {
  data: any;
}

declare type WebsiteVideo =
  | string
  | {
      url: string;
      playing?: boolean;
      loop?: boolean;
      controls?: boolean;
      light?: boolean;
      volume?: number;
      muted?: boolean;
      thumbnail?: string;
    };

declare interface WebsiteData {
  orgId: string;
  themeId: string;
  general: any;
  colors: any;
  font: WebsiteFont;
  nav: WebsiteNav;
  footer?: IWebsiteFooter;
  page: WebsitePage;
}

declare interface Validation {
  general: {
    name: string;
    favicon: string;
    [index: string]: any;
  };
  nav?: {
    data: {
      items: { id?: string | number; name: string; link?: string }[];
      [index: string]: any;
    };
  };
  footer?: {
    data: any;
  };
  pages: Array<{
    id: number;
    sections: Array<{
      id: string;
      name: string;
      data: any;
    }>;
  }>;
}

declare interface PrevColors {
  [index: string]: string[];
}

declare interface Plugins {
  booking: {
    bookingCategories: BookingCategories;
  };
}

declare interface BookingCategories {
  Items?: BookingCategoryItem[] | null;
  Count: number;
  ScannedCount: number;
}

declare interface BookingCategoryItem {
  description: string;
  id: string;
  name: string;
  color: string;
  lowestPrice?: number | null;
}
