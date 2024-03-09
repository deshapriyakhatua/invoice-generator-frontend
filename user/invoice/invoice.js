window.addEventListener("load", ()=>{

var isAdvancedUpload = function () {
    var div = document.createElement('div');
    return (('draggable' in div) || ('ondragstart' in div && 'ondrop' in div)) && 'FormData' in window && 'FileReader' in window;
}();

let iframe = document.querySelector(".invoice_iframe");
let draggableFileArea = document.querySelector(".drag-file-area");
let browseFileText = document.querySelector(".browse-files");
let uploadIcon = document.querySelector(".upload-icon");
let dragDropText = document.querySelector(".dynamic-message");
let fileInput = document.querySelector(".default-file-input");
let cannotUploadMessage = document.querySelector(".cannot-upload-message");
let cancelAlertButton = document.querySelector(".cancel-alert-button");
let uploadedFile = document.querySelector(".file-block");
let fileName = document.querySelector(".file-name");
let fileSize = document.querySelector(".file-size");
let progressBar = document.querySelector(".progress-bar");
let removeFileButton = document.querySelector(".remove-file-icon");
let uploadButton = document.querySelector(".upload-button");
let fileFlag = 0;

fileInput.addEventListener("click", () => {
    fileInput.value = '';
});

fileInput.addEventListener("change", e => {
    console.log(" > " + fileInput.value);
    console.log(fileInput.files[0]);
    uploadIcon.textContent = 'check_circle';
    dragDropText.textContent = 'Browsed Successfully!';
    uploadButton.textContent = `Upload`;
    let fName = fileInput.files[0].name;
    fileName.textContent = (fName.length > 25 ? "..." : "") + fName.slice(-25);
    fileSize.textContent = (fileInput.files[0].size / 1024).toFixed(1) + " KB";
    uploadedFile.style.cssText = "display: flex;";
    progressBar.style.width = 0;
    fileFlag = 0;
});

uploadButton.addEventListener("click", () => {
    let isFileUploaded = fileInput.value;
    if (isFileUploaded != '') {
        if (fileFlag == 0) {
            fileFlag = 1;
            var width = 0;
            var id = setInterval(frame, 10);
            function frame() {
                if (width >= 100) {
                    clearInterval(id);
                    uploadButton.innerHTML = `<span class="material-symbols-rounded upload-button-icon"> check_circle </span> Uploaded`;
                    let reader = new FileReader();
                    reader.onload = function (e) {
                        iframe.contentWindow.document.querySelector(".invoice_logo").src = e.target.result;
                    }
                    reader.readAsDataURL(fileInput.files[0]);
                    document.querySelector(".image_upload").style.display = "none";
                } else {
                    width += 5;
                    progressBar.style.width = width + "%";
                }
            }
        }
    } else {
        cannotUploadMessage.style.cssText = "display: flex;";
        setTimeout(()=>{
            cannotUploadMessage.style.cssText = "display: none;";
        }, 3000);
    }
});

cancelAlertButton.addEventListener("click", () => {
    cannotUploadMessage.style.cssText = "display: none;";
});

if (isAdvancedUpload) {
    ["drag", "dragstart", "dragend", "dragover", "dragenter", "dragleave", "drop"].forEach(evt =>
        draggableFileArea.addEventListener(evt, e => {
            e.preventDefault();
            e.stopPropagation();
        })
    );

    ["dragover", "dragenter"].forEach(evt => {
        draggableFileArea.addEventListener(evt, e => {
            e.preventDefault();
            e.stopPropagation();
            uploadIcon.innerHTML = 'file_download';
            dragDropText.innerHTML = 'Drop your file here!';
        });
    });

    draggableFileArea.addEventListener("drop", e => {
        uploadIcon.innerHTML = 'check_circle';
        dragDropText.innerHTML = 'Dropped Successfully!';
        uploadButton.innerHTML = `Upload`;

        let files = e.dataTransfer.files;
        fileInput.files = files;
        console.log(files[0].name + " " + files[0].size);
        console.log(files[0]);
        console.log(document.querySelector(".default-file-input").value);
        let fName = files[0].name;
        fileName.textContent = (fName.length > 25 ? "..." : "") + fName.slice(-25);
        fileSize.textContent = (files[0].size / 1024).toFixed(1) + " KB";
        uploadedFile.style.cssText = "display: flex;";
        progressBar.style.width = 0;
        fileFlag = 0;
    });
}

removeFileButton.addEventListener("click", () => {
    uploadedFile.style.cssText = "display: none;";
    fileInput.value = '';
    uploadIcon.innerHTML = 'file_upload';
    dragDropText.innerHTML = 'Drag & drop';
    uploadButton.innerHTML = `Upload`;
});


/*-------------- Auto Resize textarea --------------- */

function autoResizeTextArea(){
    const txHeight = 26;
    const tx = document.getElementsByTagName("textarea");

    for (let i = 0; i < tx.length; i++) {
    if (tx[i].value == '') {
        tx[i].setAttribute("style", "height:" + txHeight + "px;overflow-y:hidden;");
    } else {
        tx[i].setAttribute("style", "height:" + (tx[i].scrollHeight) + "px;overflow-y:hidden;");
    }
    tx[i].addEventListener("input", OnInput, false);
    }

    function OnInput(e) {
    this.style.height = 'auto';
    this.style.height = (this.scrollHeight) + "px";
    }
}

autoResizeTextArea();


 /*------------- Open & Close upload popup ----------- */

 iframe.contentWindow.document.querySelector(".invoice_logo_holder").addEventListener("click", (event) => {
    document.querySelector(".image_upload").style.display = "flex";
});

document.querySelector(".close_drag_drop").addEventListener("click", (event) => {
    document.querySelector(".image_upload").style.display = "none";
});




/*------------- print invoice -----------*/

document.querySelector(".print_button").addEventListener("click", () => {
    document.querySelector(".invoice_iframe").contentWindow.print();
});

});