module.exports = function(sequelize){
    const { Sequelize } = require('sequelize');
    if(!sequelize.models.Corporate){
        sequelize.define('Corporate',{
            id:{
                type:Sequelize.INTEGER,
                primaryKey:true,
                autoIncrement:true
            },
            name: {
                type: Sequelize.STRING,
                allowNull: false,
                unique: true
            },
            password: {
                type: Sequelize.TEXT,
                allowNull: false
            }                
        },{
            timestamps: true,
            paranoid: true,  //Soft deletes
            defaultScope: {
                attributes: { exclude: ['password'] },
            },
            scopes:{
                withPassword:{}
            }
        })
    }
    return sequelize.models.Corporate;
}