

function isElementInViewport (el) {
  //special bonus for those using jQuery
  if (typeof jQuery === "function" && el instanceof jQuery) {
      el = el[0];
  }

  var rect = el.getBoundingClientRect();

  return (
    rect.top >= 0 &&
    rect.left >= 0 &&
    rect.bottom <= (window.innerHeight || document.documentElement.clientHeight) && /*or $(window).height() */
    rect.right <= (window.innerWidth || document.documentElement.clientWidth) /*or $(window).width() */
  );
}


(function() {
  var hasBeenPlayed = false;
  var animation = window.__anim = bodymovin.loadAnimation({
    container: document.querySelector('.christmas-gaveguru'), // the dom element
    renderer: 'svg',
    loop: false,
    autoplay: false,
    animationData: window.__animationData
  });
  function onVisibilityChange(el, callback) {
      var old_visible = false;
      return function () {
          var visible = isElementInViewport(el);
          if (visible !== old_visible) {
              old_visible = visible;
              if (typeof callback == 'function') {
                  callback();
              }
          }
      }
  }

  var handler = onVisibilityChange(document.querySelector('.christmas-gaveguru'), function() {
      /* your code go here */
      animation.play();
      $(window).off('DOMContentLoaded load resize scroll', handler); 
  });
  //jQuery
  $(window).on('DOMContentLoaded load resize scroll', handler); 

})();