from flask import Flask
from flask_sqlalchemy import SQLAlchemy

app = Flask(__name__)
app.config['SQLALCHEMY_DATABASE_URI'] = 'postgresql://postgres:1@localhost/tests'
app.config['SECRET_KEY']= 'its_strongly_secret'
app.debug =True

db = SQLAlchemy(app)

import profession_tester.models