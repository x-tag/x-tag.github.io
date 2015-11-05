(function(){

  function executeTarget(e){
    var node = this;
    var event = node.event;
    var method = node.method;
    var args = node.xtag.args || [];
    var targets = xtag.query(document, node.target);
    (targets[0] ? targets : [node]).forEach(function(target){
      if (target[method]) target[method].apply(target, args);
      if (event) xtag.fireEvent(target, event, {
        detail: {
          actionElement: node
        }
      });
    });
  }

  var replacer = /'/g;
  xtag.register('x-action', {
    events: {
      'tap': executeTarget
    },
    accessors: {
      event: { attribute: {}},
      target: { attribute: {}},
      method: { attribute: {}},
      args: {
        attribute: {},
        set: function(args){
          this.xtag.args = JSON.parse('[' + args.replace(replacer, '"') + ']');
        }
      },
    },
    methods: {
      execute: executeTarget
    }
  });

})();
