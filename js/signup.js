var username = document.getElementById("username");
var email = document.getElementById("email");
var password = document.getElementById("password");
var password_login  = document.getElementById("password_login");
var email_login = document.getElementById("email_login");
var acount_list = [];

if(localStorage.getItem("acount") !== null){
    acount_list = JSON.parse(localStorage.getItem("acount"))
}

function Signup(){
    if(validation_email() == true){
        
        if (emailExists(email.value)) {
            document.getElementById("exist-msg").classList.remove("d-none");
            document.getElementById("correct-msg").classList.add("d-none");
            document.getElementById("incorrect-msg").classList.add("d-none");
            return;
        }

        var acount_signup = {
            Name : username.value,
            Email : email.value,
            pass : password.value
        };
        acount_list.push(acount_signup);
    
        localStorage.setItem("acount" , JSON.stringify(acount_list));
        // clear_data();

        console.log(acount_list)

        // check_input();
        document.getElementById("correct-msg").classList.remove("d-none");
        document.getElementById("exist-msg").classList.add("d-none");
        document.getElementById("incorrect-msg").classList.add("d-none");
       
    }
   
 
}

function validation_email(){
    // var email = email.value;
    
    var regex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;

    if(regex.test(email.value)== true){
        // console.log("match")
     
        return true;    
    }
    else{
        // console.log("not-match")
 
        return false;
    }

}
function emailExists(email) {
    for (var i = 0; i < acount_list.length; i++) {
        if (acount_list[i].Email === email) {
            return true;
        }
    }
    return false;
    
}
function clear_data(){
    username.value = null;
    email.value = null;
    password.value = null;
    document.getElementById("correct-msg").classList.add("d-none");
    document.getElementById("incorrect-msg").classList.add("d-none");
}

function login() {
    var login = {
        Email: email_login.value,
        pass: password_login.value
    };
    console.log(login);

    var check = true;
    for (var i = 0; i < acount_list.length; i++) {
        if ( email_login.value == acount_list[i].Email && password_login.value == acount_list[i].pass) {
            var user = localStorage.setItem("user",acount_list[i].Name)
            check = false;
            break;
        }
    }
    
    if (check == true) {
        for(var i=0;i<acount_list.length;i++){

            if(acount_list[i].Email !== email_login.value && acount_list[i].pass  !== password_login.value){
                document.getElementById("msg").classList.replace("d-none","d-flex");
            }

            else if(acount_list[i].Email !== email_login.value){
                document.getElementById("msg").classList.replace("d-none", "d-flex");
            }

            else{
                document.getElementById("msg").classList.replace("d-none", "d-flex");
                
            }

        }
    } 
    
    else {
        console.log("success");
        
        sessionStorage.setItem("valid", JSON.stringify(login));
        window.location = "./home.html";
    }
}


console.log(localStorage.getItem("user"))

document.getElementById("name").innerHTML = `<h1>Welcome ${localStorage.getItem("user")}</h1>`





function Logout(){
    window.location = "./index.html";
    sessionStorage.removeItem("valid");
}

