from flask import Flask, render_template, request, redirect,url_for,flash
from flask_sqlalchemy import SQLAlchemy
from testing_app import app, db, models

Entries = models.Entries
Comments = models.Comments

@app.route('/')                    #     index page
def show_entries():
    myAll = list(reversed(Entries.query.all()))
    return render_template('index.html', entries=Entries,myAll = myAll)

