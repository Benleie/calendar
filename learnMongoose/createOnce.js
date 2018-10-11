var mongoose = require('mongoose');

const option = {
	socketTimeoutMS: 30000,
	keepAlive: true,
	reconnectTries: 30000,
	useNewUrlParser: true
};

mongoose.connect('mongodb://localhost:27017/tes', option);

var db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function() {

	var kittySchema = new mongoose.Schema({
		name: String
	});

	kittySchema.methods.speak = function() {
		var greeting = this.name ?
			this.name + " has been created successfully":
			"I don't have a name";
		console.log(greeting);
	}

	var Kitten = mongoose.model('Kitten', kittySchema);

	

	//查找所有document
	/*Kitten.find(function(err, kittens) {
		if (err) return console.error(err);
		console.log(kittens);
	})*/
	var Arya = new Kitten({ name: "Arya" });
	var Robb = new Kitten({ name: "Robbb" })

	var saveDocument = function(doc){
		var promise = Kitten.find({ name: doc.name }).exec();
		promise.then( docs => {
			if(!docs.length) {
				doc.save(err => {
					if (err) return console.error(err);
					doc.speak();
				})
			}
			else
				console.log("this doc has been created!")
		})
	}


	saveDocument(Robb);

	Kitten.find({ name: "Robbb"}, function(err,kittens){
		if (err) return console.error(err);
		console.log(kittens); 
	});
	// console.log(query)

});