import versionNumber from 'gulp-version-number';
import pug from 'gulp-pug';
import typograf from 'gulp-typograf';

export const html = () => app.gulp.src(app.path.source.html)
	.pipe(app.plugins.plumber(
		app.plugins.notify.onError({
			title: 'HTML',
			message: 'Error: <%= error.message %>',
		}),
	))
	.pipe(pug({
		pretty: true,
		verbose: true,
	}))
	.pipe(typograf({
		locale: ['ru', 'en-US']
	}))
	.pipe(
		app.plugins.gulpIf(
			app.isProd,
			versionNumber({
				'value': '%DT%',
				'append': {
					'key': '_v',
					'cover': 0,
					'to': [
						'css',
						'js',
					],
				},
				'output': {
					'file': 'gulp/version.json',
				},
			}),
		),
	)
	.pipe(app.gulp.dest(app.path.build.html))
	.pipe(app.plugins.browsersync.stream());
