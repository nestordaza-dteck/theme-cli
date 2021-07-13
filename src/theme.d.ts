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
  export default src;
}

declare namespace React {
  interface HTMLAttributes<T> extends React.HTMLAttributes<T> {
    /**
     * @description this is the type of element for editable elements in the builder.
     */
    "data-for"?: WebsiteDataFor;
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

/**
 * @description data-for attribute of a an editable html element
 */
declare type WebsiteDataFor =
  | "text"
  | "image"
  | "icon"
  | "video"
  | "background-video"
  | "background-image"
  | "object"
  | "plugin";

/**
 * @description data-type attribute of an editable html element
 */
declare type WebsiteDataType = string;

/**
 * @description custom plugin
 */
declare type WebsiteDataPlugin =
  | "booking/category"
  | "booking/service"
  | "contact/fields";

/**
 * @description website section
 */
declare interface WebsiteSection {
  /**
   * @description id of the section
   */
  id: number;
  /**
   * @description name of the section.
   * @important all sections name should not have uppercase or space between words or number
   * and it needs to be unique.
   * @example ✅ "about_me | about-me | aboutme"
   * @example ❌ "aboutMe | "about me | ABOUT-ME | aboutme3"
   */
  name: string;
  /**
   * @description defined while building the theme, if set to true the user cannot remove this section.
   */
  default: boolean;
  /**
   * @description if true this section will be visible, the "default" attribute overides this attribute.
   */
  selected: boolean;
  /**
   * @description section data is all the modifiable data a section can contain, like text, images,
   * videos and so on.
   */
  data: { [index: string]: any };
}

/**
 * @description website page object
 */
declare interface WebsitePage {
  /**
   * @description page id
   */
  id: number;
  /**
   * @description name of the page displayed in the builder
   * @important page name should not have uppercase or space between words or number
   * and it needs to be unique.
   * @example ✅ "home-page | home_page | homepage"
   * @example ❌ "homePage | home page | HOME-PAGE | homepage3"
   */
  name: string;
  /**
   * @description SEO description of the page
   */
  description: string;
  /**
   * @description SEO title of the page
   */
  title: string;
  /**
   * @description SEO thumbnail of the page
   */
  thumbnail: string;
  /**
   * @description page route starting with /
   */
  route: string;
  /**
   * @description If page was selected by the user, be aware "default" attribute will overide this no matter what.
   */
  selected: boolean;
  /**
   * @description defined while building the theme, if true it means the page cannot be removed by the user.
   */
  default: boolean;
  /**
   * @description defined while building the theme, if true it means this page won't be visible in the builder, but it
   * would work normally if the user was displaying the website outside the builder AKA published theme or preview.
   */
  hidden?: boolean;
  /**
   * @description All the sections the builder contains.
   */
  sections: WebsiteSection[];
}

/**
 * @description website font to be used.
 */
declare interface WebsiteFont {
  /**
   * @description font id defined while building the theme.
   */
  id: number;
  /**
   * @description name of the font.
   */
  name: string;
  /**
   * @description link of the font inserted in a <link/> tag inside the head of a html body.
   */
  href: string;
  /**
   * @description rule of css the builder/theme must apply to its content.
   * @example "font-family: \"MyCoolFont\", sans-serif !important;"
   */
  cssRule: string;
}

/**
 * @description website navigation
 */
declare interface WebsiteNav {
  /**
   * @description data modifiable in navigation.
   */
  data: {
    [index: string]: any;
    /**
     * @description all the navigations of a theme.
     */
    items: {
      /**
       * @description the id of the navigation is the same as the pages.
       */
      id: number;
      /**
       * @description name of the navigation link
       */
      name: string;
      /**
       * @description link of your navigation matching the pages.
       */
      link?: string;
    }[];
  };
}

/**
 * @description footer of a theme
 */
interface WebsiteFooter {
  /**
   * @description footer data of a theme.
   */
  data: { [index: string]: any };
}

/**
 * @description editable element video as object.
 */
declare type WebsiteVideo = {
  /**
   * @description url of the video
   */
  url: string;
  /**
   * @description if video starts when the theme is loaded.
   */
  playing?: boolean;
  /**
   * @description keep looping the video.
   */
  loop?: boolean;
  /**
   * @description display player controls
   */
  controls?: boolean;
  /**
   * @description display background for video, you can also add "thumbnail" attribute to customize this property
   */
  light?: boolean;
  /**
   * @description number between 0.0 - 2.0 for volume
   */
  volume?: number;
  /**
   * @description display video with sound or not
   */
  muted?: boolean;
  /**
   * @description custom thumbnail of a video, only works if light is defined.
   */
  thumbnail?: string;
};

/**
 * @description custom section/menus inside general
 */
interface WebsiteGeneralMenu {
  id: number | string;
  title: string;
  name: string;
  plugin?: WebsiteDataPlugin;
  data: {
    fields?: CRMCustomField[]; //CRM
    [index: string]: any;
  };
}

interface WebsiteData {
  /**
   * @description organization that owns or is modifying the theme.
   */
  orgId: string;
  /**
   * @description theme id.
   */
  themeId: string;
  /**
   * @description general information of the website.
   */
  general: {
    favicon: string;
    name: string;
    menus?: WebsiteGeneralMenu[];
    [index: string]: any;
  };
  /**
   * @description actived set of colors in on the theme, all colors must be a HEX attribute.
   */
  colors: {
    /**
     * @description Accent colors are colors that are used for emphasis in a color scheme of a theme.
     */
    accent: string;
    /**
     * @description Main background of a body theme.
     */
    background: string;
    [index: string]: string;
  };
  /**
   * @description actived font of theme.
   */
  font: WebsiteFont;
  /**
   * @description navigation of a theme.
   */
  nav: WebsiteNav;
  /**
   * @description footer of a theme.
   */
  footer?: WebsiteFooter;
  /**
   * @description visible page of a theme, meaning if you go to /home you will get only the page data /home page
   * if you go to /about you will get only the data of /about and so on.
   */
  page: WebsitePage;
}

declare interface Validation {
  /**
   * @description general validation of a website.
   */
  general: {
    name: string;
    favicon: string;
    [index: string]: any;
  };
  /**
   * @description nav validation of a website.
   */
  nav?: {
    data: {
      items: { id?: string | number; name: string; link?: string }[];
      [index: string]: any;
    };
  };
  /**
   * @description footer validation of a website.
   */
  footer?: {
    data: any;
  };
  /**
   * @description pages validation of a website.
   */
  pages: Array<{
    id: number;
    sections: Array<{
      id: number;
      name: string;
      data: any;
    }>;
  }>;
}

///////////////////////////////////////////////////////////////////////////////////////////////
//                                                                                           //
//                                      PLUGINS                                              //
//                                                                                           //
///////////////////////////////////////////////////////////////////////////////////////////////

/**
 * @description list of plugins available in the builder using APIs from mysoltivo dashboard
 */
declare interface Plugins {
  /**
   * @description booking plugin.
   */
  booking: {
    /**
     * @description list of categories available from mysoltivo
     */
    category: PluginBookingCategories;
    /**
     * @description list of services available from mysoltivo
     */
    service: { data: PluginServiceItem[]; loading: boolean };
  };

