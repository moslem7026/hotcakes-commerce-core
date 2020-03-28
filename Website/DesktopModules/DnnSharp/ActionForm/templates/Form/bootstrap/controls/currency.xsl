<?xml version="1.0" encoding="utf-8"?>

<xsl:stylesheet version="1.0"
                xmlns:xsl="http://www.w3.org/1999/XSL/Transform"
                xmlns:utils="af:utils">

  <xsl:import href="label.xsl"/>
  <xsl:import href="attr-common.xsl"/>
  <xsl:import href="attr-container.xsl"/>
  <xsl:output method="html" indent="no" omit-xml-declaration="yes" />

  <xsl:template name="ctl-currency">
    <xsl:param name="addclass" />

    <!--If label is a column, render it here-->
    <xsl:if test="/Form/Settings/LabelAlign != 'inside' and /Form/Settings/LabelAlign != 'top'">
      <xsl:call-template name="ctl-label" />
    </xsl:if>

    <div>

      <xsl:call-template name="ctl-attr-container" />

      <!--If label is top, render it here-->
      <xsl:if test="/Form/Settings/LabelAlign = 'top'">
        <xsl:call-template name="ctl-label" />
      </xsl:if>
      <div load-on-demand="'ngCurrency'" >
        <!--<xsl:copy-of select="."/>-->
        <!--render the control-->
        <input type="text" ng-currency="" update-field="updateField(field, val)">

          <xsl:attribute name="data-field">
            <xsl:text>settings.Fields['</xsl:text>
            <xsl:value-of select="Name" />
            <xsl:text>']</xsl:text>
          </xsl:attribute>

          <xsl:attribute name="af-field-title">
            <xsl:value-of select="Title"/>
          </xsl:attribute>
          <xsl:attribute name="initialValue">
            <xsl:value-of select="InitalValue"/>
          </xsl:attribute>
          <xsl:attribute name="formatterType">
            <xsl:value-of select="FormatterType"/>
          </xsl:attribute>
          <xsl:attribute name="locales">
            <xsl:value-of select="Locales"/>
          </xsl:attribute>
          <xsl:attribute name="languageCode">
            <xsl:value-of select="LanguageCode"/>
          </xsl:attribute>
          <xsl:attribute name="currency">
            <xsl:value-of select="Currency"/>
          </xsl:attribute>
          <xsl:attribute name="currencyPosition">
            <xsl:value-of select="CurrencyPosition"/>
          </xsl:attribute>
          <xsl:attribute name="formatOnBlur">
            <xsl:value-of select="FormatOnBlur"/>
          </xsl:attribute>
          <xsl:attribute name="allowZero">
            <xsl:value-of select="AllowZero"/>
          </xsl:attribute>
          <xsl:attribute name="allowNegative">
            <xsl:value-of select="AllowNegative"/>
          </xsl:attribute>
          <xsl:attribute name="allowEmpty">
            <xsl:value-of select="AllowEmpty"/>
          </xsl:attribute>
          <xsl:attribute name="doubleClickSelection">
            <xsl:value-of select="DoubleClickSelection"/>
          </xsl:attribute>
          <xsl:attribute name="selectAllOnFocus">
            <xsl:value-of select="SelectAllOnFocus"/>
          </xsl:attribute>
          <xsl:attribute name="thousandsSeparator">
            <xsl:value-of select="ThousandsSeparator"/>
          </xsl:attribute>
          <xsl:attribute name="decimalSeparator">
            <xsl:value-of select="DecimalSeparator"/>
          </xsl:attribute>
          <xsl:attribute name="precision">
            <xsl:value-of select="Precision"/>
          </xsl:attribute>
          <xsl:attribute name="affixesStay">
            <xsl:value-of select="AffixesStay"/>
          </xsl:attribute>
          <xsl:attribute name="bringCaretAtEndOnFocus">
            <xsl:value-of select="BringCaretAtEndOnFocus"/>
          </xsl:attribute>

          <xsl:if test="Readonly = 'True'">
            <xsl:attribute name="readonly">readonly</xsl:attribute>
          </xsl:if>
          
          <xsl:if test="ShortDesc != '' and /Form/Settings/LabelAlign = 'inside'">
            <xsl:attribute name="title">
              <xsl:value-of select="ShortDesc"/>
            </xsl:attribute>
          </xsl:if>

          <xsl:call-template name="ctl-attr-common">
            <xsl:with-param name="cssclass">
              <xsl:text>form-control </xsl:text>
              <xsl:if test="/Form/Settings/ClientSideValidation ='True' and IsRequired='True' and CanValidate = 'True'">required</xsl:if>
              <xsl:value-of select="$addclass"/>
            </xsl:with-param>
            <xsl:with-param name="hasId">yes</xsl:with-param>
            <xsl:with-param name="hasName">yes</xsl:with-param>
            <xsl:with-param name="bind">yes</xsl:with-param>
            <xsl:with-param name="touchEvent">keyup</xsl:with-param>
          </xsl:call-template>
          <!--<xsl:call-template name="ctl-attr-placeholder" />-->
          <xsl:if test="IsEnabled != 'True'">
            <xsl:attribute name="disabled">disabled</xsl:attribute>
          </xsl:if>
          <xsl:if test="Readonly = 'True'">
            <xsl:attribute name="readonly">readonly</xsl:attribute>
          </xsl:if>
        </input>
      </div>
    </div>

  </xsl:template>

</xsl:stylesheet>
