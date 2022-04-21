const fieldWrap = document.querySelector('.modal-advisory__inputs-wrap');
const fieldInputs = fieldWrap.querySelectorAll('input');
const fieldFiles = document.querySelector('.modal-advisory__files');

const cleanFormFile = (evt) => {
	if (evt.target.closest('.file__close')) {
		evt.preventDefault();
		const inputHref = evt.target.getAttribute('aria-controls');
		const inputFile = document.getElementsByName(inputHref)[0];
		inputFile.value = '';
		inputFile.parentElement.classList.remove('field--hidden');
		evt.target.parentElement.remove();
	}
};

export const createFieldFiles = () => {
	if (fieldInputs) {
		for (let index = 0; index < fieldInputs.length; index++) {
			const input = fieldInputs[index];

			input.addEventListener('change', () => {
				const fileWrap = document.createElement('div');
				fileWrap.className = 'file';
				fileWrap.innerHTML = `
					<span class="file__text">${input.files[0].name}</span>
					<button class="file__close" type="button" aria-controls="${input.getAttribute('name')}">
						<span class="visually-hidden>Отменить отправку файла</span>
					</button>
				`;

				input.parentElement.classList.add('field--hidden');
				fieldFiles.appendChild(fileWrap);
			});
		}

		document.addEventListener('click', cleanFormFile);
	}
};
