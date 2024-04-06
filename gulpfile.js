import gulp from 'gulp';
const { src, dest, series } = gulp;
import terser from 'gulp-terser';
import dartSass from 'sass';
import gulpSass from 'gulp-sass';
const sass = gulpSass(dartSass);
import csso from 'gulp-csso';
import del from 'del';
import include from 'gulp-file-include';
import htmlmin from 'gulp-htmlmin';
import sync from 'browser-sync';
import concat from 'gulp-concat';
import autoprefixer from 'gulp-autoprefixer';
import imagemin from 'gulp-imagemin';

sync.create()

function html() {
    return src(['src/**.html',
        'src/components/about-model/**.html',
        'src/components/guarantee/**.html',
        'src/components/instructions/**.html',
        'src/components/specifications/**.html',
        'src/components/technologies/**.html',
    ])
        .pipe(include({
            prefix: '@@'
        }))
        .pipe(htmlmin({
            collapseWhitespace: true
        }))
        .pipe(dest('dist'))
}


function scss() {
    return src(['src/**.scss',
        'src/components/about-model/**.scss',
        'src/components/guarantee/**.scss',
        'src/components/instructions/**.scss',
        'src/components/specifications/**.scss',
        'src/components/technologies/**.scss',
    ])
        .pipe(sass())
        .pipe(autoprefixer())
        .pipe(csso())
        .pipe(concat('index.css'))
        .pipe(dest('dist'))
}

function js() {
    return src(['src/**.js',
        'src/components/about-model/**.js',
        'src/components/guarantee/**.js',
        'src/components/instructions/**.js',
        'src/components/specifications/**.js',
        'src/components/technologies/**.js',
    ])
        .pipe(terser())
        .pipe(dest('dist'))
}

function assets() {
    return src('src/assets/**.{png,jpg}')
        .pipe(imagemin())
        .pipe(dest('dist/assets'))
}

function serveFn() {
    sync.init({
        server: {
            baseDir: './dist'
        }
    })

    gulp.watch(['src/**.html',
        'src/components/about-model/**.html',
        'src/components/guarantee/**.html',
        'src/components/instructions/**.html',
        'src/components/specifications/**.html',
        'src/components/technologies/**.html',
    ], series(html)).on('change', sync.reload)
    gulp.watch(['src/**.scss',
        'src/components/about-model/**.scss',
        'src/components/guarantee/**.scss',
        'src/components/instructions/**.scss',
        'src/components/specifications/**.scss',
        'src/components/technologies/**.scss',
    ], series(scss)).on('change', sync.reload)
    gulp.watch(['src/**.js'], series(js)).on('change', sync.reload)
}

function clear() {
    return del('dist')
}

export const build = series(clear, assets, scss, html, js)
export const serve = series(clear, assets, scss, html, js, serveFn)