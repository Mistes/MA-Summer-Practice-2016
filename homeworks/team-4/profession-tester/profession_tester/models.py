from flask_sqlalchemy import SQLAlchemy
from profession_tester import db
from flask_security import Security, SQLAlchemyUserDatastore, UserMixin, RoleMixin, login_required

class PrimaryTests(db.Model):
    id = db.Column(db.Integer, db.Sequence('primary_seq'), primary_key = True)
    names = db.Column(db.String(1000), unique=False)
    test_id = db.Column(db.Integer, unique=False)

    def __init__(self, names, test_id):
        self.names = names
        self.test_id =test_id


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
    category_enum = db.Column(db.Integer,  unique=False)

    def __init__(self, answer_body, category_enum):
        self.answer_body = answer_body
        self.category_enum = category_enum

class Categories(db.Model):
    id = db.Column(db.Integer, db.Sequence('cat_seq'), primary_key=True)
    name = db.Column(db.String(200), unique=True)
    category_enum = db.Column(db.Integer)
    subcats = db.relationship('SubCategories', backref='categories', lazy='dynamic')

    def __init__(self, name, category_enum):
        self.name = name
        self.category_enum = category_enum


class SubCategories(db.Model):
    id = db.Column(db.Integer, db.Sequence('subcat_seq'), primary_key=True)
    name = db.Column(db.String(200), unique=True)
    cat_id = db.Column(db.Integer, db.ForeignKey('categories.id'))
    category_enum = db.Column(db.Integer)

    def __init__(self, name, category_enum):
        self.name = name
        self.category_enum = category_enum


roles_users = db.Table('roles_users',
                           db.Column('user_id', db.Integer(), db.ForeignKey('user.id')),
                           db.Column('role_id', db.Integer(), db.ForeignKey('role.id')))


class Role(db.Model, RoleMixin):
    id = db.Column(db.Integer(), primary_key=True)
    name = db.Column(db.String(80), unique=True)
    description = db.Column(db.String(255))


class User(db.Model, UserMixin):  # for registration
    id = db.Column(db.Integer, primary_key=True)
    email = db.Column(db.String(255), unique=True)
    password = db.Column(db.String(255))
    active = db.Column(db.Boolean())
    confirmed_at = db.Column(db.DateTime())
    roles = db.relationship('Role', secondary=roles_users,
                            backref=db.backref('users', lazy='dynamic'))

    def __init__(self, username, email):
        self.username = username
        self.email = email

    def __repr__(self):
        return '<User %r>' % self.username