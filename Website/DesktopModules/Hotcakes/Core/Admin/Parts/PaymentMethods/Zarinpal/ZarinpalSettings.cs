using System;
using Hotcakes.Payment;

namespace Hotcakes.Shetab.Zarinpal
{
	// Token: 0x02000043 RID: 67
	[Serializable]
	public class ZarinpalSettings : MethodSettings
	{
		// Token: 0x1700003E RID: 62
		// (get) Token: 0x06000180 RID: 384 RVA: 0x00007270 File Offset: 0x00005470
		// (set) Token: 0x06000181 RID: 385 RVA: 0x0000728D File Offset: 0x0000548D
		public string MerchantId
		{
			get
			{
				return base.GetSettingOrEmpty("MerchantId");
			}
			set
			{
				base.AddOrUpdate("MerchantId", value);
			}
		}

		// Token: 0x1700003F RID: 63
		// (get) Token: 0x06000182 RID: 386 RVA: 0x000072A0 File Offset: 0x000054A0
		// (set) Token: 0x06000183 RID: 387 RVA: 0x000064E9 File Offset: 0x000046E9
		public string Currency
		{
			get
			{
				return base.GetSettingOrEmpty("Currency");
			}
			set
			{
				base.AddOrUpdate("Currency", value);
			}
		}

		// Token: 0x17000040 RID: 64
		// (get) Token: 0x06000184 RID: 388 RVA: 0x000072C0 File Offset: 0x000054C0
		// (set) Token: 0x06000185 RID: 389 RVA: 0x000072DD File Offset: 0x000054DD
		public string ServerLocation
		{
			get
			{
				return base.GetSettingOrEmpty("ServerLocation");
			}
			set
			{
				base.AddOrUpdate("ServerLocation", value);
			}
		}
	}
}
