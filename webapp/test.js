

var x = db.users.find({}).toArray(0);

x.forEach(function (item){
	item.userId = item.email;
	db.users.save(item);
});

