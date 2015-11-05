(function(){

  function releaseContainer(box){
    var container = box.xtag.container;
    if (container) {
      container.removeAttribute('x-peekbox-cover');
      container.removeAttribute('x-peekbox-showing');
      container.removeAttribute('x-peekbox-container');
      if (box.xtag.coverEvents) xtag.removeEvents(container, box.xtag.coverEvents);
      box.xtag.container = null;
    }
  }

  xtag.register('x-peekbox', {
    lifecycle: {
      inserted: function(){
        releaseContainer(this);
        var box = this;
        var container = box.parentNode;
        if (container) {
          (box.xtag.container = container).setAttribute('x-peekbox-container', '');
          if (box.cover) {
            container.setAttribute('x-peekbox-cover', '');
            box.xtag.coverEvents = xtag.addEvents(container, {
              'tapstart': function(){
                box.xtag.skipTap = !box.showing;
              },
              tap: function(e){
                if (!box.xtag.skipTap && box.showing && box.cover && box != e.target && !box.contains(e.target)) {
                  box.hide();
                }
                box.xtag.skipTap = false;
              }
            });
          }
        }
      },
      removed: function(){
        releaseContainer(this);
      }
    },
    events: {
      transitionend: function(e){
        if (e.target == this) xtag.fireEvent(this, this.showing ? 'show' : 'hide');
      }
    },
    accessors: {
      showing: {
        attribute: { boolean: true },
        set: function(val){
          var container = this.xtag.container;
          if (container) {
            val ? container.setAttribute('x-peekbox-showing', '') : container.removeAttribute('x-peekbox-showing');
          }
        }
      },
      edge: {
        attribute: {},
        set: function(){
          xtag.skipTransition(this);
        }
      },
      cover: {
        attribute: { boolean: true },
        set: function(val){
          if (this.xtag.container) {
            val ? this.xtag.container.setAttribute('x-peekbox-cover', '') : this.xtag.container.removeAttribute('x-peekbox-cover');
          }
        }
      }
    },
    methods: {
      show: function(){
        this.showing = true;
      },
      hide: function(){
        this.showing = false;
      },
      toggle: function(){
        this.showing = !this.showing;
      }
    }
  });

})();
