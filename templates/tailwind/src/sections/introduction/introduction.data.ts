/**
 * @description create data section.
 */
export default (): Required<SectionDataFields> => {
  return {
    data: {
      data: {
        background:
          "https://images.unsplash.com/photo-1627209024738-6499648d041e?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=668&q=80",
        title: "CST Tailwind boilerplate",
        description:
          "The people who are crazy enough to think they can change the world are the ones who do it.",
      },
      default: true,
      id: 1,
      name: "introduction",
      selected: false,
    },
    validation: {
      background: "file|mimes:jpeg,png,webp,png",
      title: "string|max:30",
      description: "string",
    },
  };
};
