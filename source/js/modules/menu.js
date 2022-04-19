const header = document.querySelector('.header');
const menuNodes = document.querySelectorAll('.menu');

let isOpen = false;

if (menuNodes) {
	menuNodes.forEach((menu) => {
		menu.inert = true;
	});
}

const openMenuBig = (evt) => {
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
			header.classList.add('header--menu-open');

			setTimeout(() => menu.classList.add('menu--opened'), 150);

			setTimeout(() => {
				menuContainer.classList.add('menu__container--visible');
				isOpen = true;
			}, 300);
		}
	}
};

const closeMenuBig = (evt) => {
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
					header.classList.remove('header--menu-open');
					isOpen = false;
				}, 300);
			}
		}
	}
};

const onMenuState = (evt) => {
	openMenuBig(evt);
	closeMenuBig(evt);

	setTimeout(() => {
		openMenuBig(evt);
		closeMenuBig(evt);
	}, 300);
};

export const bla = () => {
	window.addEventListener('mousemove', onMenuState);
	document.addEventListener('keyup', onMenuState);
	document.addEventListener('touchstart', onMenuState);
};
