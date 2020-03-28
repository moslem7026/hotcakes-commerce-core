<?xml version="1.0" encoding="utf-8"?>

<xsl:stylesheet version="1.0"
                xmlns:xsl="http://www.w3.org/1999/XSL/Transform"
                xmlns:utils="af:utils">

  <xsl:import href="label.xsl"/>
  <xsl:import href="attr-common.xsl"/>
  <xsl:import href="attr-container.xsl"/>
  <xsl:output method="html" indent="no" omit-xml-declaration="yes" />

  <xsl:template name="ctl-recaptcha">
    <xsl:param name="type" />
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

      <div load-on-demand="'vcRecaptcha'">
        
        <div vc-recaptcha="" update-field="updateField(field, val)" data-register-control="registerControl(control)">

          <xsl:attribute name="key">
            '<xsl:value-of select="SiteKey"></xsl:value-of>'
          </xsl:attribute>
          
          <xsl:attribute name="field">
            <xsl:text>settings.Fields['</xsl:text>
            <xsl:value-of select="Name" />
            <xsl:text>']</xsl:text>
          </xsl:attribute>
          
          <xsl:call-template name="ctl-attr-common">
            <xsl:with-param name="cssclass">
              <xsl:if test="/Form/Settings/ClientSideValidation ='True' and IsRequired='True' and CanValidate = 'True'">
                required
              </xsl:if>
              <xsl:text> </xsl:text>
              <xsl:value-of select="$addclass"/>
            </xsl:with-param>
            <xsl:with-param name="hasId">yes</xsl:with-param>
            <xsl:with-param name="hasName">yes</xsl:with-param>
            <xsl:with-param name="bind">yes</xsl:with-param>
            <xsl:with-param name="touchEvent">keyup</xsl:with-param>
          </xsl:call-template>
        </div>

      </div>

    </div>
  </xsl:template>

</xsl:stylesheet>
