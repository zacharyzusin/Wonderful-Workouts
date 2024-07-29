// let data = {
//     "question": "Question 1: Which of these exercises do not target the legs?",
//     "choices": [
//         { name: "Deadlift", image: "https://www.journalmenu.com/wp-content/uploads/2018/03/deadlift-gif-side.gif" },
//         { name: "Barbell Calf Raises", image: "https://i.pinimg.com/originals/ea/79/a2/ea79a21eccabf85d0ef6222eb7a96984.gif" },
//         { name: "Cable Flys", image: "https://i0.wp.com/www.strengthlog.com/wp-content/uploads/2020/03/cable-chest-fly.gif?fit=600%2C600&ssl=1" },
//         { name: "Bulgarian Split Squats", image: "https://media2.giphy.com/media/g0Kz180GdPYCsKqMyf/giphy.gif?cid=6c09b952sgiw9gkn503ewp34mrk64ouh2bzn1luq865i6voq&ep=v1_internal_gif_by_id&rid=giphy.gif&ct=g" }
//     ],
//     "correct": "true",
//     "response": "Cable Flys target the chest muscles and not the legs!",
//     "review": "info.html",
//     "next": "quiz.html",
//     "exercise": "Cable Flys"
// };

var review_index = 0;

function goBack() {
    window.history.back();
}

function review() {
    window.location.href = `/view_workout/${review_index}`;
}

function next() {
    if (questionIndex + 1 < totalQuestions) {
        // questionIndex++; // Prepare to load the next question
        window.location.href = `/view_quiz/${questionIndex+1}`;
    } else {
        // Last question, navigate to the results page
        window.location.href = '/quiz_results';
    }
    
}

$(document).ready(function () {
    $.getJSON(`/review/${questionIndex}/${isRight}`, function(data) {
        // let response = data; // Store fetched question data for use in Submit function
        let $container = $('.container');
        let $header = $('<div class="header row"></div>');
        // $header.append($('<div class="col-5 back-btn" onclick="goBack()"><button>back</button></div>'));
        $header.append($('<div class="col-12 info-title">Knowledge Check</div>'));

        let $correct = $('<div class="row"></div>');
        if (isRight === 1) {
            $correct.append($('<div class="correct">CORRECT!</div>'));
        }
        else {
            $correct.append($('<div class="incorrect">INCORRECT!</div>'));
            let reviewIndex = data["review"][0]; // Assuming data is defined and has review info
            let reviewName = encodeURIComponent(data["review"][1]); // Encode the name for URL
            let reviewUrl = `/add_topic_review/?index=${reviewIndex}&name=${reviewName}`;
            // Make the GET request to the Flask route
            $.getJSON(reviewUrl, function(response) {
                if (response.success) {
                    console.log("Workout added to review list:", response.message);
                } else {
                    console.error("Failed to add workout to review list:", response.message);
                }
            }).fail(function() {
                console.error("Error sending topic to review.");
            });
        }
        review_index = data["review"][0]
        let $main = $('<div class="row"></div>');
        $main.append($('<div class="response">' + data["response"] + '</div>'));


        $container.append($header);
        $container.append($correct);
        $container.append($main);

        $container.append($('<div class="review"><button id="submit" class="accent-btn" onclick="review()">Click Here to Review '+ data["review"][1] +'</button></div>'));
        $container.append($('<div class="next"><button id="next-btn" class="accent-btn" onclick="next()">Next Question</button></div>'))
    }).fail(function() {
        console.error("Error loading question data.");
    });
});