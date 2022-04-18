const header = document.querySelector('.header');

let isOpen = false;
let activeLink = null;
let activeButton = null;
let isTargetLink = false;
let isTargetButton = false;

const openMenuBig = (evt) => {
	const targetParent = evt.target.parentElement;
	const menuBig = targetParent.querySelector('.menu-big');

	if (menuBig) {
		const menuBigContainer = menuBig.querySelector('.menu-big__container');
		if (!isOpen) {
			targetParent.classList.add('main-nav__item--current');
			header.classList.add('header--menu-open');

			setTimeout(() => {
				menuBig.classList.add('menu-big--opened');
			}, 300);

			setTimeout(() => {
				menuBigContainer.classList.add('menu-big__container--visible');
				isOpen = true;
			}, 600);
		}
	}
};

const closeMenuBig = () => {
	if (isOpen) {
		const menuBig = document.querySelector('.menu-big--opened');

		if (menuBig) {
			const menuBigContainer = document.querySelector('.menu-big__container--visible');

			if (menuBigContainer) {
				menuBigContainer.classList.remove('menu-big__container--visible');
			}

			setTimeout(() => {
				menuBig.classList.remove('menu-big--opened');
			}, 300);

			setTimeout(() => {
				header.classList.remove('header--menu-open');
				isOpen = false;
			}, 600);
		}
	}
};

const onMenuBigMousemove = (evt) => {
	if (!isTargetLink) {
		if (evt.target.closest('.main-nav__link--menu') &&
			!isTargetLink) {
			activeLink = evt.target;
			isTargetLink = true;
		}
	}

	if (evt.target.closest('.main-nav__link--menu')) {
		openMenuBig(evt);
	}

	if (evt.target !== activeLink &&
		!evt.target.closest('.menu-big--opened')) {
		closeMenuBig();

		activeLink = null;
		isTargetLink = false;
	}
};

const onMenuBigTouchend = (evt) => {
	if (evt.target.closest('.nav-arrow') && !isTargetButton) {
		activeButton = evt.target;
		isTargetButton = true;
	}

	if (evt.target.closest('.nav-arrow')) {
		openMenuBig(evt);
	}

	if (evt.target !== activeButton &&
		!evt.target.closest('.menu-big--opened')) {
		closeMenuBig();

		activeButton = null;
		isTargetButton = false;
	}

	if (evt.target !== activeButton &&
		!evt.target.closest('.menu-big--opened')) {
		closeMenuBig();

		activeButton = null;
		isTargetButton = false;
	}
};

export const bla = () => {
	document.addEventListener('mousemove', onMenuBigMousemove);
	document.addEventListener('keyup', onMenuBigMousemove);
	document.addEventListener('touchend', onMenuBigTouchend);
};
