import { changePageHeight } from './util.js';

export const changeVH = () => {
	window.addEventListener('resize', changePageHeight);
};
