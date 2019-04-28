let loggedin = false;
let data = {};
let filePath = "";

function httpGetAsync(theUrl, callback){
  var xmlHttp = new XMLHttpRequest();
  xmlHttp.onreadystatechange = function() { 
    callback(xmlHttp.responseText);
  }
  xmlHttp.open("GET", theUrl, true); // true for asynchronous 
  xmlHttp.send(null);
}

function httpPostAsync(theUrl, data, callback){
  var xhr = new XMLHttpRequest();
  xhr.onreadystatechange = function() { 
    callback(xhr.responseText);
  }
  xhr.open("POST", theUrl, true);
  xhr.setRequestHeader('Content-Type', 'application/json');
  xhr.send(data);
}

function saveFile(filePath){
  httpPostAsync("/api/albums", JSON.stringify({
    username: filePath,
    data: data
  }), res => {
    if (res){
      console.log(JSON.parse(res).msg);
      return JSON.parse(res).msg;
    }
  })
}

function signup(username, password){
  httpPostAsync("/api/members", JSON.stringify({
    username: username,
    password: password
  }), res => {
    if (res){
      console.log(JSON.parse(res).msg);
      return JSON.parse(res).msg;
    }
  });
  
}

function login(username, password){
  httpGetAsync(`/api/members/${username}/${password}`, res => {
    if (res){
      data = JSON.parse(JSON.parse(res));
      if (!data.hasOwnProperty('msg')){
        loggedin = true;
        filePath = username;
        console.log("Success");
        return "Success";
      } else {
        console.log(data.msg);
        return data.msg;
      }
    }
  });
}

function logout(){
  data = {};
  loggedin = false;
  console.log("Logged out");
  return "Logged out";
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

