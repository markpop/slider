$(function () {
  var $container = $('.slider'),
      $slider = $container.children('.slider-wrap').children(),
      $bullet = $container.children('.bullet'),
      _length = $slider.length,
      _flag = -1,
      _current = 0,
      _temp = '',
      _time = '',
      _loopSpeed = 8000,
      _fadeSpeed = 2000,
      loop = function () {
        $slider.eq(_current).fadeOut(_fadeSpeed);
        if (_current <= 0) {
          _flag = 1;
        } else if (_current >= _length - 1) {
          _flag = -1;
        }
        _current = _current + _flag;
        $slider.eq(_current).fadeIn(_fadeSpeed);
        $bullet.children()
          .eq(_current)
          .addClass('active')
          .siblings()
          .removeClass('active');
      };
  $slider.eq(0).show();
  if (_length > 1) {
    $slider.each(function (index) {
      if (index === 0) {
        _temp += '<li class="active" data-index="' + index + '"></li>';
      } else {
        _temp += '<li data-index="' + index + '"></li>';
      }
    });
    $bullet.append($(_temp));
    _time = setInterval(loop, _loopSpeed);
    $bullet.on('click', 'li', function () {
      var index = parseInt($(this).attr('data-index'));
      $bullet.children()
        .eq(index)
        .addClass('active')
        .siblings()
        .removeClass('active');
      $slider.eq(index).fadeIn()
        .siblings().fadeOut();
      clearInterval(_time);
      _current = index;
      _time = setInterval(loop, _loopSpeed);
    });
  }
});