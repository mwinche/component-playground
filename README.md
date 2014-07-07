Web Component Playground
========================

Web Components are awesome and amazing. This repo explores some basic usage of the core portions of the web component standard.

1. The `template` tag
2. Custom Elements
3. Shadow DOM
4. HTML Imports

This README will explain each of these portions of the standard and with each tag in the repo.

You can serve this up using any HTTP server, but your browser will have to support Web Components for it to work (Chrome Beta or Canary at time of writing).

For this tag: Custom elements!

The important changes here are entirely in app.js. We use `document.registerElement` to register a new element.

One of the best parts about this change is that we've seperated our concerns. Now the click handler only worries about creating the element with the right values (app.js: 50 - 59)

	//Click handler just creates a new at-person element
	lifeButton.addEventListener('click', function(){
		var ele = document.createElement('at-person');

		ele.setAttribute('name', name.value);
		ele.setAttribute('age', age.value);
		ele.setAttribute('gender', gender_male.checked ? gender_male.value : gender_female.checked ? gender_female.value : '');

		peopleList.insertBefore(ele, peopleList.firstChild);
	});
	
The custom element now only worries about laying out with the data that we have in the attributes. It does't care about the form that it came from.

In order to make this work we have to setup the element's prototype. Custom elements use traditional prototypal inheritance. You just pass what you want to be the prototype into `document.registerElement` as the `prototype` attribute on the second argument. HTMLElements have a few callbacks which it is useful to set when making a custom element. We'll set those on that prototype.

app.js: 29 - 48

	//Create custom at-person element
	customElement('at-person', {
		createdCallback: function(){
			this.appendChild(personTmpl.content.cloneNode(true));

			this.updateValue('name', this.getAttribute('name'));
			this.updateValue('age', this.getAttribute('age'));
			this.updateValue('gender', this.getAttribute('gender'));
		},

		attributeChangedCallback: function(attrName, oldVal, newVal){
			this.updateValue(attrName, newVal);
		},

		updateValue: function(key, value){
			if(ATTRS.indexOf(key) > -1 && this.querySelector('.' + key)){
				this.querySelector('.' + key).innerText = value;
			}
		}
	});
	
Note that we also exposed a new method for our element to allow programitic access of updating attributes, `updateValue`, which also make use of internally.
	
Also note the convenience function I wrote for creating custom elements. app.js: 16 - 26

	function customElement(elementName, overrides){
		var proto = Object.create(HTMLElement.prototype);

		for(var key in overrides){
			proto[key] = overrides[key];
		}

		return document.registerElement(elementName, {
			prototype: proto
		});
	}

This function does assume that you want to only extend `HTMLElement`, but it is sufficent for our purposes.
