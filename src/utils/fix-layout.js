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
    const windowHeight = $(window).height();
    const sidebarHeight = $('.sidebar').height();

    // Set the min-height of the content and sidebar based on the
    // the height of the document.
    if ($('body').hasClass('fixed')) {
      $('.content-wrapper, .right-side').css(
        'min-height', windowHeight - $('.main-footer').outerHeight()
      );
    } else {
      if (windowHeight >= sidebarHeight) {
        $('.content-wrapper, .right-side').css('min-height', windowHeight - neg);
      } else {
        $('.content-wrapper, .right-side').css('min-height', sidebarHeight);
      }
    }
  }
}
