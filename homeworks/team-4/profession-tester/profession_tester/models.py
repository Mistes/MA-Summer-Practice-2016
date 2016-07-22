from flask_sqlalchemy import SQLAlchemy
from profession_tester import db

class Tests(db.Model):  #     for text data base
    id = db.Column(db.Integer, db.Sequence('test_seq'), primary_key=True)
    name = db.Column(db.String(20), unique=True)
    type = db.Column(db.Integer, unique=False)
    questions = db.relationship('Questions', backref = 'tests', lazy = 'dynamic')

    def __init__(self, name, type):
        self.name = name
        self.type = type

class Questions(db.Model):
    id = db.Column(db.Integer, db.Sequence('quests_seq'), primary_key = True)
    question_body = db.Column(db.String(1000), unique=False)
    test_id = db.Column(db.Integer, db.ForeignKey('tests.id'))
    answers = db.relationship('Answers', backref='questions', lazy='dynamic')

    def __init__(self, question_body):
        self.question_body = question_body


class Answers(db.Model):
    id = db.Column(db.Integer, db.Sequence('answers_seq'), primary_key = True)
    answer_body = db.Column(db.String(1000), unique=False)
    quest_id = db.Column(db.Integer, db.ForeignKey('questions.id'))
    profession_enum = db.Column(db.Integer,  unique=False)

    def __init__(self, answer_body, profession_enum):
        self.answer_body = answer_body
        self.profession_enum = profession_enum