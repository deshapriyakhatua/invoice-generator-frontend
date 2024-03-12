window.addEventListener("load", ()=>{

/*------------- change layout -----------*/

let iframe = document.querySelector(".invoice_iframe");

document.querySelector(".change_layout").addEventListener("click", ()=>{

    document.querySelector(".invoice_iframe").display = "none";
    document.querySelector(".holds-the-iframe").style.display = "block";

    if(iframe.src.endsWith("/user/invoiceTemplets/template1/template1.html")){
        iframe.src = iframe.src.slice(0, -46) + "/user/invoiceTemplets/template2/template2.html";
    }else if(iframe.src.endsWith("/user/invoiceTemplets/template2/template2.html")){
        iframe.src = iframe.src.slice(0, -46) + "/user/invoiceTemplets/template3/template3.html";
    }else{
        iframe.src = iframe.src.slice(0, -46) + "/user/invoiceTemplets/template1/template1.html";
    }

});


/*------------- print invoice -----------*/

document.querySelector(".heading_options .print_invoice").addEventListener("click", () => {
    document.querySelector(".invoice_iframe").contentWindow.print();
});

});


/*------------- iframe loading ----------- */

document.querySelector(".invoice_iframe").addEventListener("load", (event)=>{
    event.target.style.display = "block";
    document.querySelector(".holds-the-iframe").style.display = "none";
})