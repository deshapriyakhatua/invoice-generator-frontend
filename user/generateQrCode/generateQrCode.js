
/*------------ Event for hide & show options_container ------------- */

function addEventToOptionsContainer(eventTarget){

    document.querySelectorAll(eventTarget).forEach((elem)=>{
        elem.addEventListener("click", (event)=>{
            let mainElement,arrow;
            mainElement = event.target.parentNode.parentNode.querySelector(".options_container");
            arrow = event.target;
            
            if(mainElement.classList.contains("hide")){
                mainElement.classList.remove("hide");
                arrow.style.transform = "rotate(-135deg)";
            }else{
                mainElement.classList.add("hide");
                arrow.style.transform = "rotate(45deg)";
            }
            
        });
    });
}

addEventToOptionsContainer(".qr_input_holder > div > h3 > span");


/*--------- Event for Change of color type ----------- */

function addEventToColorType(colorType){

    document.querySelector(`${colorType} .select_color_type`).addEventListener("change", (event)=>{
        if(event.target.value == "gradient"){
            document.querySelectorAll(`${colorType} .gradient_type_select_container, ${colorType} .rotation_container, ${colorType} .second_color_card`).forEach((elem)=>{
                elem.style.display = "block";
            });
        }else{
            document.querySelectorAll(`${colorType} .gradient_type_select_container, ${colorType} .rotation_container, ${colorType} .second_color_card`).forEach((elem)=>{
                elem.style.display = "none";
            });
        }
    });

}

addEventToColorType(".dots_style_container");
addEventToColorType(".corners_square_style_container");
addEventToColorType(".corners_dot_style_container");
addEventToColorType(".background_style_container");


/*--------------- Update Logo Size value ------------*/

document.querySelector("#qr_size").addEventListener("input",(event)=>{
    document.querySelector(".show_qr_size").textContent = event.target.value + " x";
})

/*--------------- Generate QR Code --------------*/

