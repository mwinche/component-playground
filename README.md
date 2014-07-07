Web Component Playground
========================

Web Components are awesome and amazing. This repo explores some basic usage of the core portions of the web component standard.

1. The `template` tag
2. Custom Elements
3. Shadow DOM
4. HTML Imports

This README will explain each of these portions of the standard and with each tag in the repo.

You can serve this up using any HTTP server, but your browser will have to support Web Components for it to work (Chrome Beta or Canary at time of writing).

For this tag: The `template` tag!

You can see here (index.html and app.js) that the code here is fairly straight forward. A form, a click handler, nothing crazy. The only new thing is that `template` tag. The `template` tag is cool becuase it allows you to write up HTML that is not rendered but can be easily copied. Essentially it is a declaritive version of a document fragment! Neat huh?

index.html: 25 - 31

	<template id="person">
		<li class="person">
			<span class="name"></span>
			<span class="age"></span>
			<span class="gender"></span>
		</li>
	</template>

To use it, it is quite simple: app.js: 14

	var clone = personTmpl.content.cloneNode(true);

After that you can use it like any other DOM node.
