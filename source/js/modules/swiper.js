import Swiper, { Navigation, EffectFade } from 'swiper';

const homeTeam = document.querySelector('.home-team');

const createHomeTeamSwiper = () => {
	if (homeTeam) {
		const swiper = homeTeam.querySelector('.swiper');
		const next = homeTeam.querySelector('.team-slider__button--next');
		const prev = homeTeam.querySelector('.team-slider__button--prev');

		new Swiper(swiper, {
			modules: [Navigation, EffectFade],
			slidesPerColumn: 1,
			effect: 'fade',
			loop: true,
			navigation: {
				nextEl: next,
				prevEl: prev,
			},
		});
	}
};

export const createSwiper = () => {
	createHomeTeamSwiper();
};
