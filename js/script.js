// Set focus on the first text field
$('#name').focus();

// Hide the t-shirt 'Color' menu
$('#colors-js-puns').hide();

// If the 'other' option is selected for the job role, show the 'other-title' input field, otherwise hide it
$('#other-title').hide();
$('#title').on('change', function() {
    $(this).val() === 'other' ? $('#other-title').slideDown() : $('#other-title').slideUp();
});

// Get the options from the t-shirt 'Color' menu
const colorOptions = $('#color option');

// Remove the design theme names from the t-shirt 'Color' menu
colorOptions.each(function(){
    $(this).text($(this).text().replace('(JS Puns shirt only)', '').replace('(I ♥ JS shirt only)', ''));
});

// Append the option to the t-shirt 'Color' menu if the value matches the color
function appendColorOptions(firstColor, secondColor, thirdColor) {
    $('#colors-js-puns').fadeIn();
    $('#color').append(colorOptions.filter(function() {
        return $(this).val() === firstColor || $(this).val() === secondColor || $(this).val() === thirdColor;
    }));
}

// For the t-shirt 'Color' menu, only display the color options that match the design selected in the 'Design' menu
$('#design').on('change', function() {

    // First, remove all of the options
    colorOptions.remove();

    // If the user selects "Theme - JS Puns" then the color menu should only display "Cornflower Blue," "Dark Slate Grey," and "Gold."
    if ($(this).val() === 'js puns') {

        appendColorOptions('cornflowerblue', 'darkslategrey', 'gold');

    // If the user selects "Theme - I ♥ JS" then the color menu should only display "Tomato," "Steel Blue," and "Dim Grey."
    } else if ($(this).val() === 'heart js') {

        appendColorOptions('tomato', 'steelblue', 'dimgrey');

    // Otherwise, hide the t-shirt 'Color' menu
    } else {
        $('#colors-js-puns').fadeOut();
    }
});

// Get the checkboxes
const checkboxes = $('input[type=checkbox]');
// Create div element to hold total
const $totalDiv = $('<div class="total"></div>');

// Appends the total amount to 'Register for Activities'
function appendTotal(total) {
    if($('.total span') && total > 0) {
        $('.total span').remove();
        $('.activities').append($totalDiv);
        $totalDiv.append(`<span>Total: $${total}</span>`);
    }
}

// Disables the checkbox
function disableCheckbox(name) {
    $(`input[name=${name}]`).get(0).disabled = true;
    $(`input[name=${name}]`).parent().addClass('disabled');
}

// Removes disabled from the labels and checkboxes
function removeDisabled() {
    checkboxes.each(function() {
        $('.disabled').removeClass('disabled');
        $(this).get(0).disabled = false;
    });
}

// Returns the total cost
function getTotal() {

    // Start with zero total
    let total = 0;

    // Iterate over each checkbox that is checked
    $('input[type=checkbox]:checked').each(function() {

        // Get the label
        const activity = $(this).parent().text();

        // Get the dollar amount from the label
        const cost = parseInt(activity.substr(activity.length - 3, activity.length));

        // Total
        total = total + cost;
    });

    // If the total is 0, then remove the total from the page
    if (total === 0) {
        $('.total span').remove();
    // Otherwise return the total
    } else {
        return total;
    }
}

// Conflicts
const conflicts = {
    'js-frameworks': 'express',
    'express': 'js-frameworks',
    'js-libs': 'node',
    'node': 'js-libs'
};

// Show the conflicts
function showConflicts() {
    
    // Iterate over each checkbox that is checked
    $('input[type=checkbox]:checked').each(function() {

        // Get the name
        let name = $(this).get(0).name;

        // If there is a property in the conflicts object that matches the name
        if (conflicts.hasOwnProperty(name)) {

            // Then disable the checkbox and label that conflicts with that name
            disableCheckbox(conflicts[name]);
        }
    });
}

// When a checkbox is checked
checkboxes.on('change', function() {

    // Display the total
    appendTotal(getTotal());

    // Remove disabled from checkboxes and labels
    removeDisabled();

    // Show the conflicts
    showConflicts();

});

// Get DOM elements
const creditCard = $('#credit-card');
const paypal = $('#credit-card').next();
const bitcoin = $('#credit-card').next().next();

// Hides all of the payment options
function hidePayments() {
    creditCard.hide();
    paypal.hide();
    bitcoin.hide();
}

// The "Credit Card" payment option is selected by default 
$('option[value="credit card"]').get(0).selected = true;

// Disable the "Select Payment Method" option
$('option[value="select_method"]').get(0).disabled = true;

// Hide the "PayPal" and "Bitcoin" information and show the "Credit Card" information
hidePayments();
creditCard.show();

