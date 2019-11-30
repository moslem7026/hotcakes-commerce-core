using System;
using System.Web;
using Hotcakes.Commerce;
using Hotcakes.Commerce.BusinessRules;
using Hotcakes.Commerce.Extensions;
using Hotcakes.Commerce.Globalization;
using Hotcakes.Commerce.Orders;
using Hotcakes.Commerce.Urls;
using Hotcakes.Payment;
using Hotcakes.Shetab.ir.shaparak.bpm;

namespace Hotcakes.Shetab.Mellat
{
	// Token: 0x0200003E RID: 62
	public class StartMellatCheckout : ThirdPartyCheckoutOrderTask
	{
		// Token: 0x17000039 RID: 57
		// (get) Token: 0x0600016A RID: 362 RVA: 0x0000658C File Offset: 0x0000478C
		public override string PaymentMethodId
		{
			get
			{
				return Mellat.Id();
			}
		}

		// Token: 0x0600016B RID: 363 RVA: 0x000065A4 File Offset: 0x000047A4
		public override bool ProcessCheckout(OrderTaskContext context)
		{
			bool flag = context.HccApp.CurrentRequestContext.RoutingContext.HttpContext != null;
			if (flag)
			{
				try
				{
					MellatSettings mellatSettings = new MellatSettings();
					MethodSettings methodSettings = context.HccApp.CurrentStore.Settings.MethodSettingsGet(this.PaymentMethodId);
					mellatSettings.Merge(methodSettings);
					Order order = context.Order;
					int num = (int)order.TotalGrandAfterStoreCredits(context.HccApp.OrderServices);
					string arg = "/DesktopModules/Hotcakes/Core/Admin/Parts/PaymentMethods/Mellat/Poster.aspx";
					string localDate = DateTime.Now.ToString("yyyy/MM/dd").Replace("/", "");
					string localTime = DateTime.Now.ToString("HH:MM:ss").Replace(":", "");
					string callBackUrl = HccUrlBuilder.RouteHccUrl(HccRoute.ThirdPartyPayment);
					long orderId = Convert.ToInt64(order.Id.ToString() + DateTime.Now.ToString("ss"));
					bool flag2 = mellatSettings.Currency == "t";
					if (flag2)
					{
						num *= 10;
					}
					PaymentGatewayImplService paymentGatewayImplService = new PaymentGatewayImplService();
					string text = paymentGatewayImplService.bpPayRequest(long.Parse(mellatSettings.TerminalId), mellatSettings.UserName, mellatSettings.Password, orderId, Convert.ToInt64(num), localDate, localTime, "", callBackUrl, 0L);
					string[] array = text.Split(new char[]
					{
						','
					});
					bool flag3 = array[0] == "0";
					if (!flag3)
					{
						Constants constants = new Constants();
						string text2 = constants.ParseResponseCode(array[0]);
						EventLog.LogEvent("Mellat Checkout", "Exception occurred during call to Behpardakht: " + text2, Web.Logging.EventLogSeverity.Fatal);
						context.Errors.Add(new WorkflowMessage("Mellat Checkout Error", text2, true));
						return false;
					}
					HttpContextBase httpContextBase = new HccHttpContextWrapper(HttpContext.Current);
					httpContextBase.Response.Redirect(string.Format("{0}?RefId={1}", arg, array[1]), true);
				}
				catch (Exception ex)
				{
					EventLog.LogEvent("Mellat Checkout", "Exception occurred during call to Behpardakht: " + ex.ToString(),Web.Logging.EventLogSeverity.Fatal);
					context.Errors.Add(new WorkflowMessage("Mellat Checkout Error", GlobalLocalization.GetString("MellatCheckoutError"), true));
					return false;
				}
			}
			return false;
		}

		// Token: 0x0600016C RID: 364 RVA: 0x0000680C File Offset: 0x00004A0C
		public override bool Rollback(OrderTaskContext context)
		{
			return true;
		}

		// Token: 0x0600016D RID: 365 RVA: 0x00006820 File Offset: 0x00004A20
		public override Task Clone()
		{
			return new StartMellatCheckout();
		}

		// Token: 0x0600016E RID: 366 RVA: 0x00006838 File Offset: 0x00004A38
		public override string TaskId()
		{
			return "D52DE4F4-D538-49C6-BD7D-826FEE9754DA";
		}

		// Token: 0x0600016F RID: 367 RVA: 0x00006850 File Offset: 0x00004A50
		public override string TaskName()
		{
			return "Start Mellat Checkout";
		}
	}
}
