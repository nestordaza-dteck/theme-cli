export const sectionLayer = `/**
* @description create section data.
*/
export default (): Required<SectionDataFields> => {
 return {
   data: {
     data: {},
     default: true,
     id: 1,
     name: "",
     selected: false,
   },
   validation: {},
 };
};
`;
