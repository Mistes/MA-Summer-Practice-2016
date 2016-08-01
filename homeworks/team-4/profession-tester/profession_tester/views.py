from flask import json, jsonify, render_template
from profession_tester import app, models, db
from flask_security import SQLAlchemyUserDatastore,login_required

Tests = models.Tests
Questions = models.Questions
Answers = models.Answers
Primaries = models.PrimaryTests
Categories = models.Categories
SubCategories = models.SubCategories


test = {
	'name': 'Test 3',
	'type': 1,
	'is_primary': True,
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

category = {
	'name': 'Engineer',
	'subcats': [
		{
			'name': 'Engineer-mechanic',
			'text': 'You were born for this!'
		}
	]
}

def jsonify_test(my_test):
	tmp_questions = []
	for q in my_test.questions:		
		tmp_answers = []
		for a in q.answers:
			if my_test.isprimary: 
				tmp_answers.append({
					'body': a.answer_body,
					'key': a.category_enum
				})
			else:
				tmp_answers.append({
					'body': a.answer_body,
					'key': a.podcategory_enum
				})
		tmp_questions.append({
			'body': q.question_body,
			'answers': tmp_answers
		})
	return {
		'id': my_test.id,
		'name': my_test.name,
		'type': my_test.type,
		'is_primary': my_test.isprimary,
		'questions': tmp_questions
	}
@app.route('/save-new-category', methods = ['GET', 'POST'])
def save_new_category():
	#category = get_this_stuff_somehow()
	
	form = Categories(category['name'])
	for s in category['subcats']:
		form.subcats.append(SubCategories(s['name'], s['text']))
	db.session.add(form)
	db.session.commit()
	return 'OK'

@app.route('/get-primaries', methods = ['GET'])
def get_primarytests():
	primary_tests = Tests.query.filter_by(isprimary = True).all()
	formatted_list = []
	for t in primary_tests:
		formatted_list.append({
			'name': t.name,
			'test_id': t.id
		})
	return json.dumps({'primary_tests': formatted_list}, ensure_ascii = False)

@app.route('/get-keys', methods = ['GET'])
def get_keys():
	keys = Categories.query.all()
	formatted_list = []
	for k in keys:	
		tmp_subcats = []
		for subk in k.subcats:
			tmp_subcats.append({
				'name': subk.name,
				'category_enum': subk.category_enum
			})
		formatted_list.append({
			'name': k.name,
			'category_enum': k.category_enum,
			'subcats': tmp_subcats
		})
	return json.dumps({'keys': formatted_list}, ensure_ascii = False)

@app.route('/get-congrats/<int:enum>', methods = ['GET'])
def get_congrats(enum):
	key = SubCategories.query.filter_by(category_enum = enum).first()
	return key.text

@app.before_first_request
def create_user():
    db.create_all()
    db.session.commit()


@app.route('/')
def index():
    return render_template('index.html')

@app.route('/save-test', methods = ['GET', 'POST'])#123
def save_test():
	#test = get_this_stuff_somehow()

	form = Tests(test['name'], test['type'], test['is_primary'])
	for q in test['questions']:
		tmp = Questions(q['body'])
		for a in q['answers']:
			if test['is_primary']:
				tmp.answers.append(Answers(a['body'], a['key'], -1))
			else:
				tmp.answers.append(Answers(a['body'], -1, a['key']))
		form.questions.append(tmp)
	db.session.add(form)
	db.session.commit()

	return 'OK'

@app.route


@app.route('/admin')
@login_required
def admin():
	return 'hello world!'

@app.route('/tests', methods = ['GET'])
def get_all_tests():
	tests = Tests.query.all()

	formatted_tests = []
	for t in tests:
		formatted_tests.append(jsonify_test(t))

	#return json.dumps(test, ensure_ascii=False)

	return json.dumps({'tests': formatted_tests}, ensure_ascii=False)
	#return jsonify({'tests': formatted_tests})
#return json.dumps({'tests': formatted_tests}, ensure_ascii=False)
@app.route('/tests/<int:id>', methods = ['GET'])
def get_test(id):
	test = Tests.query.get_or_404(id)
	return json.dumps(jsonify_test(test),ensure_ascii=False)
	

@app.route('/tests/request-test/<name>/<int:type>', methods = ['GET', 'POST'])
def get_next_test(name, type):
	test = Tests.query.filter_by(name = name, type = type).first()
	return json.dumps(jsonify_test(test),ensure_ascii=False)