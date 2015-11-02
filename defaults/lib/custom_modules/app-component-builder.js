'use strict';

var fsp = require('fs-promise');
var Path = require('path');
var prependFile = require('prepend-file');

var appComponentBuilder = {
    build: function(entryDir, view, tmpFile, viewFiles) {
        // var mainAppFile = './app.js',
        var mainAppFile = Path.join(entryDir, '/app.js'),
            data = '';

        viewFiles.forEach(view => data +='require.ensure(\'./views/'+view+'\',()=>{}),\''+view+'\';\n');
        return fsp.copy(mainAppFile, tmpFile)
               .then(() => {
                    return new Promise((resolve, reject) => {
                        prependFile(tmpFile, data, err => {
                            if (err) {
                                reject(err);
                            }
                            else {
                                resolve();
                            }
                        });
                    });
                });
    }
};

module.exports = appComponentBuilder;