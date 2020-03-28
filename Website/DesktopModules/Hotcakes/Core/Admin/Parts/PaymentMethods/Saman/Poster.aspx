<%@ Page Language="C#" AutoEventWireup="true" CodeBehind="Poster.aspx.cs" Inherits="Hotcakes.Shetab.Saman.Poster" %>

<html xmlns="http://www.w3.org/1999/xhtml">
<head id="Head1" runat="server">
    <title>BP PGW Poster</title>

    <script language="javascript" type="text/javascript">
        function postData(token, redirecturl) {
            var form = document.createElement("form");
            form.setAttribute("method", "POST");
            form.setAttribute("action", "https://sep.shaparak.ir/Payment.aspx");
            form.setAttribute("target", "_self");
            var hiddenField1 = document.createElement("input");
            hiddenField1.setAttribute("name", "Token");
            hiddenField1.setAttribute("value", token);
            form.appendChild(hiddenField1);
            var hiddenField2 = document.createElement("input");
            hiddenField2.setAttribute("name", "RedirectURL");
            hiddenField2.setAttribute("value", redirecturl);
            form.appendChild(hiddenField2);
            document.body.appendChild(form);
            form.submit();
            document.body.removeChild(form);
        }
    </script>

</head>
<body>
    <form id="form1" runat="server">
    
    </form>
</body>
</html>
