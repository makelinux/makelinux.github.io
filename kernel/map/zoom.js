var scale_timer;
var lkmi;
var ping_t=5;
var _uptime=0;
var actions=0;
var chrome_detected;
var ready;
//var coords_width = 2107.317; // 24" - border
var coords_width = 2160; // 24"

function trace(m1,m2)
{
	try {
		if ( m1 == "error" && ( -1 == m2.indexOf("urchin"))) { 
			document.getElementById('status2').style.display='error';
			document.getElementById('status2').innerHTML="<b>Sorry. Error. Please reload.</b>"// +m2
			log(m1+" "+m2);
		}
		//log(navigator.appName);
		//if ( navigator.appName  != "Konqueror" ) 
		{
			var http_req = http_req_get();
			if (http_req) with (http_req) {
				onreadystatechange = function (){/*log("onreadystatechange");*/ }
				open("get", 
						//						"http://www.makelinux.net/"
						//"http://hp.const.homelinux.net/" +
						"trace_"+m1+"?t="+_uptime+"&"+m2,true);
				send(null);
			}
		}
	} catch (e) { }
}

var overloaded;

function tick()
{
	setTimeout("tick()",1000);
	_uptime+=1;
	if ( _uptime > 120 && ! ready ) {
		var s = el('status2'); 
		s.innerHTML='<b>Thank you for visiting and patience! <br>The site is overloaded.<br> Please wait more or visit latter</b>';
		if ( ! overloaded ) { 
			overloaded = 1;			
			var traceimg= new Image();
			traceimg.src="http://const.homelinux.net/1.png?status=OVERLOAD&t="+_uptime;
		}
	}
	if ( _uptime > 600 && ! ready ) {
			var traceimg= new Image();
			traceimg.src="http://const.homelinux.net/1.png?status=RELOADED&t="+_uptime;
		window.location.reload();
	}
}

function ping()
{
	//trace("ping","");
	setTimeout("ping()",ping_t);
	ping_t*=4;
}

setTimeout("ping()",ping_t);

function rectangle(rl,rt,rr,rb,  l,t,r,b)
{
	w=(b-t)/10;
	w=2
	//log(w);
	rt.style.position = 'absolute';
	rt.style.left = l-w;
	rt.style.top  = t-w-1;
	rt.style.width = r-l+2*w + "px";
	rt.style.height = w+ "px";
	rt.style.backgroundColor = 'white';
	rt.style.visibility = 'visible';
	rt.style.size=0
	rt.style.display='inline'

	rl.style.position = 'absolute';
	rl.style.left = l-w;
	rl.style.top  = t-w;
	rl.style.width = w;
	rl.style.height = b-t+2*w;
	rl.style.backgroundColor = 'white';
	rl.style.visibility = 'visible';
	rl.style.display=''

	
	rr.style.position = 'absolute';
	rr.style.left = r;
	rr.style.top  = t-w;
	rr.style.width = w;
	rr.style.height = b-t +2*w;
	rr.style.backgroundColor = 'white';
	rr.style.visibility = 'visible';
	rr.style.display=''

	rb.style.position = 'absolute';
	rb.style.left = l;
	rb.style.top  = b;
	rb.style.width = r-l;
	rb.style.height = w;
	rb.style.backgroundColor = 'white';
	rb.style.visibility = 'visible';
	rb.style.display='';
}

var sirl,sirt, sirr, sirb;
sirl  = document.getElementById("sirl");
sirt  = document.getElementById("sirt");
sirr  = document.getElementById("sirr");
sirb  = document.getElementById("sirb");

var img2 = new Array();
var sizes = new Array(512,768,1024,2048);
var lkmi = el('lkmi');

log(lkmi.width);

function image_size_get(size)
{
	log("image_size_get " + size);
	var def = lkmi.src;

	for (var si in sizes) {
		if ( img2[si] && size <= sizes[si] )
			return img2[si].src;
	}
	log("image_size_get si=" + si);
	if ( img2[si] )  // the last biggest
		return img2[si].src;
	log("image_size_get " + size );
	return def; // no big images
}

function img2_set(e)
{
	for (var si in sizes) {
		var size = sizes[si];
		if ( ! img2[si] ) {
			img2[si] = new Image();
			img2[si].src = lkmi.src.replace("512",size);
			img2[si].onerror = function () {trace("error","m="+this.src);};
		}
	}
}

