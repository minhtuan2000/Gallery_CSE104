//Check if local storage has necessary data
if (localStorage.getItem("credentials") == null) initializeLocalStorage();

function initializeLocalStorage(){
  //Clear data
  localStorage.clear();
  //Push new data
  localStorage.setItem("credentials", loadCredential());
  for (i = 0; i < JSON.parse(localStorage.getItem("credentials"))["users"].length; i++){
    let username = JSON.parse(localStorage.getItem("credentials"))["users"][i]["username"];
    localStorage.setItem(username, loadUser(username));
  }
}

function loadCredential(){
  let result = null;
  try{
    let xmlhttp = new XMLHttpRequest();
    xmlhttp.open("GET", "cre.json", false);
    xmlhttp.send();
    if (xmlhttp.status==200) {
      result = xmlhttp.responseText;
    } else {
      result = '{"users":[{"username":"admin","password":"admin"}]}';
    }
  } catch{
    result = '{"users":[{"username":"admin","password":"admin"}]}';
  }
  return result;
}

function loadUser(username){
  let result = null;
  try{
    let xmlhttp = new XMLHttpRequest();
    xmlhttp.open("GET", username + ".json", false);
    xmlhttp.send();
    if (xmlhttp.status==200) {
      result = xmlhttp.responseText;
    } else {
      result = '{"albums":[]}';
    }
  } catch {
    result = '{"albums":[]}';
  }
  return result;
}

function saveFile(filePath) {
  //Save to local storage
  localStorage.setItem(filePath, JSON.stringify(data));
}

let credential = JSON.parse(localStorage.getItem("credentials"));
let data = {};
let filePath = "";
let loggedin = false;

function signup(username, password){
  credential["users"].push({username: username, password: password});
  //Update page
  signupPage.style.visibility = "hidden";
  //update credential and create 'username' data
  localStorage.setItem("credentials", JSON.stringify(credential));
  localStorage.setItem(username, '{"albums":[]}');
  //Alert
  alert("New user created");
}

function checkLog(username, password){
  for (let i = 0; i < credential["users"].length; i++){
    if (username == credential["users"][i]["username"] && password == credential["users"][i]["password"])
      return true;
  }
  return false;
}

function login(username, password){
  if (checkLog(username, password)){
    data = JSON.parse(localStorage.getItem(username));
    filePath = username;
    loggedin = true;

    //Update page
    loginPage.style.visibility = "hidden";
    loginElement.style.visibility = "hidden";
    signupElement.style.visibility = "hidden";
    logoutElement.style.visibility = "visible";
    usernameText.style.visibility = "visible";
    usernameText.textContent = "Logged in as " + username;
    initiate();
    return "Success";
  }
  return "Invalid username or password";
}

function logout(){
  data = {};
  loggedin = false;
  filePath = "";
  wipeout();
  return "Logged out";
}

function getAlbums(){
  let result = [];
  for (let i = 0; i < data["albums"].length; i++){
    result.push(data["albums"][i]["name"]);
  }
  saveFile(filePath);
  return result;
}

function getImages(album){
  let result = [];
  for (let i = 0; i < data["albums"].length; i++){
    if (data["albums"][i]["name"] == album){
      for (let j = 0; j < data["albums"][i]["files"].length; j++){
        result.push(data["albums"][i]["files"][j]);
      }
    }
  }
  saveFile(filePath);
  return result;
}

function addAlbum(album){
  data["albums"].push({name: album, files: []});
  saveFile(filePath);
}

function addImage(album, image){
  for (i = 0; i < data["albums"].length; i++){
    if (data["albums"][i]["name"] == album){
      data["albums"][i]["files"].push(image);
    }
  }
  saveFile(filePath);
}

function addImage_localStorage(album, imageData){
  // Use fileReader to convert image to dataURL and save in localstorage
  var reader = new FileReader();
  reader.readAsDataURL(imageData);
  reader.onload = function () {
    for (let i = 0; i < data["albums"].length; i++){
      if (data["albums"][i]["name"] == album){
        data["albums"][i]["files"].push(reader.result);
      }
    }
    saveFile(filePath);
    //Update the webpage with new images
    wipeContent();
    getContent();
  };
  reader.onerror = function (error) {
    console.log('Error: ', error);
  };
}

function renameAlbum(album, newname){
  for (let i = 0; i < data["albums"].length; i++){
    if (data["albums"][i]["name"] == album){
      data["albums"][i]["name"] = newname;
    }
  }
  saveFile(filePath);
}

function deleteAlbum(album){
  for (let i = 0; i < data["albums"].length; i++){
    if (data["albums"][i]["name"] == album){
      data["albums"].splice(i, 1);
    }
  }
  saveFile(filePath);
}

function deleteImage(album, image){
  for (let i = 0; i < data["albums"].length; i++){
    if (data["albums"][i]["name"] == album){
      for (let j = 0; j < data["albums"][i]["files"].length; j++){
        if (image.includes(data["albums"][i]["files"][j])){
          data["albums"][i]["files"].splice(j, 1);
          break;
        }
      }
    }
  }
  saveFile(filePath);
}