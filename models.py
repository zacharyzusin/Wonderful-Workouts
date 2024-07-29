class Workout:
    def __init__(self, name, upper, muscle_groups, description, gif_link, image_link):
        self.name = name
        self.upper = upper
        self.muscle_groups = muscle_groups
        self.description = description
        self.gif_link = gif_link
        self.image_link = image_link

class Option:
    def __init__(self, title, correct, media_link):
        self.title = title
        self.correct = correct
        self.media_link = media_link

class Question:
    def __init__(self, title, description, options, topic_to_review):
        self.title = title
        self.description = description
        self.options = options
        self.topic_to_review = topic_to_review