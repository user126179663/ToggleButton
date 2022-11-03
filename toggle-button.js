class ToggleButton extends HTMLElement {
	
	static {
		
		this.$observedAttributes = Symbol('ToggleButton.observedAttributes'),
		this.$construct = Symbol('ToggleButton.construct'),
		this.$changed = Symbol('ToggleButton.changed'),
		this.$links = Symbol('ToggleButton.links'),
		this.$ready = Symbol('ToggleButton.ready'),
		
		this.tagName = 'toggle-button',
		
		this[this.$changed] = function({ target: detail }) {
			
			this.dispatchEvent(new CustomEvent('toggled', { detail }));
			
		},
		this[this.$construct] = function() {
			
			const	root = document.createElement('div'),
					checkbox = document.createElement('input'),
					label = document.createElement('label');
			
			root.id = 'root',
			root.classList.add('slider'),
			
			checkbox.type = 'checkbox',
			checkbox.id = 'toggle',
			
			label.htmlFor = 'toggle',
			
			root.append(checkbox, label),
			
			this.shadowRoot.append(root);
			
		},
		this[this.$ready] = function (rs) {
			
			document.readyState === 'loading' ? addEventListener('DOMContentLoaded', rs, { once: true }) : rs();
			
		},
		
		this[this.$observedAttributes] = [ 'activates', 'disabled', 'shadow-css' ];
		
	}
	static get observedAttributes() {
		
		return ToggleButton[ToggleButton.$observedAttributes];
		
	}
	
	constructor() {
		
		super();
		
		const { $changed, $construct, $links, $ready } = ToggleButton;
		
		this[$changed] = ToggleButton[$changed].bind(this),
		
		this.attachShadow({ mode: 'open' }),
		
		this.constructor[$construct].call(this);
		
		const checkbox = this.checkbox = this.shadowRoot.querySelector('input#toggle[type="checkbox"]');
		
		if (!checkbox) throw new Error();
		
		checkbox.addEventListener('change', this[$changed]),
		
		this[$links] = [],
		
		this.initialized = new Promise(ToggleButton[$ready]);
		
	}
	attributeChangedCallback(name, last, current) {
		
		switch (name) {
			
			case 'activates':
			last ?? (this.activates = true), this.checkbox.checked = !!current;
			break;
			
			case 'disabled':
			this.checkbox.toggleAttribute('disabled', this.hasAttribute('disabled'));
			break;
			
			case 'shadow-css':
			this.initialized.then(() => this.updateShadowCSS());
			break;
			
		}
		
	}
	
	updateShadowCSS() {
		
		const { $links: $ } = ToggleButton, { shadowCSS: links, shadowRoot } = this, $links = this[$];
		let i,l,i0, link;
		
		i = -1, l = $links.length;
		while (++i < l) $links[i].remove();
		
		i = i0 = -1, l = links.length, $links.length = 0;
		while (++i < l) (link = links[i]) instanceof HTMLLinkElement && link.rel === 'stylesheet' &&
			($links[++i0] = link.cloneNode()).removeAttribute('disabled');
		
		shadowRoot.prepend(...$links);
		
	}
	
	get activates() {
		
		return this.checkbox.checked;
		
	}
	set activates(v) {
		
		this.toggleAttribute('activates', !!v);
		
	}
	
	get disabled() {
		
		return this.hasAttribute('disabled');
		
	}
	set disabled(v) {
		
		this.toggleAttribute('disabled', !!v);
		
	}
	
	get shadowCSS() {
		
		return document.querySelectorAll(this.getAttribute('shadow-css'));
		
	}
	set shadowCSS(v) {
		
		this.setAttribute('shadow-css', v);
		
	}
	
}
customElements.define(ToggleButton.tagName, ToggleButton);