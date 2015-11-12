## Install

*Requirements*

Node / NPM

Bower (Package Manager)

```
npm install bower -g
```

Inside your project run:

```
bower install x-tag-code-prism
```

This downloads the component and dependencies to ./components



## About

An element that provides Syntax highlighting based on [PrismJS](http://prismjs.com/)


## Usage

```
<x-code-prism language="javascript">
xtag.register('x-superinput', {
  lifecycle: {
    created: function(){
      // superinputs begin life knowing they're super.
      this.value = 'super';
    }
  }
});
</x-code-prism>
```

