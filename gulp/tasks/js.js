import webpack from 'webpack-stream';

export const js = () => app.gulp.src(app.path.source.js, { sourcemaps: app.isDev })
	.pipe(app.plugins.plumber(
		app.plugins.notify.onError({
			title: 'JS',
			message: 'Error: <%= error.message %>',
		}),
	))
	.pipe(webpack({
		mode: app.isProd ? 'production' : 'development',
		output: {
			filename: 'bundle.min.js',
		},
		devtool: app.isDev ? 'source-map' : false,
		module: {
			rules: [
				{
					test: /\.js$/,
					exclude: /(node_modules)/,
					use: ['babel-loader']
				},
			],
		},
	}))
	.pipe(app.gulp.dest(app.path.build.js))
	.pipe(app.plugins.browsersync.stream());
