import { useContext } from "react";
import { findSection } from "../../helpers/helpers";
import { WebsiteContext } from "../../data/website.context";

const Introduction = () => {
  const { website } = useContext(WebsiteContext);
  const section = findSection(website, "introduction");

  return (
    <div
      data-for="background-image"
      data-type="introduction/background"
      id="introduction"
      className="bg-background bg-no-repeat bg-cover bg-center h-screen w-screen"
      style={{
        backgroundImage: `url(${section?.data.background})`,
      }}
    >
      <div className="flex justify-center items-center p-10 h-full">
        <div>
          <h2
            data-for="text"
            data-type="introduction/title"
            className="text-center text-5xl font-light text-accent"
          >
            {section?.data.title}
          </h2>

          <p
            data-for="text"
            data-type="introduction/description"
            className="text-center text-1xl font-light mt-5 text-text"
          >
            {section?.data.description}
          </p>
        </div>
      </div>
    </div>
  );
};

export default Introduction;
