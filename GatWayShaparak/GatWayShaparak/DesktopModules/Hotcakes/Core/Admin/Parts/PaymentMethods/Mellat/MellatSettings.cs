using System;
using Hotcakes.Payment;

namespace Hotcakes.Shetab.Mellat
{
	[Serializable]
	public class MellatSettings : MethodSettings
	{

		public string TerminalId
		{
			get
			{
				return base.GetSettingOrEmpty("TerminalId");
			}
			set
			{
				base.AddOrUpdate("TerminalId", value);
			}
		}

		public string UserName
		{
			get
			{
				return base.GetSettingOrEmpty("UserName");
			}
			set
			{
				base.AddOrUpdate("UserName", value);
			}
		}

		public string Password
		{
			get
			{
				return base.GetSettingOrEmpty("Password");
			}
			set
			{
				base.AddOrUpdate("Password", value);
			}
		}

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
	}
}
