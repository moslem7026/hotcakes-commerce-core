<%@ Control language="vb" AutoEventWireup="false" Explicit="True" Inherits="DotNetNuke.UI.Skins.Skin" %>
<%@ Register TagPrefix="dnn" Namespace="DotNetNuke.Web.Client.ClientResourceManagement" Assembly="DotNetNuke.Web.Client" %>
<%@ Register TagPrefix="dnn" TagName="LOGO" Src="~/Admin/Skins/Logo.ascx" %>
<%@ Register TagPrefix="dnn" TagName="SEARCH" Src="~/Admin/Skins/Search.ascx" %>
<%@ Register TagPrefix="dnn" TagName="BREADCRUMB" Src="~/Admin/Skins/BreadCrumb.ascx" %>
<%@ Register TagPrefix="dnn" TagName="LOGIN" Src="~/Admin/Skins/Login.ascx" %>
<%@ Register TagPrefix="dnn" TagName="USER" Src="~/Admin/Skins/User.ascx" %>
<%@ Register TagPrefix="dnn" TagName="COPYRIGHT" Src="~/Admin/Skins/Copyright.ascx" %>
<%@ Register TagPrefix="dnn" TagName="PRIVACY" Src="~/Admin/Skins/Privacy.ascx" %>
<%@ Register TagPrefix="dnn" TagName="TERMS" Src="~/Admin/Skins/Terms.ascx" %>
<%@ Register TagPrefix="dnn" TagName="LANGUAGE" Src="~/Admin/Skins/language.ascx" %>
<%@ Register TagPrefix="dnn" TagName="LINKS" src="~/Admin/Skins/Links.ascx" %>
<%@ Register TagPrefix="dnn" TagName="CURRENTDATE" Src="~/Admin/Skins/CurrentDate.ascx" %>
<%@ Register TagPrefix="dnn" TagName="STYLES" Src="~/Admin/Skins/Styles.ascx" %>
<%@ Register TagPrefix="dnn" Namespace="DotNetNuke.Web.DDRMenu.TemplateEngine" Assembly="DotNetNuke.Web.DDRMenu" %>
<%@ Register TagPrefix="dnn" TagName="MENU" src="~/DesktopModules/DDRMenu/Menu.ascx" %>
<%@ Register TagPrefix="dnn" TagName="CONTROLPANEL" Src="~/Admin/Skins/controlpanel.ascx" %>
<%@ Register TagPrefix="dnn" TagName="Treeview" Src="~/Admin/Skins/LeftMenu.ascx" %>

