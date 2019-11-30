using System;
using System.Web.Mvc;
using Hotcakes.Commerce;
using Hotcakes.Commerce.BusinessRules;
using Hotcakes.Commerce.Extensions;
using Hotcakes.Commerce.Orders;
using Hotcakes.Modules.Core.Controllers.Shared;
using Hotcakes.Modules.Core.Filters;
using Hotcakes.Modules.Core.Models;
using Hotcakes.Payment;
using Hotcakes.Modules;

using Hotcakes.Web.Validation;

namespace Hotcakes.Shetab.Zarinpal
{
	// Token: 0x02000042 RID: 66
	[Serializable]
	public class ZarinpalCheckoutController : BaseStoreController
	{
		// Token: 0x0600017C RID: 380 RVA: 0x00006D60 File Offset: 0x00004F60
		[NonCacheableResponseFilter]
		public ActionResult Index()
		{
			ZarinpalSettings zarinpalSettings = new ZarinpalSettings();
			MethodSettings methodSettings = base.HccApp.CurrentStore.Settings.MethodSettingsGet(Zarinpal.Id());
			zarinpalSettings.Merge(methodSettings);
			CheckoutViewModel checkoutViewModel = new CheckoutViewModel
			{
				CurrentOrder = base.HccApp.OrderServices.CurrentShoppingCart()
			};
			Order order = base.HccApp.OrderServices.Orders.FindForCurrentStore(checkoutViewModel.CurrentOrder.bvin);
			this.Status = base.Request.QueryString["Status"].ToString();
			this.Authority = base.Request.QueryString["Authority"].ToString();
			this.SaleOrderId = order.Id.ToString();
			int num = (int)checkoutViewModel.CurrentOrder.TotalGrandAfterStoreCredits(base.HccApp.OrderServices);
			bool flag = zarinpalSettings.Currency == "r";
			if (flag)
			{
				num *= 10;
			}
			bool flag2 = this.Status == "OK";
			if (flag2)
			{
				bool flag3 = zarinpalSettings.ServerLocation == "iran";
				int num2;
				if (flag3)
				{
                    com.zarinpal.ir.PaymentGatewayImplementationService paymentGatewayImplementationService = new com.zarinpal.ir.PaymentGatewayImplementationService();
					num2 = paymentGatewayImplementationService.PaymentVerification(zarinpalSettings.MerchantId, this.Authority, num, out this.SaleReferenceId);
				}
				else
				{
                    com.zarinpal.de.PaymentGatewayImplementationService paymentGatewayImplementationService2 = new com.zarinpal.de.PaymentGatewayImplementationService();
					num2 = paymentGatewayImplementationService2.PaymentVerification(zarinpalSettings.MerchantId, this.Authority, num, out this.SaleReferenceId);
				}
				bool flag4 = num2 == 100;
				if (flag4)
				{
					this.SavePaymentInfo(checkoutViewModel);
					this.ProcessOrder(checkoutViewModel);
				}
				else
				{
					string text = base.Localization.GetString("ErrorOccured");
					text += ":<br />";
					text += new Constants().ParseResponseCode(num2.ToString());
					base.FlashFailure(text);
				}
			}
			else
			{
				string text2 = base.Localization.GetString("ErrorOccured");
				text2 += ":<br />";
				text2 += new Constants().ParseResponseCode(this.Status.ToString());
				base.FlashFailure(text2);
			}
			foreach (RuleViolation ruleViolation in checkoutViewModel.Violations)
			{
				base.FlashFailure(ruleViolation.ErrorMessage);
			}
			return base.View(checkoutViewModel);
		}

		// Token: 0x0600017D RID: 381 RVA: 0x00006FF4 File Offset: 0x000051F4
		private void ProcessOrder(CheckoutViewModel model)
		{
			base.HccApp.OrderServices.Orders.Update(model.CurrentOrder, true);
			OrderTaskContext orderTaskContext = new OrderTaskContext(base.HccApp)
			{
				UserId = base.HccApp.CurrentCustomerId,
				Order = model.CurrentOrder
			};
			bool flag = Hotcakes.Commerce.BusinessRules.Workflow.RunByName(orderTaskContext, WorkflowNames.ProcessNewOrder);
			if (flag)
			{
				SessionManager.SetCurrentCartId(base.HccApp.CurrentStore, string.Empty);
				bool flag2 = Hotcakes.Commerce.BusinessRules.Workflow.RunByName(orderTaskContext, WorkflowNames.ProcessNewOrderPayments);
				if (flag2)
				{
                    Hotcakes.Commerce.BusinessRules.Workflow.RunByName(orderTaskContext, WorkflowNames.ProcessNewOrderAfterPayments);
					Order order = base.HccApp.OrderServices.Orders.FindForCurrentStore(model.CurrentOrder.bvin);
					base.HccApp.CurrentRequestContext.IntegrationEvents.OrderReceived(order, base.HccApp);
					SessionManager.AnalyticsOrderId = model.CurrentOrder.bvin;
					base.Response.Redirect(HccUrlExtensions.RouteHccUrl(base.Url, Commerce.Urls.HccRoute.Checkout, new
					{
						action = "receipt",
						id = model.CurrentOrder.bvin
					}));
				}
			}
			else
			{
				bool flag3 = false;
				foreach (WorkflowMessage workflowMessage in orderTaskContext.GetCustomerVisibleErrors())
				{
					model.Violations.Add(new RuleViolation("Workflow", workflowMessage.Name, workflowMessage.Description));
					flag3 = true;
				}
				bool flag4 = !flag3;
				if (flag4)
				{
					model.Violations.Add(new RuleViolation("Workflow", "Internal Error", base.Localization.GetString("InternalErrorOccured")));
				}
			}
		}

		// Token: 0x0600017E RID: 382 RVA: 0x000071B0 File Offset: 0x000053B0
		private void SavePaymentInfo(CheckoutViewModel model)
		{
			OrderTransaction orderTransaction = new OrderTransaction();
			orderTransaction.Success = true;
			orderTransaction.MethodId = Zarinpal.Id();
			orderTransaction.OrderId = model.CurrentOrder.bvin;
			orderTransaction.Amount = model.CurrentOrder.TotalGrandAfterStoreCredits(base.HccApp.OrderServices);
            orderTransaction.Action = ActionType.ThirdPartyPayMethodCharge;
			orderTransaction.RefNum1 = this.SaleReferenceId.ToString();
			base.HccApp.OrderServices.AddPaymentTransactionToOrder(model.CurrentOrder, orderTransaction, base.HccApp);
		}

		// Token: 0x04000067 RID: 103
		public string Status = "";

		// Token: 0x04000068 RID: 104
		public string Authority = "";

		// Token: 0x04000069 RID: 105
		public string SaleOrderId = "";

		// Token: 0x0400006A RID: 106
		public long SaleReferenceId;
	}
}
