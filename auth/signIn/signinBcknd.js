window.addEventListener("load", () => {

    const apiUrl = BACKEND_PRE_URL + '/auth/signIn';

    const contactForm = document.getElementById('form-login');
    const responseMessage = document.getElementById('status_text');

    contactForm.addEventListener('submit', function (event) {
        event.preventDefault();
        responseMessage.textContent = "";
        responseMessage.textContent = "";

        const userName = contactForm.querySelector("#email").value;
        const password = contactForm.querySelector("#password").value;

        const body = {
            "userName":userName,
            "password":password
        };

        const requestOptions = {
            method: 'POST',
            headers: { 
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(body)
        };

        fetch(apiUrl, requestOptions)
            .then(response => {
                return response.json();
            }).then(data => {

                if (data.error != undefined) {
                    responseMessage.textContent = data.error;
                } else {
                    setCookie("jwtToken", data.jwtToken, 1*24);
                    window.location.replace(FRONTEND_PRE_URL + "");
                }

            })
            .catch(error => {
                responseMessage.textContent = error;
                console.log("error");
            });
    });

});