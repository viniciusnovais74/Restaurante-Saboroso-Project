class HcodeGrid {


    constructor(configs) {

        this.config = Object.assign({}, {

            formCreate: '#modal-create form',
            formUpdate: '#modal-update form',
            btnUpdate: '.btn-update',
            btnDelete: '.btn-delete',
            
        }, configs);

        this.initForms();
        this.init();
 
    }
    

    initForms() {

        this.formCreate = document.querySelector(this.config.formCreate);

        this.formCreate.save().then(json => {

            window.location.reload();

        }).catch(err => {

            console.log(err);

        });

        this.formUpdate = document.querySelector(this.config.formUpdate);

        this.formUpdate.save().then(json => {

            window.location.reload();

        }).catch(err => {

            console.log(err);

        });

    }

    init() {


        [...document.querySelectorAll(this.config.btnUpdate)].forEach(btn => {

            btn.addEventListener('click', e => {

                let tr = e.composedPath().find(el => {

                    return (el.tagName.toUpperCase() === 'TR');

                });

                let data = JSON.parse(tr.dataset.row);

                for (let name in data) {

                    let input = this.formUpdate.querySelector(`[name=${name}]`);

                    switch (name) {

                        case 'date':
                            if (input) input.value = moment(data[name]).format('YYYY-MM-DD');

                            break
                        default:
                            if (input) input.value = data[name];
                            break;
                    }

                }

                $('#modal-update').modal('show');

            });

        });

        [...document.querySelectorAll(this.config.btnDelete)].forEach(btn => {

            btn.addEventListener('click', e => {

                let tr = e.composedPath().find(el => {

                    return (el.tagName.toUpperCase() === 'TR');

                });

                let data = JSON.parse(tr.dataset.row);

                console.log(data)

                if (confirm(eval('`' + this.config.deleteMsg + '`'))) {

                    fetch(eval('`' + this.config.deleteUrl + '`'), {
                        method: 'DELETE'
                    })
                        .then(response => response.json())
                        .then(json => {

                            window.location.reload()

                        });

                }

            });

        });

    }

}