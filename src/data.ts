///////////////////////////////////////////////////////////////////////////////////////////////
//                                                                                           //
//                                     WEBSITE DATA                                          //
//                                                                                           //
///////////////////////////////////////////////////////////////////////////////////////////////

/**
 * All files contains type and interfaces for a theme data, like global.data.json, config.data.json
 * and validation.data.json, please do not define or change this file with other types or interfaces. 👻
 */

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
