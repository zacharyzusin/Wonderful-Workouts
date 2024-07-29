let info = {
    "exercise": "Bench Press",
    "description": "The bench press exercises your pectoralis major, the primary muscle in your chest. It also hits your triceps (arms) and your deltoids (shoulders)!",
    "image": "https://i0.wp.com/www.strengthlog.com/wp-content/uploads/2021/11/Bench-press-muscles-worked.jpg?resize=700%2C700&ssl=1",
    "gif": "https://www.inspireusafoundation.org/wp-content/uploads/2022/05/barbell-pause-bench.gif"
};

function goBack() {
    // Check if the referrer is the specific page
    if (document.referrer.includes('create_workout')) {
        // Navigate to the referrer URL
        window.location.href = document.referrer;
    } else {
        // Use history.back() as a fallback
        window.history.back();
        // window.location.href = document.referrer;
    }
}

async function loadWorkout(index) {
    try {
        const response = await fetch(`/workout/${index}`);
        if (!response.ok) {
            throw new Error('Workout not found');
        }
        const workout = await response.json();
        console.log(workout);
        // document.getElementById('workout-name').textContent = workout.name || 'Workout name not available';
        // document.getElementById('workout-description').textContent = workout.description || 'Description not available';
        // document.getElementById('workout-image').src = workout.image_link || '';
        // document.getElementById('workout-image').alt = workout.name || 'Workout image';
        // document.getElementById('muscle-groups').textContent = workout.muscle_groups.join(', ') || 'Muscle groups not specified';
        // document.getElementById('workout-gif-link').src = workout.gif_link;
        // document.getElementById('workout-gif-link').style.display = 'block';
        let $container = $('.container');
        let $header = $('<div class="header row"></div>');
        $header.append($('<div class="col-5 back-btn" onclick="goBack()"><button class="accent-btn">back</button></div>'));
        $header.append($('<div class="col-7 info-title">' + workout.name + '</div>'));

        let $main = $('<div class="row"></div>');
        let $left = $('<div class="image col-7"></div>');
        let $right = $('<div class="description col-4"></div>');


        $right.append($('<div class="muscles"><img src="' + workout.image_link + '" alt="' + workout.name + ' muscles image" class="img-fluid"></div>'));
        $right.append($('<div class="info">' + workout.description + '</div>'));
        $left.append($('<img src="' + workout.gif_link +'" alt="' + workout.name + ' gif" class="img-fluid">'));

        

        $container.append($header);
        $main.append($left);
        $main.append('<div class="col-1 vertical-divider"></div>');
        $main.append($right);
        $container.append($main);
    } catch (error) {
        console.error('Error loading workout:', error);
        document.getElementById('workout-container').innerHTML = '<p>Error loading workout. Please try again later.</p>';
    }
}