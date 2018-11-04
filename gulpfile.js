"use strict";

let gulp = require("gulp");
let less = require("gulp-less");
let plumber = require("gulp-plumber");
let postcss = require("gulp-postcss");
let autoprefixer = require("autoprefixer");
let server = require("browser-sync").create();
let csso = require("gulp-csso");
let rename = require("gulp-rename");
let imagemin = require("gulp-imagemin");
let webp = require("gulp-webp");
let svgstore = require("gulp-svgstore");
let posthtml = require("gulp-posthtml");
let include = require("posthtml-include");
let del = require("del");

gulp.task("sprite", function(){
  return gulp.src("source/img/sprite-*")
    .pipe(svgstore({
      inlineSvg: true
    }))
    .pipe(rename("sprite.svg"))
    .pipe(gulp.dest("build/img"));
});

gulp.task("webp", function(){
  return gulp.src("source/img/**/*.{png,jpg}")
    .pipe(webp({quality: 70}))
    .pipe(gulp.dest("source/img"))
});

gulp.task("images", function(){
  return gulp.src("source/img/**/*.{png, jpg, svg}")
    .pipe(imagemin([
      imagemin.optipng({optimizationLevel: 3}),
      imagemin.jpegtran({progressive: true}),
      imagemin.svgo()
      ]))
    .pipe(gulp.dest("source/img"));
});

gulp.task("css", function () {
  return gulp.src("source/less/style.less")
    .pipe(plumber())
    .pipe(less())
    .pipe(postcss([
      autoprefixer()
    ]))
    .pipe(gulp.dest("build/css"))
    .pipe(csso())
    .pipe(rename("style.min.css"))
    .pipe(gulp.dest("build/css"))
    .pipe(server.stream());
});

gulp.task("html", function(){
  return gulp.src("source/*.html")
    .pipe(posthtml([
      include()
  ]))
    .pipe(gulp.dest("build"));
});

gulp.task("clean", function () {
  return del("build");
});

gulp.task("copy", function(){
  return gulp.src([
    "source/fonts/**/*.{woff, woff2}",
    "source/img/**",
    "source/js/**"
  ], {
  base: "source"
  })
    .pipe(gulp.dest("build"));
});

gulp.task("server", function () {
  server.init({
    server: "build/",
    notify: false,
    open: true,
    cors: true,
    ui: false
  });

  gulp.watch("source/less/**/*.less", gulp.series("css"));
  gulp.watch("source/img/sprite-*.svg", gulp.series("sprite", "html", "refresh"));
  gulp.watch("source/*.html", gulp.series("html", "refresh"));
});

gulp.task("refresh", function(done){
  server.reload();
  done();
});

gulp.task("build", gulp.series("clean", "copy", "css", "sprite", "html"));
gulp.task("start", gulp.series("build", "server"));
