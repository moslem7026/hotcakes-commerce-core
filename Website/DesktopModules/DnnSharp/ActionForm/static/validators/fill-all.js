dnnsfjQuery(function () {

    var $ = dnnsfjQuery;
    for (var i = 0; i < 10; i++) {
        (function (igroup) {
            $.validator && $.validator.addMethod('group' + igroup + '-FillAll', function (value, element) {
                var isValid = true;
                var isAtLeastOneFilled = false;
                var isAtLeastOneNotFilled = false;

                var groupInputs = $(element).parents('.c-form:first').find('.group' + igroup + '-FillAll');

                groupInputs.each(function (index, input) {
                    if ($(input).is(':checked') || $.trim(input.value).length > 0) {
                        isAtLeastOneFilled = true;
                        if (isAtLeastOneNotFilled) {
                            return false;
                        }
                    } else if (isAtLeastOneFilled) {
                        isAtLeastOneNotFilled = true;
                        return false;
                    } else {
                        isAtLeastOneNotFilled = true;
                    }
                });

                if (isAtLeastOneFilled && isAtLeastOneNotFilled) {
                    isValid = false;
                }

                // validate the rest of the controls in the group, but watch out for recursion
                if (!window['group' + igroup + '-FillAll-check']) {
                    window['group' + igroup + '-FillAll-check'] = true;
                    groupInputs.each(function () {
                        if ($(this).valid()) { // using the structure of tabspro, repair this if it changes
                            $(this).closest('.tab-content').prev().find('.tabButton.active > .tabLink').removeClass('has-error');
                        } else {
                            $(this).closest('.tab-content').prev().find('.tabButton.active > .tabLink').addClass('has-error');
                        }
                    });
                    window['group' + igroup + '-FillAll-check'] = false;
                }
                return isValid;
            }, 'All fields in this group are required');
        })(i);
    }
});