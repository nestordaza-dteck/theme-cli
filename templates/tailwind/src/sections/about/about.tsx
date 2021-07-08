import { useContext } from "react";
import { findSection } from "../../helpers/helpers";
import { WebsiteContext } from "../../data/website.context";
import "./about.styles.scss";

const About = () => {
  const { website } = useContext(WebsiteContext);
  const section = findSection(website, "about");

  return (
    <div id="about">
      <div className="about--content">
        <h2 data-for="text" data-type="about/title">
          {section?.data.title}
        </h2>
        <p data-for="text" data-type="about/description">
          {section?.data.description}
        </p>
      </div>
      <div className="about--img">
        <img
          data-for="image"
          data-type="about/image"
          src={section?.data.image}
          alt={`${section?.data.title} image`}
        />
      </div>
    </div>
  );
};

export default About;
