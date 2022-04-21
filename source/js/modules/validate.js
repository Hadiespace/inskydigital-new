const onNameDigits = (evt) => {
	if ('1234567890'.indexOf(evt.key) !== -1) {
		evt.preventDefault();
	}
};

const nameInputs = document.querySelectorAll('input[name="name"]');
if (nameInputs) {
	nameInputs.forEach((input) => {
		input.addEventListener('keydown', onNameDigits);
	});
}

const addError = (input) => {
	input.parentElement.classList.add('field--error');
};

const removeError = (input) => {
	input.parentElement.classList.remove('field--error');
};

const emailText = (input) => !/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,8})+$/.test(input.value);

export const validateForm = (form) => {
	let error = 0;
	const requiredInputs = form.querySelectorAll('.required');

	requiredInputs.forEach((input) => {
		removeError(input);

		input.addEventListener('input', () => {
			removeError(input);
		});

		if (input.classList.contains('validate-name')) {
			const errorText = input.parentElement.querySelector('.field__error');
			if (/[0-9]/.test(input.value)) {
				errorText.textContent = 'Имя не может содержать цифры';
				addError(input);
				error++;
			} else if (input.value.trim() === '') {
				errorText.textContent = 'Это поле обязательно к заполнению';
				addError(input);
				error++;
			}
		} else if (input.classList.contains('validate-phone')) {
			const errorText = input.parentElement.querySelector('.field__error');
			if (/[_]/.test(input.value)) {
				errorText.textContent = 'Неверный формат';
				addError(input);
				error++;
			} else if (input.value.trim() === '') {
				errorText.textContent = 'Это поле обязательно к заполнению';
				addError(input);
				error++;
			}
		} else if (input.classList.contains('validate-email')) {
			const errorText = input.parentElement.querySelector('.field__error');
			if (input.value.trim() === '') {
				errorText.textContent = 'Это поле обязательно к заполнению';
				addError(input);
				error++;
			} else if (emailText(input)) {
				errorText.textContent = 'Некорректный e-mail';
				addError(input);
				error++;
			}
		} else if (input.getAttribute('type') === 'checkbox' && !input.checked) {
			const errorText = input.parentElement.querySelector('.field__error');
			addError(input);
			errorText.textContent = 'Это поле обязательно';
			error++;
		} else {
			if (input.value.trim() === '') {
				addError(input);
				error++;
			}
		}
	});
	return error;
};
