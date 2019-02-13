<%@ include file="/init.jsp" %>

<div id="<portlet:namespace />-1"></div>

<hr />

<div id="<portlet:namespace />-2">
	<p>A to do list made with Vue.js components:</p>
	<ol>
		<todo-item
			v-bind:key="item.id"
			v-bind:todo="item"
			v-for="item in groceryList"
		/>
	</ol>
</div>

<div

<aui:script require="<%= mainRequire %>">
	main.default('<portlet:namespace />');
</aui:script>