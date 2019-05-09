let selectedAlbum = "";

function initiate(){
    if (selectedAlbum != "") return;
    let list = getAlbums();
    for (i = 0; i < list.length; i++){
        let newAlbum = document.createElement("div");
        //New text
        let newAlbumText = document.createElement("span");
        newAlbumText.classList.add("album-text");
        newAlbumText.textContent = list[i];
        //Delete sign
        let newDeleteSign = document.createElement("img");
        newDeleteSign.classList.add("left-icon");
        newDeleteSign.addEventListener("click", deleteAlbumProtocol);
        //Rename sign
        let newRenameSign = document.createElement("img");
        newRenameSign.classList.add("left-icon");
        newRenameSign.addEventListener("click", renameAlbumProtocol);
        //Configure new album
        newAlbum.classList.add("left-box");
        if (i == 0){
            selectedAlbum = list[i];
            console.log("selected album: " + selectedAlbum);
            newAlbum.classList.add("left-box-selected");
            newDeleteSign.src = "./Assets/delete.png";
            newRenameSign.src = "./Assets/rename.png";
        } else {
            newAlbum.classList.add("left-box-not-selected");
            newDeleteSign.src = "./Assets/delete_white.png";
            newRenameSign.src = "./Assets/rename_white.png";
        }
        newAlbum.appendChild(newAlbumText);
        newAlbum.appendChild(newRenameSign);
        newAlbum.appendChild(newDeleteSign);
        newAlbum.addEventListener("click", event => {
            let currentAlbum = event.target;
            //Check some cases
            if (event.target.classList.contains("album-text")){
                currentAlbum = event.target.parentElement;
            } 
            if (!currentAlbum.classList.contains("left-box")) return;
            //Change current album
            let lastAlbum = document.getElementsByClassName("left-box-selected")[0];
            lastAlbum.classList.remove("left-box-selected");
            lastAlbum.classList.add("left-box-not-selected");
            lastAlbum.getElementsByTagName("img")[1].src = "./Assets/delete_white.png";
            lastAlbum.getElementsByTagName("img")[0].src = "./Assets/rename_white.png";
            wipeContent();
            //Open new album
            currentAlbum.classList.add("left-box-selected");
            currentAlbum.classList.remove("left-box-not-selected");
            currentAlbum.getElementsByTagName("img")[1].src = "./Assets/delete.png";
            currentAlbum.getElementsByTagName("img")[0].src = "./Assets/rename.png";
            selectedAlbum = currentAlbum.getElementsByClassName("album-text")[0].textContent;
            console.log("selected album: " + selectedAlbum);
            getContent();
        });
        //append new album
        document.getElementById("album-box").appendChild(newAlbum);
    }
    getContent();
    //Add album
    const addAlbumSign = document.createElement("div");
    addAlbumSign.classList.add("left-box");
    addAlbumSign.classList.add("left-box-not-selected");
    let addAlbumButton = document.createElement("div");
    addAlbumButton.setAttribute("id", "button-add-album");
    addAlbumButton.textContent = "+";
    addAlbumSign.appendChild(addAlbumButton);
    addAlbumSign.addEventListener("click", addAlbumProtocol);
    document.getElementById("left-menu").appendChild(addAlbumSign);
};

function wipeout(){
    let parentElement = document.getElementById("album-box");
    let list = document.getElementsByClassName("left-box");
    while (list.length > 1) parentElement.removeChild(list[0]);
    document.getElementById("left-menu").removeChild(document.getElementsByClassName("left-box")[0]);
    wipeContent();
    selectedAlbum = "";
    console.log("Wiped out content");
};

function getContent(){
    let parentElement = document.getElementById("content-albums");
    let list = getImages(selectedAlbum);
    for (i = 0; i < list.length; i++){
        //New cover
        let newCover = document.createElement("div");
        newCover.classList.add("image-cover");
        //New image
        let newImage = document.createElement("img");
        newImage.src = list[i];
        newImage.classList.add("image");
        newImage.addEventListener('click', selectImageProtocol);
        newImage.addEventListener('dblclick', previewImageProtocol);
        newImage.addEventListener('oncontextmenu', rightClickImageProtocol);
        //Append image to cover and cover to parentElement
        newCover.appendChild(newImage);
        parentElement.appendChild(newCover);
    }
};

function wipeContent(){
    let parentElement = document.getElementById("content-albums");
    let list = parentElement.getElementsByClassName("image-cover");
    while (list.length > 0) parentElement.removeChild(list[0]);
};

function deleteAlbumProtocol(event){
    let currentAlbum = event.target.parentElement;
    if (!currentAlbum.classList.contains("left-box")) return;
    let currentAlbumName = currentAlbum.getElementsByClassName("album-text")[0].textContent;
    if (confirm("Delete " + currentAlbumName + "?")){
        let parentElement = document.getElementById("album-box");
        parentElement.removeChild(currentAlbum);
        deleteAlbum(currentAlbumName);
        //Check if album is selected
        if (selectedAlbum == currentAlbumName){
            if (document.getElementsByClassName("left-box").length == 0){
                selectedAlbum = "";
                console.log("selected album: " + selectedAlbum);
                wipeContent();
            } else {
                let currentAlbum = document.getElementsByClassName("left-box")[0];
                currentAlbum.classList.add("left-box-selected");
                currentAlbum.classList.remove("left-box-not-selected");
                currentAlbum.getElementsByTagName("img")[1].src = "./Assets/delete.png";
                currentAlbum.getElementsByTagName("img")[0].src = "./Assets/rename.png";
                selectedAlbum = currentAlbum.getElementsByClassName("album-text")[0].textContent;
                console.log("selected album: " + selectedAlbum);
                wipeContent();
                getContent();
            };
        };
    };
};

