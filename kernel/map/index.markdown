<head>
	<title>Interactive map of Linux kernel</title>
	<meta http-equiv="Content-Type" content="text/html;charset=utf-8" />
	<style type="text/css">
		body {font-family:helvetica,arial,sans-serif}
		cap { 	color: black;	text-transform:capitalize; }
		a { color: black; text-decoration: none }
		a.nojavascript { color: gray; text-decoration: none }
		.aheader { font-size:xx-large; font-weight:bold  }
		#label { color: white; text-decoration: none }
		.poster { text-align:center; font-weight:bold; color: #000000; display:none; font-size:large;xwhite-space:pre-line; font-style:xitalic  }
		.poster2 { font-weight:bold; display:none; }
		a.poster2:hover { text-decoration: underline }
		.hide { display: none }
		.small { color:black; font-size:xx-small }
		.plain { display: none }
		.high { color: darkred;font-weight:bold }
		small a { color:black; font-size:small }
		small a:link { color:black; font-size:small }
		small a:visited { color:black; font-size:small }
		small a:hover { font-size:small; text-decoration: underline; color: black; }
		ax:visited { color: #002200; text-decoration: none }
		a:hover { text-decoration: underline }
		xinput {width: 2em;height:2em}
		a.small:link { font-size:x-small; text-decoration: none; color: black; }
		a.small:visited { font-size:x-small; text-decoration: none; color: black; }
		a.small:hover { font-size:x-small; text-decoration: underline; color: black; }
	</style>
</head>

<body style="overflow:hidden;cursor:wait" onscroll="onscroll()" onload="body_onload()">
<script type="text/javascript" > location_fix("makelinux.net"); </script>
<script src="/common/script.js"> </script>
<div align="left" id="log" style='right:0;bottom:0;position:absolute;color:white;font-size:xx-small' >Log:</div>
<center>
<div id="header" style="position:relative;font-size:xx-large; font-weight:bold"> Interactive map of Linux kernel </div>
<table cellspacing="5" border="0" style="left:0;bottom:0;position:absolute" bgcolor="#DDDDDD">
			<tr> 
				<td> 
					<small>
						<nobr>
						<a href="intro">About</a><br>
						<a href="http://www.makelinux.net/ldd3/chp-1-sect-2.shtml">Splitting the Kernel</a><br>
						<!--<a href="LKM21_8192.png" title="PNG image, 8192 x 6144, 4487202 bytes">png 8Kx6K pix<br></a>-->
						<a class="plain" href="plain_" title="plain HTML version without JavaScript">plain html<br></a>
						<!--
	      <a href="http://www.go2linux.org/linux-kernel-map">review 1</a><br>
	      <a href="http://linuxhelp.blogspot.com/2007/08/introducing-interactive-linux-kernel.html">review 2</a><br>
						-->
						<a class="hide" href="http://en.wikipedia.org/wiki/File_talk:Linux_kernel_map.png"><img border="0" height="16" width="16" src="/common/pencil.png"> advise<br></a>
						<!-- 
	      <img width="16" height="16" border="0" src="../style/facebook.png">
	      <a class="hide" href="http://www.facebook.com/pages/Interactive-Linux-Kernel-Map/115958886534">facebook<br></a>
	      <a href="http://www.facebook.com/group.php?gid=47756059229">join FB group<br></a>
	      #include virtual="../style/facebook.shtml" --> <br>
	      <iframe src="https://www.facebook.com/plugins/likebox.php?href=http%3A%2F%2Fwww.facebook.com%2Fpages%2FInteractive-Linux-Kernel-Map%2F115958886534&amp;width=200&amp;colorscheme=light&amp;show_faces=true&amp;border_color&amp;stream=false&amp;header=false&amp;height=300" scrolling="no" frameborder="0" style="border:none; overflow:hidden; width:200px; height:300px;" allowTransparency="true"></iframe>
	      <br>
	      <!-- <a href="http://www.facebook.com/group.php?gid=47756059229">facebook goup</a> <br> -->
	      <!--<a target="_top" href="http://www.makelinux.net/system/">GNU/Linux map</a><br>-->
	      <a href="referers">referers</a><br>
	      <a href="http://makelinux.wordpress.com/2010/12/20/comments-on-interactive-linux-kernel-map/"><img border="0" height="16" width="16" src="/common/pencil.png"> comments<br></a>
	      <a target="_top" href="http://www.makelinux.net/resources">more ...</a><br>
	      <!-- #include virtual="../style/chat.shtml" -->
	      <!--<a href="http://www.javvin.com/product_info.php?ref=41&products_id=136&affiliate_banner_id=50" target="_blank">Linux Quick Guide</a><br>-->
	      <!-- <a href="../israel/fighting_israel_for_dummies">a truth about Israel</a> -->
	      <!-- <br> <script src="http://slashdot.org/slashdot-it.js" type="text/javascript"></script> -->
	      <!-- <script type="text/javascript" src="http://w.sharethis.com/button/sharethis.js#publisher=1d915243-dc07-43c4-9dae-d2f22495899d&amp;type=website"></script> -->
	      <!-- #include virtual="poll.shtml" -->
						</nobr>
					</small>
				</td>
			</tr>
		</table>
		<div align="center" style="position:absolute;bottom:0;left:20%">
			<center>
				<!-- #include virtual="/style/advw.shtml" -->
			</center>
		</div>
		<map id="idmap" name="idmap"><area href="#" title="" coords="0,0,1,1" target="lxr" > </map>
		<img style="position:relative;display:none;cursor:wait" id="lkmi" src="LKM.svg"
				 usemap="#idmap"  border="0" title="drag and zoom me" alt="Linux kernel map" />
		<div align="right" class="hide" style='display:xxnone;position:absolute;bottom:0;right:0;background:#7777ff;color:white;link-color:white' > 
			&nbsp;<nobr><a id="label" href="poster?l=1"><b>poster</b> for your wall&nbsp;</a></nobr>
		</div>
		<div id="nojavascript2"> 
			<br>Please Enable JavaScript<br><a href="plain_" >or use plain html</a>
		</div>
	</center>
	<script type="text/javascript">
		//
		el('nojavascript2').style.display='none';
el('status2').style.display='';
	</script>
	<table cellspacing="5" border="0" id="dashboard" bgcolor="#DDDDDD" style='display:;position:absolute;top:0;right:0'>
		<tr> 
			<td> 
				<nobr>
				<center>
					<span class="xxcap">Navigation</span>
					<table cellspacing="2"  cellpadding="0" >
						<tr>
							<td> <button onclick="move(30,30)" ><img src="lu.png" ></button> </td>
							<td > <button onclick="move(0,30)" title="pan up"><img src="u.png" ></button> </td>
							<td> <button onclick="move(-30,30)"><img src="ru.png" ></button> </td>
						</tr> 
						<tr>
							<td> <button onclick="move(30,0)" title="pan left"><img src="l.png" ></button> </td>
							<td> <button onclick="map_home()" title="HOME"><img src="c.png" ></button> </td>
							<td> <button onclick="move(-30,0)" title="pan right"><img src="r.png" ></button> </td>
						</tr> <tr>
							<td> <button onclick="move(30,-30)"><img src="ld.png" ></button> </td>
							<td> <button onclick="move(0,-30)" title="pan down"><img src="d.png" ></button> </td>
							<td> <button onclick="move(-30,-30)" ><img src="rd.png" ></button> </td>
						</tr> <tr>
							<td> <button onclick="mousePos={x:wnd.x/2,y:wnd.y/2};zoom(-1);" title="zoom out"><img src="zo.png" ></button> </td>
							<td> <button onclick="mousePos={x:wnd.x/2,y:wnd.y/2};zoom(1)" title="zoom in"><img src="zi.png" ></button> </td>
							<td> <button onclick="mousePos=null;map_macro()" title="macro zoom"><img src="zm.png" ></button> </td>
						</tr> 
						<tr>
							<td> </td>
							<td> </td>
							<td> </td>
						</tr>
					</table>
				</center>
				<span class="small">
					Mouse: <br> 
					Drag - pan <br> 
					Wheel, <br> 
					Dbl Click - zoom <br> 
					Items - links <br> 
					<br>
					Keyboard: <br> PgDn, PgUp
					- zoom <br> arrows - pan <br> 
				</span>
				</nobr>
				<br>
				<b class="hide">NEW!</b>
				<hr>
				<!-- #include virtual="linux_kernel_networking.shtml" -->
				<a href="https://github.com/makelinux/linux_kernel_map/blob/master/LKM.svg">SVG</a>,
				<a href="http://www.makelinux.net/kernel_map/LKM.pdf">PDF</a>
				<br>
				<br>
				<a href="https://www.redbubble.com/people/costa-shul/works/31893024-linux-kernel-map?p=tapestry">Tapestry, Poster</a><br>
				<!-- #include virtual="buy.shtml" -->
				<br>
				<hr>
				<span class="hide">
					Recommended<blink>:</blink>
					<br><a class="small" href="/android/internals/">&bull; Android internals<br></a>
					<a id="poster2" class="poster2" href="poster" target="_top">&bull; Wall poster</a>
					<a class="small" href="http://www.amazon.com/gp/product/0672329468?ie=UTF8&tag=makelinux-20&linkCode=as2&camp=1789&creative=390957&creativeASIN=0672329468">
						&bull; Linux Kernel<br>Development<br>3rd edition, 2010</a>
					<br> <a class="small" href="http://www.amazon.com/gp/product/1593272200?ie=UTF8&tag=makelinux-20&linkCode=as2&camp=1789&creative=390957&creativeASIN=1593272200">&bull; The Linux<br>Programming<br>Interface, 2010</a><img src="http://www.assoc-amazon.com/e/ir?t=makelinux-20&l=as2&o=1&a=1593272200" width="1" height="1" border="0" alt="" style="border:none !important; margin:0px !important;" /></a>

				<br><a class="small" href="/man/">&bull; Linux man pages</a>
				<!-- #include virtual="/kernel_map/amazon.shtml" -->
				<br>
				</span>
				<!--
	    <img src="style/poster.png" border="0" width="16" height="16" />&nbsp;
	    <a target="_top" href="dont">don't open this!</a>
	    <hr>
	    Please visit
	    <br>
	    <a target="_top" href="http://www.makelinux.net/reference">Linux Technology Reference</a>
				-->
				<!-- #include virtual="kernel_map/ads.html"-->
				<!-- <img src="http://const.homelinux.net/1.png" height="0" width="0" border="0" />  -->
			</td>
		</tr>
	</table>
	<table align="left" cellspacing="5" border="0" style="left:0;top:0;position:absolute" bgcolor="#ffffcc" >
		<tr>
			<td>
				<a id="poster" class="poster" href="poster" target="_top">
					<!--Hard Copy -->
		Get it as a poster!
		<!-- Wall poster<br> 24x18 inch -->
				</a>
				<!-- #include virtual="poll.shtml" -->
</td>
		</tr>
	</table>
	<script type="text/javascript"> 
		var loadn="0;"

	</script>
	<table id="rl" border="0" cellspacing="0" cellpadding="0" ><tr><td></td></tr></table>
	<table id="rt" border="0" cellspacing="0" cellpadding="0" ><tr><td></td></tr></table>
	<table id="rr" border="0" cellspacing="0" cellpadding="0" ><tr><td></td></tr></table>
	<table id="rb" border="0" cellspacing="0" cellpadding="0" ><tr><td></td></tr></table>
	<table id="sirl" border="0" cellspacing="0" cellpadding="0" ><tr><td></td></tr></table>
	<table id="sirt" border="0" cellspacing="0" cellpadding="0" ><tr><td></td></tr></table>
	<table id="sirr" border="0" cellspacing="0" cellpadding="0" ><tr><td></td></tr></table>
	<table id="sirb" border="0" cellspacing="0" cellpadding="0" ><tr><td></td></tr></table>
	<div align="left" id="cur" > <a id="link" name="link"></a> </div>
	<!--  #include virtual="style/track.html"  -->
	<!-- <script src="aaahttp://www.makelinux.info/kernel_map/zoom.js" type="text/javascript"> </script> -->
	<script src="zoom.js" type="text/javascript"> </script>
	<script src="drag.js" type="text/javascript"> </script>
	<script src="LKM3_area.js" type="text/javascript"> </script>
	<script src="cookie.js" type="text/javascript"> </script>
	<script type="text/javascript">
		var traceimg= new Image();
onerror=err; function err(msg,url,l) { 
	trace("error","m=" + msg + "&l="  + url + ":" + l);
	traceimg.src="http://const.homelinux.net/1.png?ERR="+ msg.replace(/ /g,"_") + "&l="  + url + ":" + l
}
function onscroll() { window.scroll(0,0); return false; }
log("logging");

function body_onload() { 
	log("body.onload"); 
	log( this + (this?this.src:""));
}

lkmi= el('lkmi');

function image_load_finished()
{
	log("image_load_finished");
	ready=1;
	lkmi.onmousedown=DragStart;
	//	lkmi.onmouseclick=function() { alert("click");};
	lkmi.ondblclick=function (){ zoom(4);};
	map_init();
	map_home();
	//traceimg.src="http://const.homelinux.net/1.png?status=LOADED&t="+uptime();
	lkmi.style.cursor='default';
	document.body.style.cursor='default';
}

function img_onload()
{
	log("*********** img_onload "  + this + (this?this.src:""));
}
//lkmi.onload = image_load_next;

addLoadEvent(function(e)
{
	log("window.onload");
	//trace("loaded","n="+loadn); cookie_check();// alert(idmap.innerHTML) 
	image_load_finished();
	//lkmi.style.cursor='move';
}
);

window.onunload = function() { 
	//traceimg.src="http://const.homelinux.net/1.png?status="unload&t=""+uptime()+"&act="+actions;
	//traceimg.src="http://const.homelinux.net/1.png?status=unload&t="+uptime()+"&act="+actions;
}
</script>
</body>
<div style='position:absolute;bottom:0'>
	<!--#include virtual="../style/google.html"  -->
	<!-- #include virtual="style/godaddy.html"  -->
</div>
<!-- 
	(c) Constantine Shulyupin
	Thanks to:
	http://www.webreference.com/programming/javascript/mk/column2/
	http://adomas.org/javascript-mouse-wheel/
-->
