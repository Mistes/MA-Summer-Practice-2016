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



    });


    function addCategory() {              
    window.location.assign("/add-category") //add-category output
}

    function addNewTest() {
    window.location.assign("/add-new-test") // add-new-test output
}
