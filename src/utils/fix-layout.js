import $ from 'jquery';

// AdminLTE depends on this little script to fix layout height after window resizes.
// It is copied from AdminLTE lib and was a little bit refactored
export default class FixLayout {
  activate() {
    this.fix();
    $(window, '.wrapper').resize(this.fix);
  }

  deactivate() {
    $(window, '.wrapper').off('resize', this.fix);
  }

  fix() {
    // Get window height and the wrapper height
    const neg = $('.main-header').outerHeight() + $('.main-footer').outerHeight();
    const window_height = $(window).height();
    const sidebar_height = $('.sidebar').height();

    // Set the min-height of the content and sidebar based on the
    // the height of the document.
    if ($('body').hasClass('fixed')) {
      $('.content-wrapper, .right-side').css('min-height', window_height - $('.main-footer').outerHeight());
    } else {
      if (window_height >= sidebar_height) {
        $('.content-wrapper, .right-side').css('min-height', window_height - neg);
      } else {
        $('.content-wrapper, .right-side').css('min-height', sidebar_height);
      }
    }
  }
}
