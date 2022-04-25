document.documentElement.style.setProperty('--vh', `${window.innerHeight * 0.01}px`);

const createDarkTheme = () => {
	document.head.insertAdjacentHTML(
		'beforeend',
		'<link id="theme-light" rel="stylesheet" href="css/theme-light.min.css" media="not all">',
	);

	document.head.insertAdjacentHTML(
		'beforeend',
		'<link id="theme-dark" rel="stylesheet" href="css/theme-dark.min.css" media="all">',
	);
};

const createLightTheme = () => {
	document.head.insertAdjacentHTML(
		'beforeend',
		'<link id="theme-dark" rel="stylesheet" href="css/theme-dark.min.css" media="not all">',
	);

	document.head.insertAdjacentHTML(
		'beforeend',
		'<link id="theme-light" rel="stylesheet" href="css/theme-light.min.css" media="all">',
	);
};

if (localStorage.getItem('color-scheme') === 'dark') {
	createDarkTheme();
} else if (localStorage.getItem('color-scheme') === 'light') {
	createLightTheme();
} else if (matchMedia('(prefers-color-scheme: dark)').matches) {
	createDarkTheme();
} else if (matchMedia('(prefers-color-scheme: light)').matches) {
	createLightTheme();
}
