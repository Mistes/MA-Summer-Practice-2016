$(document).ready(function() {
    $(window).load(function() {        //loader here
         $('#loader').hide();
        // $('#list-questions').show();
    });

      $( "#progressDiv" ).progressbar({
          value : Number(localStorage.progressBar)
        });
    onload();
});
function onload() {
    barinit();
     if(localStorage.isprimary == 2){
      congratpart();
   }
  else {mainpart();}
 }
function mainpart(){

var xmlhttp = new XMLHttpRequest();
if (localStorage.nameTest){
var nameTest = localStorage.nameTest;}
counter = 0;
if(localStorage.part){
 testid ="tests/request-test/" + nameTest+ "/" + Number(localStorage.part);
}
else {testid = "tests/1";}
var url = '/' + testid;
xmlhttp.onreadystatechange = function() {
    if (xmlhttp.readyState == 4 && xmlhttp.status == 200) {
        myArr = [JSON.parse(xmlhttp.responseText)];
        myFunction(myArr);
    }
};
xmlhttp.open("GET", url, true);
xmlhttp.send();
}
function myFunction(arr)
{


    var out = "",
        nameTest = "";
        for(a = 0; a < arr.length; a++) {
        nameTest += arr[a].name;
            localStorage.nameTest = nameTest;
         var keyvar;
        for (b = 0; b < arr[a].questions.length-1; b++) {
            questionforall =arr[a].questions.length;
            out +='<li class="question hide"><form><h3 class="title-question">'+ arr[a].questions[b].body + '</h3><ul class="list-answers">' ;
            for (c = 0; c < arr[a].questions[b].answers.length; c++)
            {   if (typeof arr[a].questions[b].answers[c].key2 !== "undefined")
                {
                     keyvar = [arr[a].questions[b].answers[c].key1,arr[a].questions[b].answers[c].key2];
                }
                else{ keyvar = [arr[a].questions[b].answers[c].key];
                if(!localStorage.lastquest){
                localStorage.removeItem("supervalue");}}
                out += '<li class="answer"><label><input type="radio"  name="answer" id = "radio1" value="'+keyvar+'">' + arr[a].questions[b].answers[c].body  + '</label></li>';
            }
            out +='</ul></form></li>';
        }



    }

    prime = arr[0].is_primary;
    if(!localStorage.lastquest){
    document.getElementById("list-questions").innerHTML = out;}
    else {  document.getElementById("list-questions").innerHTML = localStorage.lastquest;}
     if(!localStorage.numHide)
        {
            $("#list-questions").find(".hide").eq(0).addClass("find");
        }
        else
        {
            $("#list-questions").find(".hide").eq(localStorage.numHide).addClass("find");
        }
}
function clickCounter() {
 if ($('input[name=answer]:checked').length > 0) {
     myvalue = $('input[type=radio][name=answer]:checked').val();
     var tanalog = localStorage.getItem('tempanalog');
    if(!localStorage.isprimary == 1)
    {
        firstvalue = myvalue[0];
        secondvalue = myvalue[2];
    }
   else
    {
        firstvalue = myvalue;
      //  alert(typeof secondvalue == "undefined");
        secondvalue = null;
    }
     showAndHideBlock();
     progressstep();
     arr = myArr;
     if (typeof(Storage) !== "undefined") {
         if (localStorage.supervalue) {
             wipedata();
             if (prime) {
                 localStorage.isprimary = 1;
                 localStorage.part = myvalue[0];
             }
             else {
                 localStorage.isprimary = 2;
                 localStorage.part = myvalue;
             }

                onload();

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
                 idsfun();
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
        onload();
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
        localStorage.numHide = Number(localStorage.numHide)+1;
        var nameTest = myArr[0].name, n = myArr[0].questions.length;
        var last_question = myArr[0].questions[n-1];
        out = '<li class="question"><form><h3 class="title-question">' + last_question.body + '</h3><ul class="list-answers">';
        for (c = 0; c < last_question.answers.length; c++) {

            if (encounters[last_question.answers[c].key1] == max_encounters || encounters[last_question.answers[c].key]) {
                if (typeof last_question.answers[c].key2 !== "undefined") {
                    keyvar = [last_question.answers[c].key1, last_question.answers[c].key2];
                }
                else {
                    keyvar = [last_question.answers[c].key];
                }
                out += '<li class="answer"><label><input type="radio"  name="answer" id = "radio1" value="' + keyvar + '">' + last_question.answers[c].body + '</label></li>';
            }

        }
        out += '</ul></form></li>';
        localStorage.lastquest = out;
    prime = myArr[0].is_primary;
    document.getElementById("list-questions").innerHTML = out;
}
function wipedata(){
        localStorage.removeItem("ids");
        localStorage.removeItem("tempanalog");
        localStorage.removeItem("numberOfQuestions");
        localStorage.removeItem("numBlock");
        localStorage.removeItem("numHide");
        localStorage.removeItem("idsfun");
        localStorage.removeItem("lastquest");
         $("#text-head").empty();
         $("#text-img").empty();
         $("#text-body").empty();
         $("#list-questions").empty();

        }
function congratpart(){
     $( "#progressDiv" ).progressbar( "option", "value", 100 );
    document.getElementById("buttons").classList.add("hide");
var xmlhttp = new XMLHttpRequest();
 testid ="get-congrats/" + Number(localStorage.part);
    var imagesrc = "/get-image/" + Number(localStorage.part);
var url = '/' + testid;
xmlhttp.onreadystatechange = function() {
    if (xmlhttp.readyState == 4 && xmlhttp.status == 200) {
       var parsevar = [JSON.parse(xmlhttp.responseText)];
        var out = "",
            out2 = "";
        out = parsevar[0].header;
        out2 = parsevar[0].text;

        document.getElementById("text-head").innerHTML = out;
        document.getElementById("text-img").innerHTML = '<img src='+imagesrc+'>';
        document.getElementById("text-body").innerHTML = out2;

    }
};  //chages
xmlhttp.open("GET", url, true);
xmlhttp.send();
}
function resetbutton(){
     $( "#progressDiv" ).progressbar( "option", "value", 0 );
     localStorage.removeItem("progressBar");
    document.getElementById("buttons").classList.remove("hide");
    localStorage.clear();
    wipedata();
    onload();
}
function barinit() {
    if (!localStorage.isprimary){
             currentbar  = 0;
            }
            else {
                currentbar = 50;
            }

}
function progressstep() {
    var onestep = 50/questionforall;
    if(localStorage.progressBar){
       currentbar = Number(localStorage.progressBar);
    }
    currentbar +=onestep;
    $( "#progressDiv" ).progressbar( "option", "value", currentbar );
    localStorage.progressBar = currentbar;
}
function showAndHideBlock() {
         var numBlock;
     var numHide;
     if(localStorage.numHide){
    numBlock = Number(localStorage.numHide)+1;
    numHide = localStorage.numHide;

    }
    else {
     localStorage.numHide = 0;
    numBlock = Number(localStorage.numHide)+1;
    numHide = localStorage.numHide;
}
    var x = document.querySelectorAll("li.question");
     if (numBlock < questionforall-1) {

         x[numBlock].classList.add("find");
         x[numHide].classList.add("hide");
         x[numHide].classList.remove("find");
         numHide++;
         numBlock++;
         localStorage.numHide = numHide;
     }
}
