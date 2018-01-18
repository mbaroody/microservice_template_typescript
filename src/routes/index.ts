import * as fs from 'fs';
let routes: any = [];
const files = fs.readdirSync(__dirname);
files.forEach((file) => {
  // ignore hidden and this file
  if (file === 'index.js' || (/^\./g).test(file)) {
    return;
  } else {
    routes = routes.concat(require(`./${file.replace(/\.js$/g, '')}`).default);
  }
});
export default routes;
