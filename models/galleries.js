'use strict';

module.exports = function(sequelize, DataTypes) {
  var Galleries = sequelize.define('Galleries', {
    link: DataTypes.STRING,
    author: DataTypes.STRING,
    description: DataTypes.STRING
  }, {
    classMethods: {
      associate: function(models) {
        // associations can be defined here
      }
    }
  });
  return Galleries;
};