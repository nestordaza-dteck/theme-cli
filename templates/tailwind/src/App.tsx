import Routes from "./routes/routes";
import { WebsiteContext } from "./data/website.context";
import useBuilder from "./helpers/hooks/useBuilder";

const App = ({ global }: { global: WebsiteData }) => {
  const { website }: { website: WebsiteData } = useBuilder({
    website: global,
    brain: "display",
    routePath: "/",
  });

  return (
    <WebsiteContext.Provider value={{ website: website }}>
      <Routes />
    </WebsiteContext.Provider>
  );
};

export default App;
