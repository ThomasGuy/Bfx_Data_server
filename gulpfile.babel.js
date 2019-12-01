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

sass.compiler = require("node-sass");

const PROD = process.env.NODE_ENV === "production";
const buildDir = PROD ? "build" : "bfx_data_server/server/static/dist";
const path = {
  scss: {
    src: "bfx_data_server/server/static/src/styles/**/*.scss",
    dest: `${buildDir}/css`,
  },
  js: {
    site: "bfx_data_server/server/static/src/js/site.js",
    src: "bfx_data_server/server/static/src/js/**/*.*",
    dest: `${buildDir}/js`,
  },
  img: {
    src: "bfx_data_server/server/static/src/img/**/*",
    dest: `${buildDir}/img`,
  },
  fonts: {
    src: "bfx_data_server/server/static/src/fonts/*",
    dest: `${buildDir}/fonts`,
    vendor: {
      src: "node_modules/font-awesome/fonts/*",
    },
  },
  html: {
    src: "bfx_data_server/server/templates/**/*.html",
  },
};

const clean = () => del(["bfx_data_sever/server/static/dist/**/*", "build/**/*"]);
const server = browserSync.create();
const runServer = (resolve) => {
  server.init({
    proxy: {
      target: "localhost:5000",
      ws: true,
    },
  });
  resolve();
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
    .pipe(dest(path.scss.dest))
    .pipe(server.stream());
}

// JS task: concatenates and uglifies JS files to script.js
function jsTask() {
  return src(path.js.site, { sourcemaps: !PROD })
    .pipe(babel())
    .pipe(cond(PROD, uglify()))
    .pipe(cond(PROD, concat("main.min.js"), concat("main.js")))
    .pipe(dest(path.js.dest, { sourcemaps: "." }))
    .pipe(server.stream());
}

function buildReact() {
  return src("./bfx_data_server/server/static/src/js/index.js", { sourcemaps: !PROD })
    .pipe(
      bro({
        basedir: "./bfx_data_server/server/static/src/js/",
        extensions: [".js", ".jsx"],
        debug: !PROD,
        transform: [babelify],
      }),
    )
    .pipe(rename("bundle.js"))
    .pipe(cond(PROD, buffer())) // Stream files
    .pipe(cond(PROD, uglify()))
    .pipe(dest(path.js.dest, { sourcemaps: "." }))
    .pipe(server.stream());
}

function moveImg() {
  return src(path.img.src)
    .pipe(
      cond(
        PROD,
        imagemin({
          verbose: true,
        }),
      ),
    )
    .pipe(dest(path.img.dest));
}

function mvFontAwesome() {
  return src([path.fonts.vendor.src, path.fonts.src]).pipe(dest(path.fonts.dest));
}

const watchall = () =>
  watch(
    [path.scss.src, path.js.src, path.html.src],
    series(parallel(sassTask, jsTask, buildReact), reload),
  );

module.exports.default = series(
  clean,
  mvFontAwesome,
  moveImg,
  parallel(sassTask, jsTask, buildReact),
  runServer,
  watchall,
);
