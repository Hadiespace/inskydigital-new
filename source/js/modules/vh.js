const onHeightChange = () => {
	const vh = window.innerHeight * 0.01;
	document.documentElement.style.setProperty('--vh', `${vh}px`);
};

export const changeVH = () => {
	onHeightChange();

	window.addEventListener('resize', onHeightChange);
	window.addEventListener('scroll', onHeightChange);
};
