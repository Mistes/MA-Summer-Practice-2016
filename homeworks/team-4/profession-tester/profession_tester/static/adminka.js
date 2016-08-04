// $( "form" ).submit(function( event ) {
//   console.log( $( this ).serializeArray() );
//   event.preventDefault();
// });


    $(document).ready(function() {

        // click on button submit
        $("#submit").on('click', function(){
            console.log($("#form").serialize());
            // send ajax
            $.ajax({
                url: '/save-new-category', // url where to submit the request
                type : "POST", // type of action POST || GET
                dataType : 'json', // data type
                data : {
                    'name': 'Kolobok',
                    'subcats': [
                        {
                            'name': 'En2gineer-mechanic',
                            'text': 'You were born for this!'
                        }
                    ]
                    }, 
                    // post data || get data
                success : function(result) {
                    // you can see the result from the console
                    // tab of the developer tools
                    console.log(result);
                },
                error: function(xhr, resp, text) {
                    console.log(xhr, resp, text);
                }
            });
        });
    });