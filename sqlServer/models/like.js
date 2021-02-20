const { sequelize, Sequelize, User, Post } = require(".");

const {Model} = require('sequelize');

module.exports = (sequelize,DataTypes)=>{
    return sequelize.define('like',{
        userId:{
            type:DataTypes.INTEGER,
            references:{
                model:User,
                key:'id'
            }
        },
        postId:{
            type:DataTypes.INTEGER,
            references:{
                model:Post,
                key:'id'
            }
        }
    })
}