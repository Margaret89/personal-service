//Inputmask
import Inputmask from "inputmask";

//Choices
import  Choices from 'choices.js/public/assets/scripts/choices.js';
import 'choices.js/public/assets/styles/choices.min.css';

//Swiper
import Swiper from 'swiper';
import { Navigation, Pagination, Thumbs } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';

//Fancybox
import { Fancybox } from "@fancyapps/ui";
import "@fancyapps/ui/dist/fancybox/fancybox.css";
window.Fancybox = Fancybox;// Делаем Fancybox глобально доступным
Fancybox.bind("[data-fancybox]", {
	on: {
		done: (fancybox, slide) => {
			if(document.querySelector('.popup-window')){
				document.querySelector('.popup-window').classList.remove('hide');
			}
		},
		close: (fancybox, slide) => {
			if(document.querySelector('.popup-window')){
				document.querySelector('.popup-window').classList.add('hide');
			}
		}
	}
});

//Открыть/закрыть попап основного меню
if(document.querySelector('.js-btn-services')){
	document.querySelector('.js-btn-services').addEventListener('click', function(){
		this.classList.toggle('active');
		document.querySelector('.js-main-menu-popup').classList.toggle('open');
		document.querySelector('.js-body').classList.toggle('no-scroll');
	})
}

// Маска для телефона
document.addEventListener("DOMContentLoaded", function(){
	if(document.querySelector('.js-phone')){
		Inputmask('+7 (999) 999-9999').mask('.js-phone');
	}
});

// Раскрывающийся блок
document.querySelectorAll('.js-unwrap-block').forEach((accSection) => {
	const accHeader = accSection.querySelector('.js-unwrap-head ');
	const accBody = accSection.querySelector('.js-unwrap-content');
	const accContent = accSection.querySelector('.js-unwrap-info');
	
	accHeader.addEventListener('click', () => {
		accSection.classList.toggle("opened");
		
		if ( accSection.classList.contains("opened") ) {
			accBody.style.maxHeight = `${accContent.clientHeight}px`;
		} else {
			accBody.style.maxHeight = "0px";
		}
	});

	accSection.querySelectorAll('.js-unwrap-block-close').forEach((btnClose) => {
		btnClose.addEventListener('click', () => {
			accSection.classList.remove("opened");
			accBody.style.maxHeight = "0px";
		});
	});
});

//Кастомный селект
if(document.querySelector('.js-select')){
	document.querySelectorAll(".js-select").forEach(function(select){
		const choices = new Choices(select, {
			searchEnabled: false,
			removeItemButton: false,
			shouldSort: false,
		});
	});
}

// Слайдер проектов
if(document.querySelector('.js-projects-slider')){
	const topSlider = new Swiper('.js-projects-slider',
	{
		modules: [Navigation],
		slidesPerView: 1,
		spaceBetween: 6,
		navigation: {
			nextEl: '.js-projects-slider-next',
			prevEl: '.js-projects-slider-prev',
		},
		breakpoints: {
			992: {
				slidesPerView: 2.6,
				spaceBetween: 16,
			},
			768: {
				slidesPerView: 2.1,
				spaceBetween: 16,
			},
		},
	});
}

//Анимация для шагов
document.querySelectorAll('.js-steps-item').forEach((el, i) => {
	el.style.animationDelay = i * 1 + 's';
});

//Перемещение мобильного меню
if(document.querySelector('.js-mobile-menu-arr')){
	document.querySelectorAll(".js-mobile-menu-arr").forEach(function(arrow){
		arrow.addEventListener('click', function(){
			var level = arrow.getAttribute('data-level');
			var indentMenu = 100 * Number(level) * -1;
			document.querySelector('.js-mobile-menu').style.transform = 'translateX('+indentMenu+'vw)';
			arrow.parentElement.querySelector('.js-mobile-menu-sub').classList.add('active');
		})
	});

	document.querySelectorAll(".js-mobile-menu-back").forEach(function(arrow){
		arrow.addEventListener('click', function(){
			var level = arrow.getAttribute('data-level');
			var indentMenu = 100 * Number(level) * -1;
			document.querySelector('.js-mobile-menu').style.transform = 'translateX('+indentMenu+'vw)';
			arrow.closest('.js-mobile-menu-sub').classList.remove('active');
		})
	});
}

//Открыть мобильное меню
if(document.querySelector('.js-mobile-menu-open')){
	document.querySelector(".js-mobile-menu-open").addEventListener('click', function(){
		document.querySelector(".js-header-mobile-popup").classList.add('open');
		document.querySelector('.js-body').classList.add('no-scroll');
		document.querySelector('.js-header-mobile').classList.add('open');
	})
}