function generateQrCode(boolean){

    let data = document.querySelector("#qr_input").value;
    let logoFile = document.querySelector("#qr_logo_file");

    let dotType = document.querySelector("#dots_style_type").value;
    let dotColorType = document.querySelector("#dots_select_color_type").value;
    let dotGradientType = document.querySelector("#dots_select_gradient_type").value;
    let dotRotation = document.querySelector("#dots_rotation_gradient").value;
    let dotColor1 = document.querySelector("#dots_first_color").value;
    let dotColor2 = document.querySelector("#dots_second_color").value;

    //console.log(data,logoFile,dotType, dotColorType, dotGradientType,dotRotation,dotColor1,dotColor2);

    let cornersSquareType = document.querySelector("#corners_square_style_type").value;
    let cornersSquareColorType = document.querySelector("#corners_square_select_color_type").value;
    let cornersSquareGradientType = document.querySelector("#corners_square_select_gradient_type").value;
    let cornersSquareRotation = document.querySelector("#corners_square_rotation_gradient").value;
    let cornersSquareColor1 = document.querySelector("#corners_square_first_color").value;
    let cornersSquareColor2 = document.querySelector("#corners_square_second_color").value;

    //console.log(cornersSquareType, cornersSquareColorType, cornersSquareGradientType,cornersSquareRotation,cornersSquareColor1,cornersSquareColor2);

    let cornersDotType = document.querySelector("#corners_dot_style_type").value;
    let cornersDotColorType = document.querySelector("#corners_dot_select_color_type").value;
    let cornersDotGradientType = document.querySelector("#corners_dot_select_gradient_type").value;
    let cornersDotRotation = document.querySelector("#corners_dot_rotation_gradient").value;
    let cornersDotColor1 = document.querySelector("#corners_dot_first_color").value;
    let cornersDotColor2 = document.querySelector("#corners_dot_second_color").value;

    //console.log(cornersDotType, cornersDotColorType, cornersDotGradientType,cornersDotRotation,cornersDotColor1,cornersDotColor2);

    let backgroundColorType = document.querySelector("#background_select_color_type").value;
    let backgroundGradientType = document.querySelector("#background_select_gradient_type").value;
    let backgroundRotation = document.querySelector("#background_rotation_gradient").value;
    let backgroundColor1 = document.querySelector("#background_first_color").value;
    let backgroundColor2 = document.querySelector("#background_second_color").value;

    //console.log(backgroundColorType, backgroundGradientType,backgroundRotation,backgroundColor1,backgroundColor2);

    let logoSize = (document.querySelector("#logo_size").value * 1) / 100;
    let logoMargin = document.querySelector("#logo_outside_margin").value*1;

    //console.log(logoSize,logoMargin);

    let errorCrnLevel = document.querySelector("#err_crn_lvl").value;

    //console.log(errorCrnLevel);

    qrOptionObj = {
        width: 200,
        height: 200,
        margin: 0,
        type: "svg",
        data: data,
        image: "",
        dotsOptions: {
            color: dotColor1,
            gradient:{
                type: dotGradientType,
                rotation: dotRotation,
                colorStops: [
                    {
                        offset: 0,
                        color: dotColor1
                    },
                    {
                        offset: 1,
                        color: dotColor2
                    }
                ]
            },
            type: dotType
        },
        cornersSquareOptions:{
            type: cornersSquareType,
            color: cornersSquareColor1,
            gradient:{
                type: cornersSquareGradientType,
                rotation: cornersSquareRotation,
                colorStops: [
                    {
                        offset: 0,
                        color: cornersSquareColor1
                    },
                    {
                        offset: 1,
                        color: cornersSquareColor2
                    }
                ]
            }
        },
        cornersDotOptions: {
            type: cornersDotType,
            color: cornersDotColor1,
            gradient:{
                type: cornersDotGradientType,
                rotation: cornersDotRotation,
                colorStops: [
                    {
                        offset: 0,
                        color: cornersDotColor1
                    },
                    {
                        offset: 1,
                        color: cornersDotColor2
                    }
                ]
            }
        },
        backgroundOptions: {
            color: backgroundColor1,
            gradient:{
                type: backgroundGradientType,
                rotation: backgroundRotation,
                colorStops: [
                    {
                        offset: 0,
                        color: backgroundColor1
                    },
                    {
                        offset: 1,
                        color: backgroundColor2
                    }
                ]
            }
        },
        imageOptions: {
            imageSize: logoSize,
            crossOrigin: "anonymous",
            margin: logoMargin
        },
        qrOptions: {
            errorCorrectionLevel: errorCrnLevel
        }
    };

    if(dotColorType == "single"){
        qrOptionObj.dotsOptions.gradient = undefined;
    }
    if(cornersSquareColorType == "single"){
        qrOptionObj.cornersSquareOptions.gradient = undefined;
    }
    if(cornersDotColorType == "single"){
        qrOptionObj.cornersDotOptions.gradient = undefined;
    }
    if(backgroundColorType == "single"){
        qrOptionObj.backgroundOptions.gradient = undefined;
    }

    if(logoFile.value == ""){
        
        qrOptionObj.image = boolean ?"" :"/global/files/invoiceLogo.png";
        document.getElementById("canvas").innerHTML = `<img src="/global/files/qrCodeLoader.gif" alt="qr code generator" class="qr_code_loader">`;
        qrCode = new QRCodeStyling(qrOptionObj);
        setTimeout(()=>{
            document.getElementById("canvas").innerHTML = "";
            qrCode.append(document.getElementById("canvas"));
        },2000);

        return;
    }

    let reader = new FileReader();
    reader.onload = function (e){

        qrOptionObj.image = e.target.result;
        console.log(qrOptionObj)

        document.getElementById("canvas").innerHTML = `<img src="/global/files/qrCodeLoader.gif" alt="qr code generator" class="qr_code_loader">`;
        qrCode = new QRCodeStyling(qrOptionObj);
        setTimeout(()=>{
            document.getElementById("canvas").innerHTML = "";
            qrCode.append(document.getElementById("canvas"));
        },2000);

    }
    reader.readAsDataURL(logoFile.files[0]);
    
}

let qrCode;
let qrOptionObj;
generateQrCode(false);

document.querySelector(".genrate_qrcode_button").addEventListener("click", (event)=>{
    generateQrCode(true)
});


/*--------------- Download Qr Code -------------*/

document.querySelector(".download_qrcode").addEventListener("click", ()=>{
    let size = document.querySelector("#qr_size").value * 1;
    qrOptionObj.width = size;
    qrOptionObj.height = size;
    qrCode = new QRCodeStyling(qrOptionObj);
    let extension = document.querySelector("#download_extension_type").value;
    qrCode.download({ name: "SnapBills-Qr-Code", extension: extension });
})