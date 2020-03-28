<?xml version="1.0" encoding="utf-8"?>

<xsl:stylesheet version="1.0"
                xmlns:xsl="http://www.w3.org/1999/XSL/Transform"
                xmlns:utils="af:utils">

    <xsl:import href="label.xsl"/>
    <xsl:import href="attr-common.xsl"/>
    <xsl:import href="attr-container.xsl"/>
    <xsl:output method="html" indent="no" omit-xml-declaration="yes" />

    <xsl:template name="ctl-phone">
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
            <div load-on-demand="'phone'" >
                <!--<xsl:copy-of select="."/>-->
                <!--render the control-->
                <input submit-data="" name="phone" type="tel" autocomplete="tel" phone="" update-field="updateField(field, val)" data-register-control="registerControl(control)">

                    <xsl:attribute name="data-field">
                        <xsl:text>settings.Fields['</xsl:text>
                        <xsl:value-of select="Name" />
                        <xsl:text>']</xsl:text>
                    </xsl:attribute>

                    <xsl:attribute name="international">
                        <xsl:value-of select="International"/>
                    </xsl:attribute>

                    <xsl:attribute name="initial">
                        <xsl:value-of select="Value"/>
                    </xsl:attribute>

                    <xsl:attribute name="initial-country">
                        <xsl:value-of select="InitialCountry"/>
                    </xsl:attribute>

                    <xsl:attribute name="preferred-countries">
                        <xsl:value-of select="PreferredCountries"/>
                    </xsl:attribute>

                    <xsl:attribute name="validation">
                        <xsl:value-of select="Validation"/>
                    </xsl:attribute>
                  
                    <xsl:attribute name="removeflag">
                        <xsl:value-of select="RemoveFlag"/>
                    </xsl:attribute>
                  
                    <xsl:attribute name="placeholder-option">
                        <xsl:value-of select="PlaceholderOption"/>
                    </xsl:attribute>       
                
                    <xsl:if test="PlaceholderOption = 'custom'">
                        <xsl:attribute name="placeholder">
                            <xsl:value-of select="CustomPlaceholder"/>
                        </xsl:attribute>
                    </xsl:if>
                  
                    <xsl:call-template name="ctl-attr-common">
                        <xsl:with-param name="cssclass">
                            <xsl:text>form-control </xsl:text>
                            <xsl:if test="/Form/Settings/ClientSideValidation ='True' and IsRequired='True' and CanValidate = 'True'">required-dnnsf</xsl:if>
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
