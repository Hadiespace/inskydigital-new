const onNameDigits = (evt) => {
	if ('1234567890'.indexOf(evt.key) !== -1) {
		evt.preventDefault();
	}
};

const onPhoneDigits = (evt) => {
	if (evt.keyCode === 46 ||
		evt.keyCode === 8 ||
		evt.keyCode === 9 ||
		evt.keyCode === 27 ||
		// Разрешаем: Ctrl+A
		(evt.keyCode === 189 && evt.shiftKey === false) ||
		(evt.keyCode === 187 && evt.shiftKey === true) ||
		(evt.keyCode === 67 && evt.ctrlKey === true) ||
		(evt.keyCode === 65 && evt.ctrlKey === true) ||
		// Разрешаем: home, end, влево, вправо
		(evt.keyCode >= 35 && evt.keyCode <= 39) ||
		(evt.keyCode === 86 && evt.ctrlKey === true)) {
		// Ничего не делаем
	} else {
		// Запрещаем все, кроме цифр на основной клавиатуре, а так же Num-клавиатуре
		if ((evt.keyCode < 48 || evt.keyCode > 57) && (evt.keyCode < 96 || evt.keyCode > 105)) {
			evt.preventDefault();
		}
	}
};

const nameInputs = document.querySelectorAll('input[name="name"]');
const phoneInputs = document.querySelectorAll('input[name="phone"]');

if (nameInputs) {
	nameInputs.forEach((input) => {
		input.addEventListener('keydown', onNameDigits);
	});
}

if (phoneInputs) {
	phoneInputs.forEach((input) => {
		input.addEventListener('keydown', onPhoneDigits);
	});
}

const addError = (input) => {
	input.parentElement.classList.add('field--error');
};

const removeError = (input) => {
	input.parentElement.classList.remove('field--error');
};

const emailText = (input) => !/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,8})+$/.test(input.value);

const phoneText = (input) => /^[A-Za-zА-Яа-яЁё]/g.test(input.value);

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
				errorText.textContent = 'Name cannot contain numbers';
				addError(input);
				error++;
			} else if (input.value.trim() === '') {
				errorText.textContent = 'This field is required';
				addError(input);
				error++;
			}
		} else if (input.classList.contains('validate-phone')) {
			const errorText = input.parentElement.querySelector('.field__error');
			if (/[_]/.test(input.value)) {
				errorText.textContent = 'Wrong format';
				addError(input);
				error++;
			} else if (phoneText(input)) {
				errorText.textContent = 'This field is required';
				addError(input);
				error++;
			} else if (input.value.trim() === '') {
				errorText.textContent = 'This field is required';
				addError(input);
				error++;
			}
		} else if (input.classList.contains('validate-email')) {
			const errorText = input.parentElement.querySelector('.field__error');
			if (input.value.trim() === '') {
				errorText.textContent = 'This field is required';
				addError(input);
				error++;
			} else if (emailText(input)) {
				errorText.textContent = 'Wrong format';
				addError(input);
				error++;
			}
		} else if (input.getAttribute('type') === 'checkbox' && !input.checked) {
			const errorText = input.parentElement.querySelector('.field__error');
			addError(input);
			errorText.textContent = 'This field is required';
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
