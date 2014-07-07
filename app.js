(function($){
	"use strict";
	
	var lifeButton = $('life'),
		peopleList = $('people'),
		personTmpl = $('person');

	var name = $('name'),
		age = $('age'),
		gender_male = $('gender_male'),
		gender_female = $('gender_female');

	lifeButton.addEventListener('click', function(){
		var clone = personTmpl.content.cloneNode(true);

		clone.querySelector('.name').innerText = name.value;
		clone.querySelector('.age').innerText = age.value;
		clone.querySelector('.gender').innerText = gender_male.checked ? gender_male.value : gender_female.checked ? gender_female.value : '';


		peopleList.insertBefore(clone, peopleList.firstChild);
	});

})(document.getElementById.bind(document));
