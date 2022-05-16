import gulp from 'gulp';
import { path } from './gulp/config/path.js';
import { copy } from './gulp/tasks/copy.js';
import { reset } from './gulp/tasks/reset.js';
import { html } from './gulp/tasks/html.js';
import { server } from './gulp/tasks/server.js';
import { css } from './gulp/tasks/css.js';
import { themeLight } from './gulp/tasks/theme-light.js';
import { themeDark } from './gulp/tasks/theme-dark.js';
import { js } from './gulp/tasks/js.js';
import { leaflet } from './gulp/tasks/leaflet.js';
import { switcher } from './gulp/tasks/switcher.js';
import { theme } from './gulp/tasks/theme.js';
import { images } from './gulp/tasks/images.js';
import { sprite } from './gulp/tasks/sprite.js';
import { zip } from './gulp/tasks/zip.js';
import { ftp } from './gulp/tasks/ftp.js';
import { plugins } from './gulp/config/plugins.js';

global.app = {
	isProd: process.argv.includes('--prod'),
	isDev: !process.argv.includes('--prod'),
	path,
	gulp,
	plugins,
};

const watcher = () => {
	gulp.watch(path.watch.assets, copy);
	gulp.watch(path.watch.html, html);
	gulp.watch(path.watch.css, css);
	gulp.watch(path.watch.css, themeLight);
	gulp.watch(path.watch.css, themeDark);
	gulp.watch(path.watch.js, js);
	gulp.watch(path.watch.js, leaflet);
	gulp.watch(path.watch.js, switcher);
	gulp.watch(path.watch.js, theme);
	gulp.watch(path.watch.images, images);
	gulp.watch(path.watch.sprite, sprite);
};

const mainTasks = gulp.parallel(
	copy,
	html,
	css,
	themeLight,
	themeDark,
	js,
	leaflet,
	switcher,
	theme,
	images,
	sprite,
);

const dev = gulp.series(reset, mainTasks, gulp.parallel(watcher, server));
const prod = gulp.series(reset, mainTasks);
const archive = gulp.series(reset, mainTasks, zip);
const deploy = gulp.series(reset, mainTasks, zip, ftp);

gulp.task('default', dev);

export { dev, prod, archive, deploy, sprite };
