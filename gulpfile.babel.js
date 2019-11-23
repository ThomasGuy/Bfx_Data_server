/* eslint-disable no-unused-vars */
import { src, dest, watch, series, parallel } from "gulp";
import sourcemaps from "gulp-sourcemaps";
import babel from "gulp-babel";
import sass from "gulp-sass";
import concat from "gulp-concat";
import uglify from "gulp-uglify";
import postcss from "gulp-postcss";
import autoprefixer from "autoprefixer";
import del from "del";
import imagemin from "gulp-imagemin";
import cssnano from "cssnano";
import browserSync from "browser-sync";
import cond from "gulp-cond";
import cleanCSS from "gulp-clean-css";
import babelify from "babelify";
import bro from "gulp-bro";
import rename from "gulp-rename";
import buffer from "vinyl-buffer";
import cache from "gulp-cache";

// import { exec } from "child_process";

sass.compiler = require("node-sass");

const PROD = process.env.NODE_ENV === "production";
const buildDir = PROD ? "build" : "app/static";
const path = {
  scss: {
    src: "app/raw/styles/**/*.scss",
    dest: `${buildDir}/css`,
  },
  js: {
    site: "app/raw/js/site.js",
    src: "app/raw/js/**/*.*",
    dest: `${buildDir}/js`,
  },
  img: {
    src: "app/raw/img/**/*",
    dest: `${buildDir}/img`,
  },
  fonts: {
    src: "app/raw/fonts/*",
    dest: `${buildDir}/fonts`,
    vendor: {
      src: "node_modules/font-awesome/fonts/*",
    },
  },
  html: {
    src: "app/templates/**/*.html",
  },
};

const clearCache = (done) => cache.clearAll(done);

const clean = () => del(["app/static/**/*", "build/**/*"]);
const server = browserSync.create();
const runServer = () => {
  server.init({
    proxy: {
      target: "localhost:5003",
    },
    ws: true,
  });
};
const reload = (none) => {
  server.reload();
  none();
};

// Compile sass into CSS
function sassTask() {
  return src(path.scss.src)
    .pipe(cond(!PROD, sourcemaps.init({ loadMaps: true })))
    .pipe(sass().on("error", sass.logError))
    .pipe(cleanCSS())
    .pipe(cond(PROD, postcss([autoprefixer(), cssnano()])))
    .pipe(cond(!PROD, sourcemaps.write(".")))
    .pipe(dest(path.scss.dest));
}

// JS task: concatenates and uglifies JS files to script.js
function jsTask() {
  return src(path.js.site, { sourcemaps: !PROD })
    .pipe(babel())
    .pipe(cond(PROD, uglify()))
    .pipe(cond(PROD, concat("main.min.js"), concat("main.js")))
    .pipe(dest(path.js.dest, { sourcemaps: "." }));
}

function buildReact() {
  return src("./app/raw/js/index.js", { sourcemaps: !PROD })
    .pipe(
      bro({
        basedir: "./app/raw/js/",
        extensions: [".js", ".jsx"],
        debug: !PROD,
        transform: [babelify],
      })
    )
    .pipe(rename("bundle.js"))
    .pipe(cond(PROD, buffer())) // Stream files
    .pipe(cond(PROD, uglify()))
    .pipe(dest(path.js.dest, { sourcemaps: "." }));
}

function moveImg() {
  return src(path.img.src)
    .pipe(
      cond(
        PROD,
        imagemin({
          verbose: true,
        })
      )
    )
    .pipe(dest(path.img.dest));
}

function mvFontAwesome() {
  return src([path.fonts.vendor.src, path.fonts.src]).pipe(dest(path.fonts.dest));
}

const watchall = () =>
  watch(
    [path.scss.src, path.js.src, path.html.src],
    series(parallel(sassTask, jsTask, buildReact), clearCache, reload)
  );

module.exports.default = series(
  clean,
  mvFontAwesome,
  moveImg,
  parallel(sassTask, jsTask, buildReact),
  runServer,
  watchall
);
