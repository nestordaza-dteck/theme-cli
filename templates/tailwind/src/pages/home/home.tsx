// import { useContext } from "react";
// import { WebsiteContext } from "../../data/website.context";
// import About from "../../sections/about/about";
// import Categories from "../../sections/categories/categories";
// import Contact from "../../sections/contact/contact";
// import Galery from "../../sections/galery/galery";
// import Introduction from "../../sections/introduction/introduction";
// import Team from "../../sections/team/team";
// import { WebsiteSection } from "../../types";

function Home() {
  // const { website } = useContext(WebsiteContext);
  // const page = website?.page;
  // /**
  //  * The names are equal to the section name attribute in props.website->section->name.
  //  * If you want you can pass props down to each section.
  //  */
  // const builtedInSections = [
  //   { name: "introduction", component: Introduction },
  //   { name: "about", component: About },
  //   { name: "categories", component: Categories },
  //   { name: "galery", component: Galery },
  //   { name: "team", component: Team },
  //   { name: "contact", component: Contact },
  // ];

  // //set the website components to be displayed
  // //get selected sections
  // const sections = page?.sections
  //   ?.map((s: any) => (s.default || s.selected ? s : undefined))
  //   .filter((s: any) => s !== undefined);

  // //sections components added
  // var DisplayWebsiteList: any[] = []; //used as placeholder to "DisplayWebsite" state.

  // /**
  //  * @description here I am searching for the themes to be displayed by matching "website.sections" property with
  //  * "builtedInSections" name section.
  //  * @suggestion you are not obrigated to do in this way if you find a better way to match the sections with the
  //  * ones you get from the website.page[name].sections you can implement it as well and test it in the wizard.
  //  */
  // sections?.forEach((ps: WebsiteSection) => {
  //   builtedInSections.forEach((bs) => {
  //     if (ps.name.toLowerCase() === bs.name && (ps.default || ps.selected)) {
  //       /**
  //        * @description here I am passing {website} as prop but you can pass the data of a section like :
  //        * @example <Section section={ps.data} />
  //        */
  //       const Section = bs.component;

  //       DisplayWebsiteList.push(<Section key={bs.name} />);
  //     }
  //   });
  // });

  return (
    <div id={"home"}>
      hello world
      {/* {DisplayWebsiteList} */}
    </div>
  );
}

export default Home;
