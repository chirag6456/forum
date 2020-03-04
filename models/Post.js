module.exports = (sequelize, Sequelize) => {
    const Post = sequelize.define('posts', {
        posttitle : {
            type : Sequelize.STRING,
            allowNull : false
        },
        postcontent : {
            type : Sequelize.STRING,
        }
    },
    {
        timestamps: false
      });
    return Post;
}