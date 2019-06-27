let posts = 'http://localhost:3002/posts';
let email = "123456@gmail.com";
let password = "123456@gmail.com";

//Create (this would require going thru the form)


//GET REQUESTS-------------------------------------------------------------

//Async forces a function to return a resolved promise
//Await forces a promise to settle then returns the result

//Vanilla Get
async function get() {

    const respVar = await fetch(posts);
    console.log("vanilla get w/async", respVar); //you MUST convert the response into JSON to use it
    const jsonVar = await respVar.json();
    console.log("vanilla get w/async", jsonVar);

}
get();

//POST REQUESTS-------------------------------------------------------------

//Vanilla Post
//1. fetch request with object as second argument (method, headers, body)
//2. await on the response return then you can await response.text() or json
async function vanillaPost() {
    let user = {
        email: '123456@gmail.com',
        password: '123456@gmail.com'
    };

    let response = await
        fetch('http://localhost:3002/api/user/login', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json;charset=utf-8'
            },
            body: JSON.stringify(user)
        });

    console.log('vanilla post', response);
    let result = await response.text(); //JWT token in this case
    console.log('vanilla post', result);

}vanillaPost();


//Jquery post
$(document).ready(function () {
    $.ajax({
        type: 'POST',
        url: 'http://localhost:3002/api/user/login',
        myJson: JSON.stringify({"email": email, "password": password}),
        success: function (data) {
            console.log('jq post success', data.responseText); //i think this should be undefined
        },
        error: function (jqXHR, textStatus, errorThrown) {
            console.log("Login error");
            //display response text somewhere
            console.log(jqXHR.responseText);
            console.log(textStatus);
            console.log(errorThrown);
        },
        contentType: "application/json",
        dataType: "text"
    });
});



//Update


//Delete
