//Đối tượng Validator
function Validator(options){
    var selectorRule={}
    //hàm thực hiện validate
    function validate(inputElement,rule){
        //value :inputElement.value
        //test func:rule.test
        var erroMessage = rule.test(inputElement.value);
        var errorElement= inputElement.parentElement.querySelector(options.errorSelector);

        if(erroMessage){
            errorElement.innerText =erroMessage;
            inputElement.parentElement.classList.add('invalid');
        }
        else{
            errorElement.innerText =' ';
            inputElement.parentElement.classList.remove('invalid');
        }
    }
    //lấy element của form cần validate
    var formElement=document.querySelector(options.form);
    if (formElement){
        options.rules.forEach(function(rule){
            var inputElement= formElement.querySelector(rule.selector);
            //Lưu lại các rules cho mỗi input
            selectorRule[rule.selector] = rule.test;
            if(inputElement){
                //xử lý trường hợp blur khỏi input
                inputElement.onblur = function(){
                    validate(inputElement,rule);

                }
                //xử lý mỗi khi người dùng nhập
                inputElement.oninput = function(){
                    var errorElement= inputElement.parentElement.querySelector('.form-message');
                    errorElement.innerText =' ';
                    inputElement.parentElement.classList.remove('invalid');
                }
            }
        });
        console.log(selectorRules);
    }
}
//định nghĩa rules
//nguyên tắc của các rules:
//1.khi có lỗi=>Trả ra messae lỗi
//2.khi hợp lệ =>không trả ra cái gì cả (undefined)
Validator.isRequired= function(selector,message){
    return {
        //value:inputElement.value
        //test func:rule.test
        selector:selector,
        test:function(value){
            return value.trim() ? undefined:message ||'Vui lòng nhập trường này'
        }
    };
}




Validator.isEmail=function(selector,message){
    return {
        selector:selector,
        test:function(value){
            var regex=/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
            return regex.test(value) ? undefined : message ||'Trường này phải là Email';
        }
    }
}

Validator.minLength=function(selector,min,message){
    return {
        selector:selector,
        test:function(value){
            return value.length>=min ? undefined : message ||`Vui lòng nhập tối thiểu ${min} ký tự`;
        }
    }
}
Validator.isConfirmed=function(selector,getConfirmValue,message){
    return{
        selector:selector,
        test: function(value){
            return value ===getConfirmValue() ? undefined : message ||'Gía trị nhập vào không chính xác';
        }
    }
}