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
  var whitesplit = /\s+/g;
  xtag.register('x-action', {
    accessors: {
      event: { attribute: {} },
      target: { attribute: {} },
      method: { attribute: {} },
      triggers: {
        attribute: {
          def: 'tap'
        },
        set: function(val){
          if (this.xtag.triggers) xtag.removeEvents(this, this.xtag.triggers);
          var triggers = {};
          (val || '').trim().split(whitesplit).forEach(function(key){
            triggers[key] = executeTarget;
          });
          this.xtag.triggers = xtag.addEvents(this, triggers);
        }
      },
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
