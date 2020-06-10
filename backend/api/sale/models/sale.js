'use strict';

/**
 * Read the documentation (https://strapi.io/documentation/v3.x/concepts/models.html#life-cycle-callbacks)
 * to customize this model
 */

module.exports = {
    lifecycles: {

        afterCreate(result, data) {
            let qSold = result["QuantitySold"];
            let price = result["MedUID"]["Price"];
            
            strapi.query('sale').update(
                { id: result["id"] },
                {
                    Revenue: qSold*price
                }
            );

            // console.log(strapi.query('medicine').find({ id: result["MedUID"]["id"] })["Price"]);
        },
    },
};
