﻿//------------------------------------------------------------------------------
// <auto-generated>
//     This code was generated by a tool.
//     Runtime Version:4.0.30319.42000
//
//     Changes to this file may cause incorrect behavior and will be lost if
//     the code is regenerated.
// </auto-generated>
//------------------------------------------------------------------------------

namespace Hotcakes.Shetab.Properties {
    
    
    [global::System.Runtime.CompilerServices.CompilerGeneratedAttribute()]
    [global::System.CodeDom.Compiler.GeneratedCodeAttribute("Microsoft.VisualStudio.Editors.SettingsDesigner.SettingsSingleFileGenerator", "16.0.0.0")]
    internal sealed partial class Settings : global::System.Configuration.ApplicationSettingsBase {
        
        private static Settings defaultInstance = ((Settings)(global::System.Configuration.ApplicationSettingsBase.Synchronized(new Settings())));
        
        public static Settings Default {
            get {
                return defaultInstance;
            }
        }
        
        [global::System.Configuration.ApplicationScopedSettingAttribute()]
        [global::System.Diagnostics.DebuggerNonUserCodeAttribute()]
        [global::System.Configuration.SpecialSettingAttribute(global::System.Configuration.SpecialSetting.WebServiceUrl)]
        [global::System.Configuration.DefaultSettingValueAttribute("https://ir.zarinpal.com/pg/services/WebGate/service")]
        public string Hotcakes_Shetab_com_zarinpal_ir_PaymentGatewayImplementationService {
            get {
                return ((string)(this["Hotcakes_Shetab_com_zarinpal_ir_PaymentGatewayImplementationService"]));
            }
        }
        
        [global::System.Configuration.ApplicationScopedSettingAttribute()]
        [global::System.Diagnostics.DebuggerNonUserCodeAttribute()]
        [global::System.Configuration.SpecialSettingAttribute(global::System.Configuration.SpecialSetting.WebServiceUrl)]
        [global::System.Configuration.DefaultSettingValueAttribute("https://de.zarinpal.com/pg/services/WebGate/service")]
        public string Hotcakes_Shetab_com_zarinpal_de_PaymentGatewayImplementationService {
            get {
                return ((string)(this["Hotcakes_Shetab_com_zarinpal_de_PaymentGatewayImplementationService"]));
            }
        }
        
        [global::System.Configuration.ApplicationScopedSettingAttribute()]
        [global::System.Diagnostics.DebuggerNonUserCodeAttribute()]
        [global::System.Configuration.SpecialSettingAttribute(global::System.Configuration.SpecialSetting.WebServiceUrl)]
        [global::System.Configuration.DefaultSettingValueAttribute("https://bpm.shaparak.ir/pgwchannel/services/pgw")]
        public string Hotcakes_Shetab_ir_shaparak_bpm_PaymentGatewayImplService {
            get {
                return ((string)(this["Hotcakes_Shetab_ir_shaparak_bpm_PaymentGatewayImplService"]));
            }
        }
    }
}