const { sequelize, Post, User } = require(".");

module.exports = (sequelize,DataTypes)=>{
    return sequelize.define('comment',{
        comment_content:{
            type:DataTypes.TEXT,
        },
        postId:{
            type:DataTypes.INTEGER,
            references:{
                model:Post,
                key:'id'
            }
        },
        userId:{
            type:DataTypes.INTEGER,
            references:{
                model:User,
                key:'id'
            }
        }
    },{
        timestamps:true
    })
}