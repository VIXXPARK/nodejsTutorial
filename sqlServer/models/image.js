module.exports = (sequelize,DataTypes)=>{
    return sequelize.define('image',{
        image:{
            type:DataTypes.STRING,
            allowNull:false
        }
    },{
        timestamps:false
    })
}