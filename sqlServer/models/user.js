module.exports = (sequelize,DataTypes)=>{
    return sequelize.define('user',{
        email:{
            type:DataTypes.STRING(25),
            allowNull:false,
            unique:true,
            validate:{
                isEmail:true
            }
        },
        nickname:{
            type:DataTypes.STRING(30),
            allowNull:false
        },
        profile:{
            type:DataTypes.STRING,
            allowNull:true
        },
        password:{
            type:DataTypes.STRING,
            allowNull:false
        },
        job:{
            type:DataTypes.INTEGER.UNSIGNED,
            allowNull:false,
            defaultValue:1
        },
        admin:{
            type:DataTypes.BOOLEAN,
            defaultValue: false
        }

    },{
        timestamps:false,
    });
};
