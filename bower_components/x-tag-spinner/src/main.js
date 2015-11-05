(function(){

  var path = '<path fill="none" stroke="inherit" stroke-width="25" stroke-linecap="round" stroke-miterlimit="10" d="M84.5,';

  function stop(spinner, fn){
    if (fn) fn.call(spinner);
    xtag.transition(spinner, 'fade-out', {
      after: function(){ spinner.spinning = false; }
    });
  }

  xtag.register('x-spinner', {
    content: '<div class="x-spinner-center"><svg viewBox="0 0 170 170">' +
                path + '156.5 c-39.8,0-72-32.2-72-72"/>' +
                path + '12.5 c39.8,0,72,32.2,72,72"/>' +
             '</svg></div>',
    lifecycle: {
      created: function() {
        this.xtag.center = this.lastElementChild;
        this.xtag.svg = this.lastElementChild.firstElementChild;
      }
    },
    accessors: {
      fade: {
        attribute: { boolean: true }
      },
      reverse: {
        attribute: { boolean: true }
      },
      src: {
        attribute: { property: 'svg' }
      },
      label: {
        attribute: { property: 'center' }
      },
      spinning: {
        attribute: { boolean: true },
        set: function(value, old){
          if (value != old) value ? this.spin() : this.stop();
        }
      },
      duration: {
        attribute: {}
      },
      minDuration: {
        attribute: {}
      }
    },
    methods: {
      spin: function(fn){
        this.spinning = true;
        clearTimeout(this.xtag.stop);
        this.xtag.start = new Date().getTime();
        xtag.transition(this, 'fade-in', fn ? { after: fn.bind(this) } : null);
        if (this.duration) this.xtag.stop = setTimeout(this.stop.bind(this), this.duration);
      },
      stop: function(fn){
        if (this.minDuration) {
          clearTimeout(this.xtag.stop);
          this.xtag.stop = setTimeout(
            stop.bind(null, this, fn),
            this.minDuration - (new Date().getTime() - this.xtag.start)
          );
        }
        else stop(this, fn);
      },
      toggle: function(fn){
        this.spinning ? this.stop(fn) : this.spin(fn);
      }
    }
  });

})();
