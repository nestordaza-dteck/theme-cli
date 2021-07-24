import { useEffect, useState } from "react";
import { useHistory } from "react-router";

/**
 * @description this hook is responsible to talk with the builder when user in inside editor.
 */
const useBuilder = (config: {
  website: WebsiteData;
  brain: "wizard" | "display";
  routePath: string;
}) => {
  const history = useHistory();

  const [data, setData] = useState({
    website: config.website,
    brain: config.brain || "display",
    routePath: config.routePath || "/",
  });

  useEffect(() => {
    //when theme is in wizard
    window.addEventListener(
      "message",
      (event) => {
        //whenever the wizard changes will send the data through here.
        const { data } = event;

        if (data?.brain !== "wizard") {
          return;
        }

        setData({
          //get the brain
          brain: data.brain,
          //set route path.
          routePath: data.routePath,
          //get data from the wizard reducer
          website: data.website,
        });

        //send back success message
        window.parent.postMessage("SoltivoThemeMessageReceived", window.origin);
      },
      false
    );
  }, []);

  //changes path from wizard.
  useEffect(() => {
    if (data.brain === "wizard") {
      history.push(data.routePath);
    }
  }, [data.routePath, data.brain]);

  return data;
};

export default useBuilder;
