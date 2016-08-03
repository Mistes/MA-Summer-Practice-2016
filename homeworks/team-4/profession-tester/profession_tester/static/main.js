var xmlhttp = new XMLHttpRequest();
var url = 'http://127.0.0.1:5000/tests/1';

xmlhttp.onreadystatechange = function() {
    if (xmlhttp.readyState == 4 && xmlhttp.status == 200) {
        var myArr = [JSON.parse(xmlhttp.responseText)];
        myFunction(myArr);
    }
};
xmlhttp.open("GET", url, true);
xmlhttp.send();

function myFunction(arr) {
    var out = "";


    for(a = 0; a < arr.length; a++) {
        for (b = 0; b < arr[a].questions.length; b++) {
            out +='<li class="question"><form><h3>' + arr[a].questions[b].body + '</h3><ul>' ;
            for (c = 0; c < arr[a].questions[b].answers.length; c++) {
                out += '<li class="answer"><label><input type="radio" name="answer">' + arr[a].questions[b].answers[c].body + '</label></li>';
            }
            out +='</ul></form></li>';
        }
    }
    document.getElementById("list-questions").innerHTML = out;
}