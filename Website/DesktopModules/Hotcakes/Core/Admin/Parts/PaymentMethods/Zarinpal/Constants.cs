using System;
namespace Hotcakes.Shetab.Zarinpal
{
    // Token: 0x0200003F RID: 63
    public class Constants
    {
        // Token: 0x06000171 RID: 369 RVA: 0x00006870 File Offset: 0x00004A70
        public string ParseResponseCode(string code)
        {
            switch (code)
            {
                case "-2":
                    return "آدرس IP و يا مرچنت كد پذيرنده صحيح نيست.";
                case "-1":
                    return "اطلاعات ارسال شده ناقص است.";
                case "-4":
                    return "سطح تاييد پذيرنده پايين تر از سطح نقره اي است.";
                case "-3":
                    return "با توجه به محدوديت هاي شاپرك امكان پرداخت با رقم درخواست شده ميسر نمي باشد.";
                case "-34":
                    return "سقف تقسيم تراكنش از لحاظ تعداد يا رقم عبور نموده است";
                case "-33":
                    return "رقم تراكنش با رقم پرداخت شده مطابقت ندارد.";
                case "-41":
                    return "اطلاعات ارسال شده مربوط به AdditionalData غیر معتبر می‌باشد.";
                case "-40":
                    return "اجازه دسترسي به متد مربوطه وجود ندارد.";
                case "-54":
                    return "درخواست مورد نظر آرشيو شده است.";
                case "-42":
                    return "مدت زمان معتبر طول عمر شناسه پرداخت بايد بين 30 دقيه تا 45 روز مي باشد.";
                case "101":
                    return "عملیات پرداخت موفق بوده و قبلا PaymentVerification تراکنش انجام شده است.";
                case "100":
                    return "عمليات با موفقيت انجام گرديده است.";
                case "-12":
                    return "امكان ويرايش درخواست ميسر نمي باشد.";
                case "NOK":
                    return "پرداخت انجام نشد.";
                case "-21":
                    return "هيچ نوع عمليات مالي براي اين تراكنش يافت نشد.";
                case "-22":
                    return "تراكنش نا موفق ميباشد.";
                case "-11":
                    return "درخواست مورد نظر يافت نشد.";
                default:
                    return "خطای نامشخص";
            }
        }
    }
}
