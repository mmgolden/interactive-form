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

// JavaScript Frameworks Workshop — Tuesday 9am-12pm, $100
// Express Workshop — Tuesday 9am-12pm, $100

// JavaScript Libraries Workshop — Tuesday 1pm-4pm, $100
// Node.js Workshop — Tuesday 1pm-4pm, $100

// Get the checkboxes
const checkboxes = $('input[type=checkbox]');
// Create div element to hold total
const $totalDiv = $('<div class="total"></div>');
// Total
let total = 0;

// Appends the total amount to 'Register for Activities'
function appendTotal(total) {
    if($('.total span')) {
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

// When a checkbox is checked
checkboxes.on('change', function() {

    // JavaScript Frameworks Workshop
    if ($('input[name=all]').is(':checked') && $('input[name=js-frameworks]').is(':checked')) {

        total = 300;
        appendTotal(total);
        disableCheckbox('express');

    // Main Conference
    } else if ($('input[name=all]').is(':checked')) {

        total = 200;
        appendTotal(total);
        removeDisabled();

    // Otherwise remove the total and any disabled labels and checkboxes
    } else {

        $('.total span').remove();
        removeDisabled();

    }
});
