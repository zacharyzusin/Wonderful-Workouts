async function loadWorkout(index) {
    try {
        const response = await fetch(`/workout/${index}`);
        if (!response.ok) {
            throw new Error('Workout not found');
        }
        const workout = await response.json();
        
        document.getElementById('workout-name').textContent = workout.name || 'Workout name not available';
        document.getElementById('workout-description').textContent = workout.description || 'Description not available';
        document.getElementById('workout-image').src = workout.image_link || '';
        document.getElementById('workout-image').alt = workout.name || 'Workout image';
        document.getElementById('muscle-groups').textContent = workout.muscle_groups.join(', ') || 'Muscle groups not specified';
        document.getElementById('workout-gif-link').src = workout.gif_link;
        document.getElementById('workout-gif-link').style.display = 'block';
    } catch (error) {
        console.error('Error loading workout:', error);
        document.getElementById('workout-container').innerHTML = '<p>Error loading workout. Please try again later.</p>';
    }
}
