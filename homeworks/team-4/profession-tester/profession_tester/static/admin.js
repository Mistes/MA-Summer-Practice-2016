


jQuery(document).ready(function(){ 

        
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


        var i = 1;                                  // Adding add on fields question and answers
        $("#add-question").on('click', function(){
            var a = $(this).data("prototype");
            var re = /\%number\%/g;                 //increase index number
            var a = $(a.replace(re, i));
            i++;
            $(this).before(a);
            console.log(a);
            console.log(dataKeys);
            var categorySelector = $('.list-category',a);
            console.log(categorySelector);
            dataCategory(dataKeys,categorySelector);
            return false;
        });


        var i = 1;                                  // Adding add special answer with subc
        $('#add-special-answer').on('click', function(){
            var a = $(this).data('prototype');
            var re = /\%number\%/g;                 //increase index number
            var a = a.replace(re, i);
            i++;
            $(this).before(a);
            console.log(a);
            return false;
        });

        var i = 1;                                  // Adding add on fields answer
        $('#add-special-question').on('click', function(){
            var a = $(this).data('prototype');
            var re = /\%number\%/g;                 //increase index number
            var a = a.replace(re, i);
            i++;
            $(this).before(a);
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

            var i = 1;                                  // Adding add on fields answer
            $('#add-answer').on('click', function(){
            var a = $(this).data('prototype');
            var re = /\%number\%/g;                 //increase index number
            var a = $(a.replace(re, i));
            i++;
            $(this).before(a);
            console.log(a);
            console.log(dataKeys);
            var categorySelector = $('.list-category',a);
            console.log(categorySelector);
            dataCategory(dataKeys,categorySelector);

            return false;

        });
        

var dataKeys = {};
$.getJSON('/get-keys', function(data) {
    dataKeys = data.keys;
    dataCategory(dataKeys,$('.list-category'));

});

 $("#list-category").change(function () {
        var end = this.value;
        console.log(end);
        console.log('');
    });

var dataCategory = function(dataKeys, $select) {
    $.each(dataKeys, function(index,value) {
        var v = value.name;
    $select.append('<option>' + v + '</option>');

    });
}


});

    function addCategory() {              
    window.location.replace("/add-category") //add-category output
}

    function addNewTest() {
    window.location.replace("/add-new-test") // add-new-test output
}


