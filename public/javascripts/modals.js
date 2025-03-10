var h1value = document.getElementById('modal');

export function displaymodal(){
    if(h1value != ''){
        var modal = document.getElementById('myModal');
        modal.style.display = 'block';
        redirect();
    };
}

function redirect(){
    if (h1value.innerText == 'You do not have an account with us'){
        //Signin
        document.getElementById('clicktocreate').click();
    };   
}
