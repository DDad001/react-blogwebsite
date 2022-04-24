let userData = {}

function checkToken() {
    let result = false
    let lsData = localStorage.getItem('Token');
    if(lsData && lsData != null)
    {
        result = true
    }
    return result;
}

async function createAccount(createdUser){
    //going to hit the api and return an unresolved promise and get stored into response
   let res = await fetch('https://daddblogbackend.azurewebsites.net/User/AddUsers', {
       method:"POST",
       headers:{
           "Content-Type": "application/json"
       },
       body:JSON.stringify(createdUser)
       //createdUser is just a variable and it will be passed in the function
   });
   //before converting to json format, check the status of the request like if its sent or if there is an error
   if(!res.ok)
   {
       const message =`An Error has Occured ${res.status}`
       throw new Error(message)
   }
   //now the response has been resolved and we can convert into json format to make it readable and we can access it via our data variable
   let data = await res.json();
   console.log(data)
}

async function login(loginUser){
    //going to hit the api and return an unresolved promise and get stored into response
   let res = await fetch('https://daddblogbackend.azurewebsites.net/User/login', {
       method:"POST",
       headers:{
           "Content-Type": "application/json"
       },
       body:JSON.stringify(loginUser)
       //createdUser is just a variable and it will be passed in the function
   });
   //before converting to json format, check the status of the request like if its sent or if there is an error
   if(!res.ok)
   {
       const message =`An Error has Occured ${res.status}`
       throw new Error(message)
   }
   //now the response has been resolved and we can convert into json format to make it readable and we can access it via our data variable
   let data = await res.json();
   return data;
}



async function GetLoggedInUserData(username){
    let res = await fetch(`https://daddblogbackend.azurewebsites.net/User/userByusername/${username}`);
    let data = await res.json();
    userData = data;
    console.log(userData);
}

function LoggedInData(){
    return userData;
}

async function addBlogItem(createdBlog){
    //going to hit the api and return an unresolved promise and get stored into response
   let res = await fetch('https://daddblogbackend.azurewebsites.net/BlogItem/AddBlogItem', {
       method:"POST",
       headers:{
           "Content-Type": "application/json"
       },
       body:JSON.stringify(createdBlog)
       //createdUser is just a variable and it will be passed in the function
   });
   //before converting to json format, check the status of the request like if its sent or if there is an error
   if(!res.ok)
   {
       const message =`An Error has Occured ${res.status}`
       throw new Error(message)
    }
    //now the response has been resolved and we can convert into json format to make it readable and we can access it via our data variable
    let data = await res.json();
    console.log(data);
    return data;
}

async function getBlogItems(){
    let res = await fetch('https://daddblogbackend.azurewebsites.net/BlogItem/GetBlogItems');
    let data = await res.json();
    return data;
}

async function getBlogItemsByUserId(UserID){
    let res = await fetch(`https://daddblogbackend.azurewebsites.net/BlogItem/GetItemsByUserID/${UserID}`);
    let data = await res.json();
    return data;
}

async function updateBlogItems(blogItem){
    //going to hit the api and return an unresolved promise and get stored into response
   let res = await fetch('https://daddblogbackend.azurewebsites.net/BlogItem/UpdateBlogItem', {
       method:"POST",
       headers:{
           "Content-Type": "application/json"
       },
       body:JSON.stringify(blogItem)
       //createdUser is just a variable and it will be passed in the function
   });
   //before converting to json format, check the status of the request like if its sent or if there is an error
   if(!res.ok)
   {
       const message =`An Error has Occured ${res.status}`
       throw new Error(message)
    }
    //now the response has been resolved and we can convert into json format to make it readable and we can access it via our data variable
    let data = await res.json();
    console.log(data);
    return data;
}

async function getPublishedItems(){
    let res = await fetch('https://daddblogbackend.azurewebsites.net/BlogItem/GetPublishedItems');
    let data = res.json();
    return data;
}

export {checkToken, createAccount, login, GetLoggedInUserData, LoggedInData, addBlogItem, getBlogItems, getBlogItemsByUserId, updateBlogItems, getPublishedItems };