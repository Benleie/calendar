const mongoose = require('mongoose');
const path = require('path');
const fs = require('fs');
const option = {
	socketTimeoutMS: 30000,
	keepAlive: true,
	reconnectTries: 30000,
	useNewUrlParser: true
};

mongoose.connect('mongodb://localhost:27017/tes', option);

var inventData ;
var url = path.join(__dirname, "data/inventory.json")
var p1 = new Promise((resolve, reject) => {
	fs.readFile(url, 'utf-8', function(err, data){
		if(err) throw err;

		console.log(data)
		inventData = JSON.parse(data)
		console.log(JSON.stringify(inventData))
	})
})

p1.then(console.log(typeof inventData))

var inventSchema = new mongoose.Schema({
	item:String,
	qty: Number,
	size:{
		h: Number,
		w: Number,
		uom: String
	},
	status: String
	
})


var db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function() {
	console.log("ok")

	var kittySchema = new mongoose.Schema({
		name: String
	});

	kittySchema.methods.speak = function() {
		var greeting = this.name ?
			"Meow name is " + this.name :
			"I don't have a name";
		console.log(greeting);
	}

	var Kitten = mongoose.model('Kitten', kittySchema);

	var silence = new Kitten({
		name: 'Silence'
	});
	console.log(silence.name);

	var fluffy = new Kitten({
		name: 'fluffy'
	});

	fluffy.save(function(err, fluffy) {
		if (err) return console.error(err);
		fluffy.speak();
	});

	Kitten.find(function(err, kittens) {
		if (err) return console.error(err);
		console.log(kittens);
	})

});