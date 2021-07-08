const { v4 } = require("uuid");
const config = require("./config.website");
const pages = require("./pages.website");

module.exports = {
    website: {
        orgId: "",
        themeId: process.env.THEME_ID || v4(),
        general: {
            favicon: "",
            name: "Business name",
        },
        font: config.fonts[0],
        colors: {
            accent: "#03a57b",
            text: "#333333",
            background: "#ffffff",
        },
        nav: {
            data: {
                items: [
                    { id: 2, name: "About" },
                ],
                button: "Book now",
            },
        },
        page: pages[0].page,
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
    },
};
