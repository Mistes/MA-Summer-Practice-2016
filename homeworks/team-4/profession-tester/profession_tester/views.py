from flask import json, jsonify, render_template
from profession_tester import app, models, db
from flask_security import SQLAlchemyUserDatastore

Tests = models.Tests
Questions = models.Questions
Answers = models.Answers

test = {
	'name': 'Test 3',
	'type': 1,
	'questions': [ {
			'body': 'Question 1',
			'answers': [ {
					'body': 'Answer 1',
					'key': 2
				}
			]
		}
	]
}

def jsonify_test(my_test):
	tmp_answers = []
	tmp_questions = []
	for q in my_test.questions:
		for a in q.answers:
			tmp_answers.append({
				'body': a.answer_body,
				'profession': a.category_enum
			})
		tmp_questions.append({
			'body': q.question_body,
			'answers': tmp_answers
		})
		tmp_answers = []
	return {
		'id': my_test.id,
		'name': my_test.name,
		'type': my_test.type,
		'questions': tmp_questions
	}
					
@app.before_first_request
def create_user():
    db.create_all()
    db.session.commit()


@app.route('/')
def index():
    return render_template('index.html')

@app.route('/save-test/<int:is_primary>', methods = ['GET', 'POST'])
def save_test(is_primary):
	#test = get_this_stuff_somehow()	

	form = Tests(test['name'], test['type'])
	for q in test['questions']:
		tmp = Questions(q['body'])
		for a in q['answers']:
			tmp.answers.append(Answers(a['body'], a['key']))
		form.questions.append(tmp)
	db.session.add(form)
	db.session.commit()
	
	return 'OK'
	

@app.route('/tests', methods = ['GET'])
def get_all_tests():
	tests = Tests.query.all()

	formatted_tests = []
	tmp_answers = []
	tmp_questions = []
	for t in tests:
		formatted_tests.append(jsonify_test(t))

	return json.dumps(test, ensure_ascii=False)

@app.route('/tests/<int:id>', methods = ['GET'])
def get_test(id):
	test = Tests.query.get_or_404(id)
	return jsonify(jsonify_test(test))
	

@app.route('/tests/request-test/<name>/<int:type>', methods = ['GET', 'POST'])
def get_next_test(name, type):
	test = Tests.query.filter_by(name = name, type = type).first()
	return jsonify(jsonify_test(test))