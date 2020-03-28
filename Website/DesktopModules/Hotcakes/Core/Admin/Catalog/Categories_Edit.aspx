<%@ Page ValidateRequest="false" Language="C#" MasterPageFile="../AdminNav.master" AutoEventWireup="True" Inherits="Hotcakes.Modules.Core.Admin.Catalog.Categories_Edit"
    Title="Edit Category" CodeBehind="Categories_Edit.aspx.cs" %>

<%@ Register Src="../Controls/NavMenu.ascx" TagName="NavMenu" TagPrefix="hcc" %>
<%@ Register Src="../Controls/MessageBox.ascx" TagName="MessageBox" TagPrefix="hcc" %>
<%@ Register Src="../Controls/CategoryBreadCrumbTrail.ascx" TagName="CategoryBreadCrumbTrail" TagPrefix="hcc" %>
<%@ Register Src="../Controls/HtmlEditor.ascx" TagName="HtmlEditor" TagPrefix="hcc" %>
<%@ Register Src="../Controls/UrlsAssociated.ascx" TagName="UrlsAssociated" TagPrefix="hcc" %>
<%@ Register Src="../Controls/ImageUploader.ascx" TagName="ImageUploader" TagPrefix="hcc" %>

<asp:Content ID="nav" ContentPlaceHolderID="NavContent" runat="server">
    <hcc:navmenu id="ucNavMenu" level="2" baseurl="catalog/category" runat="server" />
    <div class="hcBlock">
        <div class="hcForm">
            <div class="hcFormItem">
                <asp:hyperlink id="hypClose" runat="server" resourcekey="Close" cssclass="hcTertiaryAction" navigateurl="Categories.aspx" />
            </div>
        </div>
    </div>
    <div class="hcBlock hcBlockNotTopPadding">
        <div class="hcForm">
            <div class="hcFormItem">
                <asp:hyperlink id="lnkViewInStore" runat="server" cssclass="hcTertiaryAction" resourcekey="ViewinStore"  target="_blank"></asp:hyperlink>
            </div>
        </div>
    </div>
</asp:Content>

