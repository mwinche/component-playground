(function($){
	"use strict";

	var peopleList = $('people'),
		lifeButton = $('life'),
		name = $('name'),
		age = $('age'),
		gender_male = $('gender_male'),
		gender_female = $('gender_female');

	//Click handler just creates a new at-person element
	lifeButton.addEventListener('click', function(){
		var ele = document.createElement('at-person');

		ele.setAttribute('name', name.value);
		ele.setAttribute('age', age.value);
		ele.setAttribute('gender', gender_male.checked ? gender_male.value : gender_female.checked ? gender_female.value : '');

		peopleList.insertBefore(ele, peopleList.firstChild);
	});

})(document.getElementById.bind(document));
