var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
import arg from "arg";
import { run } from "./main";
function parseArgumentsIntoOptions(rawArgs) {
    const args = arg({
        "--port": String,
    }, {
        argv: rawArgs.slice(2),
    });
    const envChoices = ["start", "build"];
    if (!envChoices.includes(args._[0])) {
        throw new Error("environment mismatch, set either start or build.");
    }
    return {
        port: args["--port"] || "8080",
        env: args._[0] === "build" ? "production" : "development",
    };
}
export function cli(args) {
    return __awaiter(this, void 0, void 0, function* () {
        let options = parseArgumentsIntoOptions(args);
        yield run(options);
    });
}
