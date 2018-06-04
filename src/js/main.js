svg4everybody();

// @include('detect.js')
// @include('globals.js')


class DinamicBase{
	addListener(selector, event, fn){
		const elem = document.querySelectorAll(selector);
		elem.forEach((obj)=>{
			obj.addEventListener(event, fn);
		});
	}
	toggleClass(props){
		props.forEach((item)=>{
			let elem = document.querySelectorAll(item.elem);
			elem.forEach((obj)=>{
				obj.classList.toggle(item.className);
			});
		});
				
	}
	checkingResize(bodyWidth, className){
		const actualWidth = window.screen.width;
		if(bodyWidth > window.screen.width){
			const elem = document.querySelector(this);
			if(elem.classList.contains(className)){
				elem.classList.remove(className);
			}
		}
	}

	truncatedPost(selector){
		const elems = document.querySelectorAll(selector);

		elems.forEach((item)=>{

			let trancateValue = item.dataset.trancate;
			if(trancateValue&&(item.textContent.length > trancateValue)){
				item.textContent = item.textContent.slice(0, trancateValue-3);
				item.textContent += '...';
			} 
		});
	}
} 

const _init = {
	_initialize(){
		const config = new DinamicBase;

		config.addListener('#hamburger', 'click', config.toggleClass.bind(null, [{elem: '#hamburger', className: 'is-active'}]));
		config.addListener('#hamburger', 'click', config.toggleClass.bind(null, [{elem: '#mobile-triger', className: 'menu-opened'},{elem: '.header_mobile_menu', className: 'opened'}]));
		window.addEventListener('resize', config.checkingResize.bind('#mobile-triger', 992, 'menu-opened'));
		window.addEventListener('resize', config.checkingResize.bind('#hamburger', 992, 'is-active'));
		config.truncatedPost('.gallery__truncated-post');
		config.truncatedPost('.article__title');
		config.truncatedPost('.articles__title');

		_init._searchInit();
		//config.addListener('.header_menu__search', 'click', config.toggleClass.bind(null, [{elem: '.header_menu__search', className: 'is-active'}]));
	}, 
	_searchInit(){
		const searchLinks = document.querySelectorAll('.search-target');

		searchLinks.forEach((elem)=>{
			elem.addEventListener('click', ()=>{
				elem.querySelector('.header_menu__search').classList.add('opened');
				elem.querySelector('.header_menu__searchform').classList.add('opened');
				
			});
		});

		/*const closeBTNs = document.querySelectorAll('.searchform__close');

		closeBTNs.forEach((elem)=>{
			elem.addEventListener('click', ()=>{
				elem.parentNode.classList.remove('opened');
				elem.parentNode.parentNode.querySelector('.header_menu__search').classList.toggle('opened');
			});
		});*/

	}
}
window.addEventListener('load', _init._initialize);