using System;
using Hotcakes.Commerce.BusinessRules;
using Hotcakes.Commerce.Dnn.Workflow;
using Hotcakes.Shetab.Mellat;
using Hotcakes.Shetab.Zarinpal;

namespace Hotcakes.Shetab
{
	// Token: 0x02000003 RID: 3
	public class Workflow : DnnWorkflowFactory
	{
			protected override Task[] LoadThirdPartyCheckoutSelectedTasks()
		{
			return new Task[]
			{
				new StartMellatCheckout(),
				new StartZarinpalCheckout()
			};
		}
	}
}
