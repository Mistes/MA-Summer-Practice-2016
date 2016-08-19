<!DOCTYPE html>
<html lang="en">
    <head>
        <meta charset="utf-8">
        <meta http-equiv="X-UA-Compatible" content="IE=edge">
        <meta name="viewport" content="width=device-width, initial-scale=1">
        <title>admin</title>
        <link rel="shortcut icon" href="{{ url_for('static', filename='favicon.ico') }}">
        <link href="https://fonts.googleapis.com/css?family=Open+Sans:400,600,700" rel="stylesheet">
        <link rel="stylesheet" href="{{ url_for('static', filename='main.css')}}">
    </head>
    <body>
        <header class="admin-header">
            <div class="content-wrap">
                <button class="button-add-test btn-red little-btn btn-add-test" type="button" onclick="addNewTest()">Додати тест</button>
            </div>
        </header>
        <section class="test-menu">
            <div class="content-wrap">
                <ul class="list-admin-tests">
                    <li class="admin-test">
                        <h4 class="regular-admin-txt"><a href="#">Перший тест на профорiєнтацiю</a></h4>
                        <div class="btns">
                            <button class="button-edit-test btn-white little-btn" type="button">Редагувати</button>
                            <button class="button-delete-test btn-red little-btn" type="button">Видалити</button>
                        </div>
                    </li>
                </ul>
            </div>
        </section>
        <script src="https://code.jquery.com/jquery-latest.min.js"></script>
        <script src="{{ url_for('static', filename='jquery.serialize-object.min.js')}}"></script>
        <script type="text/javascript" src="{{ url_for('static', filename='admin.js')}}"></script>
    </body>
</html>
