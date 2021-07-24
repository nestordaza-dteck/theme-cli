/**
 * @description create data section.
 */
export default (): Required<SectionDataFields> => {
  return {
    data: {
      data: {
        title: "Create soltivo theme",
        description:
          "The people who are crazy enough to think they can change the world are the ones who do it.",
      },
      default: true,
      id: 1,
      name: "introduction",
      selected: false,
    },
    validation: {
      title: "string|max:30",
      description: "string",
    },
  };
};