function image_load_next(e)
{
	log("image_load_next");
	log("event " + e);
	log("this " + this + " " + (this?this.src:""));
	for (var si in sizes) {
		var size = sizes[si];
		if ( ! img2[si] ) {
			log("loading " + size);
			img2[si] = new Image();
			img2[si].src = lkmi.src.replace("512",size);
			img2[si].onerror = function () {trace("error","m="+this.src);};
			if ( img2[si].src == lkmi.src )
				continue;
			img2[si].onload = image_load_next;
			/*img2[si].onload = function () {
				log("image onload");
				log("event " );
				log("this " + this + " " + (this?this.src:""));
				image_load_next(NULL);
			};*/
			log("done ");
			return ;
		}
	}
	image_load_finished()
}

function zoom_width(w)
{	
	log("zoom_width(" + w + ")");
	do_scale = 1;
	if (!lkmi_width) lkmi_width = lkmi.width;
	m=w/lkmi_width;
	var lkmi_pos = getPosition(lkmi);
	var mouse_pos = mousePos_get();
	if ( mouse_pos ) {
		//log(mouse_pos.x+" "+mouse_pos.y);
		o1= {x:mouse_pos.x - lkmi_pos.x, y:mouse_pos.y - lkmi_pos.y};
		lkmi.style.position = 'absolute';
		lkmi.style.top = lkmi_pos.y + o1.y - m*o1.y;
		lkmi.style.left = lkmi_pos.x + o1.x - m*o1.x;
	}
	lkmi.width = lkmi_width = w;
	lkmi.height = w * 384 / 512;
	return w;
}

function r(w,h)
{
	if ((w > h/1.1) && (w < 1.1*h)) w = h;
	//document.getElementById("msg").innerHTML=h;
	return w
}

var do_scale;
function schedule_scale()
{
	do_scale=1;
	log("schedule_scale -------------------------");
	if ( chrome_detected) {
		scale();
	} else { 
		if ( scale_timer ) clearTimeout(scale_timer); scale_timer = 0;
		scale_timer = setTimeout("scale()",500);
	}
}

function zoom( delta )
{
	if (! ready) return 0;
	//window.scroll(0,0);
	log("zoom("+delta+")");
	if ( scale_timer ) clearTimeout(scale_timer); scale_timer = 0;
	var m=0;
	if (delta < 0) m = 1/1.1;
	else if (delta > 0) m = 1.1;
	else m=1;
	if (Math.abs(delta) > 1) m = delta;
	w = lkmi.width * m;
	w=r(w,512);
	w=r(w,768);
	w=r(w,1024);
	w=r(w,2048);
	w=r(w,2*2048);
	if ( w > 100*1024 ) w = 100*1024;
	if ( w < 512 ) w = 512;
	zoom_width(w);
	schedule_scale();
	return w;
}

function wheel(event)
{
	actions++;
	//log("wheel");
	var delta = 0;
	if (!event) event = window.event;
	log("wheel event.detail="+event.detail + " event.wheelDelta="+event.wheelDelta);
	if (event.wheelDelta) {
		delta = event.wheelDelta/120; 
		//if (window.opera) delta = -delta;
	} else if (event.detail) {
		log("wheel event.detail="+event.detail);
		delta = -event.detail/3;
	}
	if (delta) zoom(delta);
	if (event.preventDefault)
		event.preventDefault();
	event.returnValue = false;
}

var area_cur;

function area_hold()
{
	//log("over&t="+area_cur.title);
	//log("area_hold");
}

var rl,rt, rr, rb;
		
rl  = document.getElementById("rl");
rt  = document.getElementById("rt");
rr  = document.getElementById("rr");
rb  = document.getElementById("rb");

var cur;
cur = el("cur");

