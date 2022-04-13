export const copy = () => app.gulp.src(app.path.source.assets)
	.pipe(app.gulp.dest(app.path.build.assets));
