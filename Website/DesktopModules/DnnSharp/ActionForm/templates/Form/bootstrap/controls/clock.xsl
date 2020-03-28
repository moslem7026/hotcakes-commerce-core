<?xml version="1.0" encoding="utf-8"?>

<xsl:stylesheet version="1.0"
                xmlns:xsl="http://www.w3.org/1999/XSL/Transform"
                xmlns:utils="af:utils">

    <xsl:import href="label.xsl"/>
    <xsl:import href="attr-common.xsl"/>
    <xsl:import href="attr-container.xsl"/>
    <xsl:output method="html" indent="no" omit-xml-declaration="yes" />

    <xsl:template name="ctl-clock">
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
            <div load-on-demand="'clock'" >
                <!--<xsl:copy-of select="."/>-->
                <!--render the control-->
                <clock update-field="updateField(field, val)">
                    <xsl:attribute name="data-field">
                        <xsl:text>settings.Fields['</xsl:text>
                        <xsl:value-of select="Name" />
                        <xsl:text>']</xsl:text>
                    </xsl:attribute>
                    <xsl:attribute name="id">
                        <xsl:value-of select="/Form/Settings/BaseId"/>
                        <xsl:value-of select="Name" />
                    </xsl:attribute>
                    <xsl:attribute name="digital-format">
                        <xsl:value-of select="ClockDigitalFormat"/>
                    </xsl:attribute>
                    <xsl:attribute name="gmt-offset">
                        <xsl:value-of select="ClockGMTOffset"/>
                    </xsl:attribute>
                    <xsl:attribute name="clock-type">
                        <xsl:value-of select="ClockType"/>
                    </xsl:attribute>
                    <xsl:attribute name="show-gmt-info">
                        <xsl:value-of select="ClockGMTInfo"/>
                    </xsl:attribute>
                    <xsl:attribute name="theme">
                        <xsl:value-of select="ClockTheme"/>
                    </xsl:attribute>
                    <xsl:attribute name="start-time">
                        <xsl:value-of select="Value"/>
                    </xsl:attribute>
                    <xsl:attribute name="digital-styles">
                        <xsl:value-of select="DigitalStyles"/>
                    </xsl:attribute>

                    <xsl:if test="ShortDesc != '' and /Form/Settings/LabelAlign = 'inside'">
                        <xsl:attribute name="title">
                            <xsl:value-of select="ShortDesc"/>
                        </xsl:attribute>
                    </xsl:if>

                    <xsl:call-template name="ctl-attr-common">
                        <xsl:with-param name="cssclass">
                            <xsl:text>form-control </xsl:text>
                            <xsl:if test="/Form/Settings/ClientSideValidation ='True' and IsRequired='True' and CanValidate = 'True'">required</xsl:if>
                            <xsl:text> clock-field</xsl:text>
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
                    <!--</input>-->
                </clock>
            </div>
        </div>

    </xsl:template>

</xsl:stylesheet>
