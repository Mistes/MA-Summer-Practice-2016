
var xmlhttp = new XMLHttpRequest();
<<<<<<< HEAD

if (localStorage.nameTest){
    var nameTest = localStorage.nameTest;
}

=======
if (localStorage.nameTest){
var nameTest = localStorage.nameTest;}
>>>>>>> 8ce51d0e5aeb6c91f5cd9ff3c3d14ca9ba10c54f
localStorage.removeItem("supervalue");
counter = 0;
if(localStorage.part){
   if(localStorage.isprimary == 2){
       window.location.href = '/congrats';
   }
 testid ="tests/request-test/" + nameTest+ "/" + Number(localStorage.part);
}
else {testid = "tests/1";}
var url = '/' + testid;

function wipedata(){
        localStorage.removeItem("ids");
        localStorage.removeItem("tempanalog");
        localStorage.removeItem("numberOfQuestions");
        localStorage.removeItem("numBlock");
        localStorage.removeItem("numHide");
        localStorage.removeItem("idsfun");
        }

xmlhttp.onreadystatechange = function() {
    if (xmlhttp.readyState == 4 && xmlhttp.status == 200) {
        myArr = [JSON.parse(xmlhttp.responseText)];
        myFunction(myArr);


    }
};
xmlhttp.open("GET", url, true);
xmlhttp.send();

function myFunction(arr)
{


    var out = "",
        numQuestions = "";
        nameTest = "";
        for(a = 0; a < arr.length; a++) {
        nameTest += arr[a].name;
<<<<<<< HEAD
        localStorage.nameTest = nameTest;
=======
            localStorage.nameTest = nameTest;
>>>>>>> 8ce51d0e5aeb6c91f5cd9ff3c3d14ca9ba10c54f
         var keyvar;
        for (b = 0; b < arr[a].questions.length-1; b++) {
            var n = b+1;
            numQuestions = 'Всього питань: ' + arr[a].questions.length;
            questionforall =arr[a].questions.length;
            out +='<li class="question hide"><form><h3 class="title-question">' + n + '. '  + arr[a].questions[b].body + '</h3><ul>' ;
            for (c = 0; c < arr[a].questions[b].answers.length; c++)
<<<<<<< HEAD
            {
                if(typeof arr[a].questions[b].answers[c].key2 !== "undefined"){
                     keyvar = [arr[a].questions[b].answers[c].key1,arr[a].questions[b].answers[c].key2];
                }
                else keyvar = arr[a].questions[b].answers[c].key;
=======
            {   if (typeof arr[a].questions[b].answers[c].key2 !== "undefined")
                {
                     keyvar = [arr[a].questions[b].answers[c].key1,arr[a].questions[b].answers[c].key2];
                }
                else{ keyvar = [arr[a].questions[b].answers[c].key];}
>>>>>>> 8ce51d0e5aeb6c91f5cd9ff3c3d14ca9ba10c54f
                out += '<li class="answer"><label><input type="radio"  name="answer" id = "radio1" value="'+keyvar+'">' + arr[a].questions[b].answers[c].body  + '</label></li>';
            }
            out +='</ul></form></li>';
        }



    }

    prime = arr[0].is_primary;
    document.getElementById("num-questions").innerHTML = numQuestions;
    document.getElementById("name-test").innerHTML = nameTest;
    document.getElementById("list-questions").innerHTML = out;
     $("#list-questions").find(".hide").first().addClass("find");
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
    if(!typeof Number){
        firstvalue = myvalue[0];
        secondvalue = myvalue[2];
    }else {firstvalue = myvalue;
        	alert(typeof secondvalue);
            secondvalue = null;
    }



 if ($('input[name=answer]:checked').length > 0) {
     var x = document.querySelectorAll("li.question");
     if (numBlock < questionforall-1) {

         x[numBlock].classList.add("find");
         x[numHide].classList.add("hide");
         x[numHide].classList.remove("find");
         numBlock++;
         numHide++;
         localStorage.numBlock = numBlock;
         localStorage.numHide = numHide;
     }

     arr = myArr;

     if (typeof(Storage) !== "undefined") {
         if (localStorage.supervalue) {
             wipedata();
             localStorage.part = myvalue;
             if (prime) {
                 localStorage.isprimary = 1;
             }
             else {
                 localStorage.isprimary = 2;
             }
             location.reload();


         }

         if (localStorage.numberOfQuestions) {

             if (Number(localStorage.numberOfQuestions && localStorage.numberOfQuestions) !== 0) {
                 localStorage.numberOfQuestions = Number(localStorage.numberOfQuestions) - 1;
                 localStorage.tempanalog = Number(localStorage.tempanalog) - 1;


                 idsfun();


                 $('input[type=radio][name=answer]').prop('checked', false);
             }


             else {
                 localStorage.tempanalog = Number(localStorage.tempanalog) - 1;
                 $('input[type=radio][name=answer]').prop('checked', false);
                 sorting();
             }


         } else if (!localStorage.supervalue) {

             localStorage.numberOfQuestions = (arr[0].questions.length) - 3;
             localStorage.tempanalog = (arr[0].questions.length) - 2;
             idsfun();


             $('input[type=radio][name=answer]').prop('checked', false);
         }
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

     first  =    arr2.getKeyByValue(harr[0]);
     second =   arr2.getKeyByValue(harr[1]);


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
        lastquestion(arr2, harr[0]);


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
 function idsfun() {
                        if(localStorage.ids)
                        {
                            var ids = JSON.parse(localStorage.getItem("ids"));
                        }
                        else var ids = [];
                      if(localStorage.idsfun)
                      {
                           increment = localStorage.idsfun;
                      }
                      else
                          {
                              increment = 0;
                          }
                      if(secondvalue == null)
                      {
                          ids[increment]= firstvalue;
                            increment++;
                      }
                      else
                      {
                     ids[increment]= firstvalue;
                     increment++;
                     ids[increment]= secondvalue;
                     increment++
                      }
                     localStorage.setItem("ids", JSON.stringify(ids));
                     localStorage.idsfun = increment;
                 }

function lastquestion(encounters, max_encounters) {

        var nameTest = myArr[0].name, n = myArr[0].questions.length;
        var last_question = myArr[0].questions[n-1];
        var numQuestions = 'Всього питань: ' + n,
        out = '<li class="question"><form><h3 class="title-question">' + n + '. ' + last_question.body + '</h3><ul>';
        for (c = 0; c < last_question.answers.length; c++) {

            if(encounters[last_question.answers[c].key1] == max_encounters ) {
                out += '<li class="answer"><label><input type="radio"  name="answer" id = "radio1" value="' + last_question.answers[c].key1 + '">' + last_question.answers[c].body + '</label></li>';
            }

        }
        out += '</ul></form></li>';

    prime = myArr[0].is_primary;
    document.getElementById("num-questions").innerHTML = numQuestions;
    document.getElementById("name-test").innerHTML = nameTest;
    document.getElementById("list-questions").innerHTML = out;
}



