const webp = new Image();

const testWebp = (callback) => {
	webp.onload = webp.onerror = () => callback(webp.height === 2);
	webp.src = 'data:image/webp;base64,UklGRjoAAABXRUJQVlA4IC4AAACyAgCdASoCAAIALmk0mk0iIiIiIgBoSygABc6WWgAA/veff/0PP8bA//LwYAAA';
};

export const testSupportWebp = () => {
	testWebp((support) => document.documentElement.classList
		.add(support === true ? 'webp' : 'no-webp'));
};
