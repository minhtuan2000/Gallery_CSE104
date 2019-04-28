function loadFile(filePath) {
  let result = null;
  let xmlhttp = new XMLHttpRequest();
  xmlhttp.open("GET", filePath, false);
  xmlhttp.send();
  if (xmlhttp.status==200) {
    result = xmlhttp.responseText;
  }
  return result;
}

function saveFile(filePath) {
  //Need a server!
}

let credential = JSON.parse(loadFile("cre.json"));
let data = {};
let filePath = "";
let loggedin = false;

function signup(username, password){
  credential["users"].push({"username": username, "password": password});
  //Need server to update cre.json
}

function checkLog(username, password){
  for (i = 0; i < credential["users"].length; i++){
    if (username == credential["users"][i]["username"] && password == credential["users"][i]["password"])
      return true;
  }
  return false;
}

function login(username, password){
  if (checkLog(username, password)){
    data = JSON.parse(loadFile(username + ".json"));
    filePath = username + ".json";
    loggedin = true;
  }
}

function logout(){
  data = {};
  loggedin = false;
  filePath = "";
}

function getAlbums(){
  let result = [];
  for (i = 0; i < data["albums"].length; i++){
    result.push(data["albums"][i]["name"]);
  }
  saveFile(filePath);
  return result;
}

function getImages(album){
  let result = [];
  for (i = 0; i < data["albums"].length; i++){
    if (data["albums"][i]["name"] == album){
      for (j = 0; j < data["albums"][i]["files"].length; j++){
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

function deleteAlbum(album){
  for (i = 0; i < data["albums"].length; i++){
    if (data["albums"][i]["name"] == album){
      data["albums"].splice(i, 1);
    }
  }
  saveFile(filePath);
}

function deleteImage(album, image){
  for (i = 0; i < data["albums"].length; i++){
    if (data["albums"][i]["name"] == album){
      for (j = 0; j < data["albums"][i]["files"].length; j++){
        if (data["albums"][i]["files"][j] == image){
          data["albums"][i]["files"].splice(j, 1);
        }
      }
    }
  }
  saveFile(filePath);
}

