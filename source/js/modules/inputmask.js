import Inputmask from 'inputmask';

const phones = document.querySelectorAll('input[type="tel"]');

export const initPhoneMask = () => Inputmask.default(
	{ 'mask': '+7 (999) 999-99-99', 'clearIncomplete': false }
).mask(phones);
