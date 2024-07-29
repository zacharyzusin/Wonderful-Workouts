from models import Workout, Question, Option

# Workouts
workouts = [
    Workout(
        name="Bench Press",
        upper=True,
        muscle_groups=["Chest", "Arms", "Shoulders"],
        description="The <span class='highlight-exercise'>bench press</span> is one of the most common chest focused compound lifts. It primarily targets the <span class='highlight-muscle'>pectoralis major</span> (chest), but it also hits the <span class='highlight-muscle'>triceps</span> (back of your arms) and the <span class='highlight-muscle'>front deltoids</span> (front of your shoulders).",
        gif_link="https://www.inspireusafoundation.org/wp-content/uploads/2022/05/barbell-pause-bench.gif",
        image_link="https://i0.wp.com/www.strengthlog.com/wp-content/uploads/2021/11/Bench-press-muscles-worked.jpg?resize=700%2C700&ssl=1"
    ),
    Workout(
        name="Cable Flys",
        upper=True,
        muscle_groups=["Chest", "Shoulders", "Arms"],
        description="<span class='highlight-exercise'>Cable flys</span> are most common chest exercise for the cable machine. It focuses on the <span class='highlight-muscle'>pectoralis major</span> and the incline of the cables can be set differently to target the upper and lower areas of the chest.",
        gif_link="https://www.inspireusafoundation.org/wp-content/uploads/2023/08/cable-fly.gif",
        image_link="https://i0.wp.com/www.strengthlog.com/wp-content/uploads/2023/06/muscles-worked-in-standing-cable-flyes.png?resize=700%2C700&ssl=1"
    ),
    Workout(
        name="Bicep Curls",
        upper=True,
        muscle_groups=["Arms"],
        description="<span class='highlight-exercise'>Bicep curls</span> is the primary exercise for your <span class='highlight-muscle'>biceps</span> (upper area of your arms). It can be done with dumbbells or a barbell and there are multiple variations that can hit different parts of your bicep!",
        gif_link="https://homeworkouts.org/wp-content/uploads/anim-dumbbell-bicep-curls.gif",
        image_link="https://i0.wp.com/www.strengthlog.com/wp-content/uploads/2023/05/Muscles-worked-in-the-hammer-curl-2.png?resize=700%2C700&ssl=1"
    ),
    Workout(
        name="Tricep Extensions",
        upper=True,
        muscle_groups=["Arms"],
        description="<span class='highlight-exercise'>Tricep extensions</span> are a popular triceps exercise on the cable machine. This exercise isolates the <span class='highlight-muscle'>triceps</span> and the <span class='highlight-muscle'>core</span>. It uses the rope attachment and can be done standing or kneeling if you are taller.",
        gif_link="https://fitnessvolt.com/wp-content/uploads/2023/09/Cable-Rope-Tricep-Extension.gif",
        image_link="https://i0.wp.com/www.strengthlog.com/wp-content/uploads/2023/05/muscles-worked-in-tricep-pushdown-2.png?resize=700%2C700&ssl=1"
    ),
    Workout(
        name="Lateral Raise",
        upper=True,
        muscle_groups=["Shoulders"],
        description="<span class='highlight-exercise'>Lateral raises</span> is the primary exercise for your <span class='highlight-muscle'>shoulders</span> (deltoids, specifically the side deltoids). It only requires a set of light weight dumbbells, but it can also be done with cables or an exercise band. You can also do it in one arm at a time.",
        gif_link="https://homeworkouts.org/wp-content/uploads/anim-dumbbell-lateral-raise.gif",
        image_link="https://i0.wp.com/www.strengthlog.com/wp-content/uploads/2023/05/Muscles-worked-by-dumbbell-lateral-raise-2.png?resize=700%2C700&ssl=1"
    ),
    Workout(
        name="Pull Ups",
        upper=True,
        muscle_groups=["Upper Back"],
        description="<span class='highlight-exercise'>Pull ups</span> are an extremely popular body weight exercise that targets your <span class='highlight-muscle'>upper back</span> and your <span class='highlight-muscle'>lats</span>. There are multiple variations that each have various pros and cons. If body weight is not sufficient, a weighted plate can be added and if body weight is too difficult, some gyms contain assisted pull up machines.",
        gif_link="https://www.inspireusafoundation.org/wp-content/uploads/2022/11/pull-up.gif",
        image_link="https://i0.wp.com/www.strengthlog.com/wp-content/uploads/2020/10/Muscles-worked-by-lat-pulldown-with-pronated-grip.png?resize=700%2C700&ssl=1"
    ),
    Workout(
        name="Squats",
        upper=False,
        muscle_groups=["Quads", "Calves", "Hamstrings"],
        description="<span class='highlight-exercise'>Squats</span>, a fundamental lower body exercise, target the <span class='highlight-muscle'>quads, calves, and hamstrings</span>. They come in several variations, each with distinct advantages. Additional weights can be used to increase difficulty, while modifications like box squats can aid those improving form or seeking a lighter challenge.",
        gif_link="https://www.inspireusafoundation.org/wp-content/uploads/2022/03/barbell-full-squat.gif",
        image_link="https://i0.wp.com/www.strengthlog.com/wp-content/uploads/2020/05/Squat-muscles-worked.png?resize=700%2C700&ssl=1"
    ),
    Workout(
        name="Calf Raises",
        upper=False,
        muscle_groups=["Calves"],
        description="<span class='highlight-exercise'>Calf raises</span>, a focused lower body exercise, primarily strengthen the <span class='highlight-muscle'>calves</span>. They offer different variations to suit individual needs. Additional resistance can be added for intensity, or performed on one leg for balance and strength enhancement in each calf separately.",
        gif_link="https://www.inspireusafoundation.org/wp-content/uploads/2022/11/standing-calf-raise.gif",
        image_link="https://i0.wp.com/www.strengthlog.com/wp-content/uploads/2020/10/Muscles-worked-by-calf-raises.png?resize=700%2C700&ssl=1"
    ),
    Workout(
        name="Seated Cable Row",
        upper=False,
        muscle_groups=["Upper back", "Lower Back"],
        description="<span class='highlight-exercise'>Seated cable rows</span>, an effective upper body exercise, target both the <span class='highlight-muscle'>upper and lower back</span>. They come in multiple variations, each tailored to specific training goals. Adjustable resistance on the cable machine allows for scaling difficulty up or down, catering to both advanced practitioners and those focusing on technique or rehabilitation.",
        gif_link="https://www.inspireusafoundation.org/wp-content/uploads/2023/09/cable-row.gif",
        image_link="https://i0.wp.com/www.strengthlog.com/wp-content/uploads/2023/03/Muscles-worked-by-seated-cable-row-with-close-grip.png?resize=700%2C700&ssl=1"
    ),
    Workout(
        name="Deadlifts",
        upper=False,
        muscle_groups=["Lower Back"],
        description="<span class='highlight-exercise'>Deadlifts</span>, a powerful strength exercise, mainly work the <span class='highlight-muscle'>lower back</span>. Available in various forms, each version offers distinct benefits. To increase difficulty, heavier weights can be employed, while technique adjustments can assist beginners or those focusing on form improvement.",
        gif_link="https://www.kettlebellkings.com/cdn/shop/articles/barbell-deadlift-movement.gif?v=1692228918",
        image_link="https://i0.wp.com/www.strengthlog.com/wp-content/uploads/2020/04/Deadlift-muscles-worked.png?resize=700%2C700&ssl=1"
    )
]

