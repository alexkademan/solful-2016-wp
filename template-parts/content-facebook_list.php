<?php
/**
 * Template part for displaying facebook pages.
 *
 * @link https://codex.wordpress.org/Template_Hierarchy
 *
 * @package _s
 */

?>
<ul id="fb_feed" class="fb_feed">
	<li class="loading">
	  <i class="fa fa-refresh fa-spin fa-2x"></i>
	</li>
	<script type="text/template" id="fb_template">
	  <li class="fbPost <%- 'id-' + id %>">
			<!-- <header><%- order  %> - </header> -->
	    <% if(type === 'photo'){ %>
				<% if ( message ){ print('<span class="message">' + message + '</span>') } %>
				<% if ( wireframe ){ %><div class="wireframe_image">image</div><% } else { %>
				  <img src="<%- photo.source %>" style="max-width:<%- photo.width %>px">
				<% } %>
				<% if ( description ){ print('<span class="message">' + description + '</span>') } %>

	    <% } else if(type === 'video'){ %>
				<% if ( message ){ print('<span class="message">' + message + '</span>') } %>
				<% if ( wireframe ){ %><div class="wireframe_video">video</div><% } else { %>
				<span class="frame" style="max-width: <%- video.format.width + 'px;' %> max-height:<%- video.format.height + 'px' %>">
				  <img src="<%- video.format.picture %>" style="max-width:<%- video.format.width %>px">
				  <iframe src="<%- video.iframe_src %>"></iframe>
				</span>
				<% } %>
				<% if(link) { print('<a href="' + link + '" class="title">' + name + '</a>' )} %>
				<% if ( description ){ print('<span class="message">' + description + '</span>') } %>

	    <% } else if(type === 'link'){ %>
				<% if ( message ){ print('<span class="message">' + message + '</span>') }; %>
				<% if ( link ){ %>
				  <% print('<a href="' + link + '" class="link"><span class="link">' + name + '</span>'); %>
				  <% if ( caption ){ print('<span class="caption">' + caption + '</span>') } %>
				  <% print('</a>'); %>
				<% } %>

	    <% } else if(type === 'status'){ %>
	      <%- message ? message : '' %>

	    <% } else if(type === 'offer'){ %>
				<% if ( message ){ print('<span class="message">' + message + '</span>') }; %>
				<% if ( link ){ %>
				  <% print('<a href="' + link + '" class="link"><span class="link">' + name + '</span>'); %>
				  <% if ( description ){ print('<span class="caption">' + description + '</span>') } %>
				  <% print('</a>'); %>
				<% } %>

	    <% } else { %>
	      <%- id + ' - ' + type %>
	    <% } %>
			<footer>
			<%
			if(type !== 'status'){
			  print('<a href="' + link + '">View on Facebook</a>');
			}
			%>
			</footer>
	  </li>
	</script>
	<script type="text/template" id="fb_template_avatar">
	  <img src="<%- imgURL %>">
	</script>
</ul>
