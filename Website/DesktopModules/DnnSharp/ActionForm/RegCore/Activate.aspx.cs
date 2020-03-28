using System;
using avt.ActionForm.Core;
using DnnSharp.Common;
using System.Web.UI;
using DnnSharp.Common2.IoC;
using DnnSharp.Common2.Services.Dnn;
using DnnSharp.Common2.EntryPoint;

namespace avt.ActionForm.RegCore {
    public partial class Activate : InjectableActivatePage {

        [IoCService]
        protected IServicesFrameworkLoader ServicesFrameworkLoader { get; set; }

        public Activate() : base(App.Info) {
        }

        protected override void Page_Load(object sender, EventArgs e) {
            base.Page_Load(sender, e);

            ServicesFrameworkLoader.RequestAjaxAntiForgerySupport();

            Page.Header.DataBind();
            Page.Form.DataBind();
        }

        protected override void OnPreRender(EventArgs e) {
            base.OnPreRender(e);
            ClientResManager.RegisterCss(Page, App.Info, App.Info.CommonUrl + "/static/bootstrap337/css/bootstrap.min.css?v=" + App.Info.Build);
            ClientResManager.RegisterCss(Page, App.Info, App.Info.CommonUrl + "/static/dnnsf/css/activate.css?v=" + App.Info.Build);
            ClientResManager.RegisterCss(Page, App.Info, App.Info.CommonUrl + "/static/bootstrap337/css/bootstrap.min.css?v=" + App.Info.Build);
            Page.ClientScript.RegisterClientScriptInclude(typeof(Page), "dnnsftoast", App.Info.CommonUrl + "/static/dnnsf/dnnsf.js?v=" + App.Info.Build);
            ClientResManager.RegisterJquery(Page, AppInfo);
            Page.ClientScript.RegisterClientScriptBlock(typeof(Page), "dnnsfjQuery", "if (typeof(dnnsfjQuery) == 'undefined') dnnsfjQuery = jQuery || $;", true);

            ServicesFrameworkLoader.RegisterAjaxAntiForgery(this);
        }
    }
}
