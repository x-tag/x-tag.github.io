
/* X-CLOCK DEMO FOR FRONT PAGE */

xtag.register('x-clock', {
  lifecycle: {
    created: function(){
      this.start();
    }
  },
  methods: {
    start: function(){
      this.update();
      this.xtag.interval = setInterval(this.update.bind(this), 1000);
    },
    stop: function(){
      this.xtag.interval = clearInterval(this.xtag.interval);
    },
    update: function(){
      this.textContent = new Date().toLocaleTimeString();
    }
  },
  events: {
    tap: function(){
      if (this.xtag.interval) this.stop();
      else this.start();
    }
  }
});

(function(){

var ready = false;

Object.defineProperty(Smooch, 'ready', {
  set: function(val){
    ready = !!val;
    if (ready) {
      var chatElement = document.getElementById('sk-container');
      var chatPanel = document.getElementById('community_chat');
      chatPanel.appendChild(chatElement);
    }
  },
  get: function(){
    return ready;
  }
});

Smooch.init({
  appToken: '3lif3pcvgkts4b79n30phmiry',
  customText: {
    headerText: 'Let\'s talk X-Tag & Web Components!',
    inputPlaceholder: 'Type a message...',
    sendButtonText: 'Send',
    introText: 'This is the beginning of your conversation.<br/> Fire away!',
    settingsText: 'You can leave us your email so that we can get back to you this way.'
  }
});

})();
