import Routes from "./routes/routes";
import { WebsiteContext } from "./data/website.context";
import { useBuilder } from "@soltivo/theme-library";

const App = ({ global }: { global: WebsiteData }) => {
  const { website } = useBuilder({
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
