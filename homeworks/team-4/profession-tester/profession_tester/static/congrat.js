var xmlhttp = new XMLHttpRequest();

 testid ="get-congrats/" + Number(localStorage.part);


var url = 'http://127.0.0.1:5000/' + testid;

xmlhttp.onreadystatechange = function() {
    if (xmlhttp.readyState == 4 && xmlhttp.status == 200) {
        myArr = xmlhttp.responseText;
     document.getElementById("cong").innerHTML = myArr;

    }
};
xmlhttp.open("GET", url, true);
xmlhttp.send();

