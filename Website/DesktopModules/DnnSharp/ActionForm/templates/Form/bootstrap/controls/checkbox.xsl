﻿<?xml version="1.0" encoding="utf-8"?>

<xsl:stylesheet version="1.0"
                xmlns:xsl="http://www.w3.org/1999/XSL/Transform"
                xmlns:utils="af:utils">

    <xsl:import href="label.xsl"/>
    <xsl:import href="attr-common.xsl"/>
    <xsl:import href="attr-container.xsl"/>
    <xsl:output method="html" indent="no" omit-xml-declaration="yes" />

    <xsl:template name="ctl-checkbox">

        <div>
            <xsl:call-template name="ctl-attr-container">
                <xsl:with-param name="addClasses">
                    <xsl:text> form-checkbox </xsl:text>
                    <xsl:if test="ColOffset > 0">
                        <xsl:text> col-sm-offset-</xsl:text>
                        <xsl:value-of select="ColOffset"/>
                    </xsl:if>
                </xsl:with-param>
                <xsl:with-param name="withLabelColumn">false</xsl:with-param>
            </xsl:call-template>

            <div class="checkbox">
                <label class="">
                  <xsl:attribute name="style">
                    <xsl:value-of select="utils:tokenize(LabelCssStyles)"/>
                  </xsl:attribute>

                    <xsl:if test="ShortDesc != '' and /Form/Settings/LabelAlign = 'inside'">
                        <xsl:attribute name="title">
                            <xsl:value-of select="ShortDesc"/>
                        </xsl:attribute>
                    </xsl:if>
                    
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
                        <xsl:if test="Value = 'True'">
                            <xsl:attribute name="checked">checked</xsl:attribute>
                        </xsl:if>
                        <xsl:if test="IsEnabled != 'True'">
                            <xsl:attribute name="disabled">disabled</xsl:attribute>
                        </xsl:if>
                    </input>
                  <span>
                    <xsl:value-of select="TitleTokenized"/>
                  </span>
                  <xsl:if test="ShortDescTokenized != ''">
                    <xsl:text> </xsl:text>
                    <xsl:if test="/Form/Settings/ShowTooltips = 'True'">
                      <span class="glyphicon glyphicon-info-sign popupOnHover">
                        <xsl:attribute name="data-placement">
                          <xsl:text>top</xsl:text>
                        </xsl:attribute>
                        <xsl:if test="/Form/Settings/ShowTooltipTitle = 'True'">
                          <xsl:attribute name="data-original-title">
                            <xsl:value-of select="TitleTokenized"/>
                          </xsl:attribute>
                        </xsl:if>
                        <xsl:attribute name="data-container">
                          <xsl:text>body</xsl:text>
                        </xsl:attribute>
                        <xsl:attribute name="data-content">
                          <xsl:value-of select="ShortDescTokenized" />
                        </xsl:attribute>
                        <xsl:attribute name="data-html">
                          <xsl:text>true</xsl:text>
                        </xsl:attribute>
                      </span>
                    </xsl:if>
                  </xsl:if>
                </label>
                <div class="err-placeholder"></div>
            </div>
        </div>

    </xsl:template>

</xsl:stylesheet>
