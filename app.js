(function($){
	"use strict";

	var peopleList = $('people')
	
	//Click handler just creates a new at-person element
	 $('life').addEventListener('click', function(){
		peopleList.insertBefore(document.createElement('at-person'), peopleList.firstChild);
	});

})(document.getElementById.bind(document));
