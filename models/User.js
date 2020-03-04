module.exports = (sequelize, Sequelize) => {
  const User = sequelize.define('user', {
    username : { type : Sequelize.STRING, required : true },
    email : { type : Sequelize.STRING, required : true, unique : true },
    password : { type : Sequelize.STRING, required : true },
    resetPasswordToken : { type : Sequelize.STRING },
    newUserToken : { type : Sequelize.STRING },
    isVerified : { type : Sequelize.BOOLEAN, defaultValue : false}
  }, {
    timestamps: false
  });
  return User;
}