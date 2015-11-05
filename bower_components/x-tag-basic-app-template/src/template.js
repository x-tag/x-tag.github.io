(function(){

  var viewDeck = document.getElementById('views');
  var globalMenu = document.getElementById('global_menu');

  xtag.addEvents(viewDeck, {
    'viewchange': function(){
      globalMenu.hide();
    }
  });

  xtag.addEvents(globalMenu, {
    'tap:delegate(menu > x-action)': function(){
      xtag.toArray(this.parentNode.children).forEach(function(action){
        action.removeAttribute('selected');
      });
      this.setAttribute('selected', '');
    }
  });

})();
