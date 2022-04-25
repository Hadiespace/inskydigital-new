const body = document.querySelector('body');
const header = body.querySelector('.header');
const main = body.querySelector('.main');
const footer = body.querySelector('.footer');

const lockPaddingValue = `${window.innerWidth - document.body.clientWidth}px`;

export const enableHeaderInert = () => {
	main.inert = true;
	footer.inert = true;
};

export const disableHeaderInert = () => {
	header.inert = false;
	main.inert = false;
	footer.inert = false;
};

export const enablePageInert = () => {
	header.inert = true;
	main.inert = true;
	footer.inert = true;
};

export const disablePageInert = () => {
	header.inert = false;
	main.inert = false;
	footer.inert = false;
};

export const hideScroll = () => {
	header.style.paddingRight = lockPaddingValue;
	main.style.paddingRight = lockPaddingValue;
	footer.style.paddingRight = lockPaddingValue;

	const pagePosition = window.scrollY;
	body.classList.add('hide-scroll');
	body.dataset.position = pagePosition;
	body.style.top = `${-pagePosition}px`;
};

export const showScroll = () => {
	header.style.paddingRight = '0';
	main.style.paddingRight = '0';
	footer.style.paddingRight = '0';

	const pagePosition = parseInt(body.dataset.position, 10);
	body.style.top = 'auto';
	body.classList.remove('hide-scroll');
	window.scroll({ top: pagePosition, left: 0 });
	body.removeAttribute('data-position');
};

export const isEscEvent = (evt) => evt.key === 'Escape' || evt.key === 'Esc';

export const changePageHeight = () => {
	const vh = window.innerHeight * 0.01;
	document.documentElement.style.setProperty('--vh', `${vh}px`);
};
