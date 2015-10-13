var path = require('path');

module.exports.findDependencies = function(dict){
  var files = {js:[], css:[]};

  var crawlDependencies = function(dict, parentLib){
    for (var key in dict){

      var entry = dict[key];

      if (entry.pkgMeta && entry.pkgMeta.main) {

        var main = toArray(entry.pkgMeta.main);
        main.forEach(function(item){

          item = path.join(key, item);
          var m = item.match(/\.(\w+)$/);

          if (m){
            var ext = m[1];
            if (!files[ext]){
              files[ext] = [];
            }

            var parentFile = parentLib && parentLib.pkgMeta && parentLib.pkgMeta.main ?
              toArray(parentLib.pkgMeta.main).filter(function(item){
                return item.indexOf('.'+ext) > 0;
              })[0] : null;

            parentFile = parentFile != null ? path.join(parentLib.key, parentFile) : null;

            var existsAt = files[ext].indexOf(item),
              parentAt = files[ext].indexOf(parentFile);

            if (parentAt >= 0 && existsAt === -1){  //insert before
              files[ext].splice(parentAt,0, item);
            }
            else if (parentAt >= 0 && existsAt > parentAt){  // shuffle higher
              files[ext].splice(parentAt, 0, item);
              files[ext].splice(existsAt+1,1);
            }
            else if (existsAt === -1){  // doesn't exist yet and no parent
              files[ext].push(item);
            }
          }
          else {
            console.log("Unknown file type");
          }
        });
      }
      if (entry.dependencies){
        if (entry) entry.key = key;
        crawlDependencies(entry.dependencies, entry);
      }
    }
  };

  crawlDependencies.call(this, dict.dependencies);

  return files;

};

function toArray(thing){
  return Array.isArray(thing) ? thing : [thing];
}
