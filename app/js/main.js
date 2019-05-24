var MMIT = {
	changeInnerHtml: function (elementPath, newCode){
	    $(elementPath).fadeOut(500, function() {
	        $(this).each(function () {
				$(this).replaceWith(newCode).fadeIn(500);
			});
	    });
	}
}

$(document).ready(function () {

    function addTabs(tabbed_selector) {
        // Get relevant elements and collections
        var tabbed = document.querySelector(tabbed_selector);
        var tablist = tabbed.querySelector('ul');
        var tabs = tablist.querySelectorAll('a');
        var panels = tabbed.querySelectorAll('[id^="section"]');

        // The tab switching function
        var switchTab = function switchTab(oldTab, newTab) {
            newTab.focus();
            // Make the active tab focusable by the user (Tab key)
            newTab.removeAttribute('tabindex');
            // Set the selected state
            newTab.setAttribute('aria-selected', 'true');
            oldTab.removeAttribute('aria-selected');
            oldTab.setAttribute('tabindex', '-1');
            // Get the indices of the new and old tabs to find the correct
            // tab panels to show and hide
            var index = Array.prototype.indexOf.call(tabs, newTab);
            var oldIndex = Array.prototype.indexOf.call(tabs, oldTab);
            panels[oldIndex].hidden = true;
            panels[index].hidden = false;
        };

        // Add the tablist role to the first <ul> in the .tabbed container
        tablist.setAttribute('role', 'tablist');

        // Add semantics are remove user focusability for each tab
        Array.prototype.forEach.call(tabs, function (tab, i) {
            tab.setAttribute('role', 'tab');
            tab.setAttribute('id', 'tab' + (i + 1));
            tab.setAttribute('tabindex', '-1');
            tab.parentNode.setAttribute('role', 'presentation');

            // Handle clicking of tabs for mouse users
            tab.addEventListener('click', function (e) {
                e.preventDefault();
                var currentTab = tablist.querySelector('[aria-selected]');
                if (e.currentTarget !== currentTab) {
                    switchTab(currentTab, e.currentTarget);
                }
            });

            // Handle keydown events for keyboard users
            tab.addEventListener('keydown', function (e) {
                // Get the index of the current tab in the tabs node list
                var index = Array.prototype.indexOf.call(tabs, e.currentTarget);
                // Work out which key the user is pressing and
                // Calculate the new tab's index where appropriate
                var dir = e.which === 37 ? index - 1 : e.which === 39 ? index + 1 : e.which === 40 ? 'down' : null;
                if (dir !== null) {
                    e.preventDefault();
                    // If the down key is pressed, move focus to the open panel,
                    // otherwise switch to the adjacent tab
                    dir === 'down' ? panels[i].focus() : tabs[dir] ? switchTab(e.currentTarget, tabs[dir]) : void 0;
                }
            });
        });

        // Add tab panel semantics and hide them all
        Array.prototype.forEach.call(panels, function (panel, i) {
            panel.setAttribute('role', 'tabpanel');
            panel.setAttribute('tabindex', '-1');
            var id = panel.getAttribute('id');
            panel.setAttribute('aria-labelledby', tabs[i].id);
            panel.hidden = true;
        });

        // Initially activate the first tab and reveal the first tab panel
        tabs[0].removeAttribute('tabindex');
        tabs[0].setAttribute('aria-selected', 'true');
        panels[0].hidden = false;
    };
    (function addCommentTabs() {
        if ($('div').is('.ticket-body__footer')) {
            addTabs('.tabbed');
        }
    })();
    (function createClientCardTabs() {
            if ($('div').is('.client-card__tabs')) {
                addTabs('.tabbed');
            }
    })();
    (function createClientCardTabs() {
            if ($('div').is('.document-tabs')) {
                addTabs('.tabbed');
            }
    })();
    (function addPopupOtherMenu() {
        $(document).on('click', '.comments__other', function () {
            if ($(this).hasClass('open-popup')) {
                $(this).removeClass('open-popup');
                $('.close-wrapper-for-comments').remove();
            } else {
                $(this).addClass('open-popup');
                $('body').append('<div class="close-wrapper-for-comments"></div>');
            }
        });

        $(document).on('click', '.close-wrapper-for-comments', function () {
            $('.comments__other').removeClass('open-popup');
            $(this).remove();
        });
    })();
    (function createCustomSelect() {
        CustomSelect('.custom-select',"Выберите категорию",'.custom-select-wrapper');
        CustomSelect('.edit-information__select',"Выберите тариф",'.custom-select-wrapper');
        CustomSelect('.responsible-select',"Ответственный",'.responsible-select-wrapper');
        CustomSelect('.tester-select',"Тестировщик",'.tester-select-wrapper');
        CustomSelect('.director-select',"Постановщик",'.director-select-wrapper');
        CustomSelect('.site-select',"Сайт",'.director-select-wrapper');
        CustomSelect('.select-executor',"Исполнитель",'.select-executor-wrapper');
        CustomSelect('.select-tester',"Тестировщик",'.select-tester-wrapper');
        CustomSelect('.change-status',"Статус",'.change-status-wrapper');
    })();
    function CustomSelect(main_selector,select_placeholder,dr_parent) {
        $(main_selector).select2({
            placeholder: select_placeholder,
            allowClear: true,
            dropdownParent:$(dr_parent),
        });
    }
    (function editPathFile() {
        $(".custom-input-file input").change(function(e){
            var fileName = '';
            $('.list-add-files').empty();
            if( this.files && this.files.length >= 1 )
                fileName = 'число файлов - ' + this.files.length;
             else
                fileName = e.target.value.split( '\\' ).pop();
            if( fileName )
            {$('.list-add-files').append(fileName);} else {
                $('.list-add-files').text('файл не выбран');
            }
        });
    })();
    (function validateAddForm() {
        $(".add-form").validate({
        });
        jQuery.extend(jQuery.validator.messages, {
            required: "Это поле необходимо заполнить",
            email:'Введите корректный E-mail',
        });
    })();
    (function validateEditInformationForm() {
        var nameClientEmail = $('#client-email').attr('name');
        $('.edit-information__form').validate({
        });
    })();
    (function addAnimationHelp() {
        $('.help-item, .help-arrow').viewportChecker({
            classToAdd:'fadeIn animation-help',
            classToRemove: 'hide',
        });
    })();
    (function createCustomDatepicker() {
        $('.add-form__datapicker, .custom-datpicker').datepicker({
            minDate: new Date(),
            autoClose: true,
        });
    })();
    (function createsEditInformation() {
        $('.button-edit-information').magnificPopup({
            items: {
                src: '.edit-information',
                type: 'inline',
            },
            tClose: 'Закрыть',
            callbacks: {
                open: function() {
                  var clientName = $.trim($('.general-information__title').text()),
                      clientSite = $.trim($('.general-information__address').text()),
                      clientEmail = $.trim($('.general-information__email').text()),
                      clientNotes = $.trim($('.general-information__notes').text()),
                      clientTariff = $.trim($('.general-information__tariff').text());
                  $('#client-name').val(clientName);
                  $('#client-site').val(clientSite);
                  $('#client-email').val(clientEmail);
                  $('#client-notes').val(clientNotes);
                  $('#client-tariff option').each(function () {
                      var textOption = $(this).val();
                     if (clientTariff == textOption) {
                         $('#client-tariff option').prop('selected',false);
                         $(this).prop('selected',true);
                         CustomSelect('.edit-information__select',"Выберите тариф",'.custom-select-wrapper');
                     }
                  });
                  $('.check-status').each(function () {
                    var idCheckbox = $(this).data("id");
                        if ($(this).hasClass('checked')) {
                            $('#' + idCheckbox).prop('checked', true);
                        } else {
                            $('#' + idCheckbox).prop('checked', false);
                        }
                  })
                },
            }
        });
    })();
    (function changeResponsibleCheckbox() {
        $('.switch-checkbox').change(function () {
            changeCheckbox(this);
        });
        $('.switch-checkbox').each(function () {
            changeCheckbox(this);
        });
        function changeCheckbox(thisSelect) {
            if ($(thisSelect).prop('checked')) {
                $(thisSelect).parent().addClass('checked')
            } else {
                $(thisSelect).parent().removeClass('checked')
            }
        }
        $('.switch-checkbox').focus(function () {
            $(this).parent().addClass('focus');
        });
        $('.switch-checkbox').blur(function () {
            $(this).parent().removeClass('focus');
        })
    })();
    (function addMakOnHourInput() {
        $('.hour-input').mask("a#", {
            "#": {pattern: "^[0-9]+$"},
            translation: {
                'a': {
                    pattern: "[1-9]",
                }
            }
        });
    })();
    (function addMakOnMinutesInput() {
        $('.minutes-input, .second-input').mask("ab", {
            translation: {
                'a': {
                    pattern: "[1-9]",
                },
                'b': {
                    pattern: "[0-9]?",
                }
            }
        });
    })();
    (function swithPaindInput() {
        $('.amount + .custom-checkbox input').each(function () {
            switchColorAmount(this)
        });
        $('.amount + .custom-checkbox input').change(function () {
            switchColorAmount(this)
        });
        function switchColorAmount(thisSelect) {
            if ($(thisSelect).prop('checked')) {
                $(thisSelect).parents('.custom-checkbox').siblings('.amount').removeClass('amount_unpaid');
            } else {
                $(thisSelect).parents('.custom-checkbox').siblings('.amount').addClass('amount_unpaid');
            }
        }
    })();
    (function editField() {
        $('.input-editing').hide();
        $('.save-button').hide();
        $('.input-editing').mask("#", {
            "#": {pattern: "^[0-9]+$"},
        });
        $('.edit-button').on('click', function (e) {
            var editContentElement = $(this).parents('.service__cell-edit').find('.edit-content');
            var inputEditingElement = $(this).parents('.service__cell-edit').find('.input-editing');
            var saveButtonElement = $(this).siblings('.save-button');
            var contentWidth = editContentElement.width();
            var editContent = editContentElement.text();
            var bufferDiv = $(this).parents('.service__cell-edit').find('.input-buffer');
             e.preventDefault();
             bufferDiv.text(editContent);
             editContentElement.hide();
             inputEditingElement.css({'display':'inline-block'});
             inputEditingElement.width(contentWidth);
             inputEditingElement.val(editContent);
             inputEditingElement.focus();
             $(this).hide();
            saveButtonElement.show().addClass('active');

        });


        $('.input-editing').on('input',function () {
            var inputBuffer = $(this).siblings('.input-buffer');
            var inputBufferWidth = inputBuffer.width();
            if (inputBufferWidth < 100) {
                inputBuffer.text($(this).val());
                inputBufferWidth = inputBuffer.width();
                $(this).width(inputBufferWidth);
            } else {
                inputBuffer.text($(this).val());
            }
        })
    })();

    (function saveInput() {
        $('.save-button').on('click', function (e) {
            e.preventDefault();
            if ($(this).hasClass('active')) {
                var changeInputElement = $(this).parents('.service__cell-edit').find('.input-editing');
                var changeContentElement = $(this).parents('.service__cell-edit').find('.edit-content');
                var editButtonElemnt = $(this).siblings('.edit-button');
                changeInputElement.hide();
                changeContentElement.text(changeInputElement.val());
                changeContentElement.css('display','inline-block');
                changeContentElement.css('display','inline-block');
                editButtonElemnt.css('display','inline-block');
                $(this).addClass('active').hide();
            }
        });
    })();

    (function openEditTicket() {
        $('#open-edit-popup').magnificPopup({
            removalDelay:1000,
            mainClass: 'change-popup mfp-fade',
            //focus: '.input-edit-ticket',
            items: {
                src: '.change-ticket',
                type: 'inline',
            },
            tClose: 'Закрыть'
        });
        $(document).on('click', '#close-change-form', function (e) {
            e.preventDefault();
            $.magnificPopup.close();
        })
    })();

    (function addDatapickerWithTime() {
        $('.add-form__datapicker-time, .deadline-datapicker').datepicker({
            minDate: new Date(),
            timepicker: true,
            classes: 'deadline',
            autoClose: true,
        });
            $('.deadline-datapicker-wrapper').append($('.deadline'));
    })();

    (function validateChangeForm() {
        $('#change-form').validate({
            rules: {
                TITLE: "required",
            }
        });
    })();

    (function OpenEditComments() {
        $(document).on('click', '.comments__answer, .other-menu__edit, .add-comment', function () {
            var thisEditBlock = $(this).parents('.comments__item').find('.comments-edit');
            var thisItem = $(this).parents('.comments__item-wrapper');
            var addCommentBlock = $('.comments__add-comment');
            var addCommentBlockWrapper = $('.comments__add-comment .comments__item-wrapper');
            var addCommentBlockCommentsEdit = $('.comments__add-comment .comments-edit');
            var allCommentEdit = $('.comments-edit');

            if ($(this).hasClass('other-menu__edit')) {
                thisEditBlock.slideDown(300);
                addCommentBlock.slideUp(300);
                addCommentBlockCommentsEdit.find('.comments-edit__field').val();
                thisItem.find('.ticket-body__files .ticket-body__files-item').append('<div class="del-icon"><span></span><span></span></div>');
            } else if ($(this).hasClass('comments__answer')) {
                var commentsTitle = $(this).siblings('.comments__title').text();
                addCommentBlock.show(0);
                allCommentEdit.slideUp(300);
                addCommentBlockWrapper.hide(0);
                addCommentBlockCommentsEdit.slideDown(300);
                window.ticketViewJS.editorAdd.setData('<b>' + $.trim(commentsTitle) + ',</b> <span> </span>');
                window.ticketViewJS.editorAdd.model.change( writer => {
                    writer.setSelection(window.ticketViewJS.editorAdd.model.document.getRoot(), 'end' );
                });
                window.ticketViewJS.editorAdd.editing.view.focus();
                addCommentBlock.find('#drag-and-drop-zone').dmUploader("reset");
                $('html, body').animate({ scrollTop: $('.comments__add-comment').offset().top }, 500);
            } else if ($(this).hasClass('add-comment')) {
                thisItem.hide(0);
                thisEditBlock.slideDown(300);
                // set focus of editor
                window.ticketViewJS.editorAdd.editing.view.focus();
                addCommentBlock.find('#drag-and-drop-zone').dmUploader("reset");
            }
        });
    })();

    (function canselButton() {
        $(document).on('click','.cancel-button', function () {
            var commentsItem = $(this).parents('.comments__item');
            var editBlock = $(this).parents('.comments-edit');
            var addCommentBlock = $('.comments__add-comment');
            var addCommentWrapper = $('.comments__add-comment .comments__item-wrapper');
            addCommentWrapper.show(0);
            // editBlock.slideUp(300);
            $('.comments-edit').slideUp(300);
            addCommentBlock.show(0);
            $('.comments-edit__field').val('');
            commentsItem.find('.ticket-body__files-block .del-icon').remove();
        });
    })();

    (function callbackModal() {
        $('.callback-link').magnificPopup({
            type:"inline",
        });
    })();
    (function validationCallbackModal() {
        $('.callback-form').validate({});
        $('.callback-form button[type="submit"]').on('click', function () {
           if (!$('.callback-form').valid()) return false;
        });
    })();
    (function addPhoneMask() {
        $('.input-phone').mask('+7 (000)-000-00-00');
    })();
    (function addAnimation() {
        $('.convenience__information').viewportChecker({
            classToAdd: 'active',
        });
        $('.execution__step').viewportChecker({
           classToAdd: 'active',
        });
    })();
    (function addDropDownMenu() {
        $('.submenu').hide();
        $('.header__information-title, .user-information').hover(function () {
            if (document.documentElement.clientWidth > 1280) {
                clearTimeout($.data(this, 'timer'));
                $('.submenu', this).stop(true, true).fadeIn(150);
            }
        }, function () {
            if (document.documentElement.clientWidth > 1280) {
                $.data(this, 'timer', setTimeout($.proxy(function () {
                    $('.submenu', this).stop(true, true).fadeOut(150);
                }, this), 200));
            }
        });
        jQuery('.header__information-title, .user-information').click(function () {
            if (document.documentElement.clientWidth < 1280) {
                if ($('.submenu', this).css('display') == 'none') {
                    $('.submenu', this).fadeIn(150);
                } else {
                    $('.submenu', this).fadeOut(150)
                }
            }
        });
        window.addEventListener("resize", function () {
            $('.submenu').hide();
        }, false);
        window.addEventListener("orientationchange", function () {
            $('.submenu').hide();
        }, false);
    })();
    (function animateAfterAjax() {
        $( document ).ajaxSend(function() {
            $('.preloder').addClass('animated');
        });
        $( document ).ajaxStop(function() {
            $('.preloder').removeClass('animated');
        });
    })();
    (function showNoticeMenu() {
        $('.notice').on('click', function () {
            $('.menu-saidbar').toggleClass('active');
            $(this).toggleClass('active');
        });
    })();
    (function closeNoticeMenu() {
        $('.menu-saidbar__close-button, .menu-saidbar__close-wrapper').on('click', function () {
           $('.menu-saidbar').removeClass('active');
           $('.notice').removeClass('active');
        });
    })();
    $( document ).ajaxSend(function() {
        $('.preloder').addClass('animated');
    });
    $( document ).ajaxStop(function() {
        $('.preloder').removeClass('animated');
    });
    (function addPopupEditTicket() {
        $(document).on('click', '.ticket__edit', function () {
            if ($(this).hasClass('open-popup')) {
                $(this).removeClass('open-popup');
                $('.close-wrapper-for-comments').remove();
            } else {
                $(this).addClass('open-popup');
                $('body').append('<div class="close-wrapper-for-comments"></div>');
            }
        });

        $(document).on('click', '.close-wrapper-for-comments', function () {
            $('.ticket__edit').removeClass('open-popup');
            $(this).remove();
        });
    })();
    (function showLeadTimeModal() {
        $('.add-lead-time').magnificPopup({
            items: {
                src: '.lead-time-popup'
            },
            type: 'inline',
        });
    })();
    (function hideFile() {
        $(document).on('click', '.del-icon', function () {
           var thisParent = $(this).parents('.ticket-body__files-item');
            thisParent.hide(300);
            thisParent.find('.fileDelete').val("Y");
        });
    })();
    (function deleteFile() {
        $(document).on('click','[id^="files_"] .progress-wrapper, [id="files"] .progress-wrapper', function () {
            var thisParent = $(this).parents('.media');
            thisParent.slideUp(300);
            thisParent.find('input').remove();
        });
    })();
    (function addTimeInformation() {
        $(document).on('click', '.tabbed-time__edit', function () {
            var thisTime = $(this).parents('.tabbed-time__item').find('.tabbed-time__hours');
            var massTime = thisTime.text().split(':');
            $('.hour-input').val($.trim(+massTime[0]));
            $('.minutes-input').val($.trim(+massTime[1]));
            $('.second-input').val($.trim(+massTime[2]));
        });
    })();
    (function showModalEdit() {
        $('.tabbed-time__edit').magnificPopup({
            items: {
                src: '#edit-time-modal',
                type: 'inline',
            },
            tClose: 'Закрыть',
        });
    })();
    (function addDatapickerWithTime() {
        $('.add-date').datepicker({
            minDate: new Date(),
            timepicker: true,
            position: "top left",
            autoClose: true,
        });
    })();
    (function deleteTabbedTime() {
        $(document).on('click', '.tabbed-time__delete', function () {
           var thisParent = $(this).parents('.tabbed-time__item');
            thisParent.slideUp(300);
        });
    })();
    (function initWelcomSlider() {
        $('#init-welcome-slider').on('init', function(e, slick) {
            $('.main-block').addClass('animation-slide-1 no-active');
            $('body').addClass('fixed-scroll welcome-slider-active');
        });
        $('#init-welcome-slider').slick({
            slidesToShow: 1,
            slidesToScroll: 1,
            fade: true,
            infinite: false,
            asNavFor: '#init-number-slider',
            adaptiveHeight: true,
            prevArrow: '<button type="button" class="slick-prev welcome-slider__prev"><img src="/local/templates/mmit_support/images/welcome-prev.png" alt="prev"></button>',
            nextArrow: '<button type="button" class="slick-next welcome-slider__next"><img src="/local/templates/mmit_support/images/welcome-next.png" alt="next"></button>'
        });
        $(".welcome-text .slick-arrow").wrapAll("<div class='slick-button-wrapper'></div>");
        $('.slick-button-wrapper').appendTo($('.welcome-slider'));
    })();
    (function initNumberSlider() {
        $('#init-number-slider').slick({
            slidesToShow: 1,
            slidesToScroll: 1,
            infinite: false,
            fade: true,
            arrows: false
        });
        $('#init-number-slider').appendTo('.slick-button-wrapper');
    })();


    (function addAnimationWelcomSlider() {
        $('#init-welcome-slider').on('beforeChange', function(event, slick, currentSlide, nextSlide){
            if (nextSlide == 0) {
                $('.main-block').addClass('animation-slide-1');
            }
            if (nextSlide == 1) {
                $('.header').addClass('animation-slide-2');
            }
            if (nextSlide == 2) {
                $('.header').addClass('animation-slide-3');
            }
            if (nextSlide == 3) {
                $('.main-footer').addClass('animation-slide-4');
            }
        });

        $('#init-welcome-slider').on('beforeChange', function(event, slick, currentSlide) {
            if (currentSlide == 0) {
                $('.main-block').removeClass('animation-slide-1');
            }
            if (currentSlide == 1) {
                $('.header').removeClass('animation-slide-2');
            }
            if (currentSlide == 2) {
                $('.header').removeClass('animation-slide-3');
            }
            if (currentSlide == 3) {
                $('.main-footer').removeClass('animation-slide-4');
            }
        });
    })();

    (function hideWelcomSlider() {
        $('#start-working').on('click', function () {
            $('.welcome-text').hide();
            $('.main-block').removeClass('no-active');
            $('.main-footer').removeClass('animation-slide-4');
            $('body').removeClass('fixed-scroll welcome-slider-active');
        });
    })();
    (function showScoreForm() {
        $('.replenish').magnificPopup({
           mainClass: 'count-score-popup',
           type: 'inline',
           // focus: '.custom-select + .select2-container .select2-selection--single'
        });
    })();

    (function invoiceSummation() {
        if ($('.recharge').length > 0) {
            var comma_separator_number_step = $.animateNumber.numberStepFactories.separator(' ');
            var costOneHours = $('.quantity-num').data('cost-hours');
            var costTwenty = $('.quantity-num').data('cost-more-20');
            var $quantityArrowMinus = $(".quantity-minus");
            var $quantityArrowPlus = $(".quantity-plus");
            var $quantityNum = $(".quantity-num");
            var valueInput = $quantityNum.val();
            var $resultBlock = $('.total');
            var sum = costOneHours;

            $quantityNum.val('').focus().val(valueInput);
            $quantityArrowMinus.addClass('noActive');

            $quantityArrowMinus.on('click', function () {
                valueInput = $quantityNum.val();

                if (valueInput - 1 <= 1) {
                    $(this).addClass('noActive');
                };

                if (valueInput > 20) {
                    sum -= costTwenty;
                    $resultBlock.animateNumber({ number: sum, numberStep: comma_separator_number_step }, 100);
                } else if (valueInput == 20) {
                    sum = costOneHours * 19;
                    $resultBlock.animateNumber({ number: sum, numberStep: comma_separator_number_step }, 100);
                } else if (valueInput > 1 && valueInput < 20) {
                    sum -= costOneHours;
                    $resultBlock.animateNumber({ number: sum, numberStep: comma_separator_number_step }, 100);
                };
            });

            $quantityArrowPlus.on('click', function () {
                valueInput = $quantityNum.val();

                if (valueInput >= 1) {
                    $quantityArrowMinus.removeClass('noActive');
                }

                 if (valueInput < 19) {
                    sum += costOneHours;
                     $resultBlock.animateNumber({ number: sum, numberStep: comma_separator_number_step }, 100);
                 } else if (valueInput == 19) {
                     sum = 20 * costTwenty;
                     $resultBlock.animateNumber({ number: sum, numberStep: comma_separator_number_step }, 100);
                 } else if (valueInput > 19) {
                     sum += costTwenty;
                     $resultBlock.animateNumber({ number: sum, numberStep: comma_separator_number_step }, 100);
                 };
            });

            $quantityNum.keyup(function () {
                valueInput = $quantityNum.val();

                if (valueInput <= 1) {
                    $quantityArrowMinus.addClass('noActive');
                } else {
                    $quantityArrowMinus.removeClass('noActive');
                }

                if (valueInput >= 20) {
                    sum = valueInput * costTwenty;
                    $resultBlock.animateNumber({ number: sum, numberStep: comma_separator_number_step }, 100);
                } else {
                    sum = valueInput * costOneHours;
                    $resultBlock.animateNumber({ number: sum, numberStep: comma_separator_number_step }, 100);
                }
            });
        }
    })();

    (function quantityProducts() {
        var $quantityArrowMinus = $(".quantity-minus");
        var $quantityArrowPlus = $(".quantity-plus");
        var $quantityNum = $(".quantity-num");

        $quantityArrowMinus.click(quantityMinus);
        $quantityArrowPlus.click(quantityPlus);

        function quantityMinus() {
            if ($quantityNum.val() > 1) {
                $quantityNum.val(+$quantityNum.val() - 1);
            }
        }
        function quantityPlus() {
            $quantityNum.val(+$quantityNum.val() + 1);
        }
    })();

    (function banEnter() {
        $('.quantity-num').keydown(function(event){
            if(event.keyCode == 13) {
                event.preventDefault();
                return false;
            }
        });
    })();

    (function initIsotop() {
        if ($('.scores').length > 0) {

            $('.isotop-wrapper').isotope({
                layoutMode : 'vertical',
                hiddenStyle: {
                    opacity: 0,
                    // transform: 'translateY(-100%)'
                },
                visibleStyle: {
                    opacity: 1,
                    // transform: 'translateY(0)'
                },
                transitionDuration: 0,
            });

            $('.tabs-list__item a').click(function(){
                var selector = $(this).attr('data-filter');
                $('.isotop-wrapper').isotope({ filter: selector });
                return false;
            });
        }
    })();
    (function doActiveElements() {
        $('.tabs-list__item a').on('click', function () {
            var thisParent = $(this).parent();
           if (!thisParent.hasClass('active')) {
               $('.tabs-list__item').removeClass('active');
               thisParent.addClass('active');
           }
        });
    })();
    (function initedTicketPopup() {
        $('.create-task').magnificPopup({
            items: {
                src: '.add-popup',
                type: 'inline'
            },
            callbacks: {
               open: function () {
                   var inputValue = $('.input-width-buffer').val();
                   var $buffer = $('.pseudo-date-input__wrapper');
                   var $input = $('.input-width-buffer');

                   initWidthDefault();


                   function initWidthDefault() {
                       // $buffer.text(inputValue);
                       $input.width($buffer.width());
                       // getWidth(".input-width-buffer");
                   }
               }
            },
            mainClass: 'custom-popup'
        });
    })();
    (function addWidthAuto() {

        var $buffer = $('.pseudo-date-input__wrapper');
        var $input = $('.input-width-buffer');

        $input.on('change', function() {
            $input.width($buffer.width());
        });
    })();

    (function addDateDefault() {
        displayDate(new Date(), '.pseudo-date-input__wrapper');
    })();

    (function initDatapicker() {
        $(".custom-datapicker").datetimepicker({
            format: 'd M Y',
            timepicker:false,
            minDate:0,
            todayButton: false,
            className: 'cool-datapicker',
            validateOnBlur: false,
            onSelectDate: function (ct,$i) {
                displayDate(ct, '.pseudo-date-input__wrapper');
            },
            onClose: function (ct,$i) {
                displayDate(ct, '.pseudo-date-input__wrapper');
            }
        });

        $.datetimepicker.setLocale('ru');
    })();
    (function addFocusClass() {
       $('.input-width-buffer').on('focus', function () {
          $(this).addClass('focus-on');
       });
    })();
    (function removeFocusClass() {
        $('.input-width-buffer').on('blur', function () {
           $(this).removeClass('focus-on');
        });
    })();
    (function initCustomInputFile() {
        $('.custome-add-file').dmUploader({
            url: 'backend/upload.php',
            maxFileSize: 3000000,
            dnd: false,
            onDragEnter: function(){
                // Happens when dragging something over the DnD area
                this.addClass('active');
            },
            onDragLeave: function(){
                // Happens when dragging something OUT of the DnD area
                this.removeClass('active');
            },
            onInit: function(){
                // Plugin is ready to use
                ui_add_log('Penguin initialized :)', 'info');
            },
            onComplete: function(){
                // All files in the queue are processed (success or error)
                ui_add_log('All pending tranfers finished');
            },
            onNewFile: function(id, file){
                // When a new file is added using the file selector or the DnD area
                ui_add_log('New file added #' + id);
                ui_multi_add_file(id, file);
            },
            onBeforeUpload: function(id){
                // about tho start uploading a file
                ui_add_log('Starting the upload of #' + id);
                ui_multi_update_file_status(id, 'uploading', 'Uploading...');
                ui_multi_update_file_progress(id, 0, '', true);
            },
            onUploadCanceled: function(id) {
                // Happens when a file is directly canceled by the user.
                ui_multi_update_file_status(id, 'warning', 'Canceled by User');
                ui_multi_update_file_progress(id, 0, 'warning', false);
            },
            onUploadProgress: function(id, percent){
                // Updating file progress
                ui_multi_update_file_progress(id, percent);
            },
        });
    })();

    function displayDate(currentDate, elem) {
        var date = currentDate;
        var options = {
            month: 'long',
            day: 'numeric',
        };
        var convertDay = date.toLocaleString("ru", options);
        var arrDay = convertDay.split(' ');
        var newMonth = arrDay[1];

        arrDay[1] = newMonth.slice(0,3);
        arrDay = arrDay.join(' ');
        $(elem).text(arrDay);

    };
    function getWidth(element) {
        return $(element).width();
    };

// Creates a new file and add it to our list
    function ui_multi_add_file(id, file){
        var template = $('#files-template').text();
        template = template.replace('%%filename%%', file.name);

        template = $(template);
        template.prop('id', 'uploaderFile' + id);
        template.data('file-id', id);

        $('#files').find('li.empty').fadeOut(); // remove the 'no files yet'
        $('#files').prepend(template);
    }

// Changes the status messages on our list
    function ui_multi_update_file_status(id, status, message)
    {
        $('#uploaderFile' + id).find('span').html(message).prop('class', 'status text-' + status);
    }

// Updates a file progress, depending on the parameters it may animate it or change the color.
    function ui_multi_update_file_progress(id, percent, color, active)
    {
        color = (typeof color === 'undefined' ? false : color);
        active = (typeof active === 'undefined' ? true : active);

        var bar = $('#uploaderFile' + id).find('div.progress-bar');

        bar.width(percent + '%').attr('aria-valuenow', percent);
        bar.toggleClass('progress-bar-striped progress-bar-animated', active);

        if (percent === 0){
            bar.html('');
        } else {
            bar.html(percent + '%');
        }

        if (color !== false){
            bar.removeClass('bg-success bg-info bg-warning bg-danger');
            bar.addClass('bg-' + color);
        }
    }
});


// BX.ready(function(){
//     loader = BX('preloder');
//     BX.showWait = function(node, msg) {
//         $('.preloder').addClass('animated');
//     };
//     BX.closeWait = function(node, obMsg) {
//         $('.preloder').removeClass('animated');
//     };
// });

