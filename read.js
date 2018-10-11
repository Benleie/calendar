const path = require('path');
const fs = require('fs');

var inventData;
var url = path.join(__dirname, "data/inventory.json")
var p1 = new Promise((resolve, reject) => {
	fs.readFile(url, 'utf-8', function(err, data){
		if(err) throw err;
		console.log(data)
		resolve(JSON.parse(data)) 
	})
})

p1.then( data =>{
	// console.log(data[0].item)
	data.map(doc => {
		console.log(doc.item)
	})
})
// console.log(typeof inventData)