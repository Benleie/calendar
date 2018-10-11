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