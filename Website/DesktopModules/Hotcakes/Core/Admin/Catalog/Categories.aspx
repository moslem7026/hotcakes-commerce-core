<%@ Page Language="C#" MasterPageFile="../AdminNav.master" AutoEventWireup="True" Inherits="Hotcakes.Modules.Core.Admin.Catalog.Categories" Title="Categories" CodeBehind="Categories.aspx.cs" %>

<%@ Register Assembly="Telerik.Web.UI" Namespace="Telerik.Web.UI" TagPrefix="telerik" %>
<%@ Register Src="../Controls/MessageBox.ascx" TagName="MessageBox" TagPrefix="hcc" %>
<%@ Register Src="../Controls/NavMenu.ascx" TagName="NavMenu" TagPrefix="hcc" %>

<asp:Content ID="Content2" ContentPlaceHolderID="NavContent" runat="server">
	<hcc:NavMenu runat="server" ID="NavMenu" />

	<div class="hcBlock hcBlockLight hcPaddingBottom">
		<div class="hcForm">
			<div class="hcFormItem">
				<label class="hcLabel">+ دسته بندی جدید</label>
				<telerik:RadComboBox runat="server" ID="lstType">
					<Items>
						<telerik:RadComboBoxItem Value="0" Text="ایجاد یک صفحه ویژه" />
						<telerik:RadComboBoxItem Value="2" Text="یک لینک سفارشی" />
					</Items>
				</telerik:RadComboBox>
			</div>
		</div>
	</div>

	<div class="hcBlock hcBlockLight hcPaddingBottom">
		<div class="hcForm">
			<div class="hcFormItem">
				<telerik:RadComboBox runat="server" ID="lstParents"></telerik:RadComboBox>
			</div>
		</div>
	</div>

	<div class="hcBlock">
		<div class="hcForm">
			<div class="hcFormItem">
				<asp:LinkButton ID="btnNew" AlternateText="Add New Category" Text="ایجاد یگ دسته بندی جدید" runat="server" resourcekey="btnNew" CssClass="hcTertiaryAction" EnableViewState="False" OnClick="btnNew_Click" />
			</div>
		</div>
	</div>
</asp:Content>
<asp:Content ID="Content1" ContentPlaceHolderID="MainContent" runat="Server">
	<script src="Categories.js" type="text/javascript"></script>
	<h1>صفحات / دسته بندی ها</h1>
	<asp:Literal ID="litMain" runat="server" EnableViewState="false"></asp:Literal>
</asp:Content>
