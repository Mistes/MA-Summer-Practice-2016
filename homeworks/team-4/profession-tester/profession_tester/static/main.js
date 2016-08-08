var xmlhttp = new XMLHttpRequest();
var ids = [];
if(localStorage.part){
   /* if(localStorage.isprimary == false){
        testid = 'get-congrats/' + Number(localStorage.part)
        function congrats() {
            myArr = xmlhttp.responseText; /
            document.getElementById("list-questions").innerHTML =myArr;



        }
    }
    else testid ="tests/" + Number(localStorage.part);*/
}
else {testid = "tests/1";}
var url = 'http://127.0.0.1:5000/' + testid;
function wipedata(){
        localStorage.thisvar = ".this()";
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

    var out = "";

    for(a = 0; a < arr.length; a++) {
        for (b = 0; b < arr[a].questions.length; b++) {
            out +='<li class="question"><form><h3>' + arr[a].questions[b].body + '</h3><ul>' ;
            for (c = 0; c < arr[a].questions[b].answers.length; c++) {
                out += '<li class="answer"><label><input type="radio"  name="answer" value="'+  arr[a].questions[b].answers[c].key+'">' + arr[a].questions[b].answers[c].body  + '</label></li>';
            }
            out +='</ul></form></li>';
        }

    }
    localStorage.isprimary = arr[0].is_primary;
    document.getElementById("list-questions").innerHTML = out;
};

$(document).ready(function() {
var firstQuest = $("li.question:first");

	$("li.question").addClass("hide");
  firstQuest.removeClass("hide");
	$("#next").click(function () {
  	firstQuest.addClass("hide");
    $('input[type=radio][name=answer]:checked').val();
    $('input[type=radio][name=answer]').prop('checked', false);
    $("li.question:first").next().next().removeClass("hide");
  });
});

function clickCounter() {
 var myvalue = $('input[type=radio][name=answer]:checked').val();
if($('input[type=radio][name=answer]:checked')){
    arr = myArr;
    if(typeof(Storage) !== "undefined") {
        if (localStorage.numberOfQuestions ) {
            localStorage.thisvar = (".this()") + localStorage.thisvar;
            if(Number(localStorage.numberOfQuestions && localStorage.numberOfQuestions)!==0){
            localStorage.numberOfQuestions = Number(localStorage.numberOfQuestions)-1;
            localStorage.tempanalog = Number(localStorage.tempanalog)-1;

            ids[localStorage.tempanalog] = myvalue;
            localStorage.setItem("ids", JSON.stringify(ids));

            $('input[type=radio][name=answer]').prop('checked', false);
            }



                else {
                sorting();
                }



        } else {
            localStorage.thisvar = ".this()";
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
        wipedata();
    }
    else {
    localStorage.removeItem("ids");
    ids[localStorage.tempanalog] = "";
    localStorage.setItem("ids", JSON.stringify(ids));
    partTwo();

    }

}
