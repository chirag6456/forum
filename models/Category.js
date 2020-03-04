module.exports = (sequelize, Sequelize) => {
    const Category = sequelize.define('categories', {
        categorytitle : { type : Sequelize.STRING, allowNull : false},
        categorydescription : { type : Sequelize.STRING }
    }, {
        timestamps : false
    });
    return Category;
}