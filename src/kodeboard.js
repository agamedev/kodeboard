// keep track of all the kode boards
var KodeBoards = [];

// 2D Point with x and y properties
function Point2D(X,Y){
	
	var _P = this;
	
	_P.x = 0;
	_P.y = 0;
	
	// Init() sets the x and y properties
	_P.Init = function( X, Y ){
		_P.x = X;
		_P.y = Y;
	}
	
	// Create() return a new Point2D
	_P.CreatePoint2D = function(X,Y){
		return new Point2D(X,Y);
	}
	
	// CalculateDistance() returns the distance between points a and b
	_P.CalculateDistance = function( a, b ){
		var dx = a.x - b.x;
		var dy = a.y - b.y;
		return Math.sqrt( dx * dx + dy * dy );
	}
	
	// Initialize with passed in X and Y positions
	_P.Init(X, Y);
}

// the KodeBoard
function KodeBoard(options){
	
	var _B = this;
	
	KodeBoards[KodeBoards.length] = this;
	
	// Defaults
	_B.container = document.body;
	_B.html = document.documentElement;
	_B.width = _B.container.offsetWidth;
	_B.height = _B.container.offsetHeight;
	_B.fillStyle = "#202020";
	_B.strokeStyle = "#FFFFFF";
	
	//Generate unique id
	_B.id = "kodeboard-";
	_B.id += Math.floor(Math.random()*10);
	_B.id += Math.floor(Math.random()*10);
	_B.id += Math.floor(Math.random()*10);
	
	_B.canvas = null;
	
	if(typeof options != 'undefined'){
		if(typeof options.container != 'undefined'){ 
			//get container from passed in id
			_B.container = document.getElementById(options.container); 
			_B.width = _B.container.offsetWidth;
			_B.height = _B.container.offsetHeight;
		}
		// passed in canvas id
		if(typeof options.id != 'undefined'){    
			_B.id = options.id; 
		}
		// passed in canvas width
		if(typeof options.width != 'undefined'){    
			_B.width = options.width; 
		}
		// passed in canvas height
		if(typeof options.height != 'undefined'){    
			_B.height = options.height;
		}
		// passed in default canvas fillStyle
		if(typeof options.fillStyle != 'undefined'){    
			_B.fillStyle = options.fillStyle;
		}
		// passed in default canvas strokeStyle
		if(typeof options.strokeStyle != 'undefined'){    
			_B.strokeStyle = options.strokeStyle;
		}
	}
	
	// Try to get existing canvas node
	_B.canvas = document.getElementById(_B.id);
	
	//if no node exists, create one
	if(_B.canvas == null){
		_B.canvas = document.createElement('canvas');
		_B.canvas.id = _B.id;
		_B.container.appendChild(_B.canvas);
	}else{
		_B.width = _B.canvas.width;
		_B.height = _B.canvas.height;
	}
	
	if(_B.height == 0){
		_B.height = _B.html.scrollHeight;
	}
	_B.canvas.width = _B.width;
	_B.canvas.height = _B.height;
	//set the canvas classname to kodeboard for additional styling
	_B.canvas.className = 'kodeboard';
	
	//recalculate centre
	_B.centre = new Point2D(_B.width/2,_B.height/2);
	
	_B.Clear = function(){
		var context = _B.canvas.getContext("2d");
		//Draw black rectangle
		context.fillStyle = _B.fillStyle;
		context.fillRect(0,0,_B.width,_B.height);
	}
	
	_B.DrawCircle = function(origin,radius){
		console.log(origin);
		var context = _B.canvas.getContext("2d");
		context.beginPath();
		context.arc(origin.x, origin.y, radius, 0, 2 * Math.PI);
		context.strokeStyle = _B.strokeStyle;
		context.stroke();
		context.closePath();
	}
	
	// Calculate click position within canvas
	_B.onclick = function(event){
		var e = event ? event:window.event;
		// Get client rect of canvas
		var clientRect = _B.canvas.getBoundingClientRect();
		
		var diWidth = _B.canvas.width / clientRect.width;
		var diHeight = _B.canvas.height / clientRect.height;
		
		var X = (e.clientX - clientRect.left) * diWidth;
		var Y = (e.clientY - clientRect.top) * diHeight;
		
		var point= new Point2D(X,Y);
		
		// Do something on click HERE		
		
	}
	
	// capture click event on canvas
	_B.canvas.onclick = function(event){ _B.onclick(event); }
	
	_B.Clear(); //Init canvas
	
}