  /**
   * @description crm plugin for contact form
   */
  contact: {
    fields: CRMCustomField[];
  };
}

/**
 * @description category item of booking listing.
 */
declare interface PluginBookingCategoryItem {
  description: string;
  id: string;
  name: string;
  color: string;
  lowestPrice?: number | null;
}

/**
 * @description list of categories in booking api.
 */
declare interface PluginBookingCategories {
  Items?: PluginBookingCategoryItem[] | null;
  Count: number;
  ScannedCount: number;
}

/**
 * @description a service item in service api plugin.
 */
declare type PluginServiceItem = {
  bufferTime: number;
  category: string;
  currency: string;
  description: string;
  serviceId: string;
  title: string;
  price: number;
  duration: number;
  image: string;
  employees: any[];
};

/**
 * @description CRM entity types
 */
declare type CRMEntityType = "lead" | "supplier" | "client";

/**
 * @description CRM custom fields type
 */
declare type CRMCustomField = {
  title: string;
  type: "text";
};

/**
 * @description CRM entity type (lead client or supplier)
 */
declare type CRMEntity = {
  phoneNumber: string | { number: string; extension?: string };
  lastName: string;
  entityId: string;
  businessAddress?: CRMBillingAddress;
  createdAt: number;
  email: string;
  createdBy: string;
  firstName: string;
  businessInformation?: CRMBusinessInformation;
  type: any;
  origin: string;
  manager: string;
  [index: string]: any;
};

/**
 * @description crm billing information of an entity
 */
declare type CRMBillingAddress = {
  address1: string;
  address2: string;
  city: string;
  country: string;
  state: string;
  zipCode: string;
};

/**
 * @description crm businness information of an entity
 */
declare type CRMBusinessInformation = {
  businessName: string;
  phoneNumber: string;
  secondaryContactEmail: string;
  secondaryFirstName: string;
  secondaryLastName: string;
  supportEmail: string;
};

/**
 *
 * Define you custom types down here.
 *
 */
