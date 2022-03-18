const { src, dest, watch, parallel } = require('gulp');
//css
const sass = require('gulp-sass')(require('sass'));
const plumber = require('gulp-plumber');

//Images
const cache = require('gulp-cache');
const imageMin = require('gulp-imagemin');
const webp = require('gulp-webp');


function css(done){
    
    src('src/scss/**/*.scss')
    .pipe( plumber())
    .pipe(sass())
    .pipe(dest('build/css'))
    done();
}

function imagenes(done){
    const opciones = {
        optimizationLevel: 3
    }
    src('src/img/**/*.{png, jpg}')
        .pipe(cache(imageMin(opciones)))
        .pipe(dest('build/img'))
    done();
}

function versionWebp(done){
    const opciones={
        quiality: 50
    };
    src('src/img/**/*.{png, jpg}')
        .pipe( webp(opciones)) // pipe almacena en memoria
        .pipe( dest('build/img'))
    done()
}

function dev(done){
    watch('src/scss/**/*.scss', css);
    done();
}


exports.css=css;
exports.imagenes=imagenes;
exports.versionWebp=versionWebp;
exports.dev=parallel(imagenes, versionWebp ,dev) ;