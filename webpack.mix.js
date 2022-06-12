const mix = require('laravel-mix');
const $ = require("jquery");

let fs = require('fs');

let getFiles = function (dir) {
    return fs.readdirSync(dir).filter(file => {
        return fs.statSync(`${dir}/${file}`).isFile();
    });
};

let getDirectories = function (dir) {
    return fs.readdirSync(dir).filter(file => {
        return fs.statSync(`${dir}/${file}`).isDirectory()
    });
};

mix.disableNotifications();
mix.setPublicPath('assets/');

mix.options({
    legacyNodePolyfills: false
});

getFiles('resources/scss').forEach(function (path) {
    if (path == 'main.scss') {
        mix.sass('resources/scss/' + path, 'css/');
    }
})

getFiles('resources/js').forEach(function (path) {
    if (path == 'main.js') {
        mix.js('resources/js/' + path, '/js');
    }
});
