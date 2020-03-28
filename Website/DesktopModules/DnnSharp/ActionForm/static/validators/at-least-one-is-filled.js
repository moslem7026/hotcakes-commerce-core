dnnsfjQuery(function () {

    var $ = dnnsfjQuery;
    for (var i = 0; i < 10; i++) {
        (function (igroup) {

            $.validator && $.validator.addMethod('group' + igroup + '-AtLeastOneIsFilled', function (value, element) {
                var isValid = false;
                $(element).parents('.c-form:first').find('.group' + igroup + '-AtLeastOneIsFilled').each(function (index, input) {
                    if (input.type == 'checkbox' || input.type == 'radio') {
                        if ($(input).is(':checked')) {
                            isValid = true;
                        }
                    } else {
                        if (!isValid && $.trim(input.value).length > 0) {
                            isValid = true;
                        }
                    }
                });

                // validate the rest of the controls in the group, but watch out for recursion
                if (!window['group' + igroup + '-AtLeastOneIsFilled-check']) {
                    window['group' + igroup + '-AtLeastOneIsFilled-check'] = true;
                    $(element).parents('.c-form:first').find('.group' + igroup + '-AtLeastOneIsFilled').each(function () {
                        if ($(this).valid()) { // using the structure of tabspro, repair this if it changes
                            $(this).closest('.tab-content').prev().find('.tabButton.active > .tabLink').removeClass('has-error');
                        } else {
                            $(this).closest('.tab-content').prev().find('.tabButton.active > .tabLink').addClass('has-error');
                        }
                    });
                    window['group' + igroup + '-AtLeastOneIsFilled-check'] = false;
                }
                return isValid;
            }, 'At least one field is required');
        })(i);
    }
});