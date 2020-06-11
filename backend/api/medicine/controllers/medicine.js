'use strict';

/**
 * Read the documentation (https://strapi.io/documentation/v3.x/concepts/controllers.html#core-controllers)
 * to customize this controller
 */

module.exports = {
    async expired(ctx) {
        const medicines = await strapi.services.medicine.find(ctx.query);
        // return medicines.map((medicine) => medicine.Name);

        let today = new Date();
        let currDateStr = today.getFullYear()+'-'+(today.getMonth()+1)+'-'+today.getDate();

        return medicines.filter(function (entry) {
            let currDate = new Date(currDateStr);
            let ExpiryDate = new Date(entry.ExpiryDate);

            return ExpiryDate < currDate;
        });
    }
};
