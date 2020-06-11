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
                    currMonthSales[record.SaleDate] += record.QuantitySold || 0;
                });
        }
        else {
            filteredSales = filteredSales.filter(function (entry) {
                return entry.MedUID.id === Number(ctx.params["medUID"])
            });
            filteredSales.forEach(record => { currMonthSales[record.SaleDate] = 0; });  // For init of currMonthSales
            filteredSales.forEach(record => {
                currMonthSales[record.SaleDate] += record.QuantitySold || 0;
            });
        }
        return currMonthSales
    },

    

    async recommendation(ctx) {
        const sales = await strapi.services.sale.find(ctx.query);

        let filteredSales = sales.filter(function (entry) {
                                let today = new Date();
                                let currDateStr = today.getFullYear()+'-'+(today.getMonth())+'-'+today.getDate();
                                var d = new Date(currDateStr);  // To standardize and remove noise from data

                                let week = []
                                var i;
                                for (i in [1, 2, 3, 4, 5, 6, 7]) {  // 66600000 used to remove the T18:30:00 offset occurring in data
                                    week.push(new Date(d.getFullYear(), d.getMonth()+1, d.getDate()-i).getTime() - 66600000);
                                }

                                let SaleDate = new Date(entry.SaleDate);
                                // console.log(week.map((wd) => new Date(wd)));
                                // console.log(SaleDate);
                                return week.includes(SaleDate.getTime());
                            });

        let threshold_dir = {}
        filteredSales.forEach(element => {
                threshold_dir[element.MedUID.id] = [];
        });
        filteredSales.forEach(element => {
                threshold_dir[element.MedUID.id].push(element.QuantitySold);
        });
        for (const [MedUID, arr] of Object.entries(threshold_dir)) {
            var sum = arr.reduce((a, b) => a + b, 0);
            var avg = (sum / arr.length) || 0;
            threshold_dir[MedUID] = avg;
        };

        const racks = await strapi.services.inventory.find();
        let filteredRacks = racks.filter(function (entry) { 
                return entry.Quantity < threshold_dir[entry.MedUID.id]; 
        });
        

        const MedUIDs = filteredRacks.map((r) => r.MedUID.id);


        let recommendations = [];

        var promises = [];

        MedUIDs.forEach(function(id) {
            promises.push(
                strapi.services.medicine.find({ id: id })
                    .then((data) => {
                        return {
                            "MedUID": data[0].id,
                            "MedName": data[0].Name,
                            "MedDesc": data[0].Desc,
                            "VendorUID": data[0].vendor.id,
                            "VendorName": data[0].vendor.Name,
                            "VendorAddress": data[0].vendor.Address,
                            "Rec_Quantity": threshold_dir[id] * 2
                        };
                    })
                    .then((sampleObj) => {
                        recommendations.push(sampleObj);
                    }).catch ((error) => {
                        console.log('Error: ', error);
                    })
            );
        });

        return await Promise.all(promises).then(() => {         // 5hrs of pain, finally resolved.
            return recommendations;
        });
    },
};

