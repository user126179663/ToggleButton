class ToggleButton extends HTMLElement {
	
	static {
		
		this.$observedAttributes = Symbol('ToggleButton.observedAttributes'),
		this.$construct = Symbol('ToggleButton.construct'),
		this.$changed = Symbol('ToggleButton.changed'),
		this.$links = Symbol('ToggleButton.links'),
		this.$ready = Symbol('ToggleButton.ready'),
		this.$trigger = Symbol('ToggleButton.trigger'),
		
		this.tagName = 'toggle-button',
		
		this[this.$trigger] = 'change',
		
		this[this.$changed] = function ({ target: detail }) {
			
			this.dispatchEvent(new CustomEvent('toggled', { detail }));
			
		},
		this[this.$construct] = function () {
			
			const	checkbox = document.createElement('input'),
					label = document.createElement('label');
			
			checkbox.type = 'checkbox',
			checkbox.id = 'toggle',
			checkbox.hidden = true,
			
			label.htmlFor = 'toggle',
			
			this.shadowRoot.append(checkbox, label);
			
		},
		this[this.$ready] = function (rs) {
			
			document.readyState === 'loading' ? addEventListener('DOMContentLoaded', rs, { once: true }) : rs();
			
		},
		
		this[this.$observedAttributes] = [ 'activated', 'disabled', 'toggle-css' ];
		
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
		
		this[$links] = [],
		
		this.initialized = new Promise(ToggleButton[$ready]);
		
	}
	connectedCallback() {
		
		const { $changed, $trigger } = ToggleButton;
		
		this.checkbox.addEventListener(ToggleButton[$trigger], this[$changed]);
		
	}
	disconnectedCallback() {
		
		const { $changed, $trigger } = ToggleButton;
		
		this.checkbox.removeEventListener(ToggleButton[$trigger], this[$changed]);
		
	}
	attributeChangedCallback(name, last, current) {
		
		switch (name) {
			
			case 'activated':
			last ?? (this.activated = true), this.checkbox.checked = this.hasAttribute('activated');
			break;
			
			case 'disabled':
			this.checkbox.toggleAttribute('disabled', this.hasAttribute('disabled'));
			break;
			
			case 'toggle-css':
			this.initialized.then(() => this.updateShadowCSS());
			break;
			
		}
		
	}
	
	updateShadowCSS() {
		
		const { $links: $ } = ToggleButton, { toggleCSS: links, shadowRoot } = this, $links = this[$];
		let i,l,i0, link;
		
		i = -1, l = $links.length;
		while (++i < l) $links[i].remove();
		
		i = i0 = -1, l = links.length, $links.length = 0;
		while (++i < l) (link = links[i]) instanceof HTMLLinkElement && link.rel === 'stylesheet' &&
			($links[++i0] = link.cloneNode()).removeAttribute('disabled');
		
		shadowRoot.prepend(...$links);
		
	}
	
	get activated() {
		
		return this.checkbox.checked;
		
	}
	set activated(v) {
		
		this.toggleAttribute('activated', !!v);
		
	}
	
	get disables() {
		
		return this.hasAttribute('disabled');
		
	}
	set disables(v) {
		
		this.toggleAttribute('disabled', !!v);
		
	}
	
	get toggleCSS() {
		
		return document.querySelectorAll(this.getAttribute('toggle-css'));
		
	}
	set toggleCSS(v) {
		
		this.setAttribute('toggle-css', v);
		
	}
	
}
customElements.define(ToggleButton.tagName, ToggleButton);