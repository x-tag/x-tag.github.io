(function(){

  var viewDeck = document.getElementById('views');
  var globalMenu = document.getElementById('global_menu');

  xtag.addEvents(document, {
    'viewchange': function(event){
      globalMenu.hide();
      var view = event.target.getAttribute('data-view');
      viewDeck.showCard('[data-view="' + view + '"]', 'forward');
      xtag.query(document, 'x-action[data-view]').forEach(function(action){
        if (action.getAttribute('data-view') == view) action.setAttribute('selected', '');
        else action.removeAttribute('selected');
      });
    }
  });

})();
