using System;
namespace Hotcakes.Shetab.Mellat
{
    public class Constants
    {
        // Token: 0x06000150 RID: 336 RVA: 0x000054B0 File Offset: 0x000036B0
        public string ParseResponseCode(string code)
        {
            switch (code)
            {
                case "18":
                    return "تاریخ انقضای كارت گذشته است";
                case "61":
                    return "خطا در واریز";
                case "15":
                    return "كارت نامعتبر است";
                case "14":
                    return "تعداد دفعات وارد كردن رمز بیش از حد مجاز است";
                case "19":
                    return "مبلغ برداشت وجه بیش از حد مجاز است";
                case "11":
                    return "شماره کارت نامعتبر است";
                case "17":
                    return "كاربر از انجام تراكنش منصرف شده است";
                case "16":
                    return "دفعات برداشت وجه بیش از حد مجاز است";
                case "0":
                    return "تراکنش با موفقیت انجام شد.";
                case "13":
                    return "رمز نادرست است";
                case "12":
                    return "موجودی کافی نیست";
                case "113":
                    return "پاسخی از صادر كننده كارت دریافت نشد";
                case "114":
                    return "دارنده كارت مجاز به انجام این تراكنش نیست";
                case "51":
                    return "تراكنش تكراری است";
                case "111":
                    return "صادر كننده كارت نامعتبر است";
                case "112":
                    return "خطای سوییچ صادر كننده كارت";
                case "33":
                    return "حساب نامعتبر است";
                case "43":
                    return "قبلا درخواست Verify داده شده است";
                case "32":
                    return "فرمت اطلاعات وارد شده صحیح نمی باشد";
                case "55":
                    return "تراكنش نامعتبر است";
                case "42":
                    return "تراكنش Sale یافت نشد";
                case "54":
                    return "تراكنش مرجع موجود نیست";
                case "31":
                    return "پاسخ نامعتبر است";
                case "41":
                    return "شماره درخواست تكراری است";
                case "47":
                    return "تراكنش Settle یافت نشد";
                case "24":
                    return "اطلاعات كاربری پذیرنده نامعتبر است";
                case "25":
                    return "مبلغ نامعتبر است";
                case "45":
                    return "تراكنش Settle شده است";
                case "34":
                    return "خطای سیستمی";
                case "46":
                    return "تراكنش Settle نشده است";
                case "44":
                    return "درخواست Verfiy یافت نشد";
                case "21":
                    return "پذیرنده نامعتبر است";
                case "35":
                    return "تاریخ نامعتبر است";
                case "48":
                    return "تراكنش Reverse یافت نشد";
                case "49":
                    return "تراكنش Refund یافت نشد";
                case "23":
                    return "خطای امنیتی رخ داده است";
                case "417":
                    return "شناسه پرداخت كننده نامعتبر است";
                case "416":
                    return "خطا در ثبت اطلاعات";
                case "421":
                    return "IP نامعتبر است";
                case "412":
                    return "شناسه قبض نادرست است";
                case "415":
                    return "زمان جلسه كاری به پایان رسیده است";
                case "414":
                    return "سازمان صادر كننده قبض نامعتبر است";
                case "419":
                    return "تعداد دفعات ورود اطلاعات از حد مجاز گذشته است";
                case "418":
                    return "اشكال در تعریف اطلاعات مشتری";
                case "413":
                    return "شناسه پرداخت نادرست است";
                default:
                    return "خطای نامشخص";
            }
        }
    }
}