const header = document.querySelector('.header');

export const onHeaderGradientState = () => {
	if (window.pageYOffset >= 24) {
		header.classList.add('header--scroll');
	} else {
		header.classList.remove('header--scroll');
	}
};

export const createHeaderGradient = () => {
	onHeaderGradientState();

	window.addEventListener('scroll', onHeaderGradientState);
};
