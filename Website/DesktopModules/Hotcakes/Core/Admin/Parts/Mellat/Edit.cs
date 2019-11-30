using System;
using System.Web.UI.WebControls;
using Hotcakes.Commerce.Urls;
using Hotcakes.Modules.Core.Admin.AppCode;

namespace Hotcakes.Shetab.Mellat
{
	// Token: 0x02000039 RID: 57
	public class Edit : HccPaymentMethodPart
	{
		// Token: 0x06000152 RID: 338 RVA: 0x00005D48 File Offset: 0x00003F48
		public override void LoadData()
		{
			MellatSettings mellatSettings = new MellatSettings();
			mellatSettings.Merge(base.HccApp.CurrentStore.Settings.MethodSettingsGet(base.MethodId));
			this.txtTerminalId.Text = mellatSettings.TerminalId;
			this.txtUserName.Text = mellatSettings.UserName;
			this.txtPassword.Text = mellatSettings.Password;
			this.ddlCurrency.SelectedValue = mellatSettings.Currency;
			this.lblCallbackUrl.Text = HccUrlBuilder.RouteHccUrl(HccRoute.ThirdPartyPayment);
		}

		// Token: 0x06000153 RID: 339 RVA: 0x00005DDC File Offset: 0x00003FDC
		public override void SaveData()
		{
			MellatSettings mellatSettings = new MellatSettings();
			mellatSettings.Merge(base.HccApp.CurrentStore.Settings.MethodSettingsGet(base.MethodId));
			mellatSettings.TerminalId = this.txtTerminalId.Text.Trim();
			mellatSettings.UserName = this.txtUserName.Text.Trim();
			mellatSettings.Password = this.txtPassword.Text.Trim();
			mellatSettings.Currency = this.ddlCurrency.SelectedValue;
			base.HccApp.CurrentStore.Settings.MethodSettingsSet(base.MethodId, mellatSettings);
			base.HccApp.AccountServices.Stores.Update(base.HccApp.CurrentStore);
		}

		// Token: 0x0400004F RID: 79
		protected Label lblTerminalId;

		// Token: 0x04000050 RID: 80
		protected TextBox txtTerminalId;

		// Token: 0x04000051 RID: 81
		protected Label lblUserName;

		// Token: 0x04000052 RID: 82
		protected TextBox txtUserName;

		// Token: 0x04000053 RID: 83
		protected Label lblPassword;

		// Token: 0x04000054 RID: 84
		protected TextBox txtPassword;

		// Token: 0x04000055 RID: 85
		protected Label lblCurrency;

		// Token: 0x04000056 RID: 86
		protected DropDownList ddlCurrency;

		// Token: 0x04000057 RID: 87
		protected Label lbCallbackUrl;

		// Token: 0x04000058 RID: 88
		protected Label lblCallbackUrl;
	}
}
