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
        name: "Business name",
      },
      font: defaultFont,
      colors: {
        accent: "#03a57b",
        text: "#333333",
        background: "#ffffff",
      },
      nav: {
        data: {
          items: [{ id: 2, name: "About" }],
          button: "Book now",
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
        email: "email",
        telephone: "phone",
        address: "string",
        facebook: "url",
        twitter: "url",
        instagram: "url",
      },
      nav: {
        data: {
          items: [{ name: "string|max:20" }],
          button: "string|max:30",
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
};
