<%@ Control AutoEventWireup="false" Explicit="True" Inherits="DotNetNuke.UI.Containers.Container" %>
<%@ Register TagPrefix="dnn" TagName="TITLE" Src="~/Admin/Containers/Title.ascx" %>
<div class="Container015">
  <div class="DefaultColor dnntitle">
    <div class="box">
      <span class="title-line"></span>
    </div>
  	<div class="icon"><dnn:TITLE runat="server" id="dnnTITLE1" CSSClass="title" /></div>
    <div class="box">
      <span class="title-line"></span>
    </div>
  </div>
	<div class="contentmain"> 
		<div class="contentpane" id="ContentPane" runat="server"></div>
	</div>
	<div class="c_footer">
		</div>
</div>





































