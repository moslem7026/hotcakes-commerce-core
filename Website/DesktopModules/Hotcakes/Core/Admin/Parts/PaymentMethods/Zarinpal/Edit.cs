using System;
using System.Web.UI.WebControls;
using Hotcakes.Commerce.Urls;
using Hotcakes.Modules.Core.Admin.AppCode;

namespace Hotcakes.Shetab.Zarinpal
{
	// Token: 0x02000040 RID: 64
	public class Edit : HccPaymentMethodPart
	{
		// Token: 0x06000173 RID: 371 RVA: 0x00006BBC File Offset: 0x00004DBC
		public override void LoadData()
		{
			ZarinpalSettings zarinpalSettings = new ZarinpalSettings();
			zarinpalSettings.Merge(base.HccApp.CurrentStore.Settings.MethodSettingsGet(base.MethodId));
			this.txtMerchantId.Text = zarinpalSettings.MerchantId;
			this.ddlCurrency.SelectedValue = zarinpalSettings.Currency;
			this.ddlServerLocation.SelectedValue = zarinpalSettings.ServerLocation;
            this.lblCallbackUrl.Text = HccUrlBuilder.RouteHccUrl(HccRoute.ThirdPartyPayment);
		}

		// Token: 0x06000174 RID: 372 RVA: 0x00006C3C File Offset: 0x00004E3C
		public override void SaveData()
		{
			ZarinpalSettings zarinpalSettings = new ZarinpalSettings();
			zarinpalSettings.Merge(base.HccApp.CurrentStore.Settings.MethodSettingsGet(base.MethodId));
			zarinpalSettings.MerchantId = this.txtMerchantId.Text.Trim();
			zarinpalSettings.Currency = this.ddlCurrency.SelectedValue;
			zarinpalSettings.ServerLocation = this.ddlServerLocation.SelectedValue;
			base.HccApp.CurrentStore.Settings.MethodSettingsSet(base.MethodId, zarinpalSettings);
			base.HccApp.AccountServices.Stores.Update(base.HccApp.CurrentStore);
		}

		// Token: 0x0400005E RID: 94
		protected Label lblMerchantId;

		// Token: 0x0400005F RID: 95
		protected TextBox txtMerchantId;

		// Token: 0x04000060 RID: 96
		protected Label lblCurrency;

		// Token: 0x04000061 RID: 97
		protected DropDownList ddlCurrency;

		// Token: 0x04000062 RID: 98
		protected Label lblServerLocation;

		// Token: 0x04000063 RID: 99
		protected DropDownList ddlServerLocation;

		// Token: 0x04000064 RID: 100
		protected Label lbCallbackUrl;

		// Token: 0x04000065 RID: 101
		protected Label lblCallbackUrl;
	}
}
