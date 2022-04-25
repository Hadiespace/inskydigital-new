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

const openMenuDesktop = (evt) => {
	if (evt.target.classList.contains('main-nav__link--menu')
		|| evt.target.classList.contains('nav-arrow')) {
		const targetParent = evt.target.parentElement;
		const menu = targetParent.querySelector('.menu');
		const arrow = targetParent.querySelector('.nav-arrow');

		if (!isOpen && menu) {
			const menuContainer = menu.querySelector('.menu__container');

			arrow.setAttribute('aria-expanded', 'true');
			menu.inert = false;

			targetParent.classList.add('main-nav__item--current');
			header.classList.add('header--menu-opened');

			setTimeout(() => menu.classList.add('menu--opened'), 150);

			setTimeout(() => {
				menuContainer.classList.add('menu__container--visible');
				isOpen = true;
			}, 300);
		}
	}
};

const closeMenuDesktop = (evt) => {
	const currentItem = document.querySelector('.main-nav__item--current');

	if (isOpen && currentItem) {
		const link = currentItem.querySelector('.main-nav__link--menu');
		const arrow = currentItem.querySelector('.nav-arrow');
		const menu = currentItem.querySelector('.menu--opened');

		if (!evt.target.closest('.menu') && evt.target !== link && evt.target !== arrow) {
			const menuContainer = currentItem.querySelector('.menu__container--visible');

			if (menu) {
				currentItem.classList.remove('main-nav__item--current');
				arrow.setAttribute('aria-expanded', 'false');

				if (menuContainer) {
					menuContainer.classList.remove('menu__container--visible');
				}

				setTimeout(() => {
					if (menu) {
						menu.classList.remove('menu--opened');
						menu.inert = true;
					}
				}, 150);

				setTimeout(() => {
					header.classList.remove('header--menu-opened');
					isOpen = false;
				}, 300);
			}
		}
	}
};

const onMenuDesktopState = (evt) => {
	openMenuDesktop(evt);
	closeMenuDesktop(evt);

	setTimeout(() => {
		openMenuDesktop(evt);
		closeMenuDesktop(evt);
	}, 300);
};

const openDesktopMenu = () => {
	window.addEventListener('mousemove', onMenuDesktopState);
	document.addEventListener('keyup', onMenuDesktopState);
	document.addEventListener('touchstart', onMenuDesktopState);
};

const closeDesktopMenu = () => {
	const arrowNodes = document.querySelectorAll('.nav-arrow');
	const currentItems = document.querySelectorAll('.main-nav__item--current');
	const menuContainerNodes = document.querySelectorAll('.menu__container');

	isOpen = false;

	menuNodes.forEach((menu) => {
		menu.classList.remove('menu--opened');
		menu.inert = true;
	});

	arrowNodes.forEach((arrow) => arrow.setAttribute('aria-expanded', 'false'));

	currentItems.forEach((item) => item.classList.remove('main-nav__item--current'));

	menuContainerNodes.forEach((container) => container.classList.remove('menu__container--visible'));

	header.classList.remove('header--menu-opened');

	window.removeEventListener('mousemove', onMenuDesktopState);
	document.removeEventListener('keyup', onMenuDesktopState);
	document.removeEventListener('touchstart', onMenuDesktopState);
};

const onDesktopMenuResize = () => {
	if (document.body.clientWidth >= 1200) {
		if (!isDesktopActive) {
			openDesktopMenu();
			isDesktopActive = true;
		}
	} else {
		if (isDesktopActive) {
			closeDesktopMenu();
			isDesktopActive = false;
		}
	}
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

const onMobileMenuResize = () => {
	if (document.body.clientWidth < 1200) {
		if (!isMobileActive) {
			openMobileMenu();
			isMobileActive = true;
		}
	} else {
		if (isMobileActive) {
			closeMobileMenu();
			isMobileActive = false;
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

	window.addEventListener('resize', onDesktopMenuResize);
	window.addEventListener('resize', onMobileMenuResize);
};
