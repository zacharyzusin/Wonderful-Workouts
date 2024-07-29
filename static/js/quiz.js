function goBack() {
    window.history.back();
}

function Submit() {
    if ($("#choices input:checked").length === 0) {
        alert("Please select at least one option before submitting.");
        return; 
    }
    let correct = 1;
    $("#choices input:checked").each(function() {
        const selectedOption = $(this).val();
        const optionData = response.choices.find(option => option.name === selectedOption);
        if (!optionData || !optionData.correct || !selectedOption) {
            correct = 0;
        }
    });

    // Increment the correct or wrong answer count
    let updateScoreEndpoint = '/increment_wrong';
    if(correct === 1){
        updateScoreEndpoint = '/increment_right'
    }
    $.getJSON(updateScoreEndpoint, function(response) {
        console.log("Score updated:", response);
        // Decide what to do next based on whether it's the last question
        window.location.href = `/feedback/${questionIndex}/${correct}`;
    });
}

var selectedOptions = [];
var response; // Placeholder for fetched question data

$(document).ready(function () {
    $.getJSON(`/quiz/${questionIndex}`, function(data) {
        response = data; // Store fetched question data for use in Submit function
        let $container = $('.container');
        $container.empty(); // Clear existing content

        let $header = $('<div class="header row"></div>');
        $header.append($('<div class="col-1 back-btn" onclick="goBack()"><button class="accent-btn">back</button></div>'));
        $header.append($('<div class="col-11 info-title">Knowledge Check</div>'));

        let $main = $('<div class="row"></div>');
        $main.append($('<div class="question">' + data["question"] + '</div>'));

        $container.append($header);
        $container.append($main);

        $container.append($('<ul id="choices"></ul>'));
        $container.append($('<p>You selected: <span id="selectedOptions"></span></p>'));

        if(questionIndex == 0){
            $.getJSON('/reset_right_wrong', function(response) {
                console.log("Score updated:", response);
            });
        }

        $container.append($('<button class="accent-btn" id="submit" onclick="Submit()">Submit</button>'));

        $.each(data["choices"], function(index, choice) {
            let listItem;
            if (choice.image===""){
                listItem = $('<li><input type="checkbox" value="' + choice.name + '"><label>' + choice.name + '</label></li>');
            }
            else {
                listItem = $('<li><input type="checkbox" value="' + choice.name + '"><label>' + choice.name + '</label><img src="' + choice.image + '" alt="' + choice.name + '"></li>');
            }
            $('#choices').append(listItem);
        });

        // Event listener for checkbox changes
        $('#choices').on('change', 'input[type="checkbox"]', function() {
            selectedOptions = [];
            // Iterate over checked checkboxes
            $('#choices input:checked').each(function() {
                selectedOptions.push($(this).val());
            });
            // Update the display
            $('#selectedOptions').text(selectedOptions.join(', '));
        });
    }).fail(function() {
        console.error("Error loading question data.");
    });
});
