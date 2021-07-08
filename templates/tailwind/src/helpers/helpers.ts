/**
 * @description find a page in pages object.
 */
export function findPage(pages: WebsitePage[], pageId: number) {
  return pages.find((page) => page.id === pageId);
}

/**
 * @description find a section of a page
 */
export const findSection = (website: WebsiteData, sectionName: string) => {
  const page = website.page;
  return page.sections?.find((s: any) => s.name.toLowerCase() === sectionName);
};

/**
 * @description under development if you run yarn build:data data website
 * data will change automatically, that why we are setting this directly.
 * code is being deployed it will return window.__INITIAL__DATA__ which
 * is the IWebsite(globa.website.json) from the server.
 */
export const renderDataToDOM = (): WebsiteData => {
  if (process.env.NODE_ENV === "development") {
    const websiteData: WebsiteData = require("../../public/assets/data/global.website.json");

    if (process.env.DEV_ORG) {
      websiteData.orgId = process.env.DEV_ORG;
    }

    const globalColors = Object.keys(websiteData.colors)
      .map((name) => {
        return `\n--${name}: ${
          (websiteData.colors as { [index: string]: any })[name]
        };\n`;
      })
      .toString()
      .replace(/(,)/g, "");

    const colorsEl = document.getElementById("SOLTIVO_THEME_COLORS");
    const fontsEl = document.getElementById("FONT_THEME_LINK");
    const fontSyleEl = document.getElementById("FONT_THEME_STYLE");
    if (colorsEl) colorsEl.innerText = `:root {${globalColors}}`;
    if (fontsEl) fontsEl.setAttribute("href", websiteData.font?.href);
    if (fontSyleEl) fontSyleEl.innerText = `*{${websiteData.font?.cssRule}}`;
    return websiteData;
  } else {
    return window.__INITIAL__DATA__;
  }
};
