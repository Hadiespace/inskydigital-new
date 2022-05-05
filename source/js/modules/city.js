const contactsMap = document.querySelector('.contacts-map');
const cityOpenDesktopNodes = document.querySelectorAll('.contacts-map__list .contacts-map__city-open');
const cityOpenMobileNodes = document.querySelectorAll('.contacts-map__buttons .contacts-map__city-open');
const cityWrapNodes = document.querySelectorAll('.contacts-map__city-wrap');

if (contactsMap) {
	cityOpenDesktopNodes[0].setAttribute('aria-expanded', true);
	cityOpenMobileNodes[0].setAttribute('aria-expanded', true);
	cityWrapNodes[0].classList.add('contacts-map__city-wrap--opened');
}

const toggleNodes = (nodes, value) => {
	nodes.forEach((element) => {
		if (element.getAttribute('aria-controls') === value) {
			element.setAttribute('aria-expanded', true);
		} else {
			element.setAttribute('aria-expanded', false);
		}
	});
};

const onCityClick = (evt) => {
	if (evt.target.classList.contains('contacts-map__city-open')) {
		const targetArea = evt.target.getAttribute('aria-controls');

		cityWrapNodes.forEach((element) => {
			if (element.getAttribute('id') === targetArea) {
				element.classList.add('contacts-map__city-wrap--opened');
			} else {
				element.classList.remove('contacts-map__city-wrap--opened');
			}
		});

		toggleNodes(cityOpenDesktopNodes, targetArea);
		toggleNodes(cityOpenMobileNodes, targetArea);
	}
};

export const toggleCities = () => {
	document.addEventListener('click', onCityClick);
};
