const config = require('../config.json');
const db = require('../helpers/db');
const bcrypt = require('bcryptjs');

module.exports = {
  create: async function create() {
    const confirmation = await db.createDatabase(`${config.id}_user`);
    return confirmation;
  },
  generate: (data) => {
    const returnObj = {
      id: null,
      name: 'John Doe',
      password: null
    };

    return Object.assign(returnObj, data);
  },
  get: async function get(id) {
    const document = await db.getDocument(id, `${config.id}_user`);
    return document;
  },
  save: async function save(document) {
    const confirmation = await db.saveDocument(document, `${config.id}_user`);
    return confirmation;
  }
};

function encryptPassword(password) {
  return bcrypt.hashSync(password, bcrypt.genSaltSync(12));
}
