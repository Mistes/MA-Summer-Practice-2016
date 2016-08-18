    $('#submit-category').on('click',function(e) {
        $.ajax({
            url: '/save-new-category',
            type: 'POST',
            contentType: 'application/json; charset=utf-8',
            dataType: 'json',
            data : JSON.stringify($("#form-add-category").serializeObject()),

            success: function(result) {
            console.log(JSON.stringify($("#form-add-category").serializeObject()));                
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
        if($( ".list-category" ).val() =="") {
            document.getElementById("input-is-primary").value = "True";}
        else {document.getElementById("input-is-primary").innerHTML = "False"}
        $.ajax({
            url: '/save-test',
            type: 'POST',
            contentType: 'application/json; charset=utf-8',
            dataType: 'json',
            data : JSON.stringify($("#form-add-test").serializeObject()),

            success: function(result) {
//                 console.log(json);
                console.log(JSON.stringify($("#form-add-test").serializeObject()));

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

    var i = 1;   // Adding add on fields subcats and text

    $("#add-category").on('click', function(){
        var a = $('#add-category-prototype').html();
        var re = /\%number\%/g;  //increase index number          
        var a = a.replace(re, i);            
        i++;   
        $( this ).before(a);
        console.log(a);
        return false;
    });

    var i = 1;                                 // Add question
    $('.add-question').on('click', function(){        
        var a = $('#add-question-prototype').html();
        var re = /\%number\%/g;
        var a = $(a.replace(re,i));
        i++;
        $(this).before(a);
        var categorySelect = $('.list-category1',a);
        dataCategory(categoryKeys,categorySelect);

        return false;
    });

    var i = 1;                               // Add answer
    $(document).on('click', '.add-answer', function(){
        var a = $('#add-answer-prototype').html();
        var re = /\%number\%/g;
        var a = $(a.replace(re, i));
        i++;
        $(this).before(a);
        var categorySelect = a.find('.list-category1');

        dataCategory(categoryKeys,categorySelect);

        return false;
    });

    var subCats;    
    var subcatsEnum; 
    var nameSubcats;
  

    var categoryKeys = {};   


    // #input-is-primary



function chainSelect(current){
  var findSelected = $(current).on('change', function(){
      var value = $(this).find(':selected').val();
      return value;
  });
  return findSelected;
}

var category = chainSelect('.list-category'),
    selectedCategory2 = parseInt(category.val());


var categoryAPI = "/get-keys";
var dataKeys = $.getJSON(categoryAPI, function() {
  format: "json"
  })
  .fail(function() {
    console.log( "error" );
  });

  dataKeys.done(function(data) {
      $.each( data.keys, function( i, item ) {
        $('.list-category').append('<option value="'+i+'">'+item.name+'</option>');
      });
  });
    
    $(".list-category").change(function() {          /// output categories value
        var selectedCategory = parseInt($(".list-category option:selected").val());
        dataKeys.done(function(data2) {
            var listSubcats = $.makeArray( data2.keys )
            var outputSubcats = $.map( listSubcats, function( val, i ) {
              return val;
            });
          
            var final = outputSubcats[selectedCategory].subcats;
            $('.list-category2').empty();
            $.each( final, function( i2, item2 ) {
              $('.list-category2').append('<option value="'+i2+'">'+item2.name+'</option>');
            });
        });
    });

    $.getJSON('/get-keys', function(data){            //Addition category
        categoryKeys = data.keys;
        dataCategory(categoryKeys,$('.list-category1'));
    });


    var dataCategory = function(categoryKeys, $select){
        $.each(categoryKeys, function(index,value) {
            var nameCategory = value.name;
            var categoryEnum = value.category_enum;
            var subCats = value.subcats;

            $.each(subCats, function(index,value) {
            var subcatsEnum = value.category_enum;
            var nameSubcats = value.name;

        });
    $select.append('<option value="' + categoryEnum +' ">' + nameCategory + '</option>');
    });
    };

    $(function(){                           // Form to add a category
        var formAddCategory = $('.button-add-category');
        formAddCategory.click(function(event) {
            event.preventDefault()
            formAddCategory.not(this).removeClass('active');
            $(this).toggleClass('active');
        });
    });

    function addNewTest() {              
    window.location.replace("/add-new-test") //add-category output
};
