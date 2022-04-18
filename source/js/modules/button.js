const onButtonMouseUp = (evt) => {
	if (evt.target.tagName === 'BUTTON') {
		evt.target.blur();
	}
};

export const unfocusButton = () => document.addEventListener('mouseup', onButtonMouseUp);
