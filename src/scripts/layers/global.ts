export const globalLayer = `
/**
* @description global default data validation.
*/
export default (): GlobalDataFields => {
 const defaultFont = {
   id: 1,
   name: "Poppins",
   href: "https://fonts.googleapis.com/css2?family=Poppins:wght@100;200;400;600;900&display=swap",
   cssRule: 'font-family: "Poppins", sans-serif !important;',
 };

 return {
   website: {
     orgId: "",
     themeId: process.env.THEME_ID || "",
     general: {
       favicon: "",
       name: "Theme name",
     },
     font: defaultFont,
     colors: {
       accent: "#03a57b",
       text: "#333333",
       background: "#ffffff",
     },
     nav: {
       data: {
         items: [],
       },
     },
     footer: {
       data: {},
     },
   },
   validation: {
     general: {
       favicon: "url|file|mimes:ico,jpeg,png,jpg",
       name: "required|string",
     },
     nav: {
       data: {
         items: [{ name: "string|max:20" }],
       },
     },
     footer: {
       data: {},
     },
   },
   configuration: {
     fonts: [defaultFont],
   },
 };
};`;
