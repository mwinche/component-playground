Web Component Playground
========================

Web Components are awesome and amazing. This repo explores some basic usage of the core portions of the web component standard.

1. The `template` tag
2. Custom Elements
3. Shadow DOM
4. HTML Imports

This README will explain each of these portions of the standard and with each tag in the repo.

You can serve this up using any HTTP server, but your browser will have to support Web Components for it to work (Chrome Beta or Canary at time of writing).

For this tag: HTML Imports!

This is probably my favorite change. This is the point where everything is playing nice together and you get some really sweet seperation of concerns.

What we've done now is seperate out `app.js` into two files, `app.js` and `person.js`. The concerns start to be very clear. `app.js` is responsible for the form action up until it creates the new custom element `at-person`. `person.js` is responsible for making that element do what it should.

Here is snippet which we pulled out of `app.js` in `person.js`. person.js: 1 - 42

	(function($){
		"use strict";
	
		var	ATTRS = ['name', 'age', 'gender'];
	
		var personTmpl = $('person');
	
	
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
				this.createShadowRoot().appendChild(personTmpl.content.cloneNode(true));
	
				this.updateValue('name', this.getAttribute('name'));
				this.updateValue('age', this.getAttribute('age'));
				this.updateValue('gender', this.getAttribute('gender'));
			},
	
			attributeChangedCallback: function(attrName, oldVal, newVal){
				this.updateValue(attrName, newVal);
			},
	
			updateValue: function(key, value){
				if(ATTRS.indexOf(key) > -1 && this.shadowRoot.querySelector('.' + key)){
					this.shadowRoot.querySelector('.' + key).innerText = value;
				}
			}
		});
	})(document.getElementById.bind(document.currentScript.ownerDocument));

Admitedly, `customElement` should probably be defined somewhere else as its concerns could be greater than this one element. But it works for our purposes. We could even put it in another `<link rel="import" />` tag!

`person.html` contains the template tag and brings in `person.js`. person.js: 1 - 11

	<template id="person">
		<style>
			@import url("person.css");
		</style>
		<div class="person">
			<span class="name"></span>
			<span class="age"></span>
			<span class="gender"></span>
		</div>
	</template>
	<script src="person.js"></script>

So that's nice that we can pull out all those concerns, but how do we bring them into `index.html`. It is really easy. index.html: 4

	<link rel="import" href="person.html" />

And that's all there is too it!