var none='none';
var area_timer=0;
var click_count=0;
function aa() { alert("aa"); }
function area_add(t,l,x,y,x1,y1)
{ 
	var idmap = document.getElementById("idmap");
	var a0 = idmap.firstChild;
	var a=a0.cloneNode(true);
	//log("area_add " + t + " " + a0 + " " + typeof(a0)+ " " + l );
	a.href=l;
	//a.title=t;
	a.coords=x+','+y+','+x1+','+y1;
	//a.target="lxr";
	//a.onFocus=aa;
	a.onmouseover=function() { 
		actions++;
		var coords0 = String(a.coords).split(",");
		var lkmi_pos    = getPosition(lkmi);
		rectangle(rl,rt,rr,rb, lkmi_pos.x + parseInt(coords0[0]),lkmi_pos.y + parseInt(coords0[1]),
				lkmi_pos.x + parseInt(coords0[2]), lkmi_pos.y + parseInt(coords0[3]));
		area_cur = a;
		//area_timer = setTimeout("area_hold()",100);
		cur.style.position = 'absolute';
		//var mousePos = mousePos_get();
		if  ( mousePos ) { 
		//log("onmouseover " + actions + " " + " " + a.href + " " + mousePos.x + " " + mousePos.y);
		cur.style.left = mousePos.x;
		cur.style.top  = mousePos.y;
		//cur.style.width = 10 ;
		//cur.style.height = 10;
		cur.style.backgroundColor = '#DDDDDD';
		cur.style.visibility = 'visible';
		cur.style.display='';
		//	cur.firstChild.href=l;
		//cur.firstChild.innerHTML=t;
		cur.innerHTML='<a style="text-decoration:none" target="lxr" href="'+l+'">&nbsp;'+t+'&nbsp;</a>';
		} else {
		log("onmouseover err" + actions + " " + " " + a.href);
		}
	}

	var cur = document.getElementById('cur');

	cur.onmouseout=function() { document.getElementById('cur').style.display='none';  }
	a.onmouseout=function() 
	{ 
		//if ( area_timer ) clearTimeout(area_timer);
		area_cur = null;
		rl.style.display='none'
		rt.style.display='none'
		rr.style.display='none'
		rb.style.display='none'
	}
	a.onclick=function() { trace("click","t="+t+"&c="+( ++click_count));};
	idmap.appendChild(a);
}

function ah(id,x,y,w,h) { area_add(id,"https://elixir.bootlin.com/linux/latest/source/include/"+id,x,y,x+w,y+h); }
function as(id,x,y,w,h) { area_add(id,"https://elixir.bootlin.com/linux/latest/source/"+id,x,y,x+w,y+h); }
function ai(id,x,y,w,h) { 
	area_add(id,"https://elixir.bootlin.com/linux/latest/ident/"+id,x,y,x+w,y+h);
	//trace("click","c="+x+','+y+','+x+w+','+y+h)
}
function au(url,x,y,w,h) { 
	area_add(url,url,x,y,x+w,y+h);
	//trace("click","c="+x+','+y+','+x+w+','+y+h)
}

function http_req_get()
{
	var http_req;
	try {
		http_req=new XMLHttpRequest(); // Firefox, Opera 8.0+, Safari
	} catch (e) {
		try {
			http_req=new ActiveXObject("Msxml2.XMLHTTP"); // Internet Explorer
		} catch (e) {
			try {
				http_req=new ActiveXObject("Microsoft.XMLHTTP");
			} catch (e) {
			}
		}
	}
	return http_req;
}

var data = new Array;
function map_init()
{
	var i =0; 
	var idmap = document.getElementById("idmap");
	var a0 = idmap.firstChild;
	log("map_init");
	//log("<br> map_init <br>");
	//log(i + a0.href +" "+a0.coords + "<br>");
	a=a0.nextSibling;
	while ( a ) {
		if (a.coords) { 
			var coords0 = String(a.coords).split(",");
			coords0[0]=Math.round(coords0[0]);
			coords0[1]=Math.round(coords0[1]);
			coords0[2]=Math.round(coords0[2]);
			coords0[3]=Math.round(coords0[3]);
			data[i]=coords0;
			i++;
			//log(i + a + a.href +" "+a.coords + "<br>");
		}
		a=a.nextSibling;
	}
}

var lkmi_width;

function scale()
{
	log("scale " + do_scale + " " + scale_timer);
	if (!do_scale)
		return;
	do_scale = 0;
	scale_timer = 0;
	var idmap = document.getElementById("idmap");
	var a0 = idmap.firstChild;
	a=a0.nextSibling;
	//log("a0=" + a0.title + " "+ a0.href + " "+a0.coords +"<br>");
	//log(a +" " +a.title + " "+ a.href + " "+a.coords +"<br>");
	if (!lkmi.width) lkmi.width = lkmi_width;
	//var k = lkmi.width/1600;
	var k = lkmi.width/coords_width;
	//lkmi.width = 100;
	//log("scale"+ lkmi.width +" "+ k);
	var i =0; 
	var coords = new Array(4);
	var coords2 = new Array(4);
	while ( a ) {
		if ( a.href) { 
			coords=data[i];
			coords2[0]=Math.round(k* coords[0]);
			coords2[1]=Math.round(k* coords[1]);
			coords2[2]=Math.round(k* coords[2]);
			coords2[3]=Math.round(k* coords[3]);
			a.coords = coords2.join(",");
			//log(i + a + a.href +" "+a.coords);
			i++
		}
		a=a.nextSibling;
	}
	if ( 1 ) {
		// refresh location, try for Chrome
		//lkmi.width = 100; 
		var lkmi_pos = getPosition(lkmi);
		/* 
		lkmi.style.top = 0;
		lkmi.style.left = 0;
		lkmi.style.position = 'absolute';
		lkmi.style.top = lkmi_pos.y+1;
		lkmi.style.left = lkmi_pos.x+1;
		lkmi.width = lkmi_width+1; // try to fix Chrome
		*/
	}
	zoom_width(lkmi_width);
	log("scale done -----------------------------------------------");
}

