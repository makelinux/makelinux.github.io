<head>
<title>Linux kernel diagram</title>
</head>
Linux kernel diagram demonstrates usage of [Graphviz](https://graphviz.org/) for matrix representation and software architecture design.
[graphviz source](https://github.com/makelinux/linux_kernel_map/blob/main/Linux_kernel_diagram.dot)
The diagram is zoomable and pannable with mouse. Some nodes are links to documentation.
<meta name="keywords" content="Linux kernel, kernel, linux internals, linux structure, drivers, modules, linux kernel API, poster, diagram, architecture, functions, layers, linux kernel big picture, source, reference, network, networking, storage, system, sheduler, memory, file, call stack, linux OSI, system call, SCI, VFS, NFS, socket, printk, Linux Anatomy">

<style> #diagram { height:100%; width:100%; } </style>
{% include_relative Linux_kernel_diagram.svg %}
<script type="text/javascript" >
elem = document.getElementById('diagram')
</script>
{% include panzoom.html %}
