(function($){
	"use strict";

	var importDoc = document.currentScript.ownerDocument,
		personTmpl = importDoc.getElementById('person'),

		name = $('name'),
		age = $('age'),
		gender_male = $('gender_male'),
		gender_female = $('gender_female');


	function customElement(elementName, overrides){
		return document.registerElement(elementName, {
			prototype: _.assign(Object.create(HTMLElement.prototype), overrides)
		});
	}

	customElement('at-person', {
		createdCallback: function(){
			var clone = personTmpl.content.cloneNode(true);

			clone.querySelector('.name').innerText = name.value;
			clone.querySelector('.age').innerText = age.value;
			clone.querySelector('.gender').innerText = gender_male.checked ? gender_male.value : gender_female.checked ? gender_female.value : '';

			this.createShadowRoot().appendChild(clone);
		}
	});
})(document.getElementById.bind(document));
