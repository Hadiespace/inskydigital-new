const cookies = document.querySelector('.cookies');
const cookiesButton = cookies.querySelector('.cookies__close');

export const closeCookies = () => {
	cookiesButton.addEventListener('click', () => {
		cookies.classList.add('cookies--hidden');
	});
};
