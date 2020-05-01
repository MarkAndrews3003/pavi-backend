'use strict';
module.exports = (sequelize, DataTypes) => {
  const companies = sequelize.define('companies', {
    name: DataTypes.STRING,
    address: DataTypes.STRING,
    country: DataTypes.STRING,
    phone: DataTypes.STRING,
    status: DataTypes.STRING
  }, {});
  companies.associate = function(models) {
    // associations can be defined here
  };
  return companies;
};