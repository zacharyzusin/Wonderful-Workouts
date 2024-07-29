from flask import Blueprint, render_template, jsonify, request, make_response
from models import Workout, Question
from data import workouts, questions, right_answers, wrong_answers
from weasyprint import HTML
import data
main = Blueprint('main', __name__)

workouts_to_review = []
routine_A = []
routine_B = []
routine_A_List = []
routine_B_List = []

@main.route('/')
def render_homepage():
    return render_template('home.html')

# Define global variables to store lists
routineA = []
routineB = []
workoutExercises = [
  "Bench Press",
  "Cable Fly",
  "Bicep curls",
  "Tricep Extensions",
  "Lateral Raises",
  "Pull Ups",
  "Squats",
  "Calf Raises",
  "Seated Cable Row",
  "Deadlifts"
]
openedExercises = []

@main.route('/update_lists', methods=['POST'])
def update_lists():
    global routineA, routineB, workoutExercises, openedExercises
    # Extract updated lists from JSON data sent in the request
    data = request.get_json()
    routineA = data['routineA']
    routineB = data['routineB']
    
    workoutExercises = data['workoutExercises']
    openedExercises = data['openedExercises']
    # Send response indicating success
    # print(routineA, routineB, workoutExercises)
    return jsonify({'message': 'Lists updated successfully'}), 200

@main.route('/get_lists')
def get_lists():
    global routineA, routineB, workoutExercises, openedExercises
    print(routineA, routineB, workoutExercises, openedExercises)
    return jsonify({
        'routineA': routineA,
        'routineB': routineB,
        'workoutExercises': workoutExercises,
        'openedExercises': openedExercises
    })


@main.route('/view_workout/<int:val>')
def index(val):
    return render_template('info.html', index=val)

@main.route('/workouts')
def get_workouts():
    return jsonify([vars(workout) for workout in workouts])

@main.route('/increment_right')
def increment_right():
    data.right_answers += 1
    return jsonify({'right_answers': data.right_answers})

@main.route('/reset_right_wrong')
def reset_right():
    data.right_answers = 0
    data.wrong_answers = 0
    workouts_to_review = []
    return jsonify({'right_answers': data.right_answers, 'wrong_answers': data.wrong_answers})

@main.route('/get_right')
def get_right():
    return jsonify({'right_answers': data.right_answers})

@main.route('/get_wrong')
def get_wrong():
    return jsonify({'wrong_answers': data.wrong_answers})

@main.route('/increment_wrong')
def increment_wrong():
    data.wrong_answers += 1
    return jsonify({'wrong_answers': data.wrong_answers})

@main.route('/add_topic_review/', methods=['GET'])
def add_topic_review():
    index = request.args.get('index', type=int)  # Gets the index from query string
    name = request.args.get('name', default="", type=str)  # Gets the name from query string
    
    # Append to the list as a tuple (index, name) or in any structure that you require
    workouts_to_review.append((index, name))
    
    # You might want to redirect to another page or confirm the addition
    return jsonify(success=True, message="Workout added to review list.")


@main.route('/save_routines/', methods=['POST'])
def save_routines():
    data = request.json 
    global routine_A
    global routine_B
    global routine_A_List
    global routine_B_List
    print("Routine A:", data['routineA'])
    print("Routine B:", data['routineB'])
    routine_A = data['routineA']
    routine_B = data['routineB']
    routine_A_List = [f"{exercise} - 3 sets and 10 reps" for exercise in data['routineA']]
    routine_B_List = [f"{exercise} - 3 sets and 10 reps" for exercise in data['routineB']]

    return jsonify(success=True, message="Routines saved successfully.")

@main.route('/generate__workout_pdf')
def generate_pdf():
    global routine_A_List
    global routine_B_List
    rendered_html = render_template('workout_routines_template.html', routine_a=routine_A_List, routine_b=routine_B_List)
    html = HTML(string=rendered_html)
    pdf = html.write_pdf()

    response = make_response(pdf)
    response.headers['Content-Type'] = 'application/pdf'
    response.headers['Content-Disposition'] = 'inline; filename=workout_routines.pdf'

    return response

if __name__ == '__main__':
    app.run(debug=True)

@main.route('/workout/<int:index>')
def get_workout_by_index(index):
    if index < 0 or index >= len(workouts):
        return jsonify({'error': 'Workout not found'}), 404
    workout = workouts[index]
    return jsonify(vars(workout))

@main.route('/quiz/<int:index>')
def get_quiz_by_index(index):
    if index < 0 or index >= len(questions):
        return jsonify({'error': 'Question not found'}), 404
    question = questions[index]
    # Prepare question data for JSON response
    question_data = {
        'question': question.title,
        'choices': [
            {'name': option.title, 'image': option.media_link, 'correct': option.correct} for option in question.options
        ]
    }
    return jsonify(question_data)

@main.route('/review/<int:index>/<int:correct>')
def get_review_by_index(index, correct):
    if index < 0 or index >= len(questions):
        return jsonify({'error': 'Question not found'}), 404
    question = questions[index]
    # Prepare question data for JSON response
    data = {
        'question': question.title,
        'choices': [
            {'name': option.title, 'image': option.media_link, 'correct': option.correct} for option in question.options
        ],
        'review': question.topic_to_review,
        'response': question.description
    }
    return jsonify(data)


@main.route('/view_quiz/<int:val>')
def quiz(val):
    return render_template('quiz.html', index=val)

@main.route('/feedback/<int:val>/<int:correct>')
def review(val, correct):
    return render_template('result.html', index=val, isCorrect=correct, numQuestions=len(questions))


@main.route('/create_workout') #0 if boy, 1 if girl
def create_workout():
    return render_template('create_workout.html')

@main.route('/quiz_results')
def quiz_results():
    # Render a template that shows quiz results
    # For demonstration, passing the counts directly, but you might want to pass more detailed results or retrieve them in the template
    return render_template('quiz_results.html', right_answers=data.right_answers, wrong_answers=data.wrong_answers, review_topics=workouts_to_review)