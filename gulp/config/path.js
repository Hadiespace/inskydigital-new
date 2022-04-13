import * as nodePath from 'path';
const rootFolder = nodePath.basename(nodePath.resolve());

const buildFolder = './build';
const sourceFolder = './source';

export const path = {
	build: {
		assets: `${buildFolder}/`,
		html: `${buildFolder}/`,
		css: `${buildFolder}/css/`,
		js: `${buildFolder}/js/`,
		images: `${buildFolder}/images/`,
		fonts: `${buildFolder}/fonts/`,
	},
	source: {
		assets: `${sourceFolder}/assets/**/*.*`,
		html: `${sourceFolder}/pug/*.pug`,
		css: `${sourceFolder}/scss/style.scss`,
		themeLight: `${sourceFolder}/scss/theme-light.scss`,
		themeDark: `${sourceFolder}/scss/theme-dark.scss`,
		js: `${sourceFolder}/js/entry.js`,
		switcher: `${sourceFolder}/js/switcher.js`,
		images: `${sourceFolder}/images/**/*.{jpg,jpeg,png,webp}`,
		svg: `${sourceFolder}/images/**/*.svg`,
		sprite: `${sourceFolder}/icons/*.svg`,
	},
	watch: {
		assets: `${sourceFolder}/assets/**/*.*`,
		html: `${sourceFolder}/pug/**/*.pug`,
		css: `${sourceFolder}/scss/**/*.scss`,
		js: `${sourceFolder}/js/**/*.js`,
		images: `${sourceFolder}/images/**/*.{jpg,jpeg,png,svg,webp}`,
		sprite: `${sourceFolder}/icons/*.svg`,
	},
	clean: buildFolder,
	buildFolder,
	sourceFolder,
	rootFolder,
	ftp: '',
};
