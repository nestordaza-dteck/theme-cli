// export function mergeGlobal() {
//   const fs = require("fs");
//   const path = require("path");
//   const globalDefaultData = require("../src/data/global");
//   const configData = require("../src/data/config.website");
//   const pagesDefaultData = require("../src/data/pages.website");
//   /**
//    * @description files to be created
//    */
//   const _FILES_NAMES = {
//     website: "global.website.json",
//     config: "config.website.json",
//     validation: "validation.website.json",
//   };
//   const websiteData = globalDefaultData.website;
//   if (websiteData.orgId !== "") {
//     throw new Error(`orgId must be set to empty strings`);
//   } else if (!websiteData.themeId) {
//     throw new Error(`Theme must have "themeId" property uuid V4.`);
//   } else if (!websiteData.general) {
//     throw new Error(`Theme must have "general" attribute.`);
//   } else if (Object.keys(websiteData?.colors).length < 3) {
//     throw new Error(`Theme must have at least 3 colors.`);
//   } else if (!websiteData.font) {
//     throw new Error(`Theme must has a font.`);
//   } else if (!websiteData.nav) {
//     throw new Error(`Theme must "nav" attribute.`);
//   } else if (!websiteData.page) {
//     throw new Error(`Theme must "page" attribute set to {} or an valid page.`);
//   } else {
//     if (websiteData.page.id) {
//       const found = pagesDefaultData.find(
//         (p) => p.page.id === websiteData.page.id
//       );
//       if (!found) {
//         throw new Error(
//           `Page set in "page" attribute was not found in pages.website.`
//         );
//       }
//     }
//     if (
//       (!websiteData.general.favicon && websiteData.general.favicon !== "") ||
//       !websiteData.general.name
//     ) {
//       throw new Error(`general must have "favicon" and "name" attributes.`);
//     }
//     if (
//       !websiteData.font.cssRule ||
//       !websiteData.font.href ||
//       !websiteData.font.id ||
//       !websiteData.font.name
//     ) {
//       throw new Error(
//         `font attribute must have "id", "name", "href" and "cssRule" defined`
//       );
//     }
//     if (!websiteData.nav.data || !websiteData.nav.data?.items) {
//       throw new Error(
//         `the attribute "data" must be added to "nav" attribute and data must contain an array of "items" attribute.`
//       );
//     }
//   }
//   // if data folder in public does not exist create one
//   if (!fs.existsSync(path.join(__dirname, `../public/assets/data`))) {
//     fs.mkdirSync(path.join(__dirname, `../public/assets/data`), {
//       recursive: true,
//     });
//   }
//   //if validation does not exist create one
//   if (
//     !fs.existsSync(
//       path.join(__dirname, `../public/assets/data/${_FILES_NAMES.validation}`)
//     )
//   ) {
//     fs.writeFileSync(
//       path.join(__dirname, `../public/assets/data/${_FILES_NAMES.validation}`),
//       "{}"
//     );
//   }
//   const websiteValidation = globalDefaultData.validation;
//   // read previous validation if any
//   let previousValidation = fs.readFileSync(
//     path.join(__dirname, `../public/assets/data/${_FILES_NAMES.validation}`)
//   );
//   previousValidation = JSON.parse(previousValidation);
//   const newValidationJsonString = JSON.stringify(
//     { ...previousValidation, ...websiteValidation },
//     null,
//     2
//   );
//   //create/change validation
//   fs.writeFileSync(
//     path.join(__dirname, `../public/assets/data/${_FILES_NAMES.validation}`),
//     newValidationJsonString
//   );
//   console.log(
//     `\x1b[32m`,
//     `${_FILES_NAMES.validation}`,
//     `\x1b[0m`,
//     `merged pages successfully.`
//   );
//   //create/change website
//   const websiteJsonString = JSON.stringify(websiteData, null, 2);
//   fs.writeFileSync(
//     path.join(__dirname, `../public/assets/data/${_FILES_NAMES.website}`),
//     websiteJsonString
//   );
//   console.log(
//     `\x1b[32m`,
//     `${_FILES_NAMES.website}`,
//     `\x1b[0m`,
//     `merged data successfully.`
//   );
//   //create/change config
//   const configJsonString = JSON.stringify(configData, null, 2);
//   fs.writeFileSync(
//     path.join(__dirname, `../public/assets/data/${_FILES_NAMES.config}`),
//     configJsonString
//   );
//   console.log(
//     `\x1b[32m`,
//     `${_FILES_NAMES.config}`,
//     `\x1b[0m`,
//     `merged config successfully.`
//   );
// }
//# sourceMappingURL=merge.global.js.map