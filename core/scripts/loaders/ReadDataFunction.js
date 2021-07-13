var getOptions = require("loader-utils").getOptions;
var schema = {
    type: "object",
    properties: {
        test: {
            type: "string",
        },
    },
};
module.exports = function (source) {
    var options = getOptions(this);
    // Apply some transformations to the source...
    console.log(source);
    return source;
};
