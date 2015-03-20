# smoooooooth
Smooth is a small JavaScript module based on [VirtualScroll](http://www.everyday3d.com/blog/index.php/2014/08/18/smooth-scrolling-with-virtualscroll/) to create smooth scrolling and parallax effects on scroll.

# Getting Started

### Clone the repository

`git clone https://github.com/BaptisteBriel/smooth.git`

### Usage

First, you'll need some simple HTML:

```html
<div class="section vs-section" data-speed="0.1">
  <div class="vs-transform" data-speed="0.2"></div>
  <div class="vs-transform" data-speed="0.4"></div>
  <div class="vs-transform" data-speed="0.6"></div>
  <div class="vs-transform" data-speed="0.8"></div>
  <div class="vs-transform" data-speed="1"></div>
</div>
```

And some basic CSS:

```css
body{
  overflow: hidden;
}
.section{
  position: absolute;
  
  /* if it's a vertical scrolling */
  width: 100%; 
  height: auto;
  
  /* if it's a horizontal scrolling */
  width: auto; 
  height: 100%;
}
```

Also, don't forget to load the sources:
- requestAnimationFrame polyfill (rAF.js)
- VirtualScroll (vs.js)
- Smooth (smooth.js)

```html
<script src="rAF.js"></script>
<script src="vs.js"></script>
<script src="smooth.js"></script>
```

Now to the JavaScript part;  
The usage is very simple. To launch a new smooth scroll just use the Smooth object like this:

```javascript
// get our section
var section = document.querySelector('.vs-section');
// get our extra divs
var divs = document.querySelectorAll('.vs-transform');

// initialize the object w/ some parameters
var smooth = new Smooth({
  direction: 'vertical',
  section: section,
  ease: 0.1,
  els: divs // optional
});
// kickoff the smooth scroll
smooth.init();
```

As you can see, there's a bunch of parameters; direction, the container (section), the easing and all the DOM nodes you want to transform (optional - if there's no parallax, the transform is applied to the section)

Later, you might want to stop the events and requestAnimationFrame by doing:

```javascript
smooth.destroy();
```

## License

MIT, see [LICENSE.md](https://github.com/BaptisteBriel/smooth/blob/master/LICENSE).