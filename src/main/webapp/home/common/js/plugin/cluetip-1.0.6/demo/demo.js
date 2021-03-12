
/* the next line is an example of how you can override default options globally (currently commented out) ... */

 // $.fn.cluetip.defaults.tracking = true;
  // $.fn.cluetip.defaults.width = 'auto';
$(document).ready(function() {


  $('span[title]').cluetip({splitTitle: '|', arrows: true, dropShadow: false, cluetipClass: 'jtip'});

});
  



