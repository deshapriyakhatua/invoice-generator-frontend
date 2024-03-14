window.addEventListener("load", ()=>{

/*------------- change layout -----------*/

let iframe = document.querySelector(".invoice_iframe");

document.querySelector(".change_layout").addEventListener("click", ()=>{

    document.querySelector(".invoice_iframe").style.display = "none";
    document.querySelector(".holds-the-iframe").style.display = "block";

    let templates = {1:"4", 2:"5", 3:"1", 4:"2", 5:"3"}
    let currTemplate = iframe.src.substr(-6,1);
    console.log(currTemplate,templates[currTemplate])
    iframe.src = iframe.src.slice(0, -16) + templates[currTemplate] + iframe.src.slice(-15, -6) + templates[currTemplate] + iframe.src.slice(-5);
    

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