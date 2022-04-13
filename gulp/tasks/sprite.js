import svgSprite from 'gulp-svg-sprite';

export const sprite = () => app.gulp.src(app.path.source.sprite, {})
	.pipe(app.plugins.plumber(
		app.plugins.notify.onError({
			title: 'SPRITE',
			message: 'Error: <%= error.message %>',
		}),
	))
	.pipe(svgSprite({
		mode: {
			symbol: {
				sprite: '../sprite.svg',
			},
		},
		shape: {
			transform: [
				{
					svgo: {
						plugins: [
							{ cleanupIDs: { minify: true } },
							{ removeViewBox: false },
							{ removeAttrs: { attrs: '(fill|stroke|class|data-name)' } },
						],
					},
				},
			],
		},
	}))
	.pipe(app.gulp.dest(app.path.build.images))
	.pipe(app.plugins.browsersync.stream());
