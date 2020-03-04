const config = require('../config/keys');
const { Sequelize } = require('sequelize');

const sequelize = new Sequelize(config.DB, config.USER, config.PASSWORD,{
    HOST : config.HOST,
    dialect : config.dialect
});

const db = {};

db.sequelize = sequelize;
db.Sequelize = Sequelize;

db.users = require('./User')(sequelize, Sequelize);
db.posts = require('./Post')(sequelize, Sequelize);
db.categories = require('./Category')(sequelize, Sequelize);

db.users.hasMany(db.posts, {
    onDelete : 'CASCADE'
});
db.posts.belongsTo(db.users);

db.categories.hasMany(db.posts, {
    onDelete : 'CASCADE'
});
db.posts.belongsTo(db.categories);

db.users.hasMany(db.categories, {
    onDelete : 'CASCADE'
});
db.categories.belongsTo(db.users);

module.exports = db;