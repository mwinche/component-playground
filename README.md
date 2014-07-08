Web Component Playground
========================

Web Components are awesome and amazing. This repo explores some basic usage of the core portions of the web component standard.

1. The `template` tag
2. Custom Elements
3. Shadow DOM
4. HTML Imports

This README will explain each of these portions of the standard and with each tag in the repo.

You can serve this up using any HTTP server, but your browser will have to support Web Components for it to work (Chrome Beta or Canary at time of writing).

For this tag: Shadow DOM!

The first thing to note about Shadow DOM, it effectively moves your content into its own document. That means styles defined in an outside document no longer apply. We fix this by extracting relevant styling to `person.css` and bring it in using a CSS import.

index.html: 26 - 28

	<style>
		@import url("person.css");
	</style>

But that just deals with the effects Shadow DOM has, how did we implement it in the first place? It is actually very simple. Every element has a new method `createShadowRoot`. Just call it and it will create Shadow DOM for that element. Note that this can be used on any element. Not just custom elements or stuff from a template. Which highlights one of the awesome things about the Web Component standard: all of these pieces can be used independent of each other! That said, they work extremely well together (and obviously were designed to be used that way).

app.js: 31 - 37

	createdCallback: function(){
		this.createShadowRoot().appendChild(personTmpl.content.cloneNode(true));

		this.updateValue('name', this.getAttribute('name'));
		this.updateValue('age', this.getAttribute('age'));
		this.updateValue('gender', this.getAttribute('gender'));
	},

app.js 43 - 47

	updateValue: function(key, value){
		if(ATTRS.indexOf(key) > -1 && this.shadowRoot.querySelector('.' + key)){
			this.shadowRoot.querySelector('.' + key).innerText = value;
		}
	}

I put the entire methods in for context sake, but the only changes here was a call to `createShadowRoot` and utilizing the  `shadowRoot` property on the element to access its encapsulated elements.
