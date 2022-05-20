const notFound = document.querySelector('.page');
const notFoundBackground = notFound.querySelector('.not-found__background');

export const createParallaxEffect = () => {
	if (notFoundBackground) {
		let positionX = 0;
		let positionY = 0;
		let coordXprocent = 0;
		let coordYprocent = 0;

		const setMouseParallaxStyle = () => {
			const distX = coordXprocent - positionX;
			const distY = coordYprocent - positionY;

			positionX = positionX + (distX * 0.05);
			positionY = positionY + (distY * 0.05);

			notFoundBackground.style.cssText = `transform: translate(${positionX / 20}%, ${positionY / 20}%)`;

			requestAnimationFrame(setMouseParallaxStyle);
		};

		setMouseParallaxStyle();

		notFound.addEventListener('mousemove', (evt) => {
			const parallaxWidth = notFoundBackground.offsetWidth;
			const parallaxHeight = notFoundBackground.offsetHeight;

			const coordX = evt.pageX - parallaxWidth / 2;
			const coordY = evt.pageY - parallaxHeight / 2;

			coordXprocent = coordX / parallaxWidth * 100;
			coordYprocent = coordY / parallaxHeight * 100;
		});
	}
};
