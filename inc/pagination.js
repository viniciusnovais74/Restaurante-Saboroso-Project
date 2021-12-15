let conn = require('./db')

class Pagination {

    constructor(

        query,
        params = [],
        itensperpage = 10

    ) {

        this.query = query;
        this.params = params;
        this.itensperpage = itensperpage;

    }

    getPage(page) {

        this.currentPage = page - 1;

        this.params.push(
            this.currentPage * this.itensperpage,
            this.itensperpage
        )
        return new Promise((s, r) => {

            conn.query([this.query, "SELECT FOUND_ROWS() AS FOUND_ROWS"].join(';'), this.params, (err, results) => {

                if (err) {
                    r(err)
                } else {

                    this.data = results[0];
                    this.total = results[1][0].FOUND_ROWS;
                    this.totalpages = Math.ceil(this.total / this.itensperpage)
                    this.currentPage++;

                    s(this.data);
                }
            });

        });

    }

    getTotal() {

        return this.total;

    }

    getCurrentPage() {
        return this.currentPage;
    }

    getTotalPages() {
        return this.totalpages;
    }

    getNavigation(params) {

        let limitPagesNav = 5;
        let links = [];
        let nrstart = 0;
        let nrend = 0;

        if (this.getTotalPages() < limitPagesNav) {
            limitPagesNav = this.getTotalPages();
        }

        //Primeira Pagina
        if ((this.getCurrentPage() - parseInt(limitPagesNav / 2)) < 1) {
            nrstart = 1;
            nrend = limitPagesNav;
        } else if ((this.getCurrentPage() + parseInt(limitPagesNav / 1)) > this.getTotalPages) {

            nrstart = this.getTotalPages() - limitPagesNav;
            nrend = this.getTotalPages();
        } else {
            nrstart = this.getCurrentPage() - parseInt(limitPagesNav / 2);
            nrend = this.getCurrentPage() + parseInt(limitPagesNav / 2);
        }

        if (this.getCurrentPage() > 1) {

            links.push({
                text: '<',
                href: '?' + this.getQueryString(Object.assign({}, params, {  page: this.getCurrentPage() - 1 })),
            });

        }
        for (let x = nrstart; x <= nrend; x++) {

            links.push({
                text: x,
                href: '?' + this.getQueryString(Object.assign({}, params, { page: x })),
                active: (x === this.getCurrentPage())
            })
        }
        if (this.getCurrentPage() < this.getTotalPages()) {
            links.push({
                text: '>',
                href: '?' + this.getQueryString(Object.assign({}, params, { page: this.getCurrentPage() + 1 })),
            });

        }
        

        return links;
    }

    getQueryString(params) {

        let queryString = [];

        for (let name in params) {

            queryString.push(`${name}=${params[name]}`)

        }

        return queryString.join("&");

    }
}

module.exports = Pagination