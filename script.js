const form = document.querySelector('#kill_bill');

form.addEventListener('submit', function (evt) {
    evt.preventDefault();

    const tokenValue = form.querySelector('#token').value;

    const api = {
        baseUrl: 'https://praktikum.tk/cohort11',
        headers: {
            authorization: tokenValue,
            'Content-Type': 'application/json'
        }
    }

    fetch(`https://praktikum.tk/cohort11/users/me`, {
        headers: api.headers
    })
        .then(res => {
            if (res.ok) {
                return res.json();
            }
            return Promise.reject(`Ошибка: ${res.status}`);
        })
        .then((infoForMe) => {
            if (infoForMe._id) {
                return infoForMe._id;
            }
        })
        .then( meId => {
            fetch(`https://praktikum.tk/cohort11/cards`, {
                headers: api.headers
            })
            .then(res => {
                if (res.ok) {
                    return res.json();
                }
                return Promise.reject(`Ошибка: ${res.status}`);
            })
            .then((content) => {
                content.forEach(element => {
                    if (element.owner._id === meId) {
                        fetch(`https://praktikum.tk/cohort11/cards/${element._id}`, {
                            method: 'DELETE',
                            headers: api.headers
                        })
                        .then(res => {
                            if (res.ok) {
                                return res.json();
                            }
                        })
                        .catch((err) => {
                            console.log(err);
                        });
                    }
        
                });
            });
        })

    
})
