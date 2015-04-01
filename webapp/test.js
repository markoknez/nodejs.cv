

var x = db.programmings.findOne({themes: {$exists: true}});

x.themes.forEach(function (item){
	item._id = new ObjectId();	
});

db.programmings.save(x);