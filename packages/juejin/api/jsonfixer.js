const fs = require("fs");
const path = require("path");
let json = require(path.resolve(__dirname, "./openapi.json"));

const fix = (json) => {
  const keys = Object.keys(json);
  if (keys.includes("x-apifox")) {
    json["x-enum-varnames"] = Object.values(
      json["x-apifox"]["enumDescriptions"]
    );
  } else {
    for (const key of keys) {
      if (typeof json[key] === "object") {
        fix(json[key]);
      }
    }
  }
  if (keys.includes("title") && !keys.includes("description")) {
    json["description"] = json["title"];
  }
};

fix(json);

fs.writeFileSync("openapi.json", JSON.stringify(json, null, 2));
