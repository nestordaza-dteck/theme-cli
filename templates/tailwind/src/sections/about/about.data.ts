/**
 * @description create data for about section.
 */
export default (): Required<SectionDataFields> => {
  return {
    data: {
      data: {
        title: "This is the about",
        image:
          "https://images.unsplash.com/photo-1559599101-f09722fb4948?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=MXwxNDA0Mjh8MHwxfHNlYXJjaHwxfHx3b21hbiUyMHNjaXNzb3JzfGVufDB8fHw&ixlib=rb-1.2.1&q=80&w=1080",
        description:
          "At half-past eight the door opened, the policeman appeared, and, requesting them to follow him, led the way to an adjoining hall.",
      },
      default: true,
      id: 1,
      name: "test",
      selected: false,
    },
    validation: {
      image: "url|file|mimes:png,jpeg,jpg",
      title: "string|max:30",
      description: "string",
    },
  };
};