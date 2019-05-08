const FirebaseDatabase  =  require("./firebase");
const listDataBaseInit = [FirebaseDatabase];
const Database = {
  initDB: function() {
    if (listDataBaseInit.length) {
      listDataBaseInit.map((data) => {
        return data.initData();
      });
    }
  }
}

module.exports = Database;
