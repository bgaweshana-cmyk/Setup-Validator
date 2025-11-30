// transition.js — page fade-out on internal navigation
(function(){
  const internalSelector = 'a.nav-link, a.btn, a.brand, a[href^="./"], a[href^="/"], a[href^="index"], a[href$=".html"]';
  function isInternal(href){
    if(!href) return false;
    // treat anchors and mailto/tel as external for this effect
    if(href.startsWith('#') || href.startsWith('mailto:') || href.startsWith('tel:')) return false;
    // allow same-origin html links
    const loc = location;
    try {
      const url = new URL(href, loc.href);
      return url.origin === loc.origin;
    } catch(e){ return true; }
  }

  document.addEventListener('click', function(e){
    const a = e.target.closest('a');
    if(!a) return;
    const href = a.getAttribute('href');
    if(!isInternal(href)) return;
    // allow ctrl/cmd+click or middle-click to bypass
    if(e.metaKey || e.ctrlKey || e.shiftKey || e.button !== 0) return;
    // smooth fade
    e.preventDefault();
    document.documentElement.classList.add('page-exiting');
    setTimeout(()=> { location.href = href; }, 260); // matches CSS transition
  });
})();
