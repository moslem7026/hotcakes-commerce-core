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
using Hotcakes.Shetab.ir.shaparak.bpm;
using Hotcakes.Web.Validation;


namespace Hotcakes.Shetab.Mellat
{
	// Token: 0x0200003B RID: 59
	[Serializable]
	public class MellatCheckoutController : BaseStoreController
	{
		// Token: 0x0600015B RID: 347 RVA: 0x00005F2C File Offset: 0x0000412C
		[NonCacheableResponseFilter]
		public ActionResult Index()
		{
			MellatSettings mellatSettings = new MellatSettings();
			MethodSettings methodSettings = base.HccApp.CurrentStore.Settings.MethodSettingsGet(Mellat.Id());
			mellatSettings.Merge(methodSettings);
			CheckoutViewModel checkoutViewModel = new CheckoutViewModel
			{
				CurrentOrder = base.HccApp.OrderServices.CurrentShoppingCart()
			};
			this.RefId = base.Request.Form["RefId"];
			this.ResCode = base.Request.Form["ResCode"];
			this.SaleOrderId = Convert.ToString(base.Request.Form["SaleOrderId"]);
			this.SaleReferenceId = Convert.ToString(base.Request.Form["SaleReferenceId"]);
			string text = this.SaleOrderId.Substring(0, this.SaleOrderId.Length - 2);
			string a = this.ResCode;
			bool flag = this.ResCode == "0";
			if (flag)
			{
				PaymentGatewayImplService paymentGatewayImplService = new PaymentGatewayImplService();
				a = paymentGatewayImplService.bpVerifyRequest(long.Parse(mellatSettings.TerminalId), mellatSettings.UserName, mellatSettings.Password, long.Parse(this.SaleOrderId), long.Parse(this.SaleOrderId), long.Parse(this.SaleReferenceId));
			}
			bool flag2 = a == "0";
			if (flag2)
			{
				PaymentGatewayImplService paymentGatewayImplService2 = new PaymentGatewayImplService();
				a = paymentGatewayImplService2.bpSettleRequest(long.Parse(mellatSettings.TerminalId), mellatSettings.UserName, mellatSettings.Password, long.Parse(this.SaleOrderId), long.Parse(this.SaleOrderId), long.Parse(this.SaleReferenceId));
			}
			bool flag3 = a == "0" || a == "45";
			if (flag3)
			{
				this.SavePaymentInfo(checkoutViewModel);
				this.ProcessOrder(checkoutViewModel);
			}
			else
			{
				string text2 = base.Localization.GetString("ErrorOccured");
				text2 += ":<br />";
				text2 += new Constants().ParseResponseCode(this.ResCode);
				base.FlashFailure(text2);
			}
			foreach (RuleViolation ruleViolation in checkoutViewModel.Violations)
			{
				base.FlashFailure(ruleViolation.ErrorMessage);
			}
			return base.View(checkoutViewModel);
		}

		// Token: 0x0600015C RID: 348 RVA: 0x000061B0 File Offset: 0x000043B0
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
                    Hotcakes.Commerce.BusinessRules.Workflow.RunByName(orderTaskContext,WorkflowNames.ProcessNewOrderAfterPayments);
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

		// Token: 0x0600015D RID: 349 RVA: 0x0000636C File Offset: 0x0000456C
		private void SavePaymentInfo(CheckoutViewModel model)
		{
			OrderTransaction orderTransaction = new OrderTransaction();
			orderTransaction.Success = true;
			orderTransaction.MethodId = Mellat.Id();
			orderTransaction.OrderId = model.CurrentOrder.bvin;
			orderTransaction.Amount = model.CurrentOrder.TotalGrandAfterStoreCredits(base.HccApp.OrderServices);
			orderTransaction.Action = ActionType.ThirdPartyPayMethodCharge;
			orderTransaction.RefNum1 = this.RefId;
			orderTransaction.RefNum2 = this.SaleReferenceId;
			base.HccApp.OrderServices.AddPaymentTransactionToOrder(model.CurrentOrder, orderTransaction, base.HccApp);
		}

		// Token: 0x0400005A RID: 90
		public string RefId = "";

		// Token: 0x0400005B RID: 91
		public string ResCode = "";

		// Token: 0x0400005C RID: 92
		public string SaleOrderId = "";

		// Token: 0x0400005D RID: 93
		public string SaleReferenceId = "";
	}
}
