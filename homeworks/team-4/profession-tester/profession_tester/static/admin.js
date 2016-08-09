    $(document).ready(function() {

        
        $("#submit").on('click', function(e){ //Send form category,subcat,text
            // send ajax
            $.ajax({
                url: '/save-new-category', // url where to submit the request
                type : "POST", // type of action POST || GET
                contentType: "application/json; charset=utf-8",
                dataType: "json",
                data : JSON.stringify($("#form").serializeObject()),
                 // post data || get data
                success : function(result) {
                    // you can see the result from the console
                    // tab of the developer tools
                    console.log('success');
                    // window.location.replace("http://stackoverflow.com");

                    console.log(result);
                },
                error: function(xhr, resp, text) {
                    console.log(xhr, resp, text);
                    console.log('error');
                    // window.location.replace("http://stackoverflow.com");

                }
            });
        return false;

     });



        var i = 1;   // Adding add on fields subcats and text

        $("#add-category").on('click', function(){
            var a = $(this).data("prototype");

            var re = /\%number\%/g;  //increase index number
            
            var a = a.replace(re, i); 
            
            i++;

            
           $( this ).before(a);

            console.log(a);
            return false;
        });

        $(function(){
        var s = $(".button-add-main-test");
        s.click(function(event) {
            event.preventDefault()
            s.not(this).removeClass("active");
            $(this).toggleClass("active");
            });
        });

        $(function(){
        var s = $(".button-add-special-test");
        s.click(function(event) {
            event.preventDefault()
            s.not(this).removeClass("active");
            $(this).toggleClass("active");
            });
        });

    });


    function addCategory() {              
    window.location.assign("/add-category") //add-category output
}

    function addNewTest() {
    window.location.assign("/add-new-test") // add-new-test output
}


var xmlhttp = new XMLHttpRequest();          // conclusion categorys
var url = 'http://127.0.0.1:5000/get-keys';

xmlhttp.onreadystatechange = function() {
    if (xmlhttp.readyState == 4 && xmlhttp.status == 200) {
        var myArr = [JSON.parse(xmlhttp.responseText)];
        categoryFunction(myArr);
        subFunction(myArr);
    }
};
xmlhttp.open("GET", url, true);
xmlhttp.send();

function categoryFunction(arr) {          
    var out = "";

    for(a = 0; a < arr.length; a++) {
        for (b = 0; b < arr[a].keys.length; b++) {
             out += '<option>' + arr[a].keys[b].name + '</option>'     
        }
    }

    var listCategory = document.getElementsByClassName('list-category').innerHTML = out;
    $('.list-category').append('<option>' + listCategory + '</option>');
}

function subFunction(arr) {               //// conclusion subcats
    var out = "";

    for(a = 0; a < arr.length; a++) {
        for (b = 0; b < arr[a].keys.length; b++) {
            for(c = 0; c < arr[a].keys[b].subcats.length; c++) {
                out += '<option>' + arr[a].keys[b].subcats[c].name + '</option>'
            }
        }
    }
    var listSubcats = document.getElementsByName('list-subcats').innerHTML = out;
    $('.list-subcats').append('<option>' + listSubcats + '</option>');

}
