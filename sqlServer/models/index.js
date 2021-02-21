const path = require('path');
const Sequelize = require('sequelize');

const env = process.env.NODE_ENV || 'development';
const config = require(path.join(__dirname, '..', 'config', 'config.json'))[env];
const db = {};

const sequelize = new Sequelize(config.database, config.username, config.password, config);

db.sequelize = sequelize;
db.Sequelize = Sequelize;

//모델정보를 읽어온다.
db.User = require('./user')(sequelize, Sequelize);
db.Post = require('./post')(sequelize,Sequelize);
db.Image = require('./image')(sequelize,Sequelize);
db.Like = require('./like')(sequelize,Sequelize);
db.Comment = require('./comment')(sequelize,Sequelize);
db.User.hasMany(db.Post)
db.Post.belongsTo(db.User)
db.Post.hasMany(db.Image)
db.Post.hasMany(db.Comment)
db.User.hasMany(db.Like)
db.Post.hasMany(db.Like)
db.Like.belongsTo(db.User)
db.Like.belongsTo(db.Post)
db.User.hasMany(db.Comment)
db.Post.hasMany(db.Comment)
module.exports = db;