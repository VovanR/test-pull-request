export default class CookieConsent {
	constructor() {
		this.selectorsConfirm = '.cookie-consent__got-it, .cookie-consent__got-it--mobile';
		this.selectorsConsent = '.cookie-consent, .cookie-consent--mobile';
		this.cookieConfirmName = 'cookieConsentConfirm';
		this.consentHideClass = 'cookie-consent--hidden';
		this.consents = document.querySelectorAll(this.selectorsConsent);
		this.confirms = document.querySelectorAll(this.selectorsConfirm);
	}

	_popupOpen() {
		if (document.cookie.indexOf(this.cookieConfirmName + '=true') !== -1)
			return false;

		for(let i=0; i<this.consents.length; i++){
			this.consents[i].classList.remove(this.consentHideClass);
		}

		for (let i=0; i<this.confirms.length; i++){
			this.confirms[i].addEventListener('click', () => {this._popupClose();});
		}
	}

	_popupClose() {
		const oneYear = 365*24*60*60*1000;
		let date = new Date(new Date().getTime() + oneYear);
		document.cookie = `${this.cookieConfirmName}=true; path=/; expires=${date.toUTCString()}`;

		for (let i=0; i<this.consents.length; i++) {
			this.consents[i].classList.add(this.consentHideClass);
		}
	}

	init(){
		this._popupOpen();
	}
}