function move(x,y)
{
	if (! ready) return;;
	var lkmi_pos    = getPosition(lkmi);
	lkmi.style.position = 'absolute';
	lkmi.style.top = lkmi_pos.y+y ;
	lkmi.style.left = lkmi_pos.x+x;
}

var wnd;

if (navigator.appName.indexOf("Microsoft")!=-1) 
wnd = { x:document.body.offsetWidth,y:document.body.offsetHeight};
else {
	wnd =  {x:window.innerWidth,y:window.innerHeight};
}

function map_macro()
{
	//document.getElementById('status2').style.display='';
	mousePos={x:wnd.x/2,y:wnd.y/2};
	zoom_width(8*4096);
	scale();
	/*lkmi.style.position = 'absolute';
	lkmi.style.top = 0;
	lkmi.style.left = 0;
	lkmi.style.display = '';*/
}

function map_home()
{
	if (! ready) return 0;
	//log("map_home");
	//window.scroll(0,0);
	//log(navigator.appName);
	//log(navigator.appVersion);
	//trace("wnd","x="+wnd.x+"&y="+wnd.y);
	/*if (navigator.appName=="Opera") {
	}
	if ( parseInt(navigator.appVersion) > 3 ) {
		if (navigator.appName=="Netscape") {
			winW = window.innerWidth;
			winH = window.innerHeight;
		}
	}*/
	//var dw = document.getElementById("dashboard").style.width;
	dw=50;
	//log(el('header').height);
	zoom_width((wnd.y)* 2048/1536);
	lkmi.style.position = 'absolute';
	lkmi.style.top = 0;
	//lkmi.style.left = (winW - lkmi.width)/2;
	lkmi.style.left = (wnd.x - dw - (( wnd.y  )* 2048/1536))/2;
	lkmi.style.display = '';
	scale();
	//move(0,0);
}

function key(event)
{
	var k;
	actions++;
	//window.scroll(0,0);
	//log(window.event.modifiers)
	if (window.event) k = window.event.keyCode;
	else if (event) k = event.which;
	if ( ! k ) k = event.keyCdode;
	if ( k ) { 
		log(k);
		switch ( k )
		{
			case 65: // +
			case 107: //  +
			case 33: // PU
				mousePos={x:wnd.x/2,y:wnd.y/2};
				zoom(1);
				break;
			case 109: // -
			case 34: // PD
				mousePos={x:wnd.x/2,y:wnd.y/2};
				zoom(-1);
				break;
			case 40:
			case 98:
				move(0,-30);
				break;
			case 37:
			case 100:
				move(30,0);
				break;
			case 39:
			case 102:
				move(-30,0);
				break;
			case 38:
			case 104:
				move(0,30);
				break;
			//case 187: // '='
			case 84:
				el('log').style.color='black';
			break;
			case 36: map_home();
			break;
		}
	}
}
// init
{
	chrome_detected = navigator.userAgent.toLowerCase().indexOf('chrome') > -1;
	if (window.addEventListener) {
		window.addEventListener('DOMMouseScroll', wheel, false);
		window.addEventListener('mousewheel', wheel, false); // for Chrome
	} else  {
		window.onmousewheel = document.onmousewheel = wheel;
	}
	document.onkeyup=key;

	function kH(e) {
		var pK = e ? e.which : window.event.keyCode;
		log(pK);
		alert (pK)
			//return pK != 13;
			return 0
	}
	tick();
}
//document.onkeypress = kH;
//if (document.layers) document.captureEvents(Event.KEYPRESS);

// (c) Constantine Shulyupin
// Thanks to: http://adomas.org/javascript-mouse-wheel/
