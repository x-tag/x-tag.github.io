
/* X-CLOCK DEMO FOR FRONT PAGE */

xtag.register('x-clock', {
  lifecycle: {
    created: function(){
      this.update();
      setInterval(this.update.bind(this), 1000);
    }
  },
  methods: {
    update: function(){
      this.textContent = new Date().toLocaleTimeString();
    }
  }
});
