// keep track of all the kode boards
var KodeBoards = [];

// 2D Point with x and y properties
var Point2D  = function (X,Y){
	
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
	
	// Initialize with passed in X and Y positions
	_P.Init(X, Y);
	
	return _P;
}

//Generic 2D Object
var Object2D  = function ( options ){
	
	var _O = this;
	
	_O.strokeStyle = "#FFFFFF";
	_O.fillStyle = "#202020";
	_O.lineWidth = "1";

	if(typeof options != 'undefined'){
		if(typeof options.strokeStyle != 'undefined'){    
			_C.strokeStyle = options.strokeStyle; 
		}
		
		if(typeof options.fillStyle != 'undefined'){    
			_C.fillStyle = options.fillStyle;
		}
		
		if(typeof options.lineWidth != 'undefined'){    
			_C.lineWidth = options.lineWidth;
		}
	}
}

// 2D Circle with custom properties
var Circle2D = function ( options ){
	
	var _C = this;
	
	_C.centre = null;
	_C.radius = 0;
	_C.diameter = 0;
	_C.strokeStyle = "#FFFFFF";
	_C.fillStyle = "#202020";
	_C.lineWidth = "1";
	
	if(typeof options != 'undefined'){
		
		if(typeof options.centre != 'undefined'){    
			_C.centre = options.centre;
		}
		
		if(typeof options.radius != 'undefined'){    
			_C.radius = options.radius;
		}

		if(typeof options.strokeStyle != 'undefined'){    
			_C.strokeStyle = options.strokeStyle; 
		}
		
		if(typeof options.fillStyle != 'undefined'){    
			_C.fillStyle = options.fillStyle;
		}
		
		if(typeof options.lineWidth != 'undefined'){    
			_C.lineWidth = options.lineWidth;
		}
	}
	
	if(_C.centre == null){
		console.log('Please specify circle center position as Point2D');
	}
	
	if(_C.radius == 0){
		console.log('Please specify circle radius');
	}
	_C.diameter = _C.radius * 2;

	return _C;
}
// 2D Rectangle with custom properties
var Rectangle2D  = function ( options ){
	
	var _R = this;
	
	_R.centre = null;
	_R.width = 0;
	_R.height = 0;
	_R.strokeStyle = "#FFFFFF";
	_R.fillStyle = "#202020";
	_R.lineWidth = "1";
	
	if(typeof options != 'undefined'){
		
		if(typeof options.centre != 'undefined'){    
			_R.centre = options.centre;
		}
		
		if(typeof options.width != 'undefined'){    
			_R.width = options.width;
		}
		
		if(typeof options.height != 'undefined'){    
			_R.height = options.height;
		}

		if(typeof options.strokeStyle != 'undefined'){    
			_R.strokeStyle = options.strokeStyle; 
		}
		
		if(typeof options.fillStyle != 'undefined'){    
			_R.fillStyle = options.fillStyle;
		}
		
		if(typeof options.lineWidth != 'undefined'){    
			_R.lineWidth = options.lineWidth;
		}
	}
	
	if(_R.centre == null){
		console.log('Please specify circle center position as Point2D');
	}

	return _R;
}


