export const switcher = () => app.gulp.src(app.path.source.switcher)
	.pipe(app.gulp.dest(app.path.build.js));
