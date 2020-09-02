const fs = require("fs");
const path = require("path");
const ch = require("child_process");

const ROOT = path.join(__dirname, "../");
const TARGET = path.join(ROOT, "local");
const lernaPackage = JSON.parse(
  fs.readFileSync(path.join(ROOT, "lerna.json")).toString()
);

const { packages, version } = lernaPackage;

if (!fs.existsSync(TARGET)) {
  fs.mkdirSync(TARGET);
}

const specifiedPackages = process.argv
  .filter(v => v.startsWith("-p"))
  .map(i => i.slice(3));

(specifiedPackages.length ? specifiedPackages : packages).forEach(p => {
  const fullpath = path.join(ROOT, p);
  const pkg = JSON.parse(
    fs.readFileSync(path.join(fullpath, "package.json")).toString()
  );
  const packagedName = pkg.name.replace("@tarojs/", "tarojs-");
  const tarName = packagedName + "-" + pkg.version + ".tgz";
  process.chdir(fullpath);
  ch.execSync("npm pack --ignore-scripts");
  fs.renameSync(
    path.join(fullpath, tarName),
    path.join(TARGET, packagedName + "." + pkg.version + ".tgz")
  );
});
