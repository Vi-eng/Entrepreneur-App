document.getElementById('Investor').addEventListener('click', function(){investor();})
document.getElementById('Entrepreneur').addEventListener('click', function(){investor(1);})
document.getElementById('Mentor').addEventListener('click', function(){investor(2);})
document.getElementById('clicktocreate').addEventListener('click', function(){showextra()});
document.getElementById('passwordinput').addEventListener('click', function(){setInterval(passval, 100);});
document.querySelector('button').addEventListener('click', function(e){validate(e)});
document.addEventListener('DOMContentLoaded', function() {preloaded()}, false);

function investor(value = 0){
    var entre = document.getElementById('Entrepreneur');
    var invest = document.getElementById('Investor');
    var ment = document.getElementById('Mentor');
    var signupfs = document.getElementsByClassName('signup');
    var bus = document.getElementsByClassName('entre')
    var headarr = [invest, entre, ment];
    var index = value;
    var id = document.getElementById('id');

    //Hide all val fields
    var valtxts = document.getElementsByClassName('val');
    Array.prototype.forEach.call(valtxts, (value) => value.classList.add('hide'));

    //Hide the bus field, as default
    bus[0].classList.add('hide');


    /*Change the headings first*/
    function changelogin (){
        headarr.forEach((value) => {
            if(value != headarr[index]){
                value.classList.add('whiteback');
                value.classList.remove('white');
            }else{
                value.classList.remove('whiteback');
                value.classList.add('white');
            }
    });};

    changelogin();

    //This is to set the ID to the correct one
    if(value == 0){
        id.value = 'I';
    }else if(value == 1){
    //Entrepreneur shows the business name input field
        id.value = 'E';
        if(signupfs[1].classList.contains('hide')){
            bus[0].classList.add('hide');
        }else{
            bus[0].classList.remove('hide');
        };
    }else if(value == 2){
        id.value = 'M';
    };
}

function showextra(){
    //Hide all val fields
    var valtxts = document.getElementsByClassName('val');
    Array.prototype.forEach.call(valtxts, (value) => value.classList.add('hide'));

    var extratxt = document.getElementById('clicktocreate');
    var newtxt = 'Already have an account? Login!';
    var signintxt = document.getElementById('signintxt');
    var txtsignin = 'Create your Account';
    var button = document.querySelector('button');
    var id = document.getElementById('id');
    var bus = document.getElementsByClassName('entre');
    var oremail = document.getElementById('oremail');

    var hiddenfields = document.getElementsByClassName('signup');

    Array.prototype.forEach.call(hiddenfields, function(value){
        if(id.value != 'E'){
            if(!value.classList.contains('entre')){
                value.classList.toggle('hide');
            };
        }else{
            value.classList.toggle('hide');
        }
        //Toggle is messing up investor side
    });

    //This changes the settings back to default
    if (extratxt.innerText == newtxt){
        extratxt.innerText = 'Click to Create an account';
        signintxt.innerText = 'Sign into your account';
        button.innerText = 'Login';
        oremail.classList.remove('hide');
    }else{
        extratxt.innerText = newtxt;
        signintxt.innerText = txtsignin;
        button.innerText = 'Sign up';
        oremail.classList.add('hide');

        //If the extratext show, always display bus on Entre but never on Inv for Click to create
        if(id.value == 'E'){
            bus[0].classList.remove('hide');
        }else{
            bus[0].classList.add('hide');
        };

    };
}

/* Next is validations */
function validate(e){
    var event = e;
    var signupfs = document.getElementsByClassName('signup');
    var inputs = document.querySelectorAll('input');
    var valtxts = document.getElementsByClassName('val');
    var validate = true;

    /* Reset all val fields to be hidden*/
    Array.prototype.forEach.call(valtxts, (value) => value.classList.add('hide'));

    Array.prototype.forEach.call(inputs, (input, index) => {
        if(input.value == ''){
            /* To validate empty fields, do not validate email and confirm password on login */
            if(signupfs[1].classList.contains('hide') && (index == 1 || index == 2 || index == 4)){
            }else{
            valtxts[index].classList.remove('hide');
            event.preventDefault();
            };
            return;
        }else if((inputs[3].value != inputs[4].value) && !signupfs[1].classList.contains('hide')){
            valtxts[4].innerText = '*The Password and Confirmation Password must match!';
            valtxts[4].classList.remove('hide');
        }else{
            text = passval();
            if(text != '') {validate = false}
            else{text.classList.add('hide')};
        }
    });
    
    Array.prototype.forEach.call(valtxts, (value) => {
        if(!value.classList.contains('hide')){
            validate = false;
            console.log(value);
            return;
        };
    });

    if (validate == false){
        event.preventDefault();
    };
}

function passval(){
    //Regex expressions to check
    let thelength = /.{8,32}/;
    let specialcase = /[^a-zA-Z0-9]/;
    let lowercase = /[a-z]/;
    let uppercase = /[A-Z]/;
    let numbercase = /[0-9]/;
    let text = '';

    //validation messages
    var inputs = document.querySelectorAll('input');
    var passinput = inputs[3];
    var valtxts = document.getElementsByClassName('val');

    if(!thelength.test(passinput.value)){
        text += '*The password length must be between 8 and 32 characters \n';
    };
    if(!specialcase.test(passinput.value)){
        text += '*The password must contain at least one special character \n';
    };
    if(!lowercase.test(passinput.value)){
        text += '*The password must contain at least one lowercase character \n';
    };
    if(!uppercase.test(passinput.value)){
        text += '*The password must contain at least one uppercase character \n';
    };
    if(!numbercase.test(passinput.value)){
        text += '*The password must contain at least one number \n';
    };
    if(passinput.value == ''){
        text = '*The password field is required!';
    };

    valtxts[3].innerText = text;
    valtxts[3].classList.remove('hide');
    
    return text;
};

/* Next is to link the page to the backend */

//Modal
var modal = document.getElementById('myModal');
var closespan = document.getElementsByClassName('close')[0];

//modal.style.display = 'block';

closespan.onclick = function() {
    modal.style.display = 'none';
}; 

window.onclick = function(event) {
    if (event.target == modal){
        modal.style.display = 'none';
    }
};

function preloaded(){
    var id = document.getElementById('id');
    var logid = document.getElementById('logid');

    console.log(id.value, logid.innerText);
    id.value = logid.innerText;
    if(id.value == 'E'){
        document.getElementById('Entrepreneur').click();
    }else if(id.value == 'I'){
        document.getElementById('Investor').click();
    }else if(id.value == 'M'){
        document.getElementById('Mentor').click();
    };
}