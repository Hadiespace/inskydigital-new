export const leaflet = () => app.gulp.src(app.path.source.leaflet)
	.pipe(app.gulp.dest(app.path.build.leaflet));
