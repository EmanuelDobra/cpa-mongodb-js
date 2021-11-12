const mongoClient = require("./config");

// async function findListing1(response)
// {
//   console.log('Find Listing');
//   let connection = await mongoClient.connect()
//   console.log('Connected');
//   let db = await connection.db('sample_airbnb');
//   console.log('open airbnb databse')

//   let listingsAndReviews = await db.collection('listingsAndReviews')
//   console.log('select listings and reviews')

//   let listing = await listingsAndReviews.findOne({})

//   console.log('Close db')

//   response.send(listing)
//   connection.close()  
// }

// async function findListing2 (response)
// {
//   try{
//     var connection = await mongoClient.connect()
//     let db = await connection.db('sample_airbnb');
//     let listingsAndReviews = await db.collection('listingsAndReviews')
//     let listing = await listingsAndReviews.findOne({})
//     response.send(listing)
//   }
//   catch(error)
//   {
//     console.log(error)
//     response.send(error)
//   }
//   finally{
//     // This is where any cleanup code goes
//     connection.close()
//     // Note: Finally block gets executed before return if you had
//     // a return statement in the try.
//   }
// }

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

async function findListings (response, criteria)
{
  try{
    var connection = await mongoClient.connect()
    let db = await connection.db('sample_airbnb');
    let listingsAndReviews = await db.collection('listingsAndReviews')
    let cursor = await listingsAndReviews
        .find({bedrooms:2}, {projection : {_id:0, name:1, description:1}})
        .limit(4)
    let listings = await cursor.toArray()

    response.send('listings', {listings})
  }
  catch(error)
  {
    console.log(error)
    response.send(error)
  }
  finally{
    // This is where any cleanup code goes
    connection.close()
  }
}

// let findListing = findListing3

module.exports = {findListing, findListings}  // Shortcut for {findListing:findListing, findListings:findListings}

//module.exports = {findListing:findListing, findListings:findListings}