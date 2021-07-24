import { useContext } from "react";
import { findSection } from "../../helpers/helpers";
import { WebsiteContext } from "../../data/website.context";
import "./introduction.styles.scss";
import { ReactComponent as Steve } from "../../assets/svg/steve.svg";

const Introduction = () => {
  const { website } = useContext(WebsiteContext);
  const section = findSection(website, "introduction");

  return (
    <div id="introduction">
      <div className="content">
        <div className="ilustration">
          <Steve />
        </div>
        <h2 data-for="text" data-type="introduction/title">
          {section?.data.title}
        </h2>
        <p data-for="text" data-type="introduction/description">
          {section?.data.description}
        </p>
      </div>
    </div>
  );
};

export default Introduction;
