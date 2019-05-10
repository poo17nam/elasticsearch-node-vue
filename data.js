const elasticsearch = require("elasticsearch");
const cities = require('./cities.json');

const client = new elasticsearch.Client({
  hosts: ["http://localhost:9200"]
});

//Ping client to check if its up
client.ping(
  {
    requestTimeout: 30000
  },
  error => {
    if (error) {
      console.log("Elasticsearch cluster is down!");
    } else {
      console.log("Everything is OK!");
    }
  }
);

//Create a new index called scotch.io-tutorial
//If the index has already been created, this function fails safely
client.indices.create(
  {
    index: "scotch.io-tutorial"
  },
  (error, response, status) => {
    if (error) {
        if (!error.message.includes("resource_already_exists_exception")) {
            console.log(error);
        }
    } else {
      console.log("Created a new index", response);
    }
  }
);

//To add data to index that has already been created
/*client
  .index({
    index: "scotch.io-tutorial",
    id: "1",
    type: "cities_list",
    body: {
      Key1: "Content for key one",
      Key2: "Content for key two",
      key3: "Content for key three"
    }
  })
  .then((err,resp,status) => {
    console.log(resp);
  })*/
  
let bulk = []

cities.forEach(city => {
  bulk.push({index:{
    _index:"scotch.io-tutorial",
    _type:"cities_list"
  }})

  bulk.push(city)
})

//perform bulk indexing of the data passed
client.bulk({body:bulk}, (err,response) => {
  if(err){
    console.log("Failed Bulk operation", err); 
  } else{
    console.log("Successfully imported :", cities.length, JSON.stringify(response,null,2)); 
  }
})