function View() {};
function Paper() {};

View.prototype = {
	location: {
		"city": "UK"
	},
	arr: [1, 2, 3]
}


function F() {};

// option 1
F.prototype = View.prototype;
Paper.prototype = new F();

// option 2
// Paper.prototype = View.prototype;

Paper.prototype.constructor = Paper;

Paper.prototype.location = "US";
Paper.prototype.arr.push(4);


var view = new View();
console.log(view.location, view.arr);

