
(function(){

  var template = '<div class="x-grow-wrap" onresize="this.parentNode.matchDimensions.call(this.parentNode)">' +
        '<div class="x-grow-content"></div>' +
        '<div class="x-grow-overflow"><div></div></div>' +
        '<div class="x-grow-underflow"><div></div></div>' +
      '</div>';

  xtag.register('x-growbox', {
    lifecycle: {
      created: function(){
        var children = xtag.toArray(this.children);
        var frag = xtag.createFragment(template);
        var content = frag.querySelector('.x-grow-content');
        children.forEach(function(el){
          content.appendChild(el);
        });
        this.appendChild(frag);
        xtag.addEvent(this.firstElementChild.firstElementChild.nextElementSibling, 'overflow', this.matchDimensions.bind(this));
        xtag.addEvent(this.firstElementChild.lastElementChild, 'underflow', this.matchDimensions.bind(this));
        this.matchDimensions();
      }
    },
    methods: {
      matchDimensions: function(resize){
        var wrap = this.firstElementChild;
        if (!wrap || wrap.className != 'x-grow-wrap') return false;
        this.style.height = (resize === true) ? window.getComputedStyle(wrap).height : wrap.scrollHeight + 'px';
        wrap.firstElementChild.nextElementSibling.firstChild.style.height = wrap.scrollHeight - 1 + 'px';
        wrap.lastElementChild.firstChild.style.height = wrap.scrollHeight + 1 + 'px';
      }
    },
    events:{
      'overflow': function(){
        this.matchDimensions();
      },
      'underflow': function(){
        this.matchDimensions();
      }
    }
  });

})();