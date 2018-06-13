/**
 * Created by adinath on 30/3/17.
 */
var Login = function () {

    var runLoginValidator = function () {
        $('#form-login').validate({
        rules: {
            email:{
                required:true,
                email: true
            },
            password:{
                required:true
            }
        },
            errorElement: 'div',
            submitHandler: function(form) {
                // do other things for a valid form
                form.submit();
            },

        })
    };

    var runRegisterValidator = function () {
    var form3 = $('.form-register');
    var errorHandler3 = $('.errorHandler', form3);

        $('#form-register').validate({
        rules: {
            name: {
                minlength: 2,
                required: true
            },
            secoundname: {
                minlength: 2,
                required: true
            },
            password: {
                minlength: 6,
                required: true
            },

            email: {
                required: true,
                email: true
            },

            password_confirmation: {
                required: true,
                minlength: 6,
                equalTo: "#password"
            },
            phone:{
                required:true,
                minlength: 9
            }

        },
            messages: {
            },
        submitHandler: function (form) {
            //errorHandler3.hide();
            form.submit();



        },
        /*invalidHandler: function (event, validator) { //display error alert on form submit
            errorHandler3.show();
        }*/

    });
};
return {
    //main function to initiate template pages
    init: function () {
        runRegisterValidator();
        runLoginValidator();
    }
};
}();