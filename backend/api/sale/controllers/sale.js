'use strict';

/**
 * Read the documentation (https://strapi.io/documentation/v3.x/concepts/controllers.html#core-controllers)
 * to customize this controller
 */

module.exports = {
    async roed(ctx) {
        const sales = await strapi.services.sale.find(ctx.query);

        
        let filteredSales = sales.filter(function (entry) {
                                let givenDate = new Date(ctx.params["date"]);
                                let SaleDate = new Date(entry.SaleDate);

                                return SaleDate.getTime() === givenDate.getTime();
                            });



        if (Number(ctx.params["medUID"]) === -1) {
            return filteredSales.map((fsale) => fsale.Revenue).reduce((a, b) => a + b, 0);
        }
        else {
            filteredSales = filteredSales.filter(function (entry) {
                return entry.MedUID.id === Number(ctx.params["medUID"])
            });
            return filteredSales.map((fsale) => fsale.Revenue).reduce((a, b) => a + b, 0);
        }
    }
};
