jQuery(function($) {

    'use strict';

    $('.fitvids').fitVids();

    function artwork() {
        var $pieces = $('#viewport.artwork > ul > li > a'),
            $image = $('#viewport.artwork .image');
        function set($l) {
            var $img = $('<img>', {
                src: $l.attr('href'),
                alt: $l.attr('title')
            });
            $l.parent().siblings('li').removeClass('active');
            $l.parent().addClass('active');
            $image.html($img);
        }
        $pieces.on('click', function(e) {
            e.preventDefault();
            set($(this));
        });
        set($pieces.first());
    }
    artwork();

});
