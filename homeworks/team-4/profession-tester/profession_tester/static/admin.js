$(document).ready(function(){   //Send json add category
    $('#submit-category').on('click',function(e) {


        $.ajax({
            url: '/save-new-category',
            type: 'POST',

            contentType: 'application/json; charset=utf-8',
            dataType: 'json',
            data : JSON.stringify($("#form-add-category").serializeObject()),

            success: function(result) {
                // return false;

            console.log('success');

            console.log(result);
            },

            error: function(xhr, resp, text) {
                console.log(xhr, resp, text);
                console.log('error');
            }
        });
    return false;
    });

    $('#add-new-test').on('click',function(e) {
        $.ajax({
            url: '/save-test',
            type: 'POST',
            contentType: 'application/json; charset=utf-8',
            dataType: 'json',
            data : JSON.stringify($("#form-add-test").serializeObject()),

            success: function(result) {
//                 console.log(json);
                console.log($("#form-add-test").serializeObject());                

                return false;
                console.log('success');

                console.log(result);
            },

            error: function(xhr, resp, text) {
                console.log(xhr, resp, text);
                console.log('error');
            }
        });
    return false;
    });
      $("#listed").chainedTo("#list-category");
    var i = 1;   // Adding add on fields subcats and text

    $("#add-category").on('click', function(){
        var a = $(this).data("prototype");
        var re = /\%number\%/g;  //increase index number          
        var a = a.replace(re, i);            
        i++;   
        $( this ).before(a);
        // console.log(a);
        return false;
    });

    var i = 1;                               // Add answer
    $('.add-answer').on('click', function(){
        var a = $(this).data('prototype');
        var re = /\%number\%/g;
        var a = $(a.replace(re, i));
        i++;
        $(this).before(a);
        // console.log(a);
        // console.log(categoryKeys);
        var categorySelect = $('.list-category', a);
        // console.log(categorySelect);
        dataCategory(categoryKeys,categorySelect);

        return false;
    });

    var i = 1;                                 // Add question
    $('.add-question').on('click', function(){
        var a = $(this).data('prototype');
        var re = /\%number\%/g;
        var a = $(a.replace(re,i));
        i++;
        $(this).before(a);
        var categorySelect = $('.list-category',a);
        dataCategory(categoryKeys,categorySelect);

        return false;
    });

    var subCats;    
    var subcatsEnum; 
    var nameSubcats;

    var categoryKeys = {};                         
    $.getJSON('/get-keys', function(data){            //Addition category
        categoryKeys = data.keys;
        dataCategory(categoryKeys,$('.list-category'));
    });

    var dataCategory = function(categoryKeys, $select){
        $.each(categoryKeys, function(index,value) {
            var nameCategory = value.name;
            var categoryEnum = value.category_enum;
            var subCats = value.subcats;
            console.log(nameCategory);

            $.each(subCats, function(index,value) {
            var subcatsEnum = value.category_enum;
            var nameSubcats = value.name;

    $('.list-subcats').append('<option value="' + subcatsEnum +' " class="' + categoryEnum +' ">' + nameSubcats + '</option>');


        });
   
    $select.append('<option value="' + categoryEnum +' ">' + nameCategory + '</option>');
    });

    };

    var selectedCategory;
    $(".list-category").change(function() {          /// output categories value
        var selectedCategory = $(".list-category option:selected").val();
        console.log(selectedCategory);
    });

    var selectedSubcats;
    $(".list-subcats").change(function() {          /// output categories value
        var selectedSubcats = $(".list-subcats option:selected").val();
        console.log(selectedSubcats);
    });

    $(function(){                           // Form to add a category
        var s = $('.button-add-category');
        s.click(function(event) {
            event.preventDefault()
            s.not(this).removeClass('active');
            $(this).toggleClass('active');
        });
    });

}); //end document.ready

    function addNewTest() {              
    window.location.replace("/add-new-test") //add-category output
}

