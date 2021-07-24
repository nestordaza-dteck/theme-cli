/**
 * @description create page data.
 */
export default (): PageDataFields => {
  return {
    data: {
      id: 1,
      default: true,
      selected: false,
      name: "homepage",
      thumbnail: "",
      title: "home page",
      description: "my home page",
      route: "/",
      withSections: ["introduction"],
    },
  };
};