<asp:Content ID="main" ContentPlaceHolderID="MainContent" runat="Server">
    <script type="text/javascript">
        jQuery(function ($) {
            $("#NameField").change(function () {

                var rawName = $(this).val();
                var $urlField = $("#RewriteUrlField");

                if ($urlField.val() == "") {
                    $.post('CatalogHandler.ashx',
                        {
                            "method": "Slugify",
                            "name": rawName
                        },
                        function (data) {
                            console.log(data);
                            $urlField.val(data);
                        });
                }
            });
        });
    </script>
    <h1><%=PageTitle %></h1>
    <hcc:messagebox id="ucMessageBox" runat="server" />
    <hcc:categorybreadcrumbtrail id="CategoryBreadCrumbTrail1" runat="server" />

    <div class="hcColumnLeft" style="width: 50%">
        <div class="hcForm">
            <h2>اصلی</h2>
            <div class="hcFormItem">
                <label class="hcLabel">نام<i class="hcLocalizable"></i></label>
                <asp:textbox id="NameField" runat="server" clientidmode="Static" />
                <asp:requiredfieldvalidator id="valName" runat="server" cssclass="hcFormError" display="Dynamic"
                    errormessage="لطفا نام را وارد نمایی" controltovalidate="NameField" />
            </div>
            <div class="hcFormItem">
                <label class="hcLabel">توضیحات<i class="hcLocalizable"></i></label>
                <hcc:htmleditor id="DescriptionField" runat="server" editorheight="175" editorwidth="630"
                    editorwrap="true" tabindex="2001" />
            </div>
            <div class="hcFormItem">
                <label class="hcLabel">عنوان صفحه<i class="hcLocalizable"></i></label>
                <asp:textbox id="MetaTitleField" runat="server" columns="30" maxlength="512" />
            </div>
            <div class="hcFormItem">
                <label class="hcLabel">توضیحات متا<i class="hcLocalizable"></i></label>
                <asp:textbox id="MetaDescriptionField" runat="server" maxlength="255" width="630px" height="75px" textmode="MultiLine" />
            </div>
            <div class="hcFormItem">
                <label class="hcLabel">کلید واژه های متا<i class="hcLocalizable"></i></label>
                <asp:textbox id="MetaKeywordsField" runat="server" columns="30" maxlength="255" tabindex="2004"
                    width="630px"></asp:textbox>
            </div>
            <div class="hcFormItem">
                <label class="hcLabel">کلیدواژه های جستجو<i class="hcLocalizable"></i></label>
                <asp:textbox id="keywords" runat="server" columns="30" maxlength="512" tabindex="2005"
                    width="630px"></asp:textbox>
            </div>
            <div class="hcFormItem" runat="server" id="TaxonomyBlock">
                <label class="hcLabel">Taxonomy Tags</label>
                <asp:textbox id="txtTaxonomyTags" runat="server" textmode="multiLine" columns="40" rows="3" width="630px" tabindex="3400"></asp:textbox>
            </div>
        </div>
    </div>
    <div class="hcColumnRight hcLeftBorder" style="width: 49%">
        <div class="hcForm">
            <h2>نمایش</h2>
            <div class="hcFormItem hcFormItem50p">
                <asp:checkbox id="chkHidden" runat="server" text="مخفی کردن دسته بندی" tabindex="2009" />
            </div>
            <div class="hcFormItem hcFormItem50p">
                <asp:checkbox id="chkShowTitle" runat="server" text="نام دسته بندی آشکار می باشد" checked="True" tabindex="2011" />
            </div>
            <div class="hcFormItem">
                <label class="hcLabel">قالب</label>
                <asp:dropdownlist id="TemplateList" runat="server" autopostback="False" tabindex="2011" />
            </div>
            <div class="hcFormItem">
                <label class="hcLabel">آیکون</label>
                <hcc:imageuploader runat="server" showremoveaction="true" id="ucIconImage" />
            </div>
            <div class="hcFormItem">
                <label class="hcLabel">بنر</label>
                <hcc:imageuploader runat="server" showremoveaction="true" id="ucBannerImage" />
            </div>

        </div>
    </div>
    <div class="hcForm hcClear">
        <h2>پیشرفته</h2>
        <div class="hcFormItem hcFormItemLeft">
            <label class="hcLabel">نام صفحه /</label>
            <asp:textbox id="RewriteUrlField" clientidmode="Static" runat="server" />
            <br />
            <hcc:urlsassociated id="UrlsAssociated1" runat="server" />
        </div>
        <div class="hcFormItem hcFormItemRight">
            <label class="hcLabel">Header Content Column</label>
            <asp:dropdownlist id="PreContentColumnIdField" runat="server">
                <asp:ListItem Value=""> - هیچ -</asp:ListItem>
            </asp:dropdownlist>
        </div>
        <div class="hcFormItem hcFormItemLeft">
            <label class="hcLabel">دسته بندی مادر</label>
            <asp:dropdownlist runat="server" id="ParentCategoryDropDownList" />
        </div>
        <div class="hcFormItem hcFormItemRight">
            <label class="hcLabel">Footer Content Column</label>
            <asp:dropdownlist id="PostContentColumnIdField" runat="server">
                <asp:ListItem Value=""> - هیچ -</asp:ListItem>
            </asp:dropdownlist>
        </div>
        <div class="hcFormItem hcFormItemLeft">
            <label class="hcLabel">مرتب سازی</label>
            <asp:dropdownlist id="SortOrderDropDownList" runat="server">
                <asp:ListItem Value="1">دستی</asp:ListItem>
                <asp:ListItem Value="2">نام محصول (a-z)</asp:ListItem>
                <asp:ListItem Value="6">نام محصول (z-a)</asp:ListItem>
                <asp:ListItem Value="3">قیمت محصول (صعودی)</asp:ListItem>
                <asp:ListItem Value="4">قیمت محصول (نزولی)</asp:ListItem>
                <asp:ListItem Value="7">Product SKU (a-z)</asp:ListItem>
                <asp:ListItem Value="8">Product SKU (z-a)</asp:ListItem>
            </asp:dropdownlist>
        </div>
    </div>

    <ul class="hcActions">
        <li>
            <asp:linkbutton id="UpdateButton" runat="server" text="ذخیره" cssclass="hcPrimaryAction" onclick="UpdateButton_Click" />
        </li>
        <li>
            <asp:linkbutton id="btnSaveChanges" runat="server" text="ذخیره و بستن" cssclass="hcSecondaryAction" onclick="btnSaveChanges_Click" />
        </li>
        <li>
            <asp:linkbutton id="btnCancel" runat="server" text="انصراف" cssclass="hcSecondaryAction" causesvalidation="False"
                onclick="btnCancel_Click" />
        </li>
    </ul>
</asp:Content>
