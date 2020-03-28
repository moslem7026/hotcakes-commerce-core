<%@ Page Language="C#" MasterPageFile="../AdminNav.master" AutoEventWireup="True" Inherits="Hotcakes.Modules.Core.Admin.Catalog.Products_Edit_Inventory" Title="Untitled Page" CodeBehind="Products_Edit_Inventory.aspx.cs" %>

<%@ Register Src="../Controls/MessageBox.ascx" TagName="MessageBox" TagPrefix="hcc" %>
<%@ Register Src="../Controls/ProductEditMenu.ascx" TagName="ProductEditMenu" TagPrefix="hcc" %>
<%@ Register Src="../Controls/ProductEditingDisplay.ascx" TagName="ProductEditing" TagPrefix="hcc" %>

<asp:Content ID="nav" ContentPlaceHolderID="NavContent" runat="server">
    <hcc:ProductEditMenu ID="ProductNavigator" runat="server" SelectedMenuItem="Inventory" />
    <hcc:ProductEditing ID="ProductEditing1" runat="server" />
</asp:Content>

<asp:Content ID="Content1" ContentPlaceHolderID="MainContent" runat="Server">
    <h1>موجودی انبار</h1>
    <hcc:MessageBox ID="ucMessageBox" runat="server" />
    <div class="hcForm">
        <div class="hcFormItem">
            <asp:Label runat="server" CssClass="hcLabel">حالت موجودی</asp:Label>
            <asp:DropDownList ID="OutOfStockModeField" runat="server">
                <asp:ListItem Text="همیشه در انبار (نادیده گرفتن موجودی انبار)" Value="100" />
                <asp:ListItem Text="هنگام ناموجود شدن در انبار، از فروشگاه حذف شود" Value="101" />
                <asp:ListItem Text="هنگام ناموجود شدن در انبار، نمایش‌داده شود اما قابل خرید نباشد" Value="102" />
                <asp:ListItem Text="هنگام ناموجود شدن در انبار، بتوان با تلفن سفارش داد" Value="103" />
             </asp:DropDownList>
        </div>
    </div>
    <asp:GridView ID="EditsGridView" runat="server" DataKeyNames="bvin"
        GridLines="None" AutoGenerateColumns="False"
        OnRowDataBound="EditsGridView_RowDataBound" CssClass="hcGrid">
        <Columns>
            <asp:TemplateField HeaderText="کد محصول">
                <ItemTemplate>
                    <asp:Label CssClass="smalltext" ID="lblSKU" runat="server" />
                </ItemTemplate>
            </asp:TemplateField>
            <asp:TemplateField HeaderText="در دست">
                <ItemTemplate>
                    <asp:Label ID="lblQuantityOnHand" runat="server" Text="0" />
                </ItemTemplate>
                <ItemStyle HorizontalAlign="Center" />
            </asp:TemplateField>
            <asp:TemplateField HeaderText="رزرو شده">
                <ItemTemplate>
                    <asp:Label ID="lblQuantityReserved" runat="server" Text="0" />
                </ItemTemplate>
                <ItemStyle HorizontalAlign="Center" />
            </asp:TemplateField>
            <asp:TemplateField HeaderText="موجود برای فروش">
                <ItemTemplate>
                    <asp:Label ID="lblQuantityAvailableForSale" runat="server" Text="0" />
                </ItemTemplate>
                <ItemStyle HorizontalAlign="Center" />
            </asp:TemplateField>
            <asp:TemplateField HeaderText="اتمام موجودی در">
                <ItemTemplate>
                    <asp:TextBox ID="OutOfStockPointField" runat="server" Columns="5" Text="0" />
                </ItemTemplate>
            </asp:TemplateField>
            <asp:TemplateField HeaderText="موجودی کم در">
                <ItemTemplate>
                    <asp:TextBox ID="LowPointField" runat="server" Columns="5" Text="0" />
                </ItemTemplate>
            </asp:TemplateField>
            <asp:TemplateField HeaderText="حالت ورودی">
                <ItemTemplate>
                    <asp:DropDownList ID="AdjustmentModeField" runat="Server">
                        <asp:ListItem Value="1" Text="افزودن" />
                        <asp:ListItem Value="2" Text="کسر کردن" />
                        <asp:ListItem Value="3" Text="دقیقا" />
                    </asp:DropDownList>
                </ItemTemplate>
            </asp:TemplateField>
            <asp:TemplateField HeaderText="تعداد">
                <ItemTemplate>
                    <asp:TextBox ID="AdjustmentField" runat="server" Columns="5" Text="0" />
                </ItemTemplate>
            </asp:TemplateField>
        </Columns>
    </asp:GridView>
    <ul class="hcActions">
        <li>
            <asp:LinkButton ID="btnSaveChanges" Text="ذخیره تغییرات" CssClass="hcPrimaryAction" runat="server" OnClick="btnSaveChanges_Click" />
        </li>
        <li>
            <asp:LinkButton ID="btnCancel" Text="انصراف" CssClass="hcSecondaryAction" runat="server" CausesValidation="False" OnClick="btnCancel_Click" />
        </li>
    </ul>
</asp:Content>

