import 'wicg-inert';
import 'what-input';
import { changeTheme } from './modules/theme-switcher.js';
import { toggleStep } from './modules/step.js';
import { createSwiper } from './modules/swiper.js';
import { unfocusButton } from './modules/button.js';
import { toggleTabFilter } from './modules/tab-filter.js';
import { openMenu } from './modules/menu.js';
import { createFieldFiles } from './modules/field-files.js';
import { sendForm } from './modules/send.js';
import { toggleModal } from './modules/modal.js';
import { initScroll } from './modules/scroll.js';
import { changeVH } from './modules/vh.js';
import { createHeaderGradient } from './modules/header.js';

changeVH();
createHeaderGradient();
changeTheme();
initScroll();
toggleStep();
createSwiper();
unfocusButton();
toggleTabFilter();
openMenu();
createFieldFiles();
sendForm();
toggleModal();
