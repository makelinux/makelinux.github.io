
var start_time = new Date()

function uptime()
{
	var d2 = new Date();
	var t = (d2.valueOf()-start_time.valueOf())/1000;
	if ( t > 10 ) return Math.round(t);
	return (d2.valueOf()-start_time.valueOf())/1000;
}

function el(id)	{ return document.getElementById(id); };
var log_enabled;
function log(m)
{
	//var ownName = arguments.callee.toString();
	//ownName = ownName.substr('function '.length);
	//ownName = ownName.substr(0, ownName.indexOf('('));        // trim off everything after the function name
	if (log_enabled) { 
		el('log').innerHTML+= uptime() + ":" + m +"<br>";
	}
}

function addLoadEvent(func) 
{
	var oldonload = window.onload;
	if (typeof window.onload != 'function') {
		window.onload = func;
	} else {
		window.onload = function() {
			oldonload();
			func();
		}
	}
}

