from flask import json, jsonify, render_template, request, send_from_directory
from profession_tester import app, models, db
from sqlalchemy import exists
from flask_security import SQLAlchemyUserDatastore,login_required
import os


Tests = models.Tests
Questions = models.Questions
Answers = models.Answers
Primaries = models.PrimaryTests
Categories = models.Categories
SubCategories = models.SubCategories


test = {
	"name": "Main test",
	"type": 2,
	"is_primary": "False",
	"questions": [ {
			"body": "Однією з моїх найкращих рис характеру є:",
			"answers": [ {
					"body": "креативність, життєрадісність",
					"key": 127
				},
				{
					"body": "організаторські здібності",
					"key": 129
				},
				{
					"body": "ретельність та уважність",
					"key": 128
				},
				{
					"body": "комунікабельність",
					"key": 130
				}
			]
		},
		{
			"body": "За якими критеріями Ви б обирали свою майбутню роботу?",
			"answers": [ {
					"body": "Рівень заробітку",
					"key": 128
				},
				{
					"body": "Можливість кар'єрного росту",
					"key": 130
				},
				{
					"body": "Можливість для креативу, відсутність рутини",
					"key": 127
				},
				{
					"body": "Репутація компанії, дружній колектив",
					"key": 129
				}
			]
		},
		{
			"body": "На що б ви витратили свою першу зарплату?",
			"answers": [ {
					"body": "На вечірку з друзями",
					"key": 127
				},
				{
					"body": "Віддам батькам",
					"key": 128
				},
				{
					"body": "Оновлю гардероб",
					"key": 129
				},
				{
					"body": "Відкладу на власну справу",
					"key": 130
				}
			]
		},
		{
			"body": "Що б Ви хотіли придбати найперше якби у Вас була достатня кількість грошей:",
			"answers": [ {
					"body": "брендовий одяг",
					"key": 127
				},
				{
					"body": "квартиру",
					"key": 128
				},
				{
					"body": "невеликий бізнес",
					"key": 129
				},
				{
					"body": "навколосвітню подорож",
					"key": 130
				}
			]
		},
		{
			"body": "Найбільших успіхів Ви досягаєте, коли:",
			"answers": [ {
					"body": "Працюю з людьми, які мені подобаються",
					"key": 130
				},
				{
					"body": "У мене цікава робота",
					"key": 129
				},
				{
					"body": "Мої зусилля добре винагороджуються",
					"key": 128
				},
				{
					"body": "Робота приносить користь суспільству",
					"key": 127
				}
			]
		},
		{
			"body": "Яку б країну Ви хотіли б відвідати в першу чергу:",
			"answers": [ {
					"body": "США",
					"key": 127
				},
				{
					"body": "Італію",
					"key": 129
				},
				{
					"body": "Тайланд",
					"key": 130
				},
				{
					"body": "Китай",
					"key": 128
				}
			]
		}
	]
}


category = {
	"name": u"Дизайн",
	"subcats": [
		{
  			"name": u"Дизайн інтер’єру",
  			"text": u"Найкраще для тебе підійде спеціальність «Комп’ютерний дизайн інтер’єру та меблів»! \
					\
				Твоя ідеальна професія може бути пов’язана з комп’ютерним дизайном інтер’єру і меблів. Ти креативний, вмієш приймати нестандартні рішення, маєш чудово розвинену фантазію, уяву, образне мислення, володієш гарною інтуїцією та відчуттям стилю, мрієш зробити все, що тебе оточує, кращим. \
				В майбутньому ти можеш стати як Вернер Пантон, якого вважають революціонером в області дизайну інтер’єру та меблів. Пантон багато експериментував і стверджував, що меблі не обов'язково повинні мати традиційну форму. Його знамениті проекти стільців – Tivoli, Bachelor і Cone – вважалися свого часу найбільш незвичайними стільцями в світі. Вернер вважав, що стільці повинні бути не тільки зручні, але і цікаві. Найзнаменитіший стілець дизайнера – Panton Chair був зроблений з єдиного шматка формованого пластика. Крім стільців, дизайнер придумав більш 25 різних форм для ламп. \
				Також Пантон займався дизайном текстилю та інтер'єрів, створивши інтер'єри для видавничих будинків «Spiegel» і «Gruner & Jahr» в Гамбурзі, а також для готелю «Astoria» в Тронхеймі. \
				Цікавий факт! Модель крісла CONE CHAIR, перевернутий конус, була настільки футуристичною і шокуючою для свого часу, що, коли одного разу її виставили у вітрині магазину виробника в Нью-Йорку, виник справжній переполох. Поліції довелося наводити порядок, щоб відновити дорожній рух навпроти шоурума. \
				Дану професію ти можеш опанувати обравши навчання у ЧДБК за освітньою програмою «Комп’ютерний дизайн інтер’єру та меблів»."
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
					'key1': a.category_enum,
					'key2': a.second_category_enum
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

@app.route('/get-image/<int:enum>', methods = ['GET'])
def get_image(enum):
	uploads = os.path.join(app.root_path, app.config['UPLOAD_FOLDER'])
	return send_from_directory(directory=app.config['UPLOAD_FOLDER'], filename=str(enum)+'.jpg')

@app.route('/save-image/<int:enum>', methods = ['GET', 'POST'])
def save_image(enum):
	file = request.files['file']
	if file and allowed_file(file.filename):
		filename = secure_filename(file.filename)
		file.save(os.path.join(app.config['UPLOAD_FOLDER'], filename))
		return 'OK'
	return 'NOT OK'

@app.route('/save-new-category', methods = ['GET', 'POST'])
def save_new_category():
	category = request.json
	if Categories.query.filter_by(name = category['name']).count():
		form = Categories.query.filter_by(name = category['name']).first()
		form.name = category['name']
	else:
		form = Categories(category['name'])
	for s in category['subcats']:
		form.subcats.append(SubCategories(s['name'], s['text']))
	db.session.commit()
	return ' "OK" '

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
	#test = request.json
	form = Tests(test['name'], test['type'], test['is_primary'])
	for q in test['questions']:
		tmp = Questions(q['body'])
		for a in q['answers']:
			if test['is_primary']=="True":
				tmp.answers.append(Answers(a['body'], a['key1'], a['key2'], -1))
			else:
				tmp.answers.append(Answers(a['body'], -1, -1, a['key']))
		form.questions.append(tmp)
	db.session.add(form)
	db.session.commit()

	return 'OK'

@app.route


@app.route('/admin', methods = ['GET', 'POST'])
@login_required
def admin():
	return render_template('admin.html')

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

@app.route('/delete-test/<int:id>', methods = ['GET'])
def delete_test(id):
	test = Tests.query.get_or_404(id)
	for q in test.questions:
		Answers.query.filter_by(quest_id = q.id).delete()
	Questions.query.filter_by(test_id = test.id).delete()
	db.session.delete(test)
	db.session.commit()
	return 'OK'

@app.route('/tests/request-test/<name>/<int:type>', methods = ['GET', 'POST'])
def get_next_test(name, type):
	test = Tests.query.filter_by(name = name, type = type).first()
	return json.dumps(jsonify_test(test),ensure_ascii=False)

@app.route('/congrats', methods = ['GET', 'POST'])
def congrats():
	return render_template('congrats.html')

@app.route('/add-category', methods = ['GET', 'POST'])
def addcat():
	return render_template('add-category.html')

@app.route('/add-new-test', methods = ['GET', 'POST'])
def addtest():
	return render_template('add-new-test.html')

