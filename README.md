<p>By Default, all view files will be in a folder called views</p>

<h3>ejs syntax</h3>
<code><%= %>, <p>run some code in the server, and render on page</p></code>
<code><% %>, <p>run some code in server</p></code>

<code>hi <%= locals.msg || 'default' %>
  <p>locals is the object's name we pass to the rendered file. If msg is not there, show 'defaut'</p>
</code>