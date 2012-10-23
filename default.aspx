   <%@ Page Language="C#" Debug="true" %>
<% 
string page = null;
string showRegion = "";
string showCategory = ""; 
page = Request.QueryString["page"];
showRegion = Request.QueryString["showRegion"];
showCategory = Request.QueryString["showCategory"];

Response.WriteFile ("head.aspx"); 
if (string.IsNullOrEmpty(page)) {
	Response.Write ("<title>The Met Around the World | The Metropolitan Museum of Art</title>");
} else {
	Response.Write ("<title>");
	Response.WriteFile ("html/" + page + "_title.html");
	Response.Write ("</title>");		
}
Response.WriteFile ("header.aspx"); 

if (string.IsNullOrEmpty(page)) { %>
<!-- INSERTED FROM DB -->

<% Response.WriteFile ("data.aspx"); %>

<!-- END INSERTED FROM DB -->
<%
} else {
		Response.Write ("<div id='back'><img src='art/popup-arrow-left.png' /><div id='backButtonLink'><a href='?showRegion=" + showRegion + "&showCategory=" + showCategory + "'> back</a></div></div>");
		Response.WriteFile ("html/" + page + ".html");
		Response.Write ("<script type='text/javascript'>$('#mapHolder').hide();</script>");
		Response.Write ("<script type='text/javascript'>$('#aboutMatw').hide();</script>");

%>

<% }%>						
<%	Response.WriteFile ("footer.aspx"); %>

<%
if (string.IsNullOrEmpty(page)) {
} else {
		Response.Write ("<script type='text/javascript'>$('.mainContentHolder').css({ height: '100%' });</script>");

}

%>