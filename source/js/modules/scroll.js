const onScrollInit = (evt) => {
	if (evt.target.closest('a[href^="#"]')) {
		evt.preventDefault();

		const id = String(evt.target.getAttribute('href'));
		const elem = document.querySelector(id);

		if (elem) {
			elem.scrollIntoView({
				behavior: 'smooth',
				block: 'start'
			});
		}
	}
};

export const initScroll = () => document.addEventListener('click', onScrollInit);
