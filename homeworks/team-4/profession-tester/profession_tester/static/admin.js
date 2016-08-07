    $(document).ready(function() {

        // click on button submit
        $("#submit").on('click', function(e){
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
    });
