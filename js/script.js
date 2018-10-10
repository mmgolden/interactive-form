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
    total = getTotal();
    appendTotal(total);

    // Remove disabled from checkboxes and labels
    removeDisabled();

    // Show the conflicts
    showConflicts();

});
