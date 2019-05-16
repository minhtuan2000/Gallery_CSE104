//Some global variables
let selectedAlbum = "";
let fromAlbum = ""; // Where cut and copied images from

let selectedImages = [];
let copiedImages = [];
let cutImages = [];

// CLose preview button
let buttonImagePreviewPanel = document.getElementById("button-close-preview");
buttonImagePreviewPanel.addEventListener("click", event => {
    buttonImagePreviewPanel.parentElement.style.visibility = "hidden";
    console.log("Out of preview mode");
});
// Hide left-click popup
document.body.addEventListener("click", event => {
    let popupElement = document.getElementById("popup-choices");
    popupElement.style.visibility = "hidden";
    while(popupElement.childElementCount > 0) popupElement.removeChild(popupElement.lastChild);
});
// Add paste 
document.getElementById("content-albums").addEventListener("contextmenu", event => {
    event.preventDefault();
    if (copiedImages.length > 0 || cutImages.length > 0){
        let popupElement = document.getElementById("popup-choices");
        popupElement.style.visibility = "visible";
        popupElement.style.transform = "translate(" + (event.clientX).toString() + "px," + (event.clientY).toString() + "px)";
        if (event.target.id == "content-albums") while(popupElement.childElementCount > 0) popupElement.removeChild(popupElement.lastChild);
        //Add paste choice in popup
        let newPopupChoice = document.createElement("p");
        newPopupChoice.classList.add("popup-choice");
        newPopupChoice.textContent = "Paste";
        newPopupChoice.addEventListener("click", pasteImagesProtocol);
        popupElement.appendChild(newPopupChoice);
    };
});
//Add Ctrl+C, Ctrl+V, Ctrl+X, Ctrl+A, delete
document.body.addEventListener("keydown",function(e){
    e = e || window.event;
    let key = e.which || e.keyCode; // keyCode detection
    let ctrl = e.ctrlKey ? e.ctrlKey : ((key === 17) ? true : false); // ctrl detection

    if ( key == 86 && ctrl ) {
        console.log("Ctrl + V Pressed !");
        pasteImagesProtocol(e);
    } else if ( key == 67 && ctrl ) {
        console.log("Ctrl + C Pressed !");
        copyImagesProtocol(e);
    } else if ( key == 88 && ctrl ) {
        console.log("Ctrl + X Pressed !");
        cutImagesProtocol(e);
    } else if ( key == 65 && ctrl ) {
        console.log("Ctrl + A Pressed !");
        e.preventDefault();
        selectAllImagesProtocol(e);
    } else if ( key == 46 ){
        console.log("Delete Pressed !");
        deleteImagesProtocol(e);
    }

},false);
//Handle add image button
let addImageButton = document.getElementById("image-uploads");
addImageButton.addEventListener("change", event => {
    for (let i = 0; i < event.target.files.length; i++){
        addImage_localStorage(selectedAlbum, event.target.files[i]);
        //addImage(selectedAlbum, URL.createObjectURL(event.target.files[i]));
    };
    wipeContent();
    getContent();
});

