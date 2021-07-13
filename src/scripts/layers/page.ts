export const pageLayer = `
/**
* @description create page data.
*/
export default (): PageDataFields => {
 return {
   data: {
     id: 1,
     default: true,
     selected: false,
     name: "",
     thumbnail: "",
     title: "",
     description: "",
     route: "/",
     withSections:[],
   },
 };
};
`;
