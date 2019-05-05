let selectedAlbum = "";

function initiate(){
    let list = getAlbums();
    for (i = 0; i < list.length; i++){
        let newAlbum = document.createElement("div");
        newAlbum.classList.add("left-box");
        if (i == 0){
            selectedAlbum = list[i];
            console.log("selected album: " + selectedAlbum);
            newAlbum.classList.add("left-box-selected");
        } else {
            newAlbum.classList.add("left-box-not-selected");
        }
        //New text
        let newAlbumText = document.createElement("p");
        newAlbumText.classList.add("album-text");
        newAlbumText.textContent = list[i];
        //Configure new album
        newAlbum.appendChild(newAlbumText);
        newAlbum.addEventListener("click", event => {
            //Change current album
            let lastAlbum = document.getElementsByClassName("left-box-selected")[0];
            lastAlbum.classList.remove("left-box-selected");
            lastAlbum.classList.add("left-box-not-selected");
            wipeContent();
            //Open new album
            let currentAlbum = event.target;
            if (event.target.classList.contains("album-text")){
                currentAlbum = event.target.parentElement;
            } 
            currentAlbum.classList.add("left-box-selected");
            currentAlbum.classList.remove("left-box-not-selected");
            selectedAlbum = currentAlbum.getElementsByClassName("album-text")[0].textContent;
            console.log("selected album: " + selectedAlbum);
            getContent();
        });
        //append new album
        document.getElementById("album-box").appendChild(newAlbum);
    }
    getContent();
};

function wipeout(){
    let parentElement = document.getElementById("album-box");
    let list = document.getElementsByClassName("left-box");
    while (list.length > 1) parentElement.removeChild(list[0]);
    wipeContent();
    console.log("Wiped out content");
};

function getContent(){
    let parentElement = document.getElementById("content-albums");
    let list = getImages(selectedAlbum);
    for (i = 0; i < list.length; i++){
        let newImage = document.createElement("img");
        newImage.src = list[i];
        newImage.classList.add("image");
        parentElement.appendChild(newImage);
    }
};

function wipeContent(){
    let parentElement = document.getElementById("content-albums");
    let list = document.getElementsByClassName("image");
    while (list.length > 0) parentElement.removeChild(list[0]);
};