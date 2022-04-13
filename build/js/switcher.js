document.addEventListener('DOMContentLoaded', () => {
	const currentPage = (window.location.pathname).replace('/', '');
	const pagesList = {
		'01. Главная': 'index.html',
	};

	const link = '' +
		'<div class="pages switcher">' +
		'\t<div class="pages-switcher switcher__container">' +
		'<div class="pages-switcher-btn icon-pages">' +
		'	<div id="pages-menu"><span></span></div>' +
		'</div>' +
		'<div class="pages-switcher-header">' +
		'	<div class="pages-switcher-heading">Ссылки на страницы</div>' +
		'</div>' +
		'<div class="pages-switcher-body">' +
		'	<ul class="pages-switcher-list no-style"></ul>' +
		'</div>' +
		'</div>' +
		'</div>' +
		'<style>' +
		'	html {' +
		'	height: 100%;' +
		'}' +
		'body {' +
		'margin: 0;' +
		'min-height: 100%;' +
		'height: auto;' +
		'}' +
		'.pages {' +
		'direction: ltr;' +
		'font-family: "Arila", sans-serif;' +
		'font-size: 16px;' +
		'line-height: 1;' +
		'}' +
		'.pages-switcher-btn {' +
		'top: 53px;' +
		'position: absolute;' +
		'background: #202020;' +
		'border-bottom-left-radius: 10px;' +
		'border-top-left-radius: 10px;' +
		'margin-left: -20px;' +
		'width: 48px;' +
		'height: 48px;' +
		'cursor: pointer;' +
		'}' +
		'.pages-switcher-heading {' +
		'font-size: 18px;' +
		'text-align: center;' +
		'padding: 20px 20px 15px;' +
		'background-color: #191919;' +
		'}' +
		'.pages-switcher-body {' +
		'height: calc(100vh - 53px);' +
		'overflow: auto;' +
		'}' +
		'.pages-switcher-list {' +
		'padding: 48px 0 0;' +
		'margin: 0;' +
		'list-style: none;' +
		'}' +
		'.pages-switcher-list li a {' +
		'padding: 12px 30px;' +
		'display: block;' +
		'line-height: 1;' +
		'}' +
		'.pages-switcher-list li a {' +
		'color: #fff;' +
		'-webkit-transition: .3s;' +
		'-o-transition: .3s;' +
		'transition: .3s;	' +
		'}' +
		'.pages-switcher-list li a:hover, .pages-switcher-list li.is-active a {' +
		'color: #7a7a7a;' +
		'background-color: #191919;' +
		'}' +
		'#pages-menu  {' +
		'margin-top: 11px;' +
		'margin-left: 6px;' +
		'width: 40px;' +
		'height: 40px;' +
		'position: relative;' +
		'}' +
		'.cross #pages-menu span {' +
		'background-color: transparent;' +
		'}' +
		'.cross #pages-menu span:before {' +
		'transform: rotate(45deg);' +
		'top: 0;' +
		'}' +
		'.cross #pages-menu span:after {' +
		'transform: rotate(-45deg);' +
		'bottom: 0;' +
		'}' +
		'#pages-menu span {' +
		'display: inline-block;' +
		'width: 30px;' +
		'margin-left: 4px;' +
		'top: 1px;' +
		'height: 3px;' +
		'background-color: #fff;' +
		'border-radius: 1px;' +
		'position: relative;' +
		'}' +
		'#pages-menu span:before {' +
		'content: "";' +
		'position: absolute;' +
		'left: 0;' +
		'right: 0;' +
		'height: 3px;' +
		'background-color: #fff;' +
		'border-radius: 1px;' +
		'top: -8px;' +
		'transition: .6s;' +
		'}' +
		'#pages-menu span:after {' +
		'content: "";' +
		'position: absolute;' +
		'left: 0;' +
		'right: 0;' +
		'height: 3px;' +
		'background-color: #fff;' +
		'border-radius: 1px;' +
		'bottom: -8px;' +
		'transition: .6s;' +
		'}' +
		'.pages-switcher {' +
		'right: 0;' +
		'top: 0;' +
		'color: #fff;' +
		'width: 280px;' +
		'display: block;' +
		'z-index: 555555;' +
		'position: fixed;' +
		'background: #202020;' +
		'border-radius: 0;' +
		'height: 100%;' +
		'-webkit-transform: translateX(100%);' +
		'transform: translateX(100%);' +
		'-webkit-transition: all .3s ease;' +
		'transition: all .6s ease;   ' +
		'}' +
		'.pages-visible {' +
		'-webkit-transform: translateX(0);' +
		'transform: translateX(0)' +
		'}' +
		'</style>' +
		'';
	document.body.insertAdjacentHTML('afterbegin', link);

	for (const elem in pagesList) {
		const li = document.createElement('li');
		const a = document.createElement('a');
		a.setAttribute('href', pagesList[elem]);
		a.textContent = elem;
		li.insertAdjacentElement('afterbegin', a);
		document.querySelector('.pages-switcher-list').insertAdjacentElement('beforeend', li);
	}

	document.querySelector('.pages-switcher-btn').addEventListener('click', function () {
		this.classList.toggle('cross');
		document.querySelector('.pages-switcher').classList.toggle('pages-visible');
	});
	const pageSwitcherList = document.querySelectorAll('.pages-switcher .pages-switcher-list a');
	if (window.NodeList && !NodeList.prototype.forEach) { // IE fix forEach
		NodeList.prototype.forEach = Array.prototype.forEach;
	}
	pageSwitcherList && pageSwitcherList.forEach((el) => {
		if (el.getAttribute('href') === currentPage) {
			el.parentElement.classList.add('is-active');
		}
	});
});
