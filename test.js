const {v4} = require('uuid')

const fs = require("fs");
fs.writeFile("test.env", `
THEME_ID=${v4()}
HELLO=TEST
`, (err) =>{
    console.error(err)
});

