const switcher = document.querySelector('.theme-switcher');
const themeLight = document.querySelector('#theme-light');
const themeDark = document.querySelector('#theme-dark');
const metaLight = document.querySelector('#meta-light');
const metaDark = document.querySelector('#meta-dark');

const onThemeRender = () => {
	if (themeLight.media === 'all') {
		metaLight.media = 'all';
		metaDark.media = 'not all';

		switcher.classList.remove('theme-switcher--dark');
		switcher.classList.add('theme-switcher--light');
	} else {
		metaDark.media = 'all';
		metaLight.media = 'not all';

		switcher.classList.remove('theme-switcher--light');
		switcher.classList.add('theme-switcher--dark');
	}

	document.documentElement.style.setProperty('--theme-delay', '.3s');
	document.documentElement.style.setProperty('--theme-delay2', '.15s');
};

const onThemeClick = () => {
	if (themeLight.media === 'all') {
		localStorage.setItem('color-scheme', 'dark');
		metaDark.media = 'all';
		metaLight.media = 'not all';

		themeLight.media = 'not all';
		themeDark.media = 'all';

		switcher.classList.remove('theme-switcher--light');
		switcher.classList.add('theme-switcher--dark');

		document.documentElement.classList.add('page--dark');
		document.documentElement.classList.remove('page--light');
	} else {
		localStorage.setItem('color-scheme', 'light');
		metaLight.media = 'all';
		metaDark.media = 'not all';

		themeDark.media = 'not all';
		themeLight.media = 'all';

		switcher.classList.remove('theme-switcher--dark');
		switcher.classList.add('theme-switcher--light');

		document.documentElement.classList.add('page--light');
		document.documentElement.classList.remove('page--dark');
	}
};

export const changeTheme = () => {
	document.addEventListener('DOMContentLoaded', onThemeRender);
	switcher.addEventListener('click', onThemeClick);
};
