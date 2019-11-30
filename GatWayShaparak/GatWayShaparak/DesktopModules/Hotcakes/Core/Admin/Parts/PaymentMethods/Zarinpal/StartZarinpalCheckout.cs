using System;
using System.Web;
using Hotcakes.Commerce;
using Hotcakes.Commerce.BusinessRules;
using Hotcakes.Commerce.Extensions;
using Hotcakes.Commerce.Globalization;
using Hotcakes.Commerce.Orders;
using Hotcakes.Commerce.Urls;
using Hotcakes.Payment;

namespace Hotcakes.Shetab.Zarinpal
{
	public class StartZarinpalCheckout : ThirdPartyCheckoutOrderTask
	{
		public override string PaymentMethodId
		{
			get
			{
				return Zarinpal.Id();
			}
		}

		public override bool ProcessCheckout(OrderTaskContext context)
		{
			if (context.HccApp.CurrentRequestContext.RoutingContext.HttpContext != null)
			{
				try
				{
                    ZarinpalSettings zarinpalSettings = new ZarinpalSettings();
					MethodSettings methodSettings = context.HccApp.CurrentStore.Settings.MethodSettingsGet(this.PaymentMethodId);
					zarinpalSettings.Merge(methodSettings);
					Order order = context.Order;
					int num = (int)order.TotalGrandAfterStoreCredits(context.HccApp.OrderServices);
                    string callbackURL = HccUrlBuilder.RouteHccUrl(HccRoute.ThirdPartyPayment);
					if (zarinpalSettings.Currency == "r")
					{
						num *= 10;
					}
					string ZarrinPallOrderID;
					int num2;
					if (zarinpalSettings.ServerLocation == "iran")
					{
                        com.zarinpal.ir.PaymentGatewayImplementationService paymentGatewayImplementationService = new com.zarinpal.ir.PaymentGatewayImplementationService();
						num2 = paymentGatewayImplementationService.PaymentRequest(zarinpalSettings.MerchantId, num, order.Id.ToString(), order.UserEmail, order.BillingAddress.Phone, callbackURL, out ZarrinPallOrderID);
					}
					else
					{
                        com.zarinpal.de.PaymentGatewayImplementationService paymentGatewayImplementationService2 = new com.zarinpal.de.PaymentGatewayImplementationService();
						num2 = paymentGatewayImplementationService2.PaymentRequest(zarinpalSettings.MerchantId, num, order.Id.ToString(), order.UserEmail, order.BillingAddress.Phone, callbackURL, out ZarrinPallOrderID);
					}
					bool flag4 = num2 == 100;
					if (!flag4)
					{
						Constants constants = new Constants();
						string text2 = constants.ParseResponseCode(num2.ToString());
						EventLog.LogEvent("Zarinpal Checkout", "Exception occurred during call to Zarinpal: " + text2, Web.Logging.EventLogSeverity.Error);
						context.Errors.Add(new WorkflowMessage("Zarinpal Checkout Error", text2, true));
						return false;
					}
					order.ThirdPartyOrderId = ZarrinPallOrderID;
					context.HccApp.OrderServices.Orders.Update(order, false);
					HttpContextBase httpContextBase = new HccHttpContextWrapper(HttpContext.Current);
					httpContextBase.Response.Redirect("https://www.zarinpal.com/pg/StartPay/" + ZarrinPallOrderID);
				}
				catch (Exception ex)
				{
					EventLog.LogEvent("Zarinpal Checkout", "Exception occurred during call to Zarinpal: " + ex.ToString(), Web.Logging.EventLogSeverity.Error);
					context.Errors.Add(new WorkflowMessage("Zarinpal Checkout Error", GlobalLocalization.GetString("ZarinpalCheckoutError"), true));
					return false;
				}
			}
			return false;
		}

		public override bool Rollback(OrderTaskContext context)
		{
			return true;
		}

		public override Task Clone()
		{
			return new StartZarinpalCheckout();
		}

		public override string TaskId()
		{
			return "5952a29d-8e85-42b9-842b-63538fa7a724";
		}

		public override string TaskName()
		{
			return "Start Zarinpal Checkout";
		}
	}
}
