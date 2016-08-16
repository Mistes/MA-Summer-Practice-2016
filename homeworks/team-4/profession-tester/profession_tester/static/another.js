var xmlhttp = new XMLHttpRequest();
var url = "/get-primaries";

xmlhttp.onreadystatechange = function() {
    if (xmlhttp.readyState == 4 && xmlhttp.status == 200) {
        arra = [JSON.parse(xmlhttp.responseText)];
        myFunction(arra);


    }
};
xmlhttp.open("GET", url, true);
xmlhttp.send();

function myFunction(arr){
  var out = "";
        for (b = 0; b < arr[0].primary_tests.length; b++) {
        out += '<li class="answer"><label><input type="radio"  name="answer" id = "radio1" value="'+arr[0].primary_tests[b].test_id+'">' + arr[0].primary_tests[b].name + '</label></li>' ;
         }
            out +='</form>';

 document.getElementById("list-tests").innerHTML = out;
}

function choosetest(){
var check = $('input[name=answer]:checked');
if (check.length > 0) {
    localStorage.primaryTestId = check.val();
      window.location.assign("/");
}
}
