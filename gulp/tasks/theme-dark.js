import dartSass from 'sass';
import gulpSass from 'gulp-sass';
import rename from 'gulp-rename';
import cleanCss from 'gulp-clean-css';
import webpCss from 'gulp-webpcss';
import autoprefixer from 'gulp-autoprefixer';
import groupCssMediaQueries from 'gulp-group-css-media-queries';

const sass = gulpSass(dartSass);

export const themeDark = () => app.gulp.src(app.path.source.themeDark, { sourcemaps: app.isDev })
	.pipe(app.plugins.plumber(
		app.plugins.notify.onError({
			title: 'CSS',
			message: 'Error: <%= error.message %>',
		}),
	))
	.pipe(sass({
		outputStyle: 'expanded',
	}))
	.pipe(
		app.plugins.gulpIf(
			app.isProd,
			groupCssMediaQueries(),
		),
	)
	.pipe(webpCss(
		{
			webpClass: '.webp',
			noWebpClass: '.no-webp',
		},
	))
	.pipe(autoprefixer({
		grid: true,
		overrideBrowserslist: ['last 2 versions', 'not dead', 'not ie <= 11', 'iOS >= 12'],
		cascade: true,
	}))
	.pipe(
		app.plugins.gulpIf(
			app.isProd,
			cleanCss()
		),
	)
	.pipe(rename({
		extname: '.min.css',
	}))
	.pipe(app.gulp.dest(app.path.build.css))
	.pipe(app.plugins.browsersync.stream());
