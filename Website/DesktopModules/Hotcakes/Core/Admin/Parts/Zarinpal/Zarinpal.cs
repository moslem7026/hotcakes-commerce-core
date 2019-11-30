using System;
using Hotcakes.Commerce.Payment;

namespace Hotcakes.Shetab.Zarinpal
{
	// Token: 0x02000041 RID: 65
	[Serializable]
	public class Zarinpal : PaymentMethod
	{
		// Token: 0x06000176 RID: 374 RVA: 0x00006CEC File Offset: 0x00004EEC
		public static string Id()
		{
			return "39642cb4-189a-452c-87bc-a4702c9838f1";
		}

		// Token: 0x1700003A RID: 58
		// (get) Token: 0x06000177 RID: 375 RVA: 0x00006D04 File Offset: 0x00004F04
		public override string MethodId
		{
			get
			{
				return Zarinpal.Id();
			}
		}

		// Token: 0x1700003B RID: 59
		// (get) Token: 0x06000178 RID: 376 RVA: 0x00006D1C File Offset: 0x00004F1C
		public override string MethodName
		{
			get
			{
				return "Zarinpal";
			}
		}

		// Token: 0x1700003C RID: 60
		// (get) Token: 0x06000179 RID: 377 RVA: 0x00006D34 File Offset: 0x00004F34
		public override int SortIndex
		{
			get
			{
				return 203;
			}
		}

		// Token: 0x1700003D RID: 61
		// (get) Token: 0x0600017A RID: 378 RVA: 0x00006D4C File Offset: 0x00004F4C
		public override bool PayBeforePlacement
		{
			get
			{
				return true;
			}
		}

		// Token: 0x04000066 RID: 102
		public const string PaymentIdZarinpal = "2a85a360-fdde-440e-b71f-ab361070bcfc";
	}
}
