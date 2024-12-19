const Sequelize = require('sequelize')

module.exports = class User extends Sequelize.Model {
   static init(sequelize) {
      return super.init(
         {
            email: {
               type: Sequelize.STRING(40),
               allowNull: false,
               unique: true,
            },
            nick: {
               type: Sequelize.STRING(15),
               allowNull: false,
            },
            password: {
               type: Sequelize.STRING(100),
               allowNull: false,
            },
         },
         {
            sequelize,
            timestamps: true,
            underscored: false,
            modelName: 'User',
            tableName: 'users',
            paranoid: true,
            charset: 'utf8mb4',
            collate: 'utf8mb4_general_ci',
         }
      )
   }

   static associate(db) {
      db.User.hasMany(db.Board)
      db.User.belongsToMany(db.User, {
         foreignKey: 'followingId', //Follow 테이블에서 사용할 id
         as: 'Followers', // User테이블 별명
         through: 'Follow', //교차테이블명
      })
      db.User.belongsToMany(db.User, {
         foreignKey: 'followerId', //Follow 테이블에서 사용할 id
         as: 'Followings', // User테이블 별명
         through: 'Follow', //교차테이블명
      })
   }
}
