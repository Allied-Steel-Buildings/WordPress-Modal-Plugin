(function ($) {
    'use strict';

    /**
     * All of the code for your public-facing JavaScript source
     * should reside in this file.
     *
     * Note: It has been assumed you will write jQuery code here, so the
     * $ function reference has been prepared for usage within the scope
     * of this function.
     *
     * This enables you to define handlers, for when the DOM is ready:
     *
     * $(function() {
     *
     * });
     *
     * When the window is loaded:
     *
     * $( window ).load(function() {
     *
     * });
     *
     * ...and/or other possibilities.
     *
     * Ideally, it is not considered best practise to attach more than a
     * single DOM-ready or window-load handler for a particular page.
     * Although scripts in the WordPress core, Plugins and Themes may be
     * practising this, we should strive to set a better example in our own work.
     */


    /**
     * Check if URL is external function
     *
     * @returns {boolean}
     */
    $.fn.isExternal = function () {

        var host = window.location.host;
        var link = $('<a>', {
            href: this.attr('href')
        })[0].hostname;
        return (link !== host);

    };

    /**
     * Basename function for JS
     *
     * @param path
     * @param suffix
     * @returns {*}
     */
    function basename(path, suffix) {
        var b = path;
        var lastChar = b.charAt(b.length - 1);
        if (lastChar === '/' || lastChar === '\\') {
            b = b.slice(0, -1);
        }
        b = b.replace(/^.*[/\\]/g, '');
        if (typeof suffix === 'string' && b.substr(b.length - suffix.length) === suffix) {
            b = b.substr(0, b.length - suffix.length);
        }
        return b;
    }

    $(function () {

        // Detect windows width function
        var $window = $(window);

        /**
         * Close modal functionality
         */

        function hideModal() {
            $('.modal-wrapper').removeClass('show').hide();
            $('.modal').removeClass('show');
            $('#modal-content').html('');
        }

        // when pressing esc
        $(document).keyup(function (e) {
            if (e.keyCode === 27 && $('.modal-wrapper').hasClass('show'))
                hideModal();
        });

        // when clicking on close button
        $(document).on('click', '.close-modal', hideModal);

        // when clicking outside of modal
        $(window).on('click', hideModal);

        $(document).on('click', '.modal', function (e) {
            e.stopPropagation();
        });

        function checkWidth() {
            var windowsize = $window.width();

            // if the window is greater than 767px wide then do below. we don't want the modal to show on mobile devices and instead the link will be followed.
            if (windowsize >= fromPHP.breakpoint) {
                $('body').on('click', '.modal-link', function (e) {

                    // Define variables
                    var modalContent = $('#modal-content');
                    var $this = ($(this).attr('href') != null) ? $(this) : $(this).children('a').first();
                    var postLink = $this.attr('href');
                    var postUrl = $this[0].pathname.substring(1);
                    var postSlug = basename(postLink);
                    var dataDivID = ' #' + $this.attr('data-div');
                    var dataBuddypress = $this.attr('data-buddypress');
                    var loader = '<img class="loading" src="' + fromPHP.pluginUrl + '/images/loading.gif" />';

                    // prevent link from being followed
                    e.preventDefault();

                    // display loading animation or in this case static content
                    if (fromPHP.styled) {
                        modalContent.html(loader);
                    }

                    // Use legacy method
                    if (fromPHP.legacy) {
                        // Load content from external
                        if ($this.isExternal()) {
                            $.ajaxPrefilter(function (options) {
                                if (options.crossDomain && jQuery.support.cors) {
                                    var http = (window.location.protocol === 'http:' ? 'http:' : 'https:');
                                    options.url = http + '//cors-anywhere.herokuapp.com/' + options.url;
                                    //options.url = "http://cors.corsproxy.io/url=" + options.url;
                                }
                            });

                            $.get(
                                postLink,
                                function (response) {
                                    var html = $(response);
                                    modalContent.html($(html).find(dataDivID).html());
                                });
                        }
                        // Load content from internal
                        else {
                            if (dataBuddypress)
                                modalContent.load(postLink + ' #buddypress');
                            else
                                modalContent.load(postLink + ' #modal-ready');
                        }
                    }
                    // Use new REST API method
                    else {
                        // Load content from external
                        if ($this.isExternal()) {
                            $.ajaxPrefilter(function (options) {
                                if (options.crossDomain && jQuery.support.cors) {
                                    var http = (window.location.protocol === 'http:' ? 'http:' : 'https:');
                                    options.url = http + '//cors-anywhere.herokuapp.com/' + options.url;
                                    //options.url = "http://cors.corsproxy.io/url=" + options.url;
                                }
                            });

                            $.get(
                                postLink,
                                function (response) {
                                    var html = $(response);
                                    modalContent.html($(html).find(dataDivID).html());
                                });
                        }
                        // Load content from internal
                        else {
                            $.ajax({
                                url: fromPHP.siteUrl + '/wp-json/wp-post-modal/v1/any-post-type?slug=' + postSlug,
                                success: function (data) {
                                    modalContent.html(data.post_content);
                                },
                                error: function () {
                                    if (dataBuddypress)
                                        modalContent.load(postLink + ' #buddypress');
                                    else
                                        modalContent.load(postLink + ' #modal-ready');
                                },
                                cache: false
                            });
                        }
                    }

                    // show class to display the previously hidden modal
                    $('.modal-wrapper').slideDown('slow', function () {
                        $(this).addClass('show');
                        $('.modal').addClass('show');
                    });

                    return false;
                });
            }
        }

        checkWidth();
        $(window).resize(checkWidth);
    });

    // Suppress modal link redirect in WP Customizer
    function modalCustomizer() {
        if (wp.customize) {
            var body = $('body');
            body.off('click.preview');

            body.on('click.preview', 'a[href]:not(.modal-link)', function (e) {
                var link = $(this);
                e.preventDefault();
                wp.customize.preview.send('scroll', 0);
                wp.customize.preview.send('url', link.prop('href'));
            });
        }
    }

    $(window).on('load', function () {
        modalCustomizer();
    });

})(jQuery);
