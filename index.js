const express = require('express');

// Import mongodb, cors, objectId and dotenv
const { MongoClient } = require('mongodb');
const cors = require('cors');
require('dotenv').config();
const ObjectId = require('mongodb').ObjectId;
// App and Port
const app = express();
const port = process.env.PORT || 5000;


// MidleWere
app.use(cors());
app.use(express.json());


// Server to database connection uri
const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@cluster0.ttpfp.mongodb.net/myFirstDatabase?retryWrites=true&w=majority`;
const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true });


/********************************************
 * Node server crud operation start from here
 ********************************************/

async function run() {
    try {
        await client.connect();

        // Recognize the database and data collection
        const database = client.db('asiaAdvanture'); // Database name
        const packagesCollection = database.collection('travelPackages');
        const bookingCollection = database.collection('BookedPackages');
        const savedTripCollection = database.collection('SavedTrip');
        const resturantsCollection = database.collection('ResturantBranch');
        const cartedFoodsCollection = database.collection('FoodsCartList');
        

        /*******************
         * All Post Api Here
         * *****************/

        // Post Package API
        app.post('/travelPackages', async(req, res) => {
        const tripPack = req.body;
        const result = await packagesCollection.insertOne(tripPack);
        res.json(result);
       
        });
 
        // Booked Package API
        app.post('/BookedPackages', async(req, res) => {
        const tripPack = req.body;
        const result = await bookingCollection.insertOne(tripPack);
        res.json(result);
       
        });

        // Save the package book latter list
        app.post('/savedTrip', async (req, res) => {
            const favTrip = req.body;
            const result = await savedTripCollection.insertOne(favTrip);
            res.json(result);
        });


        // Save the foods in the resturants branch data
        app.post('/foods', async (req, res) => {
            const food = req.body;
            const result = await resturantsCollection.insertOne(food);
            res.json(result);
        });

        // Save the carted food data in the FoodCartList
        app.post('/foodsCartList', async (req, res) => {
            const cartedFood = req.body;
            const result = await cartedFoodsCollection.insertOne(cartedFood);
            res.json(result);
        });


        /*******************
         * All Get API Here
         * ******************/

        // Get the packages data from the database using get api
        app.get('/travelPackages', async (req, res) => {
            const findPackages = packagesCollection.find({});
            const packages = await findPackages.toArray();
            res.send(packages);
        });
  

        // Get the booked packages data from the database using get api
        app.get('/myOrders', async (req, res) => {
            const bookedPackages = bookingCollection.find({});
            const bookedPackage = await bookedPackages.toArray();
            res.send(bookedPackage);
        });

        // Get saved trip data from the mongodb database
        app.get('/savedTrip', async (req, res) => {
            const findSavedTrip = savedTripCollection.find({});
            const trip = await findSavedTrip.toArray();
            res.send(trip);

            
        
        });

        // Get foods data from the mongodb database
        app.get('/foods', async (req, res) => {
            const findFoods = resturantsCollection.find({});
            const foods = await findFoods.toArray();
            res.send(foods);
        });



        /*********************************
         * All delete API operation here
         * *******************************/
        // Delete the packages from the database using delete api
        app.delete('/myOrders/:id', async(req, res) => {
            const id = req.params.id;
            const query = { _id:ObjectId(id) };
            const result = await bookingCollection.deleteOne(query);
            console.log(query);
            res.json(result);
        });

        // Delete selected saved trip from the database
        app.delete('/savedTrip/:id', async(req, res) => {
            const id = req.params.id;
            const query = { _id:ObjectId(id) };
            const result = await savedTripCollection.deleteOne(query);
            res.json(result);
        });



    }

    finally {
        // await client.close();
    }

}

// Call the async function
run().catch(console.dir);


/****************************************
 * Node server crud operation end to here
 ****************************************/




// Check server is running or not
app.get('/', (req, res) => {
    res.send('Running asia advanture limited server!');
});

// Listen server what we do here
app.listen(port, () => {
    console.log("Asia advanture limited app listening.");
})