function renameAlbumProtocol(event){
    let currentAlbum = event.target.parentElement;
    if (!currentAlbum.classList.contains("left-box")) return;
    let currentAlbumName = currentAlbum.getElementsByClassName("album-text")[0].textContent;
    let newName = prompt("Rename album to", currentAlbumName);
    if (newName != null && newName != ""){
        currentAlbum.getElementsByClassName("album-text")[0].textContent = newName;
        renameAlbum(currentAlbumName, newName);
        //Check if album is selected
        if (selectedAlbum == currentAlbumName){
            selectedAlbum = newName;
            console.log("selected album: " + selectedAlbum);
        };
    };
};

function addAlbumProtocol(event){
    let newAlbum = document.createElement("div");
    //New text
    let newAlbumText = document.createElement("span");
    newAlbumText.classList.add("album-text");
    newAlbumText.textContent = "";
    //Delete sign
    let newDeleteSign = document.createElement("img");
    newDeleteSign.classList.add("left-icon");
    newDeleteSign.addEventListener("click", deleteAlbumProtocol);
    //Rename sign
    let newRenameSign = document.createElement("img");
    newRenameSign.classList.add("left-icon");
    newRenameSign.addEventListener("click", renameAlbumProtocol);
    //Configure new album
    newAlbum.classList.add("left-box");
    if (document.getElementsByClassName("left-box").length == 0){
        selectedAlbum = "";
        console.log("selected album: " + selectedAlbum);
        newAlbum.classList.add("left-box-selected");
        newDeleteSign.src = "./Assets/delete.png";
        newRenameSign.src = "./Assets/rename.png";
    } else {
        newAlbum.classList.add("left-box-not-selected");
        newDeleteSign.src = "./Assets/delete_white.png";
        newRenameSign.src = "./Assets/rename_white.png";
    }
    newAlbum.appendChild(newAlbumText);
    newAlbum.appendChild(newRenameSign);
    newAlbum.appendChild(newDeleteSign);
    newAlbum.addEventListener("click", event => {
        let currentAlbum = event.target;
        //Check some cases
        if (event.target.classList.contains("album-text")){
            currentAlbum = event.target.parentElement;
        } 
        if (!currentAlbum.classList.contains("left-box")) return;
        //Change current album
        let lastAlbum = document.getElementsByClassName("left-box-selected")[0];
        lastAlbum.classList.remove("left-box-selected");
        lastAlbum.classList.add("left-box-not-selected");
        lastAlbum.getElementsByTagName("img")[1].src = "./Assets/delete_white.png";
        lastAlbum.getElementsByTagName("img")[0].src = "./Assets/rename_white.png";
        wipeContent();
        //Open new album
        currentAlbum.classList.add("left-box-selected");
        currentAlbum.classList.remove("left-box-not-selected");
        currentAlbum.getElementsByTagName("img")[1].src = "./Assets/delete.png";
        currentAlbum.getElementsByTagName("img")[0].src = "./Assets/rename.png";
        selectedAlbum = currentAlbum.getElementsByClassName("album-text")[0].textContent;
        console.log("selected album: " + selectedAlbum);
        getContent();
    });
    //append new album
    document.getElementById("album-box").appendChild(newAlbum);
    addAlbum("");
    //Choose album name
    let currentAlbum = newAlbum;
    if (!currentAlbum.classList.contains("left-box")) return;
    let currentAlbumName = currentAlbum.getElementsByClassName("album-text")[0].textContent;
    let newName = prompt("Enter album's name", currentAlbumName);
    
    if (newName != null && newName != ""){
        currentAlbum.getElementsByClassName("album-text")[0].textContent = newName;
        renameAlbum(currentAlbumName, newName);
        //Check if album is selected
        if (selectedAlbum == currentAlbumName){
            selectedAlbum = newName;
            console.log("selected album: " + selectedAlbum);
        };
    };
};

let selectedImages = [];
let copiedImages = [];
let cutImages = [];

function selectImage(imageElement){
    imageElement.parentElement.style.background = "blue";
    imageElement.style.opacity = 0.8;
    selectedImages.push(imageElement);
    console.log("selected " + imageElement.src);
}

function deselectImage(imageElement){
    imageElement.parentElement.style.background = "lightgray";
    imageElement.style.opacity = 1;
    selectedImages.splice(selectedImages.indexOf(imageElement), 1);
    console.log("deselected " + imageElement.src);
}

function selectImageProtocol(event){
    if (!event.ctrlKey){
        // If ctrl key is not pressed then unselect all element
        while (selectedImages.length > 0){
            selectedImage = selectedImages.pop();
            selectedImage.parentElement.style.background = "lightgray";
            selectedImage.style.opacity = 1;
        }
        selectImage(event.target);
    }
    else if (selectedImages.includes(event.target)){
        // If a selected image is clicked, it becomes unselected
        deselectImage(event.target);
    } 
    else{
        // Else, just select that image
        selectImage(event.target);
    };
}

function previewImage(imageElement){
    let newImagePreviewPanel = document.createElement("div");
    newImagePreviewPanel.classList.add("image-preview-panel");
    let newImagePreview = document.createElement("img");
    newImagePreview.classList.add("image");
    newImagePreview.src = imageElement.src;
    newImagePreviewPanel.appendChild(newImagePreview);
    newImagePreviewPanel.addEventListener("click", event => {
        document.body.removeChild(newImagePreviewPanel);
        console.log("Out of preview mode");
    });
    document.body.insertBefore(newImagePreviewPanel, document.body.firstChild);
    console.log("In preview mode");
}

function previewImageProtocol(event){
    previewImage(event.target);
}

function rightClickImageProtocol(event){

}