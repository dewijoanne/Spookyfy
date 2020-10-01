'use strict';

let data = require('../songs.json');

module.exports = {
  up: async (queryInterface, Sequelize) => {
  data.map(el => {el.createdAt = new Date() , el.updatedAt = new Date()})
   await queryInterface.bulkInsert('Songs',data,{});

  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.bulkDelete('Songs',null,{});
  }
};
