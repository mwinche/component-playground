(function($){
	"use strict";

	var	ATTRS = ['name', 'age', 'gender'];

	var lifeButton = $('life'),
		peopleList = $('people'),
		personTmpl = $('person');

	var name = $('name'),
		age = $('age'),
		gender_male = $('gender_male'),
		gender_female = $('gender_female');


	function customElement(elementName, overrides){
		var proto = Object.create(HTMLElement.prototype);

		for(var key in overrides){
			proto[key] = overrides[key];
		}

		return document.registerElement(elementName, {
			prototype: proto
		});
	}


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

	//Click handler just creates a new at-person element
	lifeButton.addEventListener('click', function(){
		var ele = document.createElement('at-person');

		ele.setAttribute('name', name.value);
		ele.setAttribute('age', age.value);
		ele.setAttribute('gender', gender_male.checked ? gender_male.value : gender_female.checked ? gender_female.value : '');

		peopleList.insertBefore(ele, peopleList.firstChild);
	});

})(document.getElementById.bind(document));
