// Creating A Logic For Saving The Password :: 
sBton.addEventListener("click", (e)=>{
    e.preventDefault();

    let passwords = localStorage.getItem("passwords");

    if(passwords == null){
        let json = [];
        json.push({website:website.value, username:username.value, password:password.value});
        localStorage.setItem("passwords", JSON.stringify(json));
    }
    else{
        let json = JSON.parse(localStorage.getItem("passwords"));
        json.push({website:website.value, username:username.value, password:password.value});
        localStorage.setItem("passwords", JSON.stringify(json));
    }
    showData();
})

// Creating A Logic For Copy Credentials :: 
const copyData = (txt)=>{
    navigator.clipboard.writeText(txt);
    document.getElementById("cText").style.display = "inline";
    setTimeout(()=>{
        document.getElementById("cText").style.display = "none";
    }, 1000);
}

// Creating A Logic For Converting The Password Into Asterisk :: 
const starPassword = (pass)=>{
    let str = "";
    for (let index = 0; index < pass.length; index++) {
        str += "*";
    }
    return str;
}

// Creating A Logic For Deleting The Data From Table ::
const deleteData = (website)=>{
    let confirmation = confirm(`Are You Sure To Delete ${website}'s Credentials`);
    if(confirmation == true){ 
    console.log("click delete");
    let data = localStorage.getItem("passwords");
    let arr = JSON.parse(data);
    arrUpdate = arr.filter((e)=>{
        return e.website != website;
    })
    localStorage.setItem("passwords", JSON.stringify(arrUpdate));
    }
    showData();
}

// Creating A Logic For Parsing The Data In Table :: 
const showData = ()=>{

    let myTbl = document.getElementById("myTable");
    let data = localStorage.getItem("passwords");
    
    if(data == null){
        myTbl.innerHTML = "Local Storage Is Empty !!"
    }
    else{
    myTbl.innerHTML = `<tr>
                        <th>Website</th>
                        <th>Username</th>
                        <th>Password</th>
                        <th>Action</th>
                        </tr>`
    let arr = JSON.parse(data);
    let stng = "";
    for (let index = 0; index < arr.length; index++) {
        const element = arr[index];
        
        stng += `<tr>
        <td>${element.website}</td>
        <td>${element.username}</td>
        <td>${starPassword(element.password)} &nbsp;<img class="cIcon" src="/Images/copy.svg" alt="copy text" width="15px" height="15px" title="copy to clipboard" onclick="copyData('${element.password}')"></td>
        <td><button class="delBton" onclick="deleteData('${element.website}')">Delete</button></td>
        </tr>`
        }   
            myTbl.innerHTML = (myTbl.innerHTML + stng);
    }
    website.value = "";
    username.value = "";
    password.value = "";
}
showData();

// ............................................................ 