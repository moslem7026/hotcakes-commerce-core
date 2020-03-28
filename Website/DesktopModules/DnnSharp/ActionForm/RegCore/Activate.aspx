<%@ Page Language="C#" AutoEventWireup="true" Inherits="avt.ActionForm.RegCore.Activate" CodeBehind="Activate.aspx.cs" %>
<%@ Import Namespace="avt.ActionForm.Core" %>

<!DOCTYPE html>

<html xmlns="http://www.w3.org/1999/xhtml" data-ng-app="Activate">
<head runat="server">

    <!-- the placeholder allows for both, the use of < %= and for head scripts to be injected through header controls -->
    <asp:PlaceHolder runat="server">
        <title>Activate <%# avt.ActionForm.Core.App.Info.Name %></title>
    </asp:PlaceHolder>

</head>
<body class="bstrap30">
    <form class="form-horizontal" role="form" runat="server">
        <asp:PlaceHolder ID="BodySCRIPTS" runat="server" />
        <div class="container" data-ng-controller="ActivateCtl" data-ng-init="
                app = <%# HttpUtility.HtmlEncode(GetAppJson()) %>;
                returnUrl = '<%# ReturnUrl %>';">

            <div data-ng-include="'<%# ResolveCommonInclude("/dnnsf/tpl/activate.html") %>'"></div>

        </div>
        <asp:placeholder runat="server" ID="ClientResourcesFormBottom" />
    </form>

    <%-- Scripts needed by DNN ServicesFramework --%>
    <script type="text/javascript" src="<%= Page.ResolveUrl("~/js/MicrosoftAjax.js") %>?<%= App.Info.Build %>"></script>
    <script type="text/javascript" src="<%= Page.ResolveUrl("~/js/dnn.js") %>?<%= App.Info.Build %>"></script>
    <script type="text/javascript" src="<%= Page.ResolveUrl("~/js/dnn.servicesframework.js") %>?<%= App.Info.Build %>"></script>
    <%-- END Scripts needed by DNN ServicesFramework --%>

    <script type="text/javascript" src="<%= ResolveCommonInclude("/angular15/angular.min.js")%>"></script>
    <script type="text/javascript" src="<%= ResolveCommonInclude("/bootstrap3/js/bootstrap.min.js")%>"></script>
    <script type="text/javascript" src="<%= ResolveCommonInclude("/dnnsf/dnnsf.js")%>"></script>
    <script type="text/javascript" src="<%= ResolveCommonInclude("/dnnsf/activate.js")%>"></script>

</body>
</html>
