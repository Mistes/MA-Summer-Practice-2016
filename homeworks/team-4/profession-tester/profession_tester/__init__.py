from flask import Flask
from flask_sqlalchemy import SQLAlchemy
from flask_security import Security, SQLAlchemyUserDatastore, UserMixin, RoleMixin, login_required

app = Flask(__name__)
app.config['SQLALCHEMY_DATABASE_URI'] = 'postgresql://klwbcufpwwaqof:LsaNKpIUluX6bFk25y8s3xB5jt@ec2-46-137-73-65.eu-west-1.compute.amazonaws.com/dfahgkdhn025cn'
app.config['SECRET_KEY']= 'its_strongly_secret'
app.config['SECURITY_REGISTERABLE']= True
app.config['UPLOAD_FOLDER']= 'images'
app.debug =True

db = SQLAlchemy(app)

import profession_tester.models, profession_tester.views

user_datastore = SQLAlchemyUserDatastore(db, models.User, models.Role)
security = Security(app, user_datastore)