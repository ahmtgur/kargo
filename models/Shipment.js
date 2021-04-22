module.exports = function (sequelize) {
        const { Sequelize } = require('sequelize');

        if(!sequelize.models.Shipment){
            sequelize.define('Shipment',{
                id:{
                    type: Sequelize.INTEGER,primaryKey: true,autoIncrement: true 
                },
                corporate_id: {
                    type: Sequelize.INTEGER, allowNull: false
                },
                weight: {
                    type: Sequelize.DOUBLE, allowNull: false
                },
                origin_city: {
                    type: Sequelize.STRING, allowNull: false
                },
                destination_city: {
                    type: Sequelize.STRING, allowNull: false
                },
                destination_address: {
                    type: Sequelize.STRING, allowNull: false
                }
                }, {timestamps: true,paranoid: true});
        }
        return sequelize.models.Shipment;
    };
    