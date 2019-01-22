const execSync = require("child_process").execSync;
const readline = require("readline");

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

rl.question("Enter the name of the Heroku app to create: ", answer => {
  // TODO: Log the answer in a database
  // console.log(`Thank you for your valuable feedback: ${answer}`);

  execSync(`heroku create ${answer}`);
  execSync(
    "heroku buildpacks:set https://github.com/timanovsky/subdir-heroku-buildpack"
  );

  execSync("heroku buildpacks:add heroku/nodejs");
  execSync("heroku config:set PROJECT_PATH=strapi-app");
  execSync("heroku addons:create mongolab:sandbox --as DATABASE");

  const databaseUri = execSync("heroku config:get DATABASE_URI").toString();

  // original string is something like
  // mongodb://heroku_vw31h2j1:hpkibclmh0pc9gbg4lne3f1jr@ds163354.mlab.com:63354/heroku_vw31h2j1

  // we extract the following
  // DATABASE_USERNAME: heroku_vw31h2j1
  // DATABASE_PASSWORD: hpkibclmh0pc9gbg4lne3f1jr
  // DATABASE_PORT: 63354
  // DATABASE_NAME: heroku_vw31h2j1

  const myRegexp = /mongodb:\/\/(.*):(.*)@(.*).mlab.com:(.*)\/(.*)/g;

  const match = myRegexp.exec(databaseUri);

  execSync(`heroku config:set DATABASE_USERNAME=${match[1]}`);
  execSync(`heroku config:set DATABASE_PASSWORD=${match[2]}`);
  execSync(`heroku config:set DATABASE_PORT=${match[4]}`);
  execSync(`heroku config:set DATABASE_NAME=${match[5]}`);

  console.log(`Heroku app "${answer}" is set up! ✅`);

  rl.close();
});
