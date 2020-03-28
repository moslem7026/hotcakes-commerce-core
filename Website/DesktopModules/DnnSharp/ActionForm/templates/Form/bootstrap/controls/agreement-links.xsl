<?xml version="1.0" encoding="utf-8"?>

<xsl:stylesheet version="1.0"
                xmlns:xsl="http://www.w3.org/1999/XSL/Transform"
                xmlns:utils="af:utils">

    <xsl:import href="label.xsl"/>
    <xsl:import href="attr-common.xsl"/>
    <xsl:import href="attr-container.xsl"/>
    <xsl:output method="html" indent="no" omit-xml-declaration="yes" />

    <xsl:template name="ctl-agreement-links">

        <div>
            <xsl:call-template name="ctl-attr-container">
                <xsl:with-param name="addClasses">
                    <xsl:text> form-checkbox-agree-to-terms-popup </xsl:text>
                    <xsl:if test="ColOffset > 0">
                        <xsl:text> col-sm-offset-</xsl:text>
                        <xsl:value-of select="ColOffset"/>
                    </xsl:if>
                </xsl:with-param>
                <xsl:with-param name="withLabelColumn">false</xsl:with-param>
            </xsl:call-template>

            <div class="agreement-links">
                <label>
                    <input type="checkbox">
                        <xsl:call-template name="ctl-attr-common">
                            <xsl:with-param name="cssclass">
                                <xsl:text> normalCheckBox ignore-submit-hidden-fields </xsl:text>
                                <xsl:if test="/Form/Settings/ClientSideValidation ='True' and IsRequired='True' and CanValidate = 'True'"> required </xsl:if>
                            </xsl:with-param>
                            <xsl:with-param name="hasId">yes</xsl:with-param>
                            <xsl:with-param name="hasName">yes</xsl:with-param>
                            <xsl:with-param name="bind">yes</xsl:with-param>
                            <xsl:with-param name="touchEvent">click</xsl:with-param>
                        </xsl:call-template>
                        <xsl:attribute name="id">
                            <xsl:value-of select="/Form/Settings/BaseId"/>
                            <xsl:value-of select="Name" />
                        </xsl:attribute>
                        <xsl:if test="Value = 'True'">
                            <xsl:attribute name="checked">checked</xsl:attribute>
                        </xsl:if>
                        <xsl:if test="IsEnabled != 'True'">
                            <xsl:attribute name="disabled">disabled</xsl:attribute>
                        </xsl:if>
                    </input>
                  <!--<pre>
                    <xsl:copy-of select="."/>
                  </pre>-->
                  <div load-on-demand="'agreementlinks'">
                    <span agreementlinks="">
                      <xsl:attribute name="data-ng-model">
                        <xsl:text>form.fields.</xsl:text>
                        <xsl:value-of select="Name"/>
                        <xsl:text>.value</xsl:text>
                      </xsl:attribute>
                      <xsl:attribute name="data-field">
                        <xsl:text>settings.Fields['</xsl:text>
                        <xsl:value-of select="Name" />
                        <xsl:text>']</xsl:text>
                      </xsl:attribute>
                      <xsl:attribute name="content">
                        <xsl:value-of select="TermsAndConditions"/>
                      </xsl:attribute>
                      <xsl:attribute name="enforce">
                        <xsl:value-of select="EnforceReading"/>
                      </xsl:attribute>
                      <xsl:attribute name="separator">
                        <xsl:value-of select="WordBetween"/>
                      </xsl:attribute>
                      <xsl:attribute name="popup-width">
                        <xsl:value-of select="PopupWidth"/>
                      </xsl:attribute>
                      <xsl:attribute name="popup-height">
                        <xsl:value-of select="PopupHeight"/>
                      </xsl:attribute>
                      <xsl:attribute name="close-button">
                        <xsl:value-of select="CloseButton"/>
                      </xsl:attribute>
                    </span>
                  </div>
                </label>
              <div class="err-placeholder"></div>
            </div>
        </div>


    </xsl:template>

</xsl:stylesheet>
