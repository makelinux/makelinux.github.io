---
---
<html>
<head>
	<title>Interactive map of Linux kernel</title>
	<meta http-equiv="Content-Type" content="text/html;charset=utf-8" />
	<style type="text/css">
		body {font-family:helvetica,arial,sans-serif}
		a { color: black; text-decoration: none }
		.small { color:black; font-size:x-small }
		small a { color:black; font-size:small }
		small a:link { color:black; font-size:small }
		small a:visited { color:black; font-size:small }
		small a:hover { font-size:small; text-decoration: underline; color: black; }
		a:hover { text-decoration: underline }
		a.small:link { font-size:x-small; text-decoration: none; color: black; }
		a.small:visited { font-size:x-small; text-decoration: none; color: black; }
		a.small:hover { font-size:x-small; text-decoration: underline; color: black; }
	</style>
</head>

<body>
<style> #LKM { height:100%; width:100%; } </style>
{% include_relative LKM.svg %}
<script type="text/javascript" >
elem = document.getElementById('LKM')
</script>
<script src="/common/script.js"> </script>
<div align="left" id="log" style='right:0;bottom:0;position:absolute;color:white;font-size:xx-small' >Log:</div>
<center>
		<table cellspacing="5" border="0" style="left:0;bottom:0;position:absolute" bgcolor="#DDDDDD">
			<tr>
				<td>
					<small>
						<nobr>
						<a href="intro">About</a><br>
						<a href="http://www.makelinux.net/ldd3/chp-1-sect-2.shtml">Splitting the Kernel</a><br>
		 <br>
	      <iframe src="https://www.facebook.com/plugins/likebox.php?href=http%3A%2F%2Fwww.facebook.com%2Fpages%2FInteractive-Linux-Kernel-Map%2F115958886534&amp;width=100&amp;colorscheme=light&amp;show_faces=true&amp;border_color&amp;stream=false&amp;header=false&amp;height=100" scrolling="no" frameborder="0" style="border:none; overflow:hidden; width:200px; height:100px;" allowTransparency="true"></iframe>

	      <br>
	      <a href="referers">referers</a><br>
	      <a href="http://makelinux.wordpress.com/2010/12/20/comments-on-interactive-linux-kernel-map/"><img border="0" height="16" width="16" src="/common/pencil.png"> comments<br></a>
	      <a target="_top" href="http://www.makelinux.net/resources">more ...</a><br>
						</nobr>
					</small>
				</td>
			</tr>
		</table>
	<table cellspacing="5" border="0" id="dashboard" bgcolor="#DDDDDD" style='display:;position:absolute;top:0;right:0'>
		<tr>
			<td>
				<nobr>
				<center>
					Navigation
					<p/>
					{% include panzoom.html %}
				</center>
				<span class="small">
					Mouse: <br>
					Drag - pan <br>
					Wheel - zoom, <br>
					Items - links <br>
					<br>
					Keyboard: <br> PgDn, PgUp
					- zoom <br> arrows - pan <br>
				</span>
				</nobr>
				<br>
				<hr>
				<a target="svg" href="https://github.com/makelinux/linux_kernel_map/blob/main/LKM.svg">SVG</a><br>
				<a target="redbubble" href="https://www.redbubble.com/i/poster/Linux-kernel-map-by-Costa-Shul/31893024.LVTDI">Poster</a><br>
				<a target="redbubble" href="https://www.redbubble.com/people/costa-shul/works/31893024-linux-kernel-map?p=tapestry">Tapestry</a><br>
			</td>
		</tr>
	</table>
<!-- (c) Constantine Shulyupin -->
