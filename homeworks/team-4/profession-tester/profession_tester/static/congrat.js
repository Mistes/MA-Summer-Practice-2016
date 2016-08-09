var xmlhttp = new XMLHttpRequest();

 testid ="get-congrats/" + Number(localStorage.part);


var url = '/' + testid;

xmlhttp.onreadystatechange = function() {
    if (xmlhttp.readyState == 4 && xmlhttp.status == 200) {
        myArr = xmlhttp.responseText;
     document.getElementById("cong").innerHTML = myArr;

    }
};
xmlhttp.open("GET", url, true);
xmlhttp.send();

function resetbutton(){
     localStorage.clear();
      window.location.assign("/");

}