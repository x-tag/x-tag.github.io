(function(){

  function setHeader(bar){
    return bar.xtag.header || (bar.xtag.header = xtag.queryChildren(bar, 'h1,h2,h3,h4,h5,h6')[0])
  }

  xtag.register('x-appbar', {
    lifecycle: {
      created: function(){
        setHeader(this);
      }
    },
    accessors: {
      heading: {
        attribute: {},
        set: function(value){
          if (setHeader(this)) this.xtag.header.innerHTML = value;
        }
      },
      subheading: {
        attribute: {},
        set: function(value){
          if (setHeader(this)) this.xtag.header.setAttribute('subheading', value);
        }
      }
    }
  });

})();
