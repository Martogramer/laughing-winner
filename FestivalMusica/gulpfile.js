const { src, dest, watch, parallel } = require('gulp');
//css
const sass = require('gulp-sass')(require('sass'));
const plumber = require('gulp-plumber');
const autoprefixer = require('autoprefixer');
const cssnano = require('cssnano');
const postcss = require('gulp-postcss');
const sourcemaps = require('gulp-sourcemaps');

//Images
const cache = require('gulp-cache');
const imageMin = require('gulp-imagemin');
const webp = require('gulp-webp');

//Javascript
const terser = require('gulp-terser-js');

function css(done){    
    src('src/scss/**/*.scss')
        .pipe(sourcemaps.init())
        .pipe( plumber())
        .pipe(sass())
        .pipe( postcss([autoprefixer(), cssnano()]))
        .pipe(sourcemaps.write('.'))
        .pipe(dest('build/css'))
    done();
}

function imagenes(done){
    const opciones = {
        optimizationLevel: 3
    }
    src('src/img/**/*.{jpg, png}')
        .pipe(cache(imageMin(opciones)))
        .pipe(dest('build/img'))
    done();
}

function versionWebp(done){
    const opciones={
        quiality: 50
    };
    src('src/img/**/*.{jpg, png}')
        .pipe( webp(opciones)) // pipe almacena en memoria
        .pipe( dest('build/img'))
    done()
}

function javascript(done){
    src('src/js/**/*.js')
        .pipe(sourcemaps.init())
        .pipe(terser())
        .pipe(sourcemaps.write('.'))
        .pipe(dest('build/js'));
    done();
}

function dev(done){
    watch('src/scss/**/*.scss', css);
    watch('src/js/**/*.js', javascript);
    done();
}


exports.css=css;
exports.js=javascript;
exports.imagenes=imagenes;
exports.versionWebp=versionWebp;
exports.dev=parallel(imagenes, versionWebp , javascript, dev) ;