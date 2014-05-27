(function($){
	"use strict";
	
	var lifeButton = $('life'),
		peopleList = $('people'),
		personTmpl = $('person');

	var name = $('name'),
		age = $('age'),
		gender_male = $('gender_male'),
		gender_female = $('gender_female');


	//Create custom at-person element
	var proto = Object.create(HTMLElement.prototype);

	proto.createdCallback = function(){
		var clone = personTmpl.content.cloneNode(true);

		clone.querySelector('.name').innerText = name.value;
		clone.querySelector('.age').innerText = age.value;
		clone.querySelector('.gender').innerText = gender_male.checked ? gender_male.value : gender_female.checked ? gender_female.value : '';

		var shadow = this.createShadowRoot();

		shadow.appendChild(clone);
	};

	var PersonElement = document.registerElement('at-person', {
		prototype: proto
	});

	//Click handler just creates a new at-person element
	lifeButton.addEventListener('click', function(){
		peopleList.insertBefore(new PersonElement(), peopleList.firstChild);
	});

})(document.getElementById.bind(document));
