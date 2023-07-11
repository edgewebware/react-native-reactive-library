const fs        = require('fs'),
      path      = require('path'),
      root = path.resolve(__dirname).split('/node_modules')[0]+'/',
      defaultPath = path.resolve('./setup')+'/',
      paths = {
        settings: "settings.js"
      }

for (var name in paths) {
  if (paths.hasOwnProperty(name)) {
    let file = paths[name],
        defFile  = defaultPath+name+'-default.js',
        userFile = root+file

    if (fs.existsSync(defFile)) {
      if (!fs.existsSync(userFile)) {
        fs.createReadStream(defFile).pipe(fs.createWriteStream(userFile));
      }
    } else {
      console.log('Missing file `'+defFile+'`.  Try reinstalling module `react-native-reactive-library`')
    }
  }
}
