"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.GlobalTemplate = void 0;
/**
 * @description default global validation template.
 */
exports.GlobalTemplate = "/**\n* @description global default data validation.\n*/\nexport default (): GlobalDataFields => {\n const defaultFont = {\n   id: 1,\n   name: \"Poppins\",\n   href: \"https://fonts.googleapis.com/css2?family=Poppins:wght@100;200;400;600;900&display=swap\",\n   cssRule: 'font-family: \"Poppins\", sans-serif !important;',\n };\n\n return {\n   website: {\n     orgId: \"\",\n     themeId: process.env.THEME_ID || \"\",\n     general: {\n       favicon: \"\",\n       name: \"Theme name\",\n     },\n     font: defaultFont,\n     colors: {\n       accent: \"#03a57b\",\n       text: \"#333333\",\n       background: \"#ffffff\",\n     },\n     nav: {\n       data: {\n         items: [],\n       },\n     },\n     footer: {\n       data: {},\n     },\n   },\n   validation: {\n     general: {\n       favicon: \"url|file|mimes:ico,jpeg,png,jpg\",\n       name: \"required|string\",\n     },\n     nav: {\n       data: {\n         items: [{ name: \"string|max:20\" }],\n       },\n     },\n     footer: {\n       data: {},\n     },\n   },\n   configuration: {\n     fonts: [defaultFont],\n   },\n };\n};";
