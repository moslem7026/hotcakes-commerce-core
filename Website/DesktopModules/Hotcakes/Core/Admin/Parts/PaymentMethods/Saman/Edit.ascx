<%@ Control Language="C#" AutoEventWireup="true" CodeBehind="Edit.ascx.cs" Inherits="Hotcakes.Shetab.Saman.Edit" %>
<h1>تنظیمات درگاه پرداخت بانک سامان</h1>
<div class="hcForm">
    <div class="hcFormItemHor">
        <asp:Label ID="lblMerchantId" runat="server" Text="کد فروشنده:" CssClass="hcLabel" />
        <asp:TextBox ID="txtMerchantId" runat="server" />
    </div>
    <div class="hcFormItemHor">
        <asp:Label ID="lblCurrency" runat="server" Text="واحد پولی فروشگاه" CssClass="hcLabel" />
        <asp:DropDownList ID="ddlCurrency" runat="server" >
            <asp:ListItem Value="t" Text="تومان" Selected="True"></asp:ListItem>
            <asp:ListItem Value="r" Text="ریال"></asp:ListItem>
        </asp:DropDownList>
    </div>
    <div class="hcFormItemHor">
        <asp:Label ID="lbCallbackUrl" runat="server" Text="Callback URL" CssClass="hcLabel" />
        <asp:Label runat="server" ID="lblCallbackUrl" CssClass="hcFormItemValue" />
    </div>
</div>
