from flask import jsonify
from profession_tester import app, models, db

Tests = models.Tests

example_tests = [
	{
		'id': 1,
		'name': u'profession-test',
		'type': 1,
		'questions': [
			{
				'body': u'Question 1',
				'answers': [
					{
						'body': u'Answer 1',
						'profession': 1
					},
					{
						'body': u'Answer 2',
						'profession': 2
					}
				]
			}
		]
	}
]
					
						

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
		for q in t.questions:
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
		formatted_tests.append({
			'id': t.id,
			'name': t.name,
			'type': t.type,
			'questions': tmp_questions
		})
		tmp_questions = []

	return jsonify({'tests': formatted_tests}), 
200, {'Content-Type': 'application/json'}

@app.route('/tests/<int:id>', methods = ['GET'])
def get_test(id):
	test = Tests.query.get(id)
	tmp_answers = []
	tmp_questions = []
	for q in test.questions:
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
	return jsonify({
		'id': test.id,
		'name': test.name,
		'type': test.type,
		'questions': tmp_questions
	})

