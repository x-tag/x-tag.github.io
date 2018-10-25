

(function(){

  var titles = {
    '/docs': 'Docs',
    '/builds': 'Builds',
  };

  try {
    localStorage.titles = JSON.stringify(titles);
  } catch (e) {}

  var state = {pathname: location.pathname};

  var routeUpdate = window.routeUpdate = function routeUpdate(pathname, push) {
    if (!pathname) {
      throw new Error('Must pass a pathname as the first parameter to `routeUpdate`');
    }
    pathname = pathname.replace(/.html$/, '');
    var title = 'X-Tag - ' + (titles[pathname] || titles['/']);
    document.title = title;
    if (push === true) historyPush(title, pathname);
    else if (push === false) historyReplace(title, pathname);
    document.body.setAttribute('path', location.pathname);
  };

  function historyPush(title, pathname) {
    scrollTo(0, 0);  // Ignore `history.scrollRestoration`.
    state = {pathname: pathname};
    history.pushState(state, null, pathname);
  }

  function historyReplace(title, pathname) {
    state = {pathname: pathname};
    history.replaceState(state, null, pathname);
  }

  var redirect = null;
  try {
    redirect = sessionStorage.redirect;
    delete sessionStorage.redirect;
  } catch (e) {}

  if (redirect && redirect !== location.pathname) routeUpdate(redirect, false);

  window.onpopstate = function(e) {
    if (e.state && e.state.pathname) {
      routeUpdate(e.state.pathname);
    }
  };

  routeUpdate(location.pathname, false);

})();