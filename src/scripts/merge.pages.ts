// const fs = require("fs");
// const path = require("path");
// const logSymbols = require("log-symbols");
// const pagesDefaultData = require("../src/data/pages.website");

// const _FILES = {
//     pages: "pages.website.json",
//     validation: "validation.website.json",
// };

// function mergePages() {
//     try {
//         const defaultData = pagesDefaultData.map((data) => {
//             //validate first attributes of a page.
//             if (!data.validation) {
//                 throw new Error(`page has no validation.`);
//             } else if (!data.page.id || typeof data.page?.id !== `number`) {
//                 throw new Error(`all pages must have numeric id.`);
//             } else if (data.page.id !== data.validation.id) {
//                 throw new Error(`page validation id and page id must be equal.`);
//             } else if (!data.page.name) {
//                 throw new Error(`${data.page.name} is missing name attribute.`);
//             } else if (!data.page.title) {
//                 throw new Error(`${data.page.name} is missing title attribute.`);
//             } else if (!data.page.description) {
//                 throw new Error(`${data.page.name} is missing description attribute.`);
//             } else if (!data.page.route) {
//                 throw new Error(`${data.page.name} is missing route attribute.`);
//             } else if (!data.page.thumbnail && data.page.thumbnail !== "") {
//                 throw new Error(`${data.page.name} is missing thumbnail attribute.`);
//             } else if (typeof data.page.default !== `boolean`) {
//                 throw new Error(`${data.page.name} is missing default attribute.`);
//             } else if (typeof data.page.selected !== `boolean`) {
//                 throw new Error(`${data.page.name} is missing selected attribute.`);
//             } else {
//                 // check sections
//                 if (!data.page.sections.length) {
//                     throw new Error(`page ${data.page.name} must have at least one section.`);
//                 } else {
//                     // validate sections
//                     const sectionsValidation = data.validation.sections;
//                     const sections = data.page.sections;

//                     sections.map((section) => {
//                         if (!section.name) {
//                             throw new Error(`all sections must have name.`);
//                         } else if (!section.id || typeof section.id !== `number`) {
//                             throw new Error(`all sections must have id.`);
//                         } else if (typeof section.selected !== `boolean`) {
//                             throw new Error(`all sections must have selected.`);
//                         } else if (typeof section.default !== `boolean`) {
//                             throw new Error(`all sections must have default.`);
//                         } else if (!section.data) {
//                             throw new Error(`all sections must have data.`);
//                         } else {
//                             const sectionData = Object.keys(section.data);
//                             const found = sectionsValidation.find((s) => s.id === section.id);
//                             // check if user is trying to validate a section
//                             if (found) {
//                                 Object.keys(found.data).forEach((stringAttr) => {
//                                     if (!sectionData.includes(stringAttr)) {
//                                         throw new Error(`section data ${stringAttr} doest not exist in ${section.name}, your validation data properties must be equal to your data properties.`);
//                                     }
//                                 });
//                             }
//                         }
//                     });
//                 }
//             }
//             return data.page;
//         });

//         const pagesValidation = pagesDefaultData.map((page) => {
//             return page.validation;
//         });

//         // if data folder in public does not exist create one
//         if (!fs.existsSync(path.join(__dirname, `../public/assets/data`))) {
//             fs.mkdirSync(path.join(__dirname, `../public/assets/data`), {
//                 recursive: true,
//             });
//         }

//         //if validation does not exist create one
//         if (!fs.existsSync(path.join(__dirname, `../public/assets/data/${_FILES.validation}`))) {
//             fs.writeFileSync(path.join(__dirname, `../public/assets/data/${_FILES.validation}`), "{}");
//         }

//         // get previous validation if any
//         let previousValidation = fs.readFileSync(path.join(__dirname, `../public/assets/data/${_FILES.validation}`));
//         previousValidation = JSON.parse(previousValidation);
//         const newValidationJsonString = JSON.stringify({ ...previousValidation, pages: pagesValidation }, null, 2);

//         //create/change validation
//         fs.writeFileSync(path.join(__dirname, `../public/assets/data/${_FILES.validation}`), newValidationJsonString);
//         console.log(logSymbols.success, `\x1b[32m`, `${_FILES.validation}`, `\x1b[0m`, `merged pages successfully.`);

//         //create/change pages
//         const pagesJsonString = JSON.stringify(defaultData, null, 2);
//         fs.writeFileSync(path.join(__dirname, `../public/assets/data/${_FILES.pages}`), pagesJsonString);
//         console.log(logSymbols.success, `\x1b[32m`, `${_FILES.pages}`, `\x1b[0m`, `merged pages successfully.`);
//     } catch (error) {
//         console.log(logSymbols.error, `\x1b[31m`, `Failed reason:`, `\x1b[0m`, error?.message || `Something went wrong... please check your files.`);
//     }
// }

// module.exports = mergePages;