// the KodeBoard
var KodeBoard = function (options){
	
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
	
	//calculate centre
	_B.centre = new Point2D(_B.width/2,_B.height/2);
	
	//Get corners
	_B.bottomLeft = new Point2D(0,_B.height);
	_B.topLeft = new Point2D(0,0);
	_B.bottomRight = new Point2D(_B.width,_B.height);	
	_B.topRight = new Point2D(_B.width,0);
	
	_B.centreLeft = new Point2D(0,_B.centre.y);
	_B.centreRight = new Point2D(_B.width,_B.centre.y);
	_B.centreTop = new Point2D(_B.centre.x,0);
	_B.centreBottom = new Point2D(_B.centre.x,_B.height);
	
	_B.Clear = function(){
		var context = _B.canvas.getContext("2d");
		//Draw black rectangle
		context.fillStyle = _B.fillStyle;
		context.fillRect(0,0,_B.width,_B.height);
	}
	
	_B.DrawCircle = function(origin,radius, rotationDegrees = 0){
		var context = _B.canvas.getContext("2d");
		
		var centerX = origin.x;
		var centerY = origin.y;
		context.save();
		
		if(rotationDegrees > 360){
			rotationDegrees = 0;
		}
		if(rotationDegrees < -360){
			rotationDegrees = 0;
		}
		
		if(rotationDegrees > -360){
			context.translate(origin.x,origin.y);
			context.rotate(rotationDegrees * Math.PI / 180);
			centerX = 0;
			centerY = 0;
		}
		
		context.beginPath();
		
		//context.arc(origin.x, origin.y, radius, 0, 2 * Math.PI);
		context.arc(centerX, centerY, radius, 0, 2 * Math.PI);
		
		context.strokeStyle = _B.strokeStyle;
		context.stroke();
		context.fillStyle = _B.fillStyle;
		context.fill();
		context.closePath();
		if(rotationDegrees > -360){
			//_B.DrawLine(origin,{x:origin.x, y: origin.y+radius});
			_B.DrawLine({x:centerX,y:centerY},{x:centerX, y: centerY+radius});
		}
		
		context.restore();
	}
	
	_B.DrawCircle2D = function( circle ){
		var context = _B.canvas.getContext("2d");
		context.beginPath();
		context.lineWidth = circle.lineWidth;
		context.arc(circle.centre.x, circle.centre.y, circle.radius, 0, 2 * Math.PI);
		context.strokeStyle = circle.strokeStyle;
		context.stroke();
		context.fillStyle = circle.fillStyle;
		context.fill();
		context.closePath();
	}
	
	_B.DrawRectangle = function( origin, width, height,  rotationDegrees = 0 ){
		var context = _B.canvas.getContext("2d");
		
		leftX = origin.x;
		leftY = origin.y;
		context.save();
		
		if(rotationDegrees > 360){
			rotationDegrees = 0;
		}
		if(rotationDegrees < -360){
			rotationDegrees = 0;
		}
		
		if(rotationDegrees > -360){
			context.translate(origin.x + (width/2),origin.y + (height/2));
			context.rotate(rotationDegrees * Math.PI / 180);
			leftX = -width/2;
			leftY = -height/2;
		}
		context.beginPath();
		//context.rect(origin.x,origin.y, width, height);
		context.rect(leftX,leftY, width, height);
		context.strokeStyle = _B.strokeStyle;
		context.stroke();
		context.fillStyle = _B.fillStyle;
		context.fill();
		context.closePath();
		
		context.restore();
	}
	
	_B.DrawRectangle2D = function( rectangle ){
		var context = _B.canvas.getContext("2d");
		context.beginPath();
		context.lineWidth = rectangle.lineWidth;
		context.rect(rectangle.x, rectangle.y, rectangle.width, rectangle.height);
		context.strokeStyle = rectangle.strokeStyle;
		context.stroke();
		context.fillStyle = rectangle.fillStyle;
		context.fill();
		context.closePath();
	}
	
	_B.DrawSquare = function( origin, length, rotationDegrees = 0 ){
		_B.DrawRectangle( origin, length, length, rotationDegrees );
	}
	
	//Equilateral Triangle
	_B.DrawEquilateralTriangle = function( origin, length, rotationDegrees = 0 ){
		var context = _B.canvas.getContext("2d");
		
		if(rotationDegrees > 360){
			rotationDegrees = 0;
		}
		if(rotationDegrees < -360){
			rotationDegrees = 0;
		}		
		
		context.beginPath();
		context.strokeStyle = _B.strokeStyle;

		context.fillStyle = _B.fillStyle;
		
		var baseDeg = (2*Math.PI);
		var baseAngle = baseDeg/360 ;
		
		var degOne = 270 + rotationDegrees;
		if(degOne > 360){
			degOne -= 360;
		}
		
		var startAngle = baseAngle * degOne; //(Top)
		
		var x = length*Math.cos(startAngle) + origin.x;
		var y = length*Math.sin(startAngle) + origin.y;
		context.moveTo(x, y);
		
		var x1 = length*Math.cos((1./3)*baseDeg+startAngle) + origin.x;
		var y1 = length*Math.sin((1./3)*baseDeg+startAngle) + origin.y;
		context.lineTo(x1,y1);
		
		var x2 = length*Math.cos( (2./3)*baseDeg+startAngle) + origin.x;
		var y2 = length*Math.sin( (2./3)*baseDeg+startAngle) + origin.y;
		context.lineTo(x2,y2);
		
		context.lineTo(x,y);
		
		context.stroke();
		context.fill();		
		
		context.closePath();
		
	
	}
	
	//Equilateral Triangle
	_B.DrawEquilateralTriangle2D = function( triangle, rotationDegrees = 0 ){
		var context = _B.canvas.getContext("2d");

		if(rotationDegrees > 360){
			rotationDegrees = 0;
		}
		if(rotationDegrees < -360){
			rotationDegrees = 0;
		}		
		
		context.beginPath();
		context.strokeStyle = triangle.strokeStyle;

		context.fillStyle = triangle.fillStyle;
		
		var baseDeg = (2*Math.PI);
		var baseAngle = baseDeg/360 ;
		
		var degOne = 270 + rotationDegrees;
		if(degOne > 360){
			degOne -= 360;
		}
		
		triangle.startAngle = ( baseAngle * degOne ); //(Top)
		
		var x = triangle.length * Math.cos(triangle.startAngle) + triangle.x;
		var y = triangle.length * Math.sin(triangle.startAngle) + triangle.y;
		context.moveTo(x, y);
		
		var x1 = triangle.length * Math.cos((1./3)*baseDeg+triangle.startAngle) + triangle.x;
		var y1 = triangle.length * Math.sin((1./3)*baseDeg+triangle.startAngle) + triangle.y;
		context.lineTo(x1,y1);
		
		var x2 = triangle.length * Math.cos( (2./3)*baseDeg+triangle.startAngle) + triangle.x;
		var y2 = triangle.length * Math.sin( (2./3)*baseDeg+triangle.startAngle) + triangle.y;
		context.lineTo(x2,y2);
		
		context.lineTo(x,y);
		
		context.stroke();
		context.fill();		
		
		context.closePath();
	}
	
	_B.DrawHexagon = function( origin, radius, rotationDegrees = 0 ){
		var context = _B.canvas.getContext("2d");

		if(rotationDegrees > 360){
			rotationDegrees = 0;
		}
		if(rotationDegrees < -360){
			rotationDegrees = 0;
		}		
		
		context.beginPath();
		context.strokeStyle = _B.strokeStyle;

		context.fillStyle = _B.fillStyle;
		
		var baseDeg = (2*Math.PI);
		var baseAngle = baseDeg/360 ;
		
		var degOne = 0 + rotationDegrees;
		if(degOne > 360){
			degOne -= 360;
		}
		var startAngle = ( baseAngle * degOne );
		
		//var circleDeg = (2*Math.PI);
		
		var x = radius*Math.cos(startAngle) + origin.x;
		var y = radius*Math.sin(startAngle) + origin.y;
		context.moveTo(x, y);
		
		var x1 = radius*Math.cos((1./6)*baseDeg+startAngle) + origin.x;
		var y1 = radius*Math.sin((1./6)*baseDeg+startAngle) + origin.y;
		context.lineTo(x1,y1);
		
		var x2 = radius*Math.cos( (2./6)*baseDeg+startAngle) + origin.x;
		var y2 = radius*Math.sin( (2./6)*baseDeg+startAngle) + origin.y;
		context.lineTo(x2,y2);
		
		var x3 = radius*Math.cos( (3./6)*baseDeg+startAngle) + origin.x;
		var y3 = radius*Math.sin( (3./6)*baseDeg+startAngle) + origin.y;
		context.lineTo(x3,y3);
		
		var x4 = radius*Math.cos( (4./6)*baseDeg+startAngle) + origin.x;
		var y4 = radius*Math.sin( (4./6)*baseDeg+startAngle) + origin.y;
		context.lineTo(x4,y4);
		
		var x5 = radius*Math.cos( (5./6)*baseDeg+startAngle) + origin.x;
		var y5 = radius*Math.sin( (5./6)*baseDeg+startAngle) + origin.y;
		context.lineTo(x5,y5);
		
		context.lineTo(x,y);
		
		context.stroke();
		context.fill();		
		
		context.closePath();
	}
	
	//draw a single line
	_B.DrawLine = function(origin,to){
			var context = _B.canvas.getContext("2d");
			context.beginPath();
			context.moveTo(origin.x, origin.y);
			context.strokeStyle = _B.strokeStyle;
			context.lineTo(to.x,to.y);
			context.stroke();
			context.closePath();
	}

	_B.GetQuadrantPoint2D = function(q){
		switch(q){
			case 1: default: {
				return new Point2D( _B.centre.x + (_B.centre.x/2) , _B.centre.y - (_B.centre.y/2) );
			}break;
			case 2:{
				return new Point2D( _B.centre.x - (_B.centre.x/2) , _B.centre.y - (_B.centre.y/2) );
			}break;
			case 3:{
				return new Point2D( _B.centre.x - (_B.centre.x/2) , _B.centre.y + (_B.centre.y/2) );
			}break;
			case 4:{
				return new Point2D( _B.centre.x + (_B.centre.x/2) , _B.centre.y + (_B.centre.y/2) );
			}break;
		}
	}

	_B.Write = function(txt){
		var context = _B.canvas.getContext("2d");
		context.font = "12px Courier New";
		context.fillStyle = "#009900";
		context.textAlign = "left";
		
		var textData = "Text Here";
		var textPosition = new Point2D(12, 24);
		
		if(typeof txt != 'undefined'){
			
			if(typeof txt.text != 'undefined'){    
				textData = txt.text;
			}
			
			if(typeof txt.position != 'undefined'){    
				textPosition = txt.position;
			}
			
			if(typeof txt.font != 'undefined'){    
				context.font = txt.font;
			}
			
			if(typeof txt.fillStyle != 'undefined'){    
				context.fillStyle = txt.fillStyle;
			}
			
			if(typeof txt.textAlign != 'undefined'){    
				context.textAlign = txt.textAlign;
			}
		}
		context.fillText(textData, textPosition.x, textPosition.y);
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
	
	return _B;
	
}