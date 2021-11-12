const { CURSOR_FLAGS } = require("mongodb");
const mongoClient = require("./config");

async function findListing(response, criteria)
{
  console.log("Search for: ", criteria);

  mongoClient.connect()
    .then(connection=>connection.db('sample_airbnb')) // instead of using await
    .then(db=>db.collection('listingsAndReviews'))
    .then(listingsAndReviews=>listingsAndReviews.findOne(criteria))
    .then(listing=>response.send(listing))
    .catch(error => console.log(error))

}


// async function findListings (response, criteria)
// {
//   try{
//     var connection = await mongoClient.connect()
//     let db = await connection.db('sample_airbnb');
//     let listingsAndReviews = await db.collection('listingsAndReviews')
//     let cursor = await listingsAndReviews
//         .find({bedrooms:2}, {projection : {_id:0, name:1, description:1}})
//         .limit(4)
//     let listings = await cursor.toArray()

//     response.send('listings', {listings})
//   }
//   catch(error)
//   {
//     console.log(error)
//     response.send(error)
//   }
//   finally{
//     // This is where any cleanup code goes
//     connection.close()
//   }
// }

async function findListings(response, criteria, projection, nListings) {
  mongoClient.connect()
    .then(connection=>connection.db('sample_airbnb'))
    .then(db=>db.collection('listingsAndReviews')) 
    .then(listingsAndReviews=>listingsAndReviews
      .find(criteria, {projection})
        .limit(nListings))
    .then(cursor=>cursor.toArray())
    .then(listings=>response.send(listings))
    .catch(error=>console.log(error))
}

// let findListing = findListing3

module.exports = {findListing, findListings}  // Shortcut for {findListing:findListing, findListings:findListings}

//module.exports = {findListing:findListing, findListings:findListings}