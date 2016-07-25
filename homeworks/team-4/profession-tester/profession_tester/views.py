from flask import json, jsonify
from profession_tester import app, models, db

Tests = models.Tests					

def jsonify_test(my_test):
	tmp_answers = []
	tmp_questions = []
	for q in my_test.questions:
		for a in q.answers:
			tmp_answers.append({
				'body': a.answer_body,
				'profession': a.profession_enum
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
					

@app.route('/')
def hello():
	return 'Hello, World!'

@app.route('/tests', methods = ['GET'])
def get_all_tests():
	tests = Tests.query.all()

	formatted_tests = []
	tmp_answers = []
	tmp_questions = []
	for t in tests:
		formatted_tests.append(jsonify_test(t))

	return jsonify({'tests': formatted_tests})

@app.route('/tests/<int:id>', methods = ['GET'])
def get_test(id):
	test = Tests.query.get_or_404(id)
	return jsonify(jsonify_test(test))
	

@app.route('/tests/request-test/<name>/<int:type>', methods = ['GET', 'POST'])
def get_next_test(name, type):
	test = Tests.query.filter_by(name = name, type = type).first()
	return jsonify(jsonify_test(test))