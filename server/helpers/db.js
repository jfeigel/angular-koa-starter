const connectToDatabase = (dbName) => {
  // TOOD: add database connection code
};

module.exports = {
  createDatabase: async function createDatabase(database) {
    try {
      const db = connectToDatabase(database);
      // TODO: Add correct `create` function
      const confirmation = await db.createAsync();
      confirmation.error = false;
      return confirmation;
    } catch (err) {
      return {
        error: true,
        message: `DB: Create of [${database}] failed`
      };
    }
  },
  getDocument: async function getDocument(id, database) {
    try {
      const db = connectToDatabase(database);
      // TODO: Add correct `get` function
      const doc = await db.getAsync(id);
      doc.error = false;
      return doc;
    } catch (err) {
      return {
        error: true,
        message: `DB: Get of [${id}] failed`
      };
    }
  },
  removeDocument: async function removeDocument(id, database) {
    try {
      const db = connectToDatabase(database);
      // TODO: Add correct `remove` function
      const returnVal = await db.removeAsync(id);
      returnVal.error = false;
      return returnVal;
    } catch (err) {
      return {
        error: true,
        message: `DB: Delete of [${id}] failed`
      };
    }
  },
  saveDocument: async function saveDocument(document, database) {
    try {
      const db = connectToDatabase(database);
      // TODO: Add correct `save` function
      const returnVal = await db.saveAsync(document.id, document);
      document.id = returnVal.id;
      document.error = false;
      return document;
    } catch (err) {
      return {
        error: true,
        message: `DB: Save of [${document.id}] failed`
      };
    }
  }
};
