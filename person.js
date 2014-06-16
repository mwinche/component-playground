(function($){
	"use strict";

	var ATTRS = ['name', 'age', 'gender'];

	var personTmpl = $('person');


	function customElement(elementName, overrides){
		return document.registerElement(elementName, {
			prototype: _.assign(Object.create(HTMLElement.prototype), overrides)
		});
	}

	customElement('at-person', {
		createdCallback: function(){
			this.createShadowRoot().appendChild(personTmpl.content.cloneNode(true));

			this.updateValue('name', this.getAttribute('name'));
			this.updateValue('age', this.getAttribute('age'));
			this.updateValue('gender', this.getAttribute('gender'));
		},

		attributeChangedCallback: function(attrName, oldVal, newVal){
			this.updateValue(attrName, newVal);
		},

		updateValue: function(key, value){
			if(ATTRS.indexOf(key) > -1 && this.shadowRoot && this.shadowRoot.querySelector('.' + key)){
				this.shadowRoot.querySelector('.' + key).innerText = value;
			}
		}
	});
})(document.currentScript.ownerDocument.getElementById.bind(document.currentScript.ownerDocument));
