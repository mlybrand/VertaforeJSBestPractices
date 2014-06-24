var isIpad = navigator.userAgent.match(/iPad/i) !== null;
$(function() {
    var bodyClasses = document.getElementsByTagName('body')[0].className.split(' ');
    var searchClasses = ['archive', 'category', 'single', 'single-post', 'single-format-standard', 'search'];
    if ($.inArray('single-project', bodyClasses) !== -1) {
        $('.current_page_parent').removeClass('current_page_parent');
        $('ul.menu, ul.lavaLamp').each(function() {
            $('.menu-item:eq(1)', this).addClass('current-menu-item');
        });
    } 
    else 
    {
        for (var i = 0; i < searchClasses.length; i++) {
            if ($.inArray(searchClasses[i], bodyClasses) !== -1) {
                $('.current-menu-item').removeClass('current-menu-item');
                $('.current_page_parent').addClass('current-menu-item');
                break;
            }
        }
    }
    $("ul.lavaLamp").lavaLamp();
});
var pg = (function() {
    var $body = $('body');
    return function(p, fn) {
        if ($body.hasClass(p) || $body.hasClass('page-template-' + p + '-php')) {
            $(fn);
        }
    };
})();
pg('home', function() {
    var setupSlider = function() {
        var sliderElement = $('.homeSlider');
        sliderElement.sweetCycle({prev: '#homeSliderPrev',next: '#homeSliderNext',timeout: 5000,cleartypeNoBg: true,easing: 'easeInOutBack',pause: true,pauseOnPagerHover: true});
        if (isIpad) 
        {
            sliderElement.swipe({swipeLeft: function() {
                    sliderElement.cycle('next')
                },swipeRight: function() {
                    sliderElement.cycle('prev');
                }});
        }
        $('.testimonialCycle').cycle({timeout: 8000,pause: true,pauseOnPagerHover: true,pager: '#testimonial-pagination',pagerAnchorBuilder: function() {
                return '<div class="bullet"></div>';
            }});
    };
    if (isIpad) 
    {
        jQuery.fn.animate.defaults = {avoidTransforms: false};
        $.getScript('wp-content/themes/sweet/js/ipadPackage.js', setupSlider);
    } 
    else 
    {
        setupSlider();
    }
});
pg('contact', function() {
    $('.contactUseForm').click(function() {
        $('html, body').animate({scrollTop: $("#scrollTo").offset().top}, 500);
        $('#yourmessage').focus();
    });
    var map;
    function initialize() {
        var Latlng = new google.maps.LatLng(51.537347, -0.008456);
        var mapOptions = {zoom: 15,center: Latlng,mapTypeId: google.maps.MapTypeId.ROADMAP};
        var map = new google.maps.Map(document.getElementById('map_canvas'), mapOptions);
        var marker = 'http://www.wearesweet.co.uk/wp-content/themes/sweet/img/mapMarker.png';
        var sweetMarker = new google.maps.Marker({position: Latlng,map: map,icon: marker});
    }
    google.maps.event.addDomListener(window, 'load', initialize);
    if ($.browser.msie) 
    {
        $('.mapOverlay').remove();
    }
    jQuery.validator.setDefaults({errorPlacement: function(error, placement) {
            $(placement).qtip({content: error.text(),show: {when: {event: 'none'},ready: true},hide: {when: {event: 'keydown'}},position: {corner: {target: 'leftMiddle',tooltip: 'rightMiddle'}},style: {tip: true,fontSize: '12px',color: '#FFF',border: {width: 3,radius: 4,color: '#666'},name: 'dark'}});
        }});
    var $contactForm = $('form#contact');
    $contactForm.ajaxForm({url: '../wp-admin/admin-ajax.php?action=contactform',resetForm: true,beforeSubmit: function() {
            return $contactForm.valid();
        },success: function(response) {
            var response = $.trim(response);
            if (response == '1') {
                apprise('Thank you for your message. We will be in touch soon.');
            } else {
                apprise('Sorry, we didn\'t receive your message. Please send us an email on info@wearesweet.co.uk.');
            }
        }});
});
pg('work', function() {
    var animating = false;
    var $container = $('.projectContainer');
    var availableFilters = $('.projectFilters li a').map(function(i, el) {
        return $(el).data('filter').replace(/^./, '')
    });
    var filter = '*';
    if (window.location.hash && window.location.hash.length > 0) {
        var catName = window.location.hash.replace(/^#/, '');
        if (catName && $.inArray(catName, availableFilters) !== -1) {
            filter = '.' + catName;
        }
    }
    var activeLink = $('.projectFilters li a[data-filter="' + filter + '"]');
    if (activeLink.length) 
    {
        $('.current-cat').removeClass('current-cat');
        activeLink.parent().addClass('current-cat');
    }
    $container.isotope({itemSelector: '.project',masonry: {columnWidth: 206},filter: filter});
    var $projects = $('.project');
    if (!('ontouchstart' in window)) 
    {
        $projects.on('mouseenter', function() {
            $projects.not(this).not('.isotope-hidden').find('.projectThumbnail').stop().animate({opacity: 0.75}, 'fast');
            $(this).css({zIndex: 9999}).find('.projectCategories').stop().slideDown(140, 'easeInOutSine');
        }).on('mouseleave', function() {
            var $this = $(this);
            $projects.not(this).not('.isotope-hidden').find('.projectThumbnail').stop().animate({opacity: 1}, 'fast');
            $this.find('.projectCategories').stop().slideUp(210, 'easeOutSine', function() {
                $this.css({zIndex: 1});
            });
        });
    }
    $('.projectFilters li a').click(function() {
        $(this).parent().addClass("current-cat");
        $(this).parent().siblings().removeClass("current-cat");
        var selector = $(this).attr('data-filter');
        window.location.hash = selector.replace(/^./, '');
        animating = true;
        $container.isotope({filter: selector}, function() {
            animating = false;
        });
        return false;
    });
    var goLight = function() {
        if (!$('body').hasClass('darkbg')) 
        {
            return false;
        }
        $('.bgToggleSwitch').stop().animate({"left": "0px"}, 200);
        $('body').removeClass('darkbg');
        return true;
    };
    var goDark = function() {
        if ($('body').hasClass('darkbg')) 
        {
            return false;
        }
        $('.bgToggleSwitch').stop().animate({"left": "18px"}, 200);
        $('body').addClass('darkbg');
        return true;
    };
    $('.bgToggleBack').on('mousedown', function() {
        if (!goLight()) 
        {
            goDark();
        }
    });
    $('.light').on('click', goLight);
    $('.dark').on('click', goDark);
});
var ie8Posts = function() {
    var selector = $('.post:nth-child(3n+3)');
    selector.css('margin-right', '0');
    selector.livequery(function() {
        $(this).css('margin-right', '0');
    });
};
pg('blog', ie8Posts);
pg('archive', ie8Posts);
pg('search', ie8Posts);
$(function() {
    $('.featuredPost > a').hover(function() {
        $(this).stop().animate({backgroundPosition: '92px 0px'}, 90);
    }, function() {
        $(this).stop().animate({backgroundPosition: '-276px 0px'}, 200);
    });
});
(function($) {
    function initData($el) {
        var _ARS_data = $el.data('_ARS_data');
        if (!_ARS_data) {
            _ARS_data = {rotateUnits: 'deg',scale: 1,rotate: 0};
            $el.data('_ARS_data', _ARS_data);
        }
        return _ARS_data;
    }
    function setTransform($el, data) {
        $el.css('transform', 'rotate(' + data.rotate + data.rotateUnits + ') scale(' + data.scale + ',' + data.scale + ')');
    }
    $.fn.rotate = function(val) {
        var $self = $(this), m, data = initData($self);
        if (typeof val == 'undefined') {
            return data.rotate + data.rotateUnits;
        }
        m = val.toString().match(/^(-?\d+(\.\d+)?)(.+)?$/);
        if (m) {
            if (m[3]) {
                data.rotateUnits = m[3];
            }
            data.rotate = m[1];
            setTransform($self, data);
        }
        return this;
    };
    $.fn.scale = function(val) {
        var $self = $(this), data = initData($self);
        if (typeof val == 'undefined') {
            return data.scale;
        }
        data.scale = val;
        setTransform($self, data);
        return this;
    };
    var curProxied = $.fx.prototype.cur;
    $.fx.prototype.cur = function() {
        if (this.prop == 'rotate') {
            return parseFloat($(this.elem).rotate());
        } else if (this.prop == 'scale') {
            return parseFloat($(this.elem).scale());
        }
        return curProxied.apply(this, arguments);
    };
    $.fx.step.rotate = function(fx) {
        var data = initData($(fx.elem));
        $(fx.elem).rotate(fx.now + data.rotateUnits);
    };
    $.fx.step.scale = function(fx) {
        $(fx.elem).scale(fx.now);
    };
    var animateProxied = $.fn.animate;
    $.fn.animate = function(prop) {
        if (typeof prop['rotate'] != 'undefined') {
            var $self, data, m = prop['rotate'].toString().match(/^(([+-]=)?(-?\d+(\.\d+)?))(.+)?$/);
            if (m && m[5]) {
                $self = $(this);
                data = initData($self);
                data.rotateUnits = m[5];
            }
            prop['rotate'] = m[1];
        }
        return animateProxied.apply(this, arguments);
    };
})(jQuery);
