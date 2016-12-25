// Initialize ALL routes including subfolders
let fs = require('fs');
let path = require('path');

function recursiveRoutes(folderName, app) {
    fs.readdirSync(folderName).forEach(function(file) {

        let fullName = path.join(folderName, file);
        let stat = fs.lstatSync(fullName);

        if (stat.isDirectory()) {
            recursiveRoutes(fullName, app);
          } else if (file.toLowerCase().indexOf('.js')
          && file !== 'recursive-routes.js'
          && file !== 'server.js') {
            require('./' + fullName)(app);
        }
    });
}
export default recursiveRoutes;
