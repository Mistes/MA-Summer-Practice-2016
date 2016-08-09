var xmlhttp = new XMLHttpRequest();

if(localStorage.ids){
var ids = JSON.parse(localStorage.getItem("ids"));
}
else var ids = [];
counter = 0;
if(localStorage.part){
   if(localStorage.isprimary == 2){
       window.location.href = '/congrats';
   }

 testid ="tests/" + Number(localStorage.part);
}
else {testid = "tests/1";}
var url = 'http://127.0.0.1:5000/' + testid;

function wipedata(){
        localStorage.removeItem("ids");
        localStorage.removeItem("tempanalog");
        localStorage.removeItem("numberOfQuestions");
        }

xmlhttp.onreadystatechange = function() {
    if (xmlhttp.readyState == 4 && xmlhttp.status == 200) {
        myArr = [JSON.parse(xmlhttp.responseText)];
        myFunction(myArr);


    }
};
xmlhttp.open("GET", url, true);
xmlhttp.send();

function myFunction(arr) {

    var out = "",
        numQuestions = "",
        nameTest = "";

    for(a = 0; a < arr.length; a++) {
        nameTest += arr[a].name;
        for (b = 0; b < arr[a].questions.length; b++) {
            var n = b+1;
            numQuestions = 'Всього питань: ' + arr[a].questions.length;
            out +='<li class="question hide"><form><h3 class="title-question">' + n + '. ' + arr[a].questions[b].body + '</h3><ul class="list-answers">' ;
            for (c = 0; c < arr[a].questions[b].answers.length; c++) {
                out += '<li class="answer"><label><input type="radio"  name="answer" id = "radio1" value="'+  arr[a].questions[b].answers[c].key+'">' + arr[a].questions[b].answers[c].body  + '</label></li>';
            }
            out +='</ul></form></li>';
        }

    }

    document.getElementById("num-questions").innerHTML = numQuestions;
    document.getElementById("name-test").innerHTML = nameTest;
    document.getElementById("list-questions").innerHTML = out;
}

function clickCounter() {

  myvalue = $('input[type=radio][name=answer]:checked').val();

 if ($('input[name=answer]:checked').length > 0) {
    arr = myArr;
    if(typeof(Storage) !== "undefined") {

        if (localStorage.numberOfQuestions ) {

            if(Number(localStorage.numberOfQuestions && localStorage.numberOfQuestions)!==0){
            localStorage.numberOfQuestions = Number(localStorage.numberOfQuestions)-1;
            localStorage.tempanalog = Number(localStorage.tempanalog)-1;

            ids[localStorage.tempanalog] = myvalue;
            localStorage.setItem("ids", JSON.stringify(ids));

            $('input[type=radio][name=answer]').prop('checked', false);
            } else {
                sorting();
            }



        } else {

            localStorage.numberOfQuestions = (arr[0].questions.length)-3;
            localStorage.tempanalog = (arr[0].questions.length)-2;


            ids[localStorage.tempanalog] = myvalue;
            localStorage.setItem("ids", JSON.stringify(ids));

            $('input[type=radio][name=answer]').prop('checked', false);
        }
    }
}
 else alert("Спочатку вибери свою відповідь");
}
function partTwo() {
    sorting();
    localStorage.numberOfQuestions = 0;
}


function sorting() {
var stored = JSON.parse(localStorage.getItem("ids"));
var arr=stored;

var arr2={};
for(i in arr){
(arr2[arr[i]]!=undefined)?(arr2[arr[i]]++):(arr2[arr[i]]=1);
}
    var harr = [];
    for (var key in arr2) {
    if (arr2.hasOwnProperty(key)) {
        harr.push(arr2[key]);
    }
}
harr.sort().reverse();
    Object.prototype.getKeyByValue = function( value ) {
    for( var prop in this ) {
        if( this.hasOwnProperty( prop ) ) {
             if( this[ prop ] === value )
                 return prop;
        }
    }
};
    var first =  arr2.getKeyByValue(harr[0]);
    var second =  arr2.getKeyByValue(harr[1]);
    if (first != second){
        localStorage.part = first;
        if (prime){
            localStorage.isprimary = 1;}
            else {localStorage.isprimary = 2;}
        wipedata();
        location.reload();
    } else {
        ids = [];
        ids[localStorage.tempanalog] = myvalue;
        localStorage.numberOfQuestions = 1;
    }
}
function backbutton(){
    localStorage.numberOfQuestions = Number(localStorage.numberOfQuestions)+1;
    localStorage.tempanalog = Number(localStorage.tempanalog)+1;
    alert("not ended");
}

  //  document.getElementById("name-test").innerHTML = nameTest;
  // document.getElementById("num-questions").innerHTML = numQuestions;
