import arg from "arg";
import { run } from "./main";

function parseArgumentsIntoOptions(rawArgs: string[]) {
  const args = arg(
    {
      "--port": String,
    },
    {
      argv: rawArgs.slice(2),
    }
  );

  const envChoices = ["start", "build", "data"];
  if (!envChoices.includes(args._[0])) {
    throw new Error("environment mismatch, set either start or build.");
  }

  return {
    port: args["--port"],
    env:
      args._[0] === "build"
        ? "production"
        : args._[0] === "data"
        ? "development"
        : "development",
    data: args._[0] === "data",
  } as ScriptsOptions;
}

export async function cli(args) {
  let options = parseArgumentsIntoOptions(args);
  await run(options);
}
