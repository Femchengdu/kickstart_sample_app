const path = require("path");
const solc = require("solc");
const fs = require("fs-extra");

const buildPath = path.resolve(__dirname, "build");
fs.removeSync(buildPath);

const camaignPath = path.resolve(__dirname, "contracts", "Campaign.sol");
const source = fs.readFileSync(camaignPath, "utf8");
const output = solc.compile(source).contracts;

fs.emptyDirSync(buildPath);

for (let contract in output) {
  fs.outputJSONSync(
    path.resolve(buildPath, contract.replace(":", "") + ".json"),
    output[contract]
  );
}
