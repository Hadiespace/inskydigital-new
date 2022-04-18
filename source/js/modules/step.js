const onStepClick = (evt) => {
	if (evt.target.closest('.home-process__toggle')) {
		evt.target.parentElement.classList.toggle('home-process__step--active');
	}
};

export const toggleStep = () => document.addEventListener('click', onStepClick);
