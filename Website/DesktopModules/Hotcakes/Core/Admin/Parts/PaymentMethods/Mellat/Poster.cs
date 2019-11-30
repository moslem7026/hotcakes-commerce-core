using System;
using System.Web.UI;

namespace Hotcakes.Shetab.Mellat
{
	// Token: 0x0200003D RID: 61
	public class Poster : Page
	{
		// Token: 0x06000168 RID: 360 RVA: 0x00006504 File Offset: 0x00004704
		protected void Page_Load(object sender, EventArgs e)
		{
			bool flag = !base.IsPostBack;
			if (flag)
			{
				bool flag2 = base.Request.QueryString["RefId"] != null;
				if (flag2)
				{
					string str = base.Request.QueryString["RefId"];
					base.ClientScript.RegisterStartupScript(typeof(Page), "ClientScript", "<script language='javascript' type='text/javascript'> postRefId('" + str + "');</script> ", false);
				}
			}
		}
	}
}
