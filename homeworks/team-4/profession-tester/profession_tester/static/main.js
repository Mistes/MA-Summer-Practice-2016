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
    var out = "",
        i;

    for(i = 0; i < arr.length; i++) {
        out += '<h3>' + arr[i].questions[i].body + '</h3>';
    }
    document.getElementById("list-questions").innerHTML = out;
}