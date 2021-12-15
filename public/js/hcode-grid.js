
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

                //   window.location.reload()

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
            btnUpdate: 'btn-update',
            btnDelete: 'btn-delete',
            onUpdateLoad: (form, name, data) => {

                let input = form.querySelector('[name=' + name + ']');

                if (input) input.value = data[name];

            }

        }, configs);

        this.rows = [...document.querySelectorAll('table tbody tr')]

        this.initForms();
        this.init();

    }


    initForms() {

        this.formCreate = document.querySelector(this.config.formCreate);

        this.formCreate.save({

            success: () => {
                this.fireEvent('afterFormCreate');
            },
            failure: () => {
                this.fireEvent('afterFormCreateError');
            }

        }).then(json => {

            this.fireEvent('afterFormCreate');

        }).catch(err => {

            this.fireEvent('afterFormCreateError');

        });

        this.formUpdate = document.querySelector(this.config.formUpdate);

        this.formUpdate.save({
        
            success: () => {
                this.fireEvent('afterFormUpdate');
            },
        
            failure: () => {
                this.fireEvent('afterFormUpdateError');
            }
        
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

    btnUpdateClick(e) {

        this.fireEvent('beforeUpdateClick', [e]);

        let data = this.getTrData(e);

        for (let name in data) {

            this.config.onUpdateLoad(this.formUpdate, name, data)

        }

        this.fireEvent('afterUpdateClick', [e]);

    }

    btnDeleteClick(e) {

        this.fireEvent('beforeDeleteClick');

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

    }

    init() {

        this.rows.forEach(row => {

            [...row.querySelectorAll('.btn')].forEach(btn => {

                btn.addEventListener('click', e => {

                    if (e.target.classList.contains(this.config.btnUpdate)) {

                        this.btnUpdateClick(e);

                    } else if (e.target.classList.contains(this.config.btnDelete)) {

                        this.btnDeleteClick(e);

                    } else {

                        this.fireEvent('buttonClick', [e.target, this.getTrData(e), e])

                    }

                });

            });

        });

    }

}