// Payment option in the select menu matches the payment option displayed on the page
$('#payment').on('change', function() {

    // When a user selects the "PayPal" payment option, the PayPal information is displayed
    if ($(this).val() === 'paypal') {

        hidePayments();
        paypal.fadeIn();

    // When a user selects the "Bitcoin" payment option, the Bitcoin information is displayed
    } else if ($(this).val() === 'bitcoin') {

        hidePayments();
        bitcoin.fadeIn();

    // When a user selects the "Credit Card" payment option, the credit card information is displayed
    } else if ($(this).val() === 'credit card') {

        hidePayments();
        creditCard.fadeIn();

    }
});

// Checks if the name field is blank
function isNameValid() {
    return $('#name').val().length > 0; 
}

// Checks if the email address is validly formatted
// Regular expression copied from http://www.jquerybyexample.net/2011/04/validate-email-address-using-jquery.html
function isEmailValid() {
    const email = $('#mail').val();
    const filter = /^([\w-\.]+)@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.)|(([\w-]+\.)+))([a-zA-Z]{2,4}|[0-9]{1,3})(\]?)$/;
    return filter.test(email) ? true : false;
}

// User must select at least one checkbox under the "Register for Activities" section of the form.
function isActivityChecked() {
    return $('input[type=checkbox]:checked').length > 0;
}

// Checks if credit card information is valid
function isCreditCardValid() {

    // If "PayPal" is selected, then return true
    if ($('#payment').val() === 'paypal') {
        return true;

    // If "Bitcoin" is selected, then return true
    } else if ($('#payment').val() === 'bitcoin') {
        return true;

    // If "Credit Card" is selected, test for validation
    } else if ($('#payment').val() === 'credit card') {

        const ccNum = $('#cc-num').val();
        const zip = $('#zip').val();
        const cvv = $('#cvv').val();
        // Regular expression copied from https://stackoverflow.com/questions/1779013/check-if-string-contains-only-digits
        const filter = /^\d+$/;

        // If the value contains numbers 0-9
        if (filter.test(ccNum) && filter.test(zip) && filter.test(cvv)) {

            // Credit Card field should only accept a number between 13 and 16 digits
            // The Zip Code field should accept a 5-digit number
            // The CVV should only accept a number that is exactly 3 digits long
            return ccNum.length >= 13 && ccNum.length <= 16 && zip.length === 5 && cvv.length === 3;

        } else {
            return false;
        }

    }
}

// Check if all fields pass validation
function checkValidation() {
    return isNameValid() && isEmailValid() && isActivityChecked() && isCreditCardValid();
}

// If checkValidation() is false, disable the submit button. If it's true, enable the submit button
function enableSubmit() {
    $('button[type=submit]').get(0).disabled = !checkValidation();
}

// Change the color of the submit button if checkValidation() is false
function changeBtnColor() {
    if ($('button[type=submit]').get(0).disabled = true && !checkValidation()) {
        $('button[type=submit]').addClass('disabled-btn');
    } else if ($('button[type=submit]').get(0).disabled = true && checkValidation()) {
        $('button[type=submit]').removeClass('disabled-btn');
    }
}

// Show an error
function showError(element, msg) {
    // If an error message exists, first remove it
    removeError(element);

    // Change the border color
    element.addClass('text-input-error');

    // Add the error message
    const $msgDiv = $('<div class="error-msg"></div>');
    $msgDiv.text(msg);
    element.after($msgDiv);
}

// Remove the error
function removeError(element) {
    element.removeClass('text-input-error');
    if (element.next().prop('class', 'error-msg')) {
        element.next().remove()
    }
}

// If the name input is not valid, show error. Otherwise, remove error and enable submission
$('#name').on('keyup focus', function() {
    if (!isNameValid()) {
        showError($(this), 'Please enter a name.');
    } else {
        removeError($(this));
        enableSubmit();
    }
});

// If the email input is not valid, show error. Otherwise, remove error and enable submission
$('#mail').on('keyup focus', function() {
    if (!isEmailValid()) {
        showError($(this), 'Please enter a valid email.');
    } else {
        removeError($(this));
        enableSubmit();
    }
});


$('input[type=checkbox]').change(isActivityChecked).change(changeBtnColor).change(enableSubmit);
$('#payment').change(isCreditCardValid).change(changeBtnColor).change(enableSubmit);

$('#credit-card input').on('keyup focus', function() {

    if (!isCreditCardValid()) {

        if ($(this).get(0).id === 'cc-num') {

            showError($(this), 'Please enter a credit card number.');

        } else if ($(this).get(0).id === 'zip') {

            showError($(this), 'Please enter a zip code.');

        } else if ($(this).get(0).id === 'cvv') {

            showError($(this), 'Please enter a CVV.');

        }

    } else {
        removeError($(this));
        enableSubmit();
    }

});

changeBtnColor();


// The following fields should have some obvious form of an error indication:
// Register for Activities checkboxes (at least one must be selected)


enableSubmit();