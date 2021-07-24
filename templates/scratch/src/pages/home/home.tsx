import { useContext } from "react";
import { WebsiteContext } from "../../data/website.context";
import Introduction from "../../sections/introduction/introduction";
import "./home.styles.scss";

function Home() {
  const { website } = useContext(WebsiteContext);
  const page = website?.page;

  /**
   * @description The names are equal/case sensitive to the section name attribute in website->page->section->name.
   */
  const builtedInSections = [{ name: "introduction", component: Introduction }];

  /**
   * @description filter default or selected sections.
   */
  const sections = page.sections.filter(
    (section) => section.default || section.selected
  );

  /**
   * @description list of components ordered by index to be displayed in this page.
   */
  let SectionsJSX: JSX.Element[] = [];

  /**
   * @description This is a sort of filter to get the SectionsJSX elements.
   * @suggestion you are not obrigated to do this way if you find a better way to match the sections with the
   * ones you get from the website.page[name].sections you can implement it as well, just keep pay attention
   * to section name, default and selected attributes.
   */
  sections.forEach((ps: WebsiteSection) => {
    builtedInSections.forEach((bs) => {
      if (ps.name === bs.name && (ps.default || ps.selected)) {
        /**
         * @description as you can see this approch you could pass props down to the section if needed 😜.
         */
        const Section = bs.component;

        SectionsJSX.push(<Section key={bs.name} />);
      }
    });
  });

  return <div id={"home"}>{SectionsJSX}</div>;
}

export default Home;
