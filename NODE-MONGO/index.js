const MongoClient = require('mongodb').MongoClient;
const assert =require('assert');
const dboper = require('./operations');

const url = 'mongodb://localhost:27017/';
const dbname = 'conFusion';

MongoClient.connect(url).then((client) => {

    console.log('Connected correctly to server');
    const db = client.db(dbname);

    dboper.insertDocument(db, { name: "Vadonut", description: "Test"},
        "dishes")
        .then((result) => {
            console.log("Insert Document:\n", result.ops);

            return dboper.findDocuments(db, "dishes");
        })
        .then((docs) => {
            console.log("Found Documents:\n", docs);

            return dboper.updateDocument(db, { name: "Vadonut" },
                    { description: "Updated Test" }, "dishes");

        })
        .then((result) => {
            console.log("Updated Document:\n", result.result);

            return dboper.findDocuments(db, "dishes");
        })
        .then((docs) => {
            console.log("Found Updated Documents:\n", docs);
                            
            return db.dropCollection("dishes");
        })
        .then((result) => {
            console.log("Dropped Collection: ", result);

            return client.close();
        })
        .catch((err) => console.log(err));

})
.catch((err) => console.log(err));

// const collection = db.collection('dishes');

//     collection.insertOne({"name": "vixx" , "description":"test"},(err,result)=>{ //insert
//         assert.strictEqual(err,null);

//         console.log('After Insert:\n');
//         console.log(result.ops);

//         collection.find({}).toArray((err,docs)=>{ //select
//             assert.strictEqual(err,null);

//             console.log('Found:\n');
//             console.log(docs);

//             db.dropCollection('dishes',(err,result)=>{
//                 assert.strictEqual(err,null);

//                 client.close();
//             });
//         });
//     });