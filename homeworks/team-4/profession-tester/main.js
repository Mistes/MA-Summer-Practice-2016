var xmlhttp = new XMLHttpRequest();
var ids = [];
function wipedata(){
        localStorage.thisvar = ".this()";
        localStorage.removeItem("ids");
        localStorage.removeItem("tempanalog");
        localStorage.removeItem("numberOfQuestions");
        }
var firstarr = {"id": 1, "is_primary": true, "name": "Main test", "questions": [{"answers": [{"body": "з розповідей, на слух ", "key": 2}, {"body": "візуально (люблю ілюстрації) ", "key": 3}, {"body": "через дії, практично", "key": 4}, {"body": "з Інтернету, книг, довідників ", "key": 5}], "body": "Як Вам найкраще сприймати інформацію?"}, {"answers": [{"body": "малювання", "key": 3}, {"body": "математика ", "key": 4}, {"body": "інформатика", "key": 5}, {"body": "географія", "key": 2}], "body": "Який шкільний предмет Ви полюбляли найбільше?"}, {"answers": [{"body": "важлива для суспільства ", "key": 4}, {"body": "цікава особисто Вам ", "key": 3}, {"body": "стабільна та престижна ", "key": 2}, {"body": "добре оплачується", "key": 5}], "body": "При оцінці професії Ви вважаєте найголовнішим те, наскільки вона:"}, {"answers": [{"body": "президентом", "key": 4}, {"body": "директором компанії ", "key": 2}, {"body": "актором чи артистом ", "key": 3}, {"body": "ким я тільки не хотів стати! ", "key": 5}], "body": "Ким ви мріяли стати в дитинстві?"}, {"answers": [{"body": "Coca Cola ", "key": 2}, {"body": "Google", "key": 5}, {"body": "В одному з банків Швейцарії ", "key": 4}, {"body": "В одному з Модних будинків Парижу", "key": 3}], "body": "У яких компаніях чи організаціях ви б хотіли працювати?"}, {"answers": [{"body": "спілкування з друзями", "key": 2}, {"body": "вивчення чогось нового", "key": 5}, {"body": "проведення часу в мережі Інтернет ", "key": 5}, {"body": "прогулянка на природі ", "key": 2}, {"body": "сон та релакс ", "key": 4}, {"body": "подорожування", "key": 3}, {"body": "заняття саморозвитком ", "key": 4}], "body": "Найкраще проведення вільного часу для Вас – це:"}], "type": 1};
var secondarr = {"id": 3, "is_primary": false, "name": "Main test", "questions": [{"answers": [{"body": "все одно, головне, щоб очі не різало", "key": 1}, {"body": "будь-які яскраві та насичені ", "key": 2}, {"body": "не маркі ", "key": 3}, {"body": "контрастні, наприклад, білий-чорний ", "key": 4}, {"body": "спокійні (зелений, блакитний, коричневий ) ", "key": 5}], "body": "Які кольори Вам до вподоби?"}, {"answers": [{"body": "креативність, життєрадісність", "key": 2}, {"body": "організаторські здібності ", "key": 1}, {"body": "ретельність та уважність", "key": 3}, {"body": "комунікабельність", "key": 4}, {"body": "працьовитість", "key": 5}], "body": "Однією з моїх найкращих рис характеру є:"}, {"answers": [{"body": "Рівень заробітку ", "key": 1}, {"body": "Можливість кар'єрного росту ", "key": 5}, {"body": "Офіційне працевлаштування ", "key": 4}, {"body": "Можливість для креативу, відсутність рутини ", "key": 2}, {"body": "Репутація компанії, дружній колектив ", "key": 3}], "body": "За якими критеріями ви б обирали свою майбутню роботу?"}, {"answers": [{"body": "На вечірку з друзями ", "key": 5}, {"body": "Віддам батькам ", "key": 1}, {"body": "Оновлю гардероб ", "key": 3}, {"body": "Відкладу на власну справу ", "key": 2}, {"body": "Куплю те, про що давно мрію ", "key": 4}], "body": "На що б ви витратили свою першу зарплату?"}, {"answers": [{"body": "брендовий одяг ", "key": 3}, {"body": "витратив би на шикарну вечірку ", "key": 5}, {"body": "квартиру", "key": 1}, {"body": "невеликий бізнес ", "key": 2}, {"body": "навколосвітню подорож ", "key": 4}], "body": "Що б Ви хотіли придбати найперше якби у Вас була достатня кількість грошей:"}, {"answers": [{"body": "США", "key": 5}, {"body": "Францію", "key": 3}, {"body": "Італію", "key": 1}, {"body": "Швейцарію", "key": 4}, {"body": "Австралію", "key": 2}], "body": "Яку б країну Ви хотіли б відвідати в першу чергу:"}], "type": 3};
if(localStorage.part==2){
var url = secondarr;}
else {url = firstarr;}
{
     {
        myArr = [url];
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
