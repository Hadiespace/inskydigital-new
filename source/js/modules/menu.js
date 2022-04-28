import {
	isEscEvent,
	enableHeaderInert,
	disableHeaderInert,
	hideScroll,
	showScroll,
} from './util.js';

const header = document.querySelector('.header');
const mainNavToggle = document.querySelector('.header__main-nav-toggle');
const leftWrap = document.querySelector('.header__left-wrap');
const menuNodes = document.querySelectorAll('.menu');

let isOpen = false;

let isDesktopActive = null;
let isMobileActive = null;

if (menuNodes) {
	menuNodes.forEach((menu) => (menu.inert = true));
}

const closeMenuDesktop = (evt) => {
	const arrowNodes = document.querySelectorAll('.nav-arrow');
	const currentItems = document.querySelectorAll('.main-nav__item--current');
	const menuContainerNodes = document.querySelectorAll('.menu__container');

	if (evt) {
		const parentElement = evt.target.parentElement;

		menuNodes.forEach((element) => {
			if (element !== parentElement.querySelector('.menu')) {
				element.classList.remove('menu--opened');
				element.inert = true;
			}
		});

		arrowNodes.forEach((element) => {
			if (element !== parentElement.querySelector('.nav-arrow')) {
				element.setAttribute('aria-expanded', 'false');
			}
		});

		currentItems.forEach((element) => {
			if (element !== parentElement) {
				element.classList.remove('main-nav__item--current');
			}
		});
	} else {
		menuNodes.forEach((element) => {
			element.classList.remove('menu--opened');
			element.inert = true;
		});

		arrowNodes.forEach((element) => {
			element.setAttribute('aria-expanded', 'false');
		});

		currentItems.forEach((element) => {
			element.classList.remove('main-nav__item--current');
		});

		menuContainerNodes.forEach((container) => container.classList.remove('menu__container--visible'));

		header.classList.remove('header--menu-opened');
	}
};

const openMenuDesktop = (evt) => {
	const targetParent = evt.target.parentElement;
	const menu = targetParent.querySelector('.menu');
	const arrow = targetParent.querySelector('.nav-arrow');

	if (menu) {
		const menuContainer = menu.querySelector('.menu__container');

		closeMenuDesktop(evt);

		targetParent.classList.add('main-nav__item--current');
		header.classList.add('header--menu-opened');
		arrow.setAttribute('aria-expanded', 'true');
		menu.inert = false;

		setTimeout(() => {
			menu.classList.add('menu--opened');
			menuContainer.classList.add('menu__container--visible');
		}, 0);
	}
};

function onDesktopMenuState(evt) {
	if (evt.target.classList.contains('main-nav__link--menu')
		|| evt.target.classList.contains('nav-arrow')) {
		openMenuDesktop(evt);
	} else if (
		!evt.target.closest('.menu')
		&& !evt.target.closest('.main-nav__link--menu')
		&& !evt.target.closest('.nav-arrow')) {
		closeMenuDesktop();
	}
}

const openDesktopMenu = () => {
	document.addEventListener('mousemove', onDesktopMenuState);
};

const closeDesktopMenu = () => {
	document.removeEventListener('mousemove', onDesktopMenuState);
};


const openMenuMobile = () => {
	header.classList.add('header--menu-opened');
	mainNavToggle.setAttribute('aria-expanded', 'true');
	isOpen = true;
	enableHeaderInert();
	hideScroll();

	setTimeout(() => {
		leftWrap.classList.add('header__left-wrap--opened');
	}, 150);
};

const closeMenuMobile = () => {
	leftWrap.classList.remove('header__left-wrap--opened');

	setTimeout(() => {
		header.classList.remove('header--menu-opened');
		mainNavToggle.setAttribute('aria-expanded', 'false');
		isOpen = false;
		disableHeaderInert();
		showScroll();
	}, 150);
};

const onOpenMobileMenuState = (evt) => {
	if (evt.target === mainNavToggle) {
		if (!isOpen) {
			openMenuMobile();
		} else {
			closeMenuMobile();
		}
	}

	if (evt.target.classList.contains('header__left-wrap')) {
		closeMenuMobile();
	}

	if (evt.target.classList.contains('nav-arrow')) {
		if (evt.target.getAttribute('aria-expanded') === 'false') {
			evt.target.setAttribute('aria-expanded', 'true');
			evt.target.parentElement.classList.add('main-nav__item--opened');
			evt.target.nextElementSibling.classList.add('menu--opened');
			evt.target.nextElementSibling.inert = false;
		} else {
			evt.target.setAttribute('aria-expanded', 'false');
			evt.target.parentElement.classList.remove('main-nav__item--opened');
			evt.target.nextElementSibling.classList.remove('menu--opened');
			evt.target.nextElementSibling.inert = true;
		}
	}
};

const onOpenMobileMenuKeydown = (evt) => {
	if (isOpen && isEscEvent(evt)) {
		closeMenuMobile();
	}
};

const openMobileMenu = () => {
	document.addEventListener('click', onOpenMobileMenuState);
	document.addEventListener('keydown', onOpenMobileMenuKeydown);
};

const closeMobileMenu = () => {
	header.classList.remove('header--menu-opened');
	mainNavToggle.setAttribute('aria-expanded', 'false');
	leftWrap.classList.remove('header__left-wrap--opened');
	isOpen = false;

	disableHeaderInert();
	showScroll();

	mainNavToggle.removeEventListener('click', onOpenMobileMenuState);
	document.removeEventListener('keydown', onOpenMobileMenuKeydown);

	if (menuNodes) {
		menuNodes.forEach((menu) => (menu.inert = true));
	}

};

const onMenuResize = () => {
	if (document.body.clientWidth < 1200) {
		if (!isMobileActive) {
			openMobileMenu();
			isMobileActive = true;
		}

		if (isDesktopActive) {
			closeDesktopMenu();
			isDesktopActive = false;
		}
	} else {
		if (isMobileActive) {
			closeMobileMenu();
			isMobileActive = false;
		}

		if (!isDesktopActive) {
			openDesktopMenu();
			isDesktopActive = true;
		}
	}
};

export const openMenu = () => {
	if (document.body.clientWidth >= 1200) {
		isDesktopActive = true;
		openDesktopMenu();
	} else {
		isMobileActive = true;
		openMobileMenu();
	}

	window.addEventListener('resize', onMenuResize);
};
