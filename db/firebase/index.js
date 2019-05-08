const firebase = require("firebase");

const prodConfig = {
  apiKey: "",
  authDomain: "domain.firebaseapp.com",
  databaseURL: "https://database.firebaseio.com/",
  projectId: "domain",
  storageBucket: "gs://domain.appspot.com",
  messagingSenderId: "",
};

const devConfig = {
  apiKey: "",
  authDomain: "domain.firebaseapp.com",
  databaseURL: "https://database.firebaseio.com/",
  projectId: "domain",
  storageBucket: "gs://domain.appspot.com",
  messagingSenderId: "",
};

const initEnv = process.env.NODE_ENV === "dev" ? devConfig : prodConfig;

const FirebaseDatabase = {
  initData: function() {
    return firebase.initializeApp(initEnv);
  }
}

module.exports = FirebaseDatabase;