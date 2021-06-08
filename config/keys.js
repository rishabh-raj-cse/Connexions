// way of accesing objects out of the file
module.exports = {
  mongoURI:
    // "mongodb+srv://rishabh:yoyohoney@cluster0.l8bo3.mongodb.net/myFirstDatabase?retryWrites=true&w=majority",
    "mongodb://rishabh:yoyohoney@cluster0-shard-00-00.l8bo3.mongodb.net:27017,cluster0-shard-00-01.l8bo3.mongodb.net:27017,cluster0-shard-00-02.l8bo3.mongodb.net:27017/myFirstDatabase?ssl=true&replicaSet=atlas-8jo3jw-shard-0&authSource=admin&retryWrites=true&w=majority",

  secretOrKey: "secret",
};
