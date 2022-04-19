export const theme = () => app.gulp.src(app.path.source.theme)
	.pipe(app.gulp.dest(app.path.build.js));
