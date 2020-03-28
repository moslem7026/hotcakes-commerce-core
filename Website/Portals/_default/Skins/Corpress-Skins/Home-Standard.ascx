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


<div class="wrapper Boxed">
  <div class="SkinBody">
  <!-- Header -->
  <div class="TopBar">
  	<div class="SkinWidth">
		  <div class="ContentBox">
			<div class="row">
			  <div class="col-sm-6">
			     <div class="TopHeaderBar" id="TopHeaderBar" runat="server" visible="false"></div>
			  </div>
			  <div class="col-sm-6">
				<div class="login-style">
				  <em class="fa fa-user"></em><dnn:USER runat="server" id="dnnUSER" CssClass="login" />&nbsp;&nbsp;<em class="fa fa fa-lock"></em><dnn:LOGIN runat="server" id="dnnLOGIN" CssClass="login" />&nbsp;&nbsp;<dnn:LANGUAGE runat="server" id="dnnLANGUAGE"  showMenu="False" showLinks="True" />
				  <div class="skin-search">
					  <a title="Search" class="icon-search fa fa-search"></a>
					  <div class="search_bg" id="Keywords"><dnn:SEARCH runat="server" id="dnnSEARCH" CssClass="search icon-search-2" ShowSite="False" ShowWeb="False" /></div>
					</div>
				  </div>
			  </div>
			</div>
		  </div>
	 </div>
  </div>
  <div class="SkinMain">      
	  <div class="SkinHeader">
		<div class="SkinWidth">
		  <div class="row">
			  <div class="dnn-logo"><dnn:LOGO runat="server" id="dnnLOGO" BorderWidth="0" /></div>
				  <div class="HeaderPane" id="HeaderPane" runat="server" visible="false"></div>
				  <a title="Menu" href="#" class="menu_box fl"><em class="fa fa-bars"></em></a>          </div>
			</div>
			</div>
	  <!-- Navbar -->
	  <div class="StickyNav">
		<div class="SkinWidth NavBar">
		  <div class="row">
			<nav class="NavMenu"><dnn:MENU MenuStyle="DNNStandard" runat="server"></dnn:MENU></nav>
	      </div>
			</div>
			</div>
	  <!-- MobileMenu -->
	  <div class="MobileMenu">
		<dnn:MENU MenuStyle="TreeView" runat="server"></dnn:MENU>
	  </div>
	  <!-- BannerPane -->
	  <div class="BannerPane" id="BannerPane" runat="server" visible="false"></div>
	</div>      
	<!-- Main content-->
	<div class="mycontent">
		<div class="SkinPadding">
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
		<div class="ParallaxBg">
		  <div class="ParallaxPane" id="ParallaxPane" runat="server" visible="false"></div>
		</div>
		<div class="GrayBg">
		  <div class="GrayPane" id="GrayPane" runat="server" visible="false"></div>
		</div>
		<div class="SkinPadding">
			<div class="row">
				<div class="col-sm-12 MiddleGrid12" id="MiddleGrid12" runat="server" visible="false"></div>
			</div>
		  <div class="row">
		    <div class="dnnpanes">
		      <div class="MiddleGrid6A col-sm-6" id="MiddleGrid6A" runat="server" visible="false"></div>
			  <div class="MiddleGrid6B col-sm-6" id="MiddleGrid6B" runat="server" visible="false"></div>
		    </div>
		    <div class="dnnpanes">
				<div class="MiddleGrid4Left col-sm-4" id="MiddleGrid4Left" runat="server" visible="false"></div>
				<div class="MiddleGrid4Center col-sm-4" id="MiddleGrid4Center" runat="server" visible="false"></div>
				<div class="MiddleGrid4Right col-sm-4" id="MiddleGrid4Right" runat="server" visible="false"></div>
		    </div>
		    <div class="dnnpanes">
				<div class="MiddleGrid3Left col-sm-3" id="MiddleGrid3Left" runat="server" visible="false"></div>
				<div class="MiddleGrid3CenterA col-sm-3" id="MiddleGrid3CenterA" runat="server" visible="false"></div>
				<div class="MiddleGrid3CenterB col-sm-3" id="MiddleGrid3CenterB" runat="server" visible="false"></div>
				<div class="MiddleGrid3Right col-sm-3" id="MiddleGrid3Right" runat="server" visible="false"></div>
		    </div>
		    <div class="dnnpanes">
				<div class="MiddleGrid8A col-sm-8" id="MiddleGrid8A" runat="server" visible="false"></div>
				<div class="MiddleGrid4B col-sm-4" id="MiddleGrid4B" runat="server" visible="false"></div>
		    </div>
		    <div class="dnnpanes">
				<div class="MiddleGrid4A col-sm-4" id="MiddleGrid4A" runat="server" visible="false"></div>
				<div class="MiddleGrid8B col-sm-8" id="MiddleGrid8B" runat="server" visible="false"></div>
		    </div>
		    <div class="dnnpanes">
				<div class="MiddleGrid9A col-sm-9" id="MiddleGrid9A" runat="server" visible="false"></div>
				<div class="MiddleGrid3B col-sm-3" id="MiddleGrid3B" runat="server" visible="false"></div>
		    </div>
		    <div class="dnnpanes">
				<div class="MiddleGrid3A col-sm-3" id="MiddleGrid3A" runat="server" visible="false"></div>
				<div class="MiddleGrid9B col-sm-9" id="MiddleGrid9B" runat="server" visible="false"></div>
		    </div>
	      </div>
	  </div>
		<div class="BackgroundColor FooterColorArea">
		    <div class="ColorContentPane" id="ColorContentPane" runat="server" visible="false"></div>
		</div>
		<div class="SkinPadding">
			<div class="row">
				<div class="BottomGrid12 col-sm-12" id="BottomGrid12" runat="server" visible="false"></div>
				<div class="dnnpanes">
				      <div class="BottomGrid6A col-sm-6" id="BottomGrid6A" runat="server" visible="false"></div>
					  <div class="BottomGrid6B col-sm-6" id="BottomGrid6B" runat="server" visible="false"></div>
				</div>
				<div class="dnnpanes">
				      <div class="BottomGrid4Left col-sm-4" id="BottomGrid4Left" runat="server" visible="false"></div>
					  <div class="BottomGrid4Center col-sm-4" id="BottomGrid4Center" runat="server" visible="false"></div>
					  <div class="BottomGrid4Right col-sm-4" id="BottomGrid4Right" runat="server" visible="false"></div>
				</div>
				<div class="dnnpanes">
				      <div class="BottomGrid3Left col-sm-3" id="BottomGrid3Left" runat="server" visible="false"></div>
					  <div class="BottomGrid3CenterA col-sm-3" id="BottomGrid3CenterA" runat="server" visible="false"></div>
					  <div class="BottomGrid3CenterB col-sm-3" id="BottomGrid3CenterB" runat="server" visible="false"></div>
					  <div class="BottomGrid3Right col-sm-3" id="BottomGrid3Right" runat="server" visible="false"></div>
				</div>
				<div class="dnnpanes">
				      <div class="BottomGrid8A col-sm-8" id="BottomGrid8A" runat="server" visible="false"></div>
					  <div class="BottomGrid4B col-sm-4" id="BottomGrid4B" runat="server" visible="false"></div>
				</div>
				<div class="dnnpanes">
				      <div class="BottomGrid4A col-sm-4" id="BottomGrid4A" runat="server" visible="false"></div>
					  <div class="BottomGrid8B col-sm-8" id="BottomGrid8B" runat="server" visible="false"></div>
				</div>
				<div class="dnnpanes">
				      <div class="BottomGrid9A col-sm-9" id="BottomGrid9A" runat="server" visible="false"></div>
					  <div class="BottomGrid3B col-sm-3" id="BottomGrid3B" runat="server" visible="false"></div>
				</div>
				<div class="dnnpanes">
				      <div class="BottomGrid3A col-sm-3" id="BottomGrid3A" runat="server" visible="false"></div>
					  <div class="BottomGrid9B col-sm-9" id="BottomGrid9B" runat="server" visible="false"></div>
				</div>
				<div class="BottomContent col-sm-12" id="BottomContent" runat="server" visible="false"></div>
	      </div>
	  </div>
	</div>
	<!-- footer-->
      <div class="skin-footer">
        <div class="footer-main">
          <div class="SkinWidth">
            <div class="ContentBox">
              <div class="row">
          <div class="col-sm-3 FooterPane1" id="FooterPane1" runat="server" visible="false"></div>
		  <div class="col-sm-3 FooterPane2" id="FooterPane2" runat="server" visible="false"></div>
		  <div class="col-sm-3 FooterPane3" id="FooterPane3" runat="server" visible="false"></div>
		  <div class="col-sm-3 FooterPane4" id="FooterPane4" runat="server" visible="false"></div>
        </div>
            </div>
          </div>
        </div>
        <footer class="footer-bar">
          <div class="SkinWidth">
            <div class="ContentBox">
              <div class="row">
                <div class="col-sm-6 copyright left"><dnn:COPYRIGHT runat="server" id="dnnCOPYRIGHT" CssClass="copyright" />&nbsp; | &nbsp;<dnn:TERMS ID="dnnTerms" runat="server" CssClass="TermsCss" />&nbsp; |&nbsp; <dnn:PRIVACY ID="dnnPrivacy" runat="server" CssClass="TermsCss" /></div>
		        <div class="col-sm-6 FooterPane right" id="FooterPane" runat="server" visible="false"></div>
              </div>
            </div>
          </div>
        </footer>
      </div>
      <div id="goup" style="display: inline;" class="goup"></div>
  </div>
</div>


<%-- JS includes --%>
<!--#include file="Common/AddFiles.ascx"-->

