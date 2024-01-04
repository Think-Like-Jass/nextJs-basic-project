const { default: mongoose } = require("mongoose");
let db;
export const dbConnection = async function () {
    if (!db) {
        db = await mongoose.connect('mongodb+srv://admin:admin@testcluster.dfhh0xw.mongodb.net/', {
            dbName: "learnNext",
            autoIndex: true,
        });
        console.log('MongoDB connected!');
        return db;
    }
    else {
        console.log('MongoDB cached connection!');
        return db;
    }
}
