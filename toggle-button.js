class ToggleButton extends HTMLElement {
	
	static {
		
		this.$observedAttributes = Symbol('ToggleButton.observedAttributes'),
		this.$construct = Symbol('ToggleButton.construct'),
		this.$changed = Symbol('ToggleButton.changed'),
		this.$resized = Symbol('ToggleButton.resized'),
		this.$links = Symbol('ToggleButton.links'),
		this.$ready = Symbol('ToggleButton.ready'),
		this.$trigger = Symbol('ToggleButton.trigger'),
		this.$id = Symbol('ToggleButton.id'),
		this.$mutated = Symbol('ToggleButton.mutated'),
		
		this.tagName = 'toggle-button',
		
		this[this.$trigger] = 'change',
		
		this[this.$id] = 'toggle',
		this[this.$mutated] = 'data-toggle-button-mutated',
		
		this[this.$changed] = function ({ isTrusted, target: detail }) {
			
			const { constructor } = this, { $mutated } = constructor;
			
			this.label.toggleAttribute(constructor[$mutated], false),
			
			this.activated = detail.checked,
			
			this.dispatchEvent(new CustomEvent('toggled', { detail: { isTrusted, detail } }));
			
		},
		this[this.$construct] = function () {
			
			const	{ constructor: { $id } } = this,
					checkbox = document.createElement('input'),
					label = document.createElement('label'),
					content = document.createElement('slot'),
					id = ToggleButton[$id];
			
			checkbox.type = 'checkbox',
			checkbox.hidden = true,
			checkbox.id = label.htmlFor = content.name = id,
			
			label.appendChild(content),
			
			this.shadowRoot.append(checkbox, label);
			
		},
		this[this.$ready] = function (rs) {
			
			document.readyState === 'loading' ? addEventListener('DOMContentLoaded', rs, { once: true }) : rs();
			
		},
		this[this.$resized] = function () {
			
			const	{ height, width } = this.getBoundingClientRect(),
					{ constructor } = this, { $mutated } = constructor;
			
			this.label.toggleAttribute(constructor[$mutated], true),
			
			this.label.style.setProperty('--height', height + 'px'),
			this.label.style.setProperty('--width', width + 'px');
			
		},
		
		this[this.$observedAttributes] = [ 'activated', 'disabled', 'toggle-css' ];
		
	}
	static get observedAttributes() {
		
		return ToggleButton[ToggleButton.$observedAttributes];
		
	}
	
	constructor() {
		
		super();
		
		const { $changed, $construct, $id, $links, $ready, $resized } = ToggleButton;
		
		this[$changed] = ToggleButton[$changed].bind(this),
		
		this.attachShadow({ mode: 'open' }),
		
		ToggleButton[$construct].call(this);
		
		const checkbox = this.checkbox = this.shadowRoot.querySelector(`input#${ToggleButton[$id]}[type="checkbox"]`),
				label = this.label = this.shadowRoot.querySelector(`input#${ToggleButton[$id]}[type="checkbox"] + label`);
		
		if (!checkbox || !label) throw new Error();
		
		this[$links] = [],
		
		this.initialized = new Promise(ToggleButton[$ready]),
		
		(this.resizeObserver = new ResizeObserver(this.resized = ToggleButton[$resized].bind(this))).observe(this);
		
	}
	connectedCallback() {
		
		const { constructor } = this, { $changed, $mutated, $trigger } = constructor;
		
		this.label.toggleAttribute(constructor[$mutated], true),
		
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
	
	get disabled() {
		
		return this.hasAttribute('disabled');
		
	}
	set disabled(v) {
		
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