<div class="wrapper">
  <!-- Header -->
  <header class="header">
		<div class="TopBar">
		  <div class="SkinWidth">
			<div class="row">
			  <div class="col-sm-6">
				<div class="CurrentDate left"><em class="fa fa-clock-o"></em><dnn:CURRENTDATE runat="server" id="dnnCURRENTDATE" cssclass="datecss" /></div>
				<div class="HeaderPane1" id="HeaderPane1" runat="server" visible="false"></div>
			  </div>
			  <div class="col-sm-6">
				<div class="login-style">
				  <em class="fa fa-user"></em><dnn:USER runat="server" id="dnnUSER" CssClass="login" />&nbsp;&nbsp;<em class="fa fa fa-lock"></em><dnn:LOGIN runat="server" id="dnnLOGIN" CssClass="login" />&nbsp;&nbsp;<dnn:LANGUAGE runat="server" id="dnnLANGUAGE"  showMenu="False" showLinks="True" />
				</div>
			  </div>
			</div>
		  </div>
		</div>
        <div class="header-main">
            <div class="SkinWidth">        
              <a title="Menu" href="#" class="BackgroundColor menu_box fl"><em class="fa fa-bars"></em></a>
			  <div class="dnn-logo"><dnn:LOGO runat="server" id="dnnLOGO" BorderWidth="0" /></div>
              <div class="HeaderPane2" id="HeaderPane2" runat="server" visible="false"></div>
          </div>
          </div>
  </header>
  <!-- Navbar -->
  <div class="StickyNav">
    <div class="SkinWidth2">
      <nav class="clearfix NavBar BackgroundColor">
		  <dnn:MENU MenuStyle="DNNStandard" runat="server"></dnn:MENU>
		  <div class="skin-search">
			  <div class="search_bg" id="Keywords"><dnn:SEARCH runat="server" id="dnnSEARCH" CssClass="search icon-search-2" ShowSite="False" ShowWeb="False" /></div>
	      </div>
	  </nav>
    </div>
  </div>
  <!-- MobileMenu -->
  <div class="MobileMenu">
	<dnn:MENU MenuStyle="TreeView" runat="server"></dnn:MENU>
  </div>
  <!-- BannerPane -->
  <div class="BannerPane" id="BannerPane" runat="server" visible="false"></div>
 <!-- Breadcrumb -->
  <div class="breadcrumb-header">
    <div class="SkinWidth">
      <h1 class="page-name"><span><%=PortalSettings.ActiveTab.TabName %></span><em class="title-line DefaultBackground"></em></h1>
	  <div class="skin-breadcrumb"><a href="<%=DotNetNuke.Common.Globals.NavigateURL(PortalSettings.HomeTabId) %>"><em class="fa fa-home"></em></a>&nbsp;&nbsp;<dnn:BREADCRUMB runat="server" id="dnnBREADCRUMB" Separator="&nbsp;&nbsp;/&nbsp;&nbsp;" CssClass="breadcrumb-css DefaultHoverColor" RootLevel="0" />
	    <div class="clear"></div>
      </div>
    </div>
  </div>
  <!-- Main content-->
  <div class="mycontent">
    <div class="SkinWidth">
      <div class="LeftBar w26 left">
        <div class="LeftMenu">
          <dnn:MENU MenuStyle="TreeView" runat="server" NodeSelector="RootChildren" id="LeftMenu"></dnn:MENU>
        </div>
	    <div class="LeftSidePane" id="LeftSidePane" runat="server" visible="false"></div>
      </div>
	  <div class="RightBar w71 right">
        <div class="row">
            <div class="col-sm-12 TopGrid12" id="TopGrid12" runat="server" visible="false"></div>
         </div>
	    <div class="row">
	      <div class="col-sm-6 TopGrid6A" id="TopGrid6A" runat="server" visible="false"></div>
		  <div class="col-sm-6 TopGrid6B" id="TopGrid6B" runat="server" visible="false"></div>
        </div>
        <div class="row">
          <div class="col-sm-4 TopGrid4A" id="TopGrid4A" runat="server" visible="false"></div>
		  <div class="col-sm-4 TopGrid4B" id="TopGrid4B" runat="server" visible="false"></div>
		  <div class="col-sm-4 TopGrid4C" id="TopGrid4C" runat="server" visible="false"></div>
        </div>
	    <div class="row">
	      <div class="col-sm-3 TopGrid3A" id="TopGrid3A" runat="server" visible="false"></div>
		  <div class="col-sm-3 TopGrid3B" id="TopGrid3B" runat="server" visible="false"></div>
		  <div class="col-sm-3 TopGrid3C" id="TopGrid3C" runat="server" visible="false"></div>
		  <div class="col-sm-3 TopGrid3D" id="TopGrid3D" runat="server" visible="false"></div>
        </div>
	    <div class="row">
	      <div class="col-sm-8 TopGrid8Left" id="TopGrid8Left" runat="server" visible="false"></div>
		  <div class="col-sm-4 TopGrid4Right" id="TopGrid4Right" runat="server" visible="false"></div>
        </div>
	    <div class="row">
	      <div class="col-sm-4 TopGrid4Left" id="TopGrid4Left" runat="server" visible="false"></div>
		  <div class="col-sm-8 TopGrid8Right" id="TopGrid8Right" runat="server" visible="false"></div>
        </div>
	    <div class="row">
	      <div class="col-sm-9 TopGrid9Left" id="TopGrid9Left" runat="server" visible="false"></div>
		  <div class="col-sm-3 TopGrid3Right" id="TopGrid3Right" runat="server" visible="false"></div>
        </div>
	    <div class="row">
	      <div class="col-sm-3 TopGrid3Left" id="TopGrid3Left" runat="server" visible="false"></div>
		  <div class="col-sm-9 TopGrid9Right" id="TopGrid9Right" runat="server" visible="false"></div>
        </div>
        <div class="row">
          <div class="ContentPane col-sm-12" id="ContentPane" runat="server" visible="false"></div>
        </div>
      </div>
    </div>
  </div>
  <section class="BackgroundColor FooterColorArea">
	  <div class="SkinWidth">
	    <div class="row">
	      <div class="col-sm-12 FooterColorPane" id="FooterColorPane" runat="server" visible="false"></div>
        </div>
      </div>
  </section>
  <!-- footer-->
  <div class="skin-footer">
    <div class="footer-main">
      <div class="SkinWidth">
        <div class="row">
          <div class="col-sm-3 FooterPane1" id="FooterPane1" runat="server" visible="false"></div>
		  <div class="col-sm-3 FooterPane2" id="FooterPane2" runat="server" visible="false"></div>
		  <div class="col-sm-3 FooterPane3" id="FooterPane3" runat="server" visible="false"></div>
		  <div class="col-sm-3 FooterPane4" id="FooterPane4" runat="server" visible="false"></div>
        </div>
      </div>
    </div>
    <footer class="footer-bar">
      <div class="SkinWidth">
        <div class="row">
          <div class="col-sm-6 copyright left"><dnn:COPYRIGHT runat="server" id="dnnCOPYRIGHT" CssClass="copyright" />&nbsp; | &nbsp;<dnn:TERMS ID="dnnTerms" runat="server" CssClass="TermsCss" />&nbsp; |&nbsp; <dnn:PRIVACY ID="dnnPrivacy" runat="server" CssClass="TermsCss" /></div>
		  <div class="col-sm-6 FooterPane right" id="FooterPane" runat="server" visible="false"></div>
        </div>
      </div>
    </footer>
  </div>
  <div id="goup" style="display: inline;" class="goup"></div>
</div>

<%-- JS includes --%>
<!--#include file="Common/AddFiles.ascx"-->


