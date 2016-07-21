from flask import Flask
from flask_sqlalchemy import SQLAlchemy
from flask_security import Security, SQLAlchemyUserDatastore, UserMixin, RoleMixin, login_required

app = Flask(__name__)
app.config['SQLALCHEMY_DATABASE_URI'] = 'postgresql://postgres:1@localhost/tests'
app.config['SECRET_KEY']= 'its_really_important'
app.config['SECURITY_REGISTERABLE'] = True
app.debug =True

db = SQLAlchemy(app)


