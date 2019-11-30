using System;
using Hotcakes.Commerce.Payment;

namespace Hotcakes.Shetab.Mellat
{
	// Token: 0x0200003A RID: 58
	[Serializable]
	public class Mellat : PaymentMethod
	{
		// Token: 0x06000155 RID: 341 RVA: 0x00005EB0 File Offset: 0x000040B0
		public static string Id()
		{
			return "28D28F08-8086-4577-9154-52A5ECCD6881";
		}

		// Token: 0x17000031 RID: 49
		// (get) Token: 0x06000156 RID: 342 RVA: 0x00005EC8 File Offset: 0x000040C8
		public override string MethodId
		{
			get
			{
				return Mellat.Id();
			}
		}

		// Token: 0x17000032 RID: 50
		// (get) Token: 0x06000157 RID: 343 RVA: 0x00005EE0 File Offset: 0x000040E0
		public override string MethodName
		{
			get
			{
				return "Mellat";
			}
		}

		// Token: 0x17000033 RID: 51
		// (get) Token: 0x06000158 RID: 344 RVA: 0x00005EF8 File Offset: 0x000040F8
		public override int SortIndex
		{
			get
			{
				return 202;
			}
		}

		// Token: 0x17000034 RID: 52
		// (get) Token: 0x06000159 RID: 345 RVA: 0x00005F10 File Offset: 0x00004110
		public override bool PayBeforePlacement
		{
			get
			{
				return true;
			}
		}

		// Token: 0x04000059 RID: 89
		public const string PaymentIdMellat = "873B9489-6B1C-4FAE-92CB-53D315F34015";
	}
}
