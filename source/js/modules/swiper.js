import Swiper, { Navigation, EffectFade } from 'swiper';

const homeTeam = document.querySelector('.home-team');
const caseAnother = document.querySelector('.case-another');

const createHomeTeamSwiper = () => {
	if (homeTeam) {
		const swiper = homeTeam.querySelector('.swiper');
		const next = homeTeam.querySelector('.team-slider__button--next');
		const prev = homeTeam.querySelector('.team-slider__button--prev');

		new Swiper(swiper, {
			modules: [Navigation, EffectFade],
			slidesPerColumn: 1,
			speed: 300,
			effect: 'fade',
			loop: true,
			navigation: {
				nextEl: next,
				prevEl: prev,
			},
		});
	}
};

const createCaseAnotherSwiper = () => {
	if (caseAnother) {
		const swiper = caseAnother.querySelector('.swiper');
		const next = caseAnother.querySelector('.case-another__button--next');
		const prev = caseAnother.querySelector('.case-another__button--prev');

		new Swiper(swiper, {
			modules: [Navigation],
			slidesPerColumn: 'auto',
			speed: 300,
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
	createCaseAnotherSwiper();
};
