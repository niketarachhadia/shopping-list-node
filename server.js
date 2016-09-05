
var express = require('express');
var bodyParser = require('body-parser');
var jsonParser = bodyParser.json();

var Storage = function() {
    this.items = [];
    this.id = 0;
};

Storage.prototype.add = function(name) {
    var item = {name: name, id: this.id};
    this.items.push(item);
    this.id += 1;
    return item;
    console.log(this.items);
};
Storage.prototype.remove = function(id){ 
	console.log(id);
	console.log(this.items);   
	this.items.splice(id,1);
	this.id -= 1;

	console.log(this.items);
	this.items.forEach(function(item,index){
            if(item.id>id){
		item.id=item.id-1;
            }
        });
	
};
Storage.prototype.update = function(name,id){
      	var item = {'name':name, 'id':id};
	console.log(item);	
	this.items.splice(item.id,1,item); 
};
		
var storage = new Storage();
storage.add('Broad beans');
storage.add('Tomatoes');
storage.add('Peppers');

var app = express();
app.use(express.static('public'));

app.get('/items', function(request, response) {
    response.json(storage.items);
});
app.post('/items',jsonParser,function(request, response){
    if(!request.body){
	return response.sendStatus(400);  
    }
    var item = storage.add(request.body.name);
    response.status(201).json(item);	 
});
app.delete('/items/:id',function(request, response){
	storage.remove(request.params.id);
	response.sendStatus(204);
});
app.put('/items/:id',jsonParser,function(request, response){
	var name = request.body.name;
	console.log(name);
	var id = request.params.id;
	console.log(id);
	storage.update(name,id);
	console.log(storage.items);
});
app.listen(process.env.PORT || 8089, process.env.IP);
