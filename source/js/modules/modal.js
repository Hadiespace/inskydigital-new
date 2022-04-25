import {
	isEscEvent,
	enablePageInert,
	disablePageInert,
	enableHeaderInert,
	disableHeaderInert,
	hideScroll,
	showScroll,
} from './util.js';

const header = document.querySelector('.header');
const modal = document.querySelector('.modal');
const modalClose = modal.querySelector('.modal__close');
const modalContent = modal.querySelectorAll('.modal__content');

let isOpen = false;

modalContent.forEach((content) => (content.inert = true));

const openModal = () => {
	if (!isOpen) {
		modal.classList.add('modal--opened');
		modal.inert = false;
		isOpen = true;

		document.addEventListener('keydown', onModalCloseKeyDown);

		if (header.classList.contains('header--menu-opened')
			&& document.body.clientWidth < 1200) {
			disableHeaderInert();
			enablePageInert();
		} else {
			hideScroll();
		}

		enablePageInert();
	}
};

const closeModalContent = () => {
	const modalContentNodes = modal.querySelectorAll('.modal__content--opened');

	modalContentNodes.forEach((content) => {
		const form = content.querySelector('.form');
		const fields = content.querySelectorAll('.field');

		content.classList.remove('modal__content--opened');
		content.inert = true;

		if (form) {
			if (form.classList.contains('form--files')) {
				const inputs = form.querySelectorAll('.field--file');
				const files = form.querySelector('.modal-advisory__files');

				if (inputs) {
					inputs.forEach((input) => input.classList.remove('field--file'));
					files.innerHTML = '';
				}
			}

			fields.forEach((field) => field.classList.remove('field--error'));
			form.reset();
		}
	});
};

const closeModal = () => {
	modal.classList.remove('modal--opened');
	modal.inert = true;
	isOpen = false;

	document.removeEventListener('keydown', onModalCloseKeyDown);

	disablePageInert();
	closeModalContent();

	if (header.classList.contains('header--menu-opened')
		&& document.body.clientWidth < 1200) {
		enableHeaderInert();
	} else {
		showScroll();
	}
};

const openModalContent = (content) => {
	const modalContentElement = modal.querySelector(`.modal-${content}`);
	modalContentElement.classList.add('modal__content--opened');
	modalContentElement.inert = false;
};

export const openModalSuccess = () => {
	const modalSuccess = modal.querySelector('.modal-success');

	closeModalContent();

	setTimeout(() => {
		modalSuccess.classList.add('modal__content--opened');
		modalSuccess.inert = false;
	}, 300);
};

const onModalOpenClick = (evt) => {
	if (evt.target.classList.contains('recall-open')) {
		openModal();
		openModalContent('recall');
	}

	if (evt.target.classList.contains('advisory-open')) {
		openModal();
		openModalContent('advisory');
	}
};

const onModalCloseClick = (evt) => {
	evt.preventDefault();
	closeModal();
};

function onModalCloseKeyDown(evt) {
	if (isEscEvent(evt)) {
		closeModal();
	}
}

export const toggleModal = () => {
	document.addEventListener('click', onModalOpenClick);
	modalClose.addEventListener('click', onModalCloseClick);
};
