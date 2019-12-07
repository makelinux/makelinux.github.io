var mouseOffset = null;
var dragObject  = null;

Number.prototype.NaN0=function(){return isNaN(this)?0:this;} // need for IE

function getPosition(e)
{
	var left = 0;
	var top  = 0;
	while (e.offsetParent){
		left += e.offsetLeft + (e.currentStyle?(parseInt(e.currentStyle.borderLeftWidth)).NaN0():0);
		top  += e.offsetTop  + (e.currentStyle?(parseInt(e.currentStyle.borderTopWidth)).NaN0():0);
		e     = e.offsetParent;
	}
	left += e.offsetLeft + (e.currentStyle?(parseInt(e.currentStyle.borderLeftWidth)).NaN0():0);
	top  += e.offsetTop  + (e.currentStyle?(parseInt(e.currentStyle.borderTopWidth)).NaN0():0);

	return {x:left, y:top};
}

function mouseCoords(ev)
{
	//log("mouseCoords ev.pageX= " + ev.pageX + " " + ev.pageY + " ev.clientX= " + ev.clientX + " " + ev.clientY);
	if(ev.pageX || ev.pageY){
		return {x:ev.pageX, y:ev.pageY};
	}
	return {
		x:ev.clientX + document.body.scrollLeft - document.body.clientLeft,
		y:ev.clientY + document.body.scrollTop  - document.body.clientTop
	};
}

var mousePos;
function mousePos_get()
{
	//alert(mousePos);
	return mousePos;
}

function getMouseOffset(target, ev)
{
	ev = ev || window.event;
	var docPos    = getPosition(target);
	mousePos  = mouseCoords(ev);

	return {x:mousePos.x - docPos.x, y:mousePos.y - docPos.y};
}

function mouseMove(ev)
{
	ev         = ev || window.event;
	window.scroll(0,0);
	/*
	We are setting target to whatever item the mouse is currently on
	Firefox uses event.target here, MSIE uses event.srcElement
	*/
	var target   = ev.target || ev.srcElement;
	mousePos = mouseCoords(ev);
	if(dragObject){
		dragObject.style.position = 'absolute';
		dragObject.style.top      = mousePos.y - mouseOffset.y
		dragObject.style.left     = mousePos.x - mouseOffset.x;
		//document.title= "mouseMove" + dragObject.style.left;

	}
	// this prevents items on the page from being highlighted while dragging
	if( dragObject) return false;
}

function mouseUp(ev) { 
	actions++;
	//document.body.style.cursor='default';
	lkmi.style.cursor='default';
	if (dragObject)
		log("move&y="+dragObject.style.top+"&x="+dragObject.style.left);
	dragObject = null; 
}

function mouseDown(ev)
{
	ev  = ev || window.event;
	var target = ev.target || ev.srcElement;

	if(target.onmousedown || target.getAttribute('DragObj')){
		return false;
	}
}

function DragStart(ev)
{
	dragObject  = this;
	mouseOffset = getMouseOffset(this, ev);
	//document.body.style.cursor='move';
	lkmi.style.cursor='move';
	return false;
}

function makeDraggable(item)
{
	if(!item) return;
	item.onmousedown = function(ev){
		dragObject  = this;
		mouseOffset = getMouseOffset(this, ev);
		return false;
	}
}

document.onmousemove = mouseMove;
document.onmousedown = mouseDown;
document.onmouseup   = mouseUp;
document.onMouseOut   = mouseUp;
document.onblur   = mouseUp;
