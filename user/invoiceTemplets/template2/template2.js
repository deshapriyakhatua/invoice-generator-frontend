

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


/* ------------ Add & remove item row ---------- */

document.querySelector(".invoice_section3 .add_new_row td div.add_line").addEventListener("click", (event)=>{
    let itemRow = document.createElement("tr");
    itemRow.className = "item_row";
    itemRow.innerHTML = `
                        <td class="first">
                            <textarea name="item_name" class="item_name" id="" cols="30" rows="1" placeholder="Enter Product Title Here" spellcheck="false"></textarea>
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
                        <td class="remove_row">
                            <span class="material-symbols-rounded remove-line-icon" onclick="removeRowItem(event)">cancel</span>
                        </td>
    `;

    let rowSeparator = document.createElement("tr");
    rowSeparator.className = "row_separator";
    rowSeparator.innerHTML = `
                        <td height="1" colspan="6"></td>
    `;

    let parentNode = document.querySelector(".invoice_section3 tbody");
    let afterItemRow = document.querySelector(".invoice_section3 .add_new_row");
    parentNode.insertBefore(itemRow,afterItemRow);
    parentNode.insertBefore(rowSeparator,afterItemRow);
    autoResizeTextArea();
    calculateTotalPrice();
});


function removeRowItem(event){
    let parent = event.target.parentNode.parentNode.parentNode;
    let row = event.target.parentNode.parentNode;
    let rowSeparator = event.target.parentNode.parentNode.nextElementSibling
    console.log(rowSeparator)
    parent.removeChild(row)
    parent.removeChild(rowSeparator);
            
    calculateTotalPrice();
};

/*---------- Add and Remove Business details ------------- */

document.querySelector(".invoice_section2 .business_details div.add_line").addEventListener("click", (event)=>{
    let itemRow = document.createElement("div");
    itemRow.innerHTML = `
        <input type="text" value="" placeholder="Enter Custom Value">
        <span class="material-symbols-rounded remove-line-icon" onclick="removeBusinessDetailsRow(event)">cancel</span>
    `;

    let parentNode = document.querySelector(".invoice_section2 .business_details");
    let afterItemRow = document.querySelector(".invoice_section2 .business_details div.add_line");
    parentNode.insertBefore(itemRow,afterItemRow);
});

function removeBusinessDetailsRow(event){
    let parent = event.target.parentNode.parentNode;
    let row = event.target.parentNode;
    parent.removeChild(row)
};


/*------------------- Add and Remove Billing & shipping details ---------------- */

document.querySelector(".invoice_section4 .billig div.add_line").addEventListener("click", ()=>{
     addNewRowInput(".invoice_section4 .billig", ".invoice_section4 .billig div.add_line"); 
});

document.querySelector(".invoice_section4 .shipping div.add_line").addEventListener("click", ()=>{
    addNewRowInput(".invoice_section4 .shipping", ".invoice_section4 .shipping div.add_line"); 
});

document.querySelector(".invoice_section4 .payment_method div.add_line").addEventListener("click", ()=>{
    addNewRowInput(".invoice_section4 .payment_method", ".invoice_section4 .payment_method div.add_line"); 
});

document.querySelector(".invoice_section4 .shipping_method div.add_line").addEventListener("click", ()=>{
    addNewRowInput(".invoice_section4 .shipping_method", ".invoice_section4 .shipping_method div.add_line"); 
});

function addNewRowInput(parent, afterItem){
    let itemRow = document.createElement("div");
    itemRow.innerHTML = `
    <input type="text" placeholder="Enter Custom Value">
    <span class="material-symbols-rounded remove-line-icon" onclick="removeBillingDetailsRow(event)">cancel</span>
    `;

    let parentNode = document.querySelector(parent);
    let afterItemRow = document.querySelector(afterItem);
    parentNode.insertBefore(itemRow,afterItemRow);
};

function removeBillingDetailsRow(event){
    let parent = event.target.parentNode.parentNode;
    let row = event.target.parentNode;
    parent.removeChild(row);
};


/*------------ Calculate invoice price ------------ */

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


