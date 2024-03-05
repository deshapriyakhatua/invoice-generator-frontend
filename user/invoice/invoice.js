var isAdvancedUpload = function () {
    var div = document.createElement('div');
    return (('draggable' in div) || ('ondragstart' in div && 'ondrop' in div)) && 'FormData' in window && 'FileReader' in window;
}();

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
                        document.querySelector(".invoice_logo").src = e.target.result;
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


 /*------------- Open & Close upload popup ----------- */

document.querySelector(".invoice_logo_holder").addEventListener("click", (event) => {
    document.querySelector(".image_upload").style.display = "flex";
});

document.querySelector(".close_drag_drop").addEventListener("click", (event) => {
    document.querySelector(".image_upload").style.display = "none";
});


/* ------------ Add & remove item row ---------- */

document.querySelector(".item_add_remove .add_item").addEventListener("click", (event)=>{
    //if(document.querySelectorAll(".invoice_section3 tbody tr").length >= 25){ return; }
    let itemRow = document.createElement("tr");
    itemRow.className = "item_row";
    itemRow.innerHTML = `
                        <td class="first">
                            <input type="text" class="item_name" placeholder="Beats Studio Over-Ear Headphones &#128393;">
                        </td>
                        <td class="second">
                            <input type="number" class="unit_price" value="100">
                        </td>
                        <td class="third">
                            <input type="number" class="cgst" value="89">
                        </td>
                        <td class="fourth">
                            <input type="number" class="sgst" value="89">
                        </td>
                        <td class="fifth">
                            <input type="number" class="quantity" value="1">
                        </td>
                        <td class="sixth">
                            <input type="number" class="price" value="859" disabled>
                        </td>
    `;

    let rowSeparator = document.createElement("tr");
    rowSeparator.className = "row_separator";
    rowSeparator.innerHTML = `
                        <td height="1" colspan="6"></td>
    `;

    let parentNode = document.querySelector(".invoice_section3 tbody");
    let afterItemRow = document.querySelector(".after_item_row");
    parentNode.insertBefore(itemRow,afterItemRow);
    parentNode.insertBefore(rowSeparator,afterItemRow);
    calculateTotalPrice();
});

document.querySelector(".item_add_remove .remove_item").addEventListener("click", (event)=>{
     let allRows = document.querySelectorAll(".invoice_section3 tbody tr");
     if(allRows.length > 8){
        allRows[allRows.length-5].remove();
        allRows[allRows.length-6].remove();
     }
     calculateTotalPrice();
});


/*------------------- Calculate invoice price ------------------ */

function calculateTotalPrice(){

    let subTotal = 0;

    document.querySelectorAll(".item_row").forEach((elem)=>{
        let unitPrice = elem.querySelector(".unit_price").value * 1 + elem.querySelector(".cgst").value * 1 + elem.querySelector(".sgst").value * 1;
        let quantity = elem.querySelector(".quantity").value * 1;

        let price = unitPrice * quantity;
        elem.querySelector(".price").value = price;
        subTotal += price;
    });

    document.querySelector(".subtotal_row .second input").value = subTotal;

    subTotal += document.querySelector(".shipping_row .second input").value*1;

    document.querySelector(".grand_total_row .second input").value = subTotal;
}

calculateTotalPrice();

window.addEventListener('input', function (evt) {
    calculateTotalPrice();
});

/*------------- print invoice -----------*/

document.querySelector(".print_button").addEventListener("click", () => {
    window.print();
});

