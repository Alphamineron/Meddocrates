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
    },




    async tsalesdom(ctx) {
        const sales = await strapi.services.sale.find(ctx.query);
        
        let filteredSales = sales.filter(function (entry) {
                                // const dateTime = ctx.params["date"];
                                // const parts = dateTime.split(/[-]/);
                                
                                
                                var currDate = new Date();
                                let SaleDate = new Date(entry.SaleDate);
                                var currMonth = currDate.getMonth() + 1;
                                var currYear = currDate.getFullYear();
                                var month = SaleDate.getMonth() + 1;
                                var year = SaleDate.getFullYear();

                                return currMonth == month && year == currYear;
                            });

        let currMonthSales = {}

        if (Number(ctx.params["medUID"]) === -1) {
                filteredSales.forEach(record => { currMonthSales[record.SaleDate] = 0; });  // For init of currMonthSales
                filteredSales.forEach(record => {
                    console.log(record.SaleDate);
                    console.log(record.QuantitySold);
                    currMonthSales[record.SaleDate] += record.QuantitySold || 0;
                });
        }
        else {
            filteredSales = filteredSales.filter(function (entry) {
                return entry.MedUID.id === Number(ctx.params["medUID"])
            });
            filteredSales.forEach(record => { currMonthSales[record.SaleDate] = 0; });  // For init of currMonthSales
            filteredSales.forEach(record => {
                console.log(record.SaleDate);
                console.log(record.QuantitySold);
                currMonthSales[record.SaleDate] += record.QuantitySold || 0;
            });
        }
        console.log(currMonthSales);
        return currMonthSales
    }
};