# Quiz Questions
questions = [
    Question(
        title="Which of these exercises do not target the legs?",
        description="Cable flys target the chest muscles and not the legs!",
        options=[
            Option(title = "Deadlift", correct = False, media_link = ""),
            Option(title =  "Barbell Calf Raises", correct = False, media_link = ""),
            Option(title =  "Cable Flys", correct = True, media_link = ""),
            Option(title =  "Bulgarian Split Squats", correct  = False, media_link = "")
        ],
        topic_to_review=[1, 'Cable Flys']
    ),
    Question(
        title="Which of these muscles/muscle groups are not exercised when doing Bench Press?",
        description="Bench Press does not target the rear deltoids, but it does target the front deltoids!",
        options=[
            Option(title = "Triceps", correct = False, media_link = "https://i0.wp.com/www.strengthlog.com/wp-content/uploads/2023/05/muscles-worked-in-tricep-pushdown-2.png?resize=700%2C700&ssl=1"),
            Option(title =  "Pectoralis Major", correct = False, media_link = "https://cdn.shopify.com/s/files/1/1214/5580/files/Muscle_Group_Chest.jpg?v=1601050935"),
            Option(title =  "Front Shoulders", correct = False, media_link = "https://i0.wp.com/www.strengthlog.com/wp-content/uploads/2023/05/Muscles-worked-by-dumbbell-lateral-raise-2.png?resize=700%2C700&ssl=1"),
            Option(title =  "Rear Deltoids", correct  = True, media_link = "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSf8_iDvtGeUQaQurLc2lylg-aLXX_nzzdDbKhKzQPdtw&s")
        ],
        topic_to_review=[0, 'Bench Press']
    ),
    Question(
        title="Which of these exercises activates the shoulders?",
        description="Incline dumbbell press primarily targets the front of the shoulder, while lateral raise targets the sides.",
        options=[
            Option(title = "Incline Dumbbell Press", correct = True, media_link = ""),
            Option(title =  "Lateral Raise", correct = True, media_link = ""),
            Option(title =  "Tricep Extensions", correct = False, media_link = ""),
            Option(title =  "Deadlift", correct  = False, media_link = "")
        ],
        topic_to_review=[4, 'Lateral Raise']
    ),
    Question(
        title="Which of these are not back exercises?",
        description="Pull Ups, Seated Cable Row, and Deadlifts all target the back. Tricep Extensions focus on the triceps (arms), and the core.",
        options=[
            Option(title = "Pull Ups", correct = False, media_link = ""),
            Option(title =  "Seated Cable Row", correct = False, media_link = ""),
            Option(title =  "Tricep Extensions", correct = True, media_link = ""),
            Option(title =  "Deadlift", correct  = False, media_link = "")
        ],
        topic_to_review=[3, 'Tricep Extensions']
    ),
    Question(
        title="Tom makes a workout consisting of bicep curls, cable flys, and squats. Which exercise could Tom add that wouldn't significantly overlap with the other exercises?",
        description="Pull Ups primarily exercise the upper back. This is an area that is not targeted by bicep curls, cable flys, nor squats.",
        options=[
            Option(title = "Hammer Curls", correct = False, media_link = "https://www.inspireusafoundation.org/wp-content/uploads/2022/04/dumbbell-hammer-curl.gif"),
            Option(title =  "Deadlifts", correct = False, media_link = "https://www.inspireusafoundation.org/wp-content/uploads/2022/02/barbell-deadlift-movement.gif"),
            Option(title =  "Bench Press", correct = False, media_link = "https://www.inspireusafoundation.org/wp-content/uploads/2022/09/dumbbell-incline-chest-press.gif"),
            Option(title =  "Pull Ups", correct  = True, media_link = "https://www.inspireusafoundation.org/wp-content/uploads/2022/11/pull-up.gif")
        ],
        topic_to_review=[5, 'Pull Ups']
    ),
    Question(
        title="Among these options, which exercise is recognized for its effectiveness in developing the quadriceps / quads?",
        description="Squats mainly target the quads along with the glutes.",
        options=[
            Option(title = "Squats", correct = True, media_link = "https://images.squarespace-cdn.com/content/v1/54f9e84de4b0d13f30bba4cb/1530743652042-8AW6T0MPM6Q0JYEV6AO9/image-asset.gif"),
            Option(title =  "Bicep Curls", correct = False, media_link = "https://i.pinimg.com/originals/8c/53/27/8c532774e4e1c524576bf1fb829ad895.gif"),
            Option(title =  "Calf Raises", correct = False, media_link = "https://j.gifs.com/RO4wnE.gif"),
            Option(title =  "Lateral Raise", correct  = False, media_link = "https://media1.popsugar-assets.com/files/thumbor/amiSLqpzADWhPqO2hG66PhVmm4c/fit-in/2048xorig/filters:format_auto-!!-:strip_icc-!!-/2021/08/27/563/n/1922729/aa68e9e8bceb23e0_IMB_owiHQs/i/Lateral-Raise.GIF")
        ],
        topic_to_review=[6, 'Squats']
    ),
    Question(
        title="Jane is looking for exercises to make their legs stronger. Which workout would be the most appropriate to achieve this?",
        description="Calf raises is the only exercise in the options which targets a muscle in the leg (calves).",
        options=[
            Option(title = "Calf Raises", correct = True, media_link = ""),
            Option(title =  "Cable Flys", correct = False, media_link = ""),
            Option(title =  "Lateral Raises", correct = False, media_link = ""),
            Option(title =  "Pull Ups", correct  = False, media_link = "")
        ],
        topic_to_review=[7, 'Calf Raises']
    ),
    Question(
        title="Which exercise among the following is primarily designed to enhance lower back strength?",
        description="Deadlifts primarily target the lower back muscles.",
        options=[
            Option(title = "Deadlifts", correct = True, media_link = "https://www.journalmenu.com/wp-content/uploads/2018/03/deadlift-gif-side.gif"),
            Option(title =  "Pull ups", correct = False, media_link = "https://j.gifs.com/vlJr9V.gif"),
            Option(title =  "Lateral Raises", correct = False, media_link = "https://media1.popsugar-assets.com/files/thumbor/amiSLqpzADWhPqO2hG66PhVmm4c/fit-in/2048xorig/filters:format_auto-!!-:strip_icc-!!-/2021/08/27/563/n/1922729/aa68e9e8bceb23e0_IMB_owiHQs/i/Lateral-Raise.GIF"),
            Option(title =  "Seated Cable Rows", correct  = False, media_link = "https://i0.wp.com/www.strengthlog.com/wp-content/uploads/2020/03/cable-row-seated-narrow-grip.gif?resize=600%2C600&ssl=1")
        ],
        topic_to_review=[9, 'Deadlifts']
    )
]

wrong_answers = 0 

right_answers = 0

