const exec = require('child_process').exec;
require('dotenv').config();

const host = process.env.HOSTIP;
const port = process.env.PORT;

exec(`node index.js -H ${host}:${port}`, (err, stdout, stderr) => {
  if (err) {
    console.error(err);
    console.log("Backend corriendo en: "+host+":"+port);
    return;
  }
    console.log(stdout);
});