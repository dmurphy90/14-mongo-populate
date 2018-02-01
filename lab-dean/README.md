# 14 Mongo Populate
## Installation
To begin using this app, fork then clone the repository down to your machine. After you have cloned the repository navigate to the folder ```lab-dean```. In your terminal type ```npm install``` to install all package dependencies for the app. You will also need to have ```MongoDB``` installed on your machine for this to work.

## Functionality
This app utilizes MongoDB to make a database of Toy objects with a name property, a maker property, and an _id property set by MongoDB. Here is the code for the constructor used to make the toy objects:

```
'use strict';

const mongoose = require('mongoose');

const Toy = mongoose.Schema({
  'toy_id' : { type: String },
  'name' : { type: String },
  'maker' : { type: String},
}, { timestamps: true});

module.exports = mongoose.model('toys', Toy);
```

## CRUD Methods
* POST "api/v1/toy Requires title and content values to create a new Note object. An example command on HTTPie would be. ```http POST http://localhost:3000/api/v1/toy name="stick and hoop" maker="tim"```

* GET "api/v1/toy This will get you every Note object saved into the server. To do this you simply type: ```http http://localhost:3000/api/v1/toy```

* GET "api/v1/toy/:_id When the ID parameter in the link is filled in with the ID of an actual toy object it will retrieve you that specific entry. An example: ```http http://localhost:3000/api/v1/toy/5a733f930cfdcce75463a586```

* PUT "api/v1/toy/:_id When the ID parameter in the link is filled in with the ID of an actual toy object it will update the item associated with the typed in ID. An example command: ```http PUT http://localhost:3000/api/v1/toy/5a733f930cfdcce75463a586 name="hoop and stick" maker="tom"```

* DELETE "api/v1/toy/:_id When the ID parameter in the link is filled in with the ID of an actual toy object it will delete the item associated with the typed in ID. Example command: ```http DELETE http://localhost:3000/api/v1/toy/5a733f930cfdcce75463a586```