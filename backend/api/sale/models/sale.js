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
            
            strapi.query('sale').update(    // This updates the revenue attribute in the sales
                { id: result["id"] },
                {
                    Revenue: qSold*price
                }
            );
            
            if (typeof result["MedUID"]["id"] === 'undefined') {
                strapi.query('sale').delete({ id: result["id"] });
                console.info("Removing Sale Record with id {" + result["id"] + "}");
            }

            // Below code is for maintaining the inventory/racks upon a sale or discarding a sale if it exceeds space
            var promises = [];
            promises.push(
                strapi.services.inventory.find()
                    .then((data) => {
                        data = data.filter(function (entry) {
                                return entry.MedUID.id === result["MedUID"]["id"];
                        });
                        return {
                            "id": data[0].id,
                            "MedUID": data[0].MedUID.id,
                            "Quantity": data[0].Quantity - qSold,
                        };
                    })
                    .then((sampleObj) => {
                        if (sampleObj.Quantity >= 0) {
                            strapi.query('inventory').update(
                                { id: sampleObj["id"] },
                                {
                                    Quantity: sampleObj["Quantity"]
                                }
                            );
                        }
                        else {
                            strapi.query('sale').delete({ id: result["id"] });
                            console.info("Removing Sale Record with id {" + result["id"] + "} due to [out of stock]");
                        }
                    }).catch ((error) => {
                        console.log('Error: ', error);
                    })
            );

            return Promise.all(promises);
        },
    },
};
