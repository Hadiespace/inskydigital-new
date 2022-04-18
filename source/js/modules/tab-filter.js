const onTabFilterClick = (evt) => {
	if (evt.target.closest('.tab-filter')) {
		evt.target.classList.toggle('tab-filter--active');
	}
};

export const toggleTabFilter = () => {
	document.addEventListener('click', onTabFilterClick);
};
