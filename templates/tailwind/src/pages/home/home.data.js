const data = {
    validation: [
        require("../../sections/about/about.validation.json")
    ],
    sections: [
        require("../../sections/about/about.data.json")
    ],
};

module.exports = {
    page: {
        id: 1,
        default: true,
        selected: false,
        name: "homepage",
        thumbnail: "",
        title: "home page",
        description: "my home page",
        route: "/",
        sections: data.sections,
    },
    validation: {
        id: 1,
        sections: data.validation,
    },
};
