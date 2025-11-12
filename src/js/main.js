//Открыть/закрыть попап основного меню
if(document.querySelector('.js-btn-services')){
	document.querySelector('.js-btn-services').addEventListener('click', function(){
		this.classList.toggle('active');
		document.querySelector('.js-main-menu-popup').classList.toggle('open');
		document.querySelector('.js-body').classList.toggle('no-scroll');
	})
}
