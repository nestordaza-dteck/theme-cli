/**
 * @description global default data validation.
 */
export default (): GlobalDataFields => {
  const defaultFont = {
    id: 1,
    name: "Poppins",
    href: "https://fonts.googleapis.com/css2?family=Poppins:wght@100;200;300;400;500;600;700;800;900&display=swap",
    cssRule: 'font-family: "Poppins", sans-serif !important;',
  };

  return {
    website: {
      orgId: "",
      themeId: process.env.THEME_ID || "",
      general: {
        favicon: "",
        name: "Scratch",
        email: "your_email@example.com",
        telephone: "",
        address: "",
        facebook: "",
        twitter: "",
        instagram: "",
      },
      font: defaultFont,
      colors: {
        accent: "#FFFFFF",
        text: "#EEEEEE",
        background: "#222222",
      },
      nav: {
        data: {
          items: [
            {
              id: 1,
              name: "Home",
              link: "/",
            },
            {
              id: 2,
              name: "About",
              link: "/about",
            },
          ],
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
