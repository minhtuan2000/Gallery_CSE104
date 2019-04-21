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

let data = JSON.parse(loadFile("data.json"));

function getAlbums(){
  let result = [];
  for (i = 0; i < data["albums"].length; i += 1){
    result.push(data["albums"][i]["name"]);
  }
  saveFile("data.json");
  return result;
}

function getImages(album){
  let result = [];
  for (i = 0; i < data["albums"].length; i += 1){
    if (data["albums"][i]["name"] == album){
      for (j = 0; j < data["albums"][i]["files"].length; j += 1){
        result.push(data["albums"][i]["files"][j]);
      }
    }
  }
  saveFile("data.json");
  return result;
}

function addAlbum(album){
  data["albums"].push({name: album, files: []});
  saveFile("data.json");
}

function addImage(album, image){
  for (i = 0; i < data["albums"].length; i += 1){
    if (data["albums"][i]["name"] == album){
      data["albums"][i]["files"].push(image);
    }
  }
  saveFile("data.json");
}

function deleteAlbum(album){
  for (i = 0; i < data["albums"].length; i += 1){
    if (data["albums"][i]["name"] == album){
      data["albums"].splice(i, 1);
    }
  }
  saveFile("data.json");
}

function deleteImage(album, image){
  for (i = 0; i < data["albums"].length; i += 1){
    if (data["albums"][i]["name"] == album){
      for (j = 0; j < data["albums"][i]["files"].length; j += 1){
        if (data["albums"][i]["files"][j] == image){
          data["albums"][i]["files"].splice(j, 1);
        }
      }
    }
  }
  saveFile("data.json");
}

