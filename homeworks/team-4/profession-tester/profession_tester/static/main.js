var xmlhttp = new XMLHttpRequest();
localStorage.removeItem("supervalue");
if(localStorage.ids){
var ids = JSON.parse(localStorage.getItem("ids"));
}
else var ids = [];
counter = 0;
if(localStorage.part){
   if(localStorage.isprimary == 2){
       window.location.href = '/congrats';
   }
        //todo! back button, congrats local storage numblock and hide     78 stroka ushipka!    laga 6 question!    kartinki
 testid ="tests/" + Number(localStorage.part);
}
else {testid = "tests/1";}
var url = '/' + testid;

function wipedata(){
        localStorage.removeItem("ids");
        localStorage.removeItem("tempanalog");
        localStorage.removeItem("numberOfQuestions");
        localStorage.removeItem("numBlock");
        localStorage.removeItem("numHide");
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
	var n = 1;
	numQuestions = 'Всього питань: ' + arr[a].questions.length;
        questionforall =arr[a].questions.length;
	out +='<li class="question hide find"><form><h3 class="title-question">' + n + '. ' + arr[a].questions[0].body + '</h3><ul class="list-answers">' ;
	for (c = 0; c < arr[a].questions[0].answers.length; c++) {
	    out += '<li class="answer"><label><input type="radio"  name="answer" id = "radio1" value="'+  arr[a].questions[0].answers[c].key+'">' + arr[a].questions[0].answers[c].body  + '</label></li>';
	}
	out +='</ul></form></li>';
        for (b = 1; b < arr[a].questions.length; b++) {
            var n = b+1;
            numQuestions = 'Всього питань: ' + arr[a].questions.length;
            out +='<li class="question hide"><form><h3 class="title-question">' + n + '. ' + arr[a].questions[b].body + '</h3><ul class="list-answers">' ;
            for (c = 0; c < arr[a].questions[b].answers.length; c++) {
                out += '<li class="answer"><label><input type="radio"  name="answer" id = "radio1" value="'+  arr[a].questions[b].answers[c].key+'">' + arr[a].questions[b].answers[c].body  + '</label></li>';
            }
            out +='</ul></form></li>';
        }

    }
    prime = arr[0].is_primary;
    document.getElementById("num-questions").innerHTML = numQuestions;
    document.getElementById("name-test").innerHTML = nameTest;
    document.getElementById("list-questions").innerHTML = out;
}
if(localStorage.numBlock){
var numBlock = localStorage.numBlock;
var numHide = localStorage.numHide;

}
else {
    var numBlock = 1;
    var numHide = 0;
}
function clickCounter() {



var tanalog = localStorage.getItem('tempanalog');
  myvalue = $('input[type=radio][name=answer]:checked').val();

 if ($('input[name=answer]:checked').length > 0) {
     var x = document.querySelectorAll("li.question");
     if (numBlock < questionforall) {

     x[numBlock].classList.add("find");
     x[numHide].classList.add("hide");
     x[numHide].classList.remove("find");
     numBlock++;
     numHide++;
     localStorage.numBlock = numBlock;
     localStorage.numHide = numHide;
         }
 }
    arr = myArr;

    if(typeof(Storage) !== "undefined") {
        if(localStorage.supervalue){
            wipedata();
            localStorage.part = myvalue;
            if (prime){
            localStorage.isprimary = 1;}
            else {localStorage.isprimary = 2;}
            location.reload();




    }

        if (localStorage.numberOfQuestions ) {

             if(Number(localStorage.numberOfQuestions && localStorage.numberOfQuestions)!==0){
            localStorage.numberOfQuestions = Number(localStorage.numberOfQuestions)-1;
            localStorage.tempanalog = Number(localStorage.tempanalog)-1;

            ids[localStorage.tempanalog] = myvalue;
            localStorage.setItem("ids", JSON.stringify(ids));

            $('input[type=radio][name=answer]').prop('checked', false);
                }


                    else {
                        localStorage.tempanalog = Number(localStorage.tempanalog)-1;
                        $('input[type=radio][name=answer]').prop('checked', false);
                        sorting();
                          }



        } else if (!localStorage.supervalue){

            localStorage.numberOfQuestions = (arr[0].questions.length)-3;
            localStorage.tempanalog = (arr[0].questions.length)-2;


            ids[localStorage.tempanalog] = myvalue;
            localStorage.setItem("ids", JSON.stringify(ids));

            $('input[type=radio][name=answer]').prop('checked', false);
        }
    }

 else alert("Спочатку вибери свою відповідь");
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

        localStorage.numberOfQuestions = 1;
        localStorage.supervalue = 1;

    }

}
function backbutton(){
    if(localStorage.numberOfQuestions && (localStorage.numberOfQuestions!=(arr[0].questions.length)-2)) {
        localStorage.numberOfQuestions = Number(localStorage.numberOfQuestions) + 1;
        localStorage.tempanalog = Number(localStorage.tempanalog) + 1;
        numBlock - 1;
        numHide - 1;

            var x = document.querySelectorAll("li.question");
            x[numBlock].classList.add("hide");
            x[numHide].classList.add("find");
            x[numHide].classList.remove("hide");


    }
}