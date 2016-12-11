/*******************************************************************************
 * Copyright (c) 2016 <droupy>.
 * All rights reserved. This program and the accompanying materials
 * are made available under the terms of the MIT License which
 * accompanies this distribution, and is available at
 * https://opensource.org/licenses/MIT
 *******************************************************************************/

'use strict';

let gulp = require('gulp'),
    browserify = require('gulp-browserify'),
    gulpUtil = require('gulp-util');

var $ = require('gulp-load-plugins')();

gulp.task('clean', () => {
    return gulp.src([
        'static/main.min.js',
        'static/main.browserify.js',
        'checkstyle.xml'
    ]).pipe($.clean());
});

gulp.task('scripts', ['clean'], () => {
    return gulp.src(
        [
            'static/**/*.js'
        ])
        .pipe($.jshint())
        .pipe($.jshint.reporter(require('jshint-stylish')))
        .pipe($.jshint.reporter(require('jshint-checkstyle-file-reporter')))
        .pipe($.size());
});

gulp.task('browserify', ['scripts'], () => {
    return gulp.src(['static/main.js'])
        .pipe(browserify({insertGlobals: true}))
        .pipe($.concat('main.browserify.js'))
        .pipe(gulp.dest('static/'));
});

gulp.task('minify', ['browserify'], () => {
    return gulp.src(['static/main.browserify.js'])
        .pipe($.uglify().on('error', gulpUtil.log))
        .pipe($.rename('main.min.js'))
        .pipe(gulp.dest('static'))
});
