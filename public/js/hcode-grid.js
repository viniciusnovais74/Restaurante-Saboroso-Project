
class HcodeGrid {


    constructor(configs) {

        configs.listener = Object.assign({

            afterUpdateClick: (e) => {

                $('#modal-update').modal('show');

            },
            afterDeleteClick: (e) => {

                window.location.reload();

            },
            afterFormCreate: (e) => {

                window.location.reload()

            },
            afterFormUpdate: (e) => {

                window.location.reload()

            },
            afterFormCreateError: e => {
                alert('Não foi possível enviar')
            },
            afterFormUpdateError: e => {
                alert('Não foi possível enviar')
            }

        }, configs.listener);

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

            this.fireEvent('afterFormCreate');

        }).catch(err => {

            this.fireEvent('afterFormCreateError');

        });

        this.formUpdate = document.querySelector(this.config.formUpdate);

        this.formUpdate.save().then(json => {

            this.fireEvent('afterFormUpdate');

        }).catch(err => {

            this.fireEvent('afterFormUpdateError');

        });

    }

    fireEvent(name, args) {

        if (typeof this.config.listener[name] === 'function') this.config.listener[name].apply(this, args)

    }

    getTrData(e) {

        let tr = e.composedPath().find(el => {

            return (el.tagName.toUpperCase() === 'TR');

        });

        return JSON.parse(tr.dataset.row);

        
    }

    init() {

        [...document.querySelectorAll(this.config.btnUpdate)].forEach(btn => {

            btn.addEventListener('click', e => {

                this.fireEvent('beforeUpdateClick', [e]);

                let data = this.getTrData(e);

                for (let name in data) {

                    this.config.onUpdateLoad(this.formUpdate, name, data)

                }

 //

            });

        });

        [...document.querySelectorAll(this.config.btnDelete)].forEach(btn => {

            btn.addEventListener('click', e => {

                let data = this.getTrData(e);

                if (confirm(eval('`' + this.config.deleteMsg + '`'))) {

                    fetch(eval('`' + this.config.deleteUrl + '`'), {
                        method: 'DELETE'
                    })
                        .then(response => response.json())
                        .then(json => {

                            this.fireEvent('afterDeleteClick');

                        });

                }

            });

        });

    }

}