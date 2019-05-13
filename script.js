function initiate(){
    //Initialize page after log in
    if (selectedAlbum != "") return;
    let list = getAlbums();
    for (let i = 0; i < list.length; i++){
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
    //Make add-image button available
    document.getElementById("add-image-button").style.visibility = "visible";
};

function wipeout(){
    let parentElement = document.getElementById("album-box");
    let list = document.getElementsByClassName("left-box");
    while (list.length > 1) parentElement.removeChild(list[0]);
    document.getElementById("left-menu").removeChild(document.getElementsByClassName("left-box")[0]);
    wipeContent();
    selectedAlbum = "";
    //Clear add-image button
    document.getElementById("add-image-button").style.visibility = "hidden";
    console.log("Wiped out content");
};

function getContent(){
    let parentElement = document.getElementById("content-albums");
    let list = getImages(selectedAlbum);
    for (let i = 0; i < list.length; i++){
        //New cover
        let newCover = document.createElement("div");
        newCover.classList.add("image-cover");
        //New image
        let newImage = document.createElement("img");
        newImage.src = list[i];
        newImage.classList.add("image");
        newImage.addEventListener('click', selectImageProtocol);
        newImage.addEventListener('dblclick', previewImageProtocol);
        newImage.addEventListener('contextmenu', rightClickImageProtocol);
        //Append image to cover and cover to parentElement
        newCover.appendChild(newImage);
        parentElement.appendChild(newCover);
    }
};

function wipeContent(){
    let parentElement = document.getElementById("content-albums");
    let list = parentElement.getElementsByClassName("image-cover");
    while (list.length > 0) parentElement.removeChild(list[0]);
    selectedImages = [];
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
    } else {
        //Delete that album if a name is not chosen
        if (!currentAlbum.classList.contains("left-box")) return;
        let currentAlbumName = currentAlbum.getElementsByClassName("album-text")[0].textContent;
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
    let imagePreviewPanel = document.getElementsByClassName("image-preview-panel")[0];
    let imagePreview = imagePreviewPanel.getElementsByClassName("image")[0];
    imagePreview.src = imageElement.src;
    imagePreviewPanel.style.visibility = "visible";
    console.log("In preview mode");
}

function previewImageProtocol(event){
    previewImage(event.target);
}

function rightClickImageProtocol(event){
    event.preventDefault();
    let popupElement = document.getElementById("popup-choices");
    while(popupElement.childElementCount > 0) popupElement.removeChild(popupElement.lastChild);
    popupElement.style.visibility = "visible";
    popupElement.style.transform = "translate(" + (event.clientX).toString() + "px," + (event.clientY).toString() + "px)";
    //Add preview
    let newPopupChoice0 = document.createElement("p");
    newPopupChoice0.classList.add("popup-choice");
    newPopupChoice0.textContent = "Preview";
    newPopupChoice0.addEventListener("click", e => {
        previewImage(event.target);
    });
    popupElement.appendChild(newPopupChoice0);
    //Add select, deselect
    let newPopupChoice1 = document.createElement("p");
    newPopupChoice1.classList.add("popup-choice");
    if (!selectedImages.includes(event.target)){
        newPopupChoice1.textContent = "Select";
        newPopupChoice1.addEventListener("click", e => {
            selectImage(event.target);
        });
    } else {
        newPopupChoice1.textContent = "Deselect";
        newPopupChoice1.addEventListener("click", e => {
            deselectImage(event.target);
        });

        //Add copy
        //Copy only available for selected image
        let newPopupChoice2 = document.createElement("p");
        newPopupChoice2.classList.add("popup-choice");
        newPopupChoice2.textContent = "Copy";
        newPopupChoice2.addEventListener("click", copyImagesProtocol);
        popupElement.appendChild(newPopupChoice2);

        //Add cut
        //Cut only available for selected image
        let newPopupChoice3 = document.createElement("p");
        newPopupChoice3.classList.add("popup-choice");
        newPopupChoice3.textContent = "Cut";
        newPopupChoice3.addEventListener("click", cutImagesProtocol);
        popupElement.appendChild(newPopupChoice3);

        //Add delete
        let newPopupChoice4 = document.createElement("p");
        newPopupChoice4.classList.add("popup-choice");
        newPopupChoice4.textContent = "Delete";
        newPopupChoice4.addEventListener("click", deleteImagesProtocol);
        popupElement.appendChild(newPopupChoice4);
    };
    popupElement.appendChild(newPopupChoice1);
}

function copyImagesProtocol(event){
    cutImages = [];
    copiedImages = [];
    for (let i = 0; i < selectedImages.length; i++){
        copiedImages.push(selectedImages[i]);
    }
    fromAlbum = selectedAlbum;
    console.log("Copied " + selectedImages.length.toString() + " images");
}

function cutImagesProtocol(event){
    copiedImages = [];
    cutImages = [];
    for (let i = 0; i < selectedImages.length; i++){
        cutImages.push(selectedImages[i]);
    }
    fromAlbum = selectedAlbum;
    console.log("Cut " + selectedImages.length.toString() + " images");
}

function pasteImagesProtocol(event){
    while (cutImages.length > 0){
        image = cutImages.pop().src;
        addImage(selectedAlbum, image);
        deleteImage(fromAlbum, image);
    }
    for (let i = 0; i < copiedImages.length; i++) addImage(selectedAlbum, copiedImages[i].src);
    wipeContent();
    getContent();
}

function deleteImagesProtocol(event){
    console.log("Deleted " + selectedImages.length.toString() + " images");
    while (selectedImages.length > 0) deleteImage(selectedAlbum, selectedImages.pop().src);
    wipeContent();
    getContent();
}

function selectAllImagesProtocol(event){
    let imageElementList = document.getElementById("content-albums").getElementsByClassName("image");
    selectedImages = [];
    for (let i = 0; i < imageElementList.length; i++)
        selectImage(imageElementList[i]);
}