//Закрыть мобильное меню
if(document.querySelector('.js-mobile-menu-close')){
	document.querySelector(".js-mobile-menu-close").addEventListener('click', function(){
		document.querySelector(".js-header-mobile-popup").classList.remove('open');
		document.querySelector('.js-body').classList.remove('no-scroll');
		document.querySelector('.js-header-mobile').classList.remove('open');
	})
}

// Валидация форм

//Функция добавления ошибки
var generateError = function (text) {
	var error = document.createElement('div')
	error.className = 'error-msg'
	error.innerHTML = text
	return error
}

document.querySelectorAll(".js-btn-submit").forEach(function(btn){
	btn.onclick = function(e){
		

		var form =  e.target.closest('form');
		var patternEmail = /^([a-z0-9_\.-])+@[a-z0-9-]+\.([a-z]{2,6}\.)?[a-z]{2,6}$/i;

		//Очистка ошибок
		form.querySelectorAll('.error').forEach(function(err){
			if(err.querySelector('.error-msg')){
				err.querySelector('.error-msg').remove();
			}
			err.querySelector('input').setAttribute('placeholder', '');
			err.classList.remove('error');
		});
	
		//Проверка полей на пустоту
		form.querySelectorAll('.js-form-site-item input').forEach(function(field){
			//Проверка email
			if(field.type == 'email'){
				if (!patternEmail.test(field.value)) {
					// var errorMsg =  generateError('Укажите корректный E-mail');
					field.parentElement.classList.add('error');
					// field.parentElement.append(errorMsg);
				}
			}else{
				//Проверка всех полей
				if (field.value === '' &&  field.hasAttribute('required')) {
					// var errorMsg = generateError('Заполните поле');
					field.parentElement.classList.add('error');
					// field.parentElement.append(errorMsg);
				}
			}
		});

		//Проверка textarea на пустоту
		form.querySelectorAll('.js-form-site-item textarea').forEach(function(field){
			//Проверка всех полей
			if (field.value === '' &&  field.hasAttribute('required')) {
				// var errorMsg = generateError('Заполните поле');
				field.parentElement.classList.add('error');
				// field.parentElement.append(errorMsg);
			}
		});

		//Проверка checkbox на checked
		form.querySelectorAll('.js-form-site-check input').forEach(function(field){
			if(!field.checked && field.hasAttribute('required')){
				// var errorMsg = generateError('Заполните поле');
				field.closest('.js-form-site-check').classList.add('error');
				// field.parentElement.append(errorMsg);
			}
		});

		// var idRecaptcha = btn.closest('form').querySelector('.g-recaptcha').getAttribute('data-widget');

		// console.log('idRecaptcha = ', idRecaptcha);
		// var response = grecaptcha.getResponse(idRecaptcha);
		// var captcha = btn.closest('form').querySelector('.js-form-site-captcha');

		// if(response.length == 0) {
		// 	var errorMsg = generateError('Пройдите проверку');
		// 	captcha.classList.add('error');
		// 	captcha.append(errorMsg);
		// }

		if(form.querySelectorAll('.error').length === 0){
			form.reset();
			Fancybox.close();
			Fancybox.show([{ src: "#msg-success", type: "inline" }]);
			
			// let url = form.getAttribute('action');
			// const formData=new FormData(form);
			// formData.append('web_form_submit', 'Отправить');

			// sendForm(url, formData, function(){
			// 	form.reset();
			// });

		}else{
			e.preventDefault();
		}
	};
});

var successTitle = document.querySelector('.js-success-alert-title').innerHTML;
var successText = document.querySelector('.js-success-alert-text').innerHTML;

document.addEventListener('openSuccessPopupForm',function(e){
	let curSuccessTitle = e.target.activeElement.closest('.js-form-site').getAttribute('data-title');
	let curSsuccessText = e.target.activeElement.closest('.js-form-site').getAttribute('data-text');

	if(curSuccessTitle){
		document.querySelector('.js-success-alert-title').innerHTML = curSuccessTitle;
	}else{
		document.querySelector('.js-success-alert-title').innerHTML = successTitle;
	}

	if(curSsuccessText){
		document.querySelector('.js-success-alert-text').innerHTML = curSsuccessText;
	}else{
		document.querySelector('.js-success-alert-text').innerHTML = successText;
	}

	Fancybox.close();
	Fancybox.show([{ src: "#msg-success", type: "inline" }]);
});