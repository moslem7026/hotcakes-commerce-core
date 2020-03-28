<?xml version="1.0" encoding="utf-8"?>

<xsl:stylesheet version="1.0"
                xmlns:xsl="http://www.w3.org/1999/XSL/Transform"
                xmlns:utils="af:utils">

    <xsl:import href="attr-common.xsl"/>
    <xsl:import href="attr-container.xsl"/>
    <xsl:output method="html" indent="no" omit-xml-declaration="yes" />

    <xsl:template name="ctl-device-fingerprint">
        <xsl:param name="addclass" />

        <div style="display:none">

            <xsl:call-template name="ctl-attr-container" />

            <div load-on-demand="'devicefingerprint'" >

                <!--render the control-->
                <input type="hidden" ng-cloak="" data-val="" update-field="updateField(field, val)">
                    <xsl:attribute name="data-field">
                        <xsl:text>settings.Fields['</xsl:text>
                        <xsl:value-of select="Name" />
                        <xsl:text>']</xsl:text>
                    </xsl:attribute>

                    <xsl:attribute name="name">
                        <xsl:value-of select="/Form/Settings/BaseId"/>
                        <xsl:value-of select="Name" />
                    </xsl:attribute>

                    <xsl:attribute name="id">
                        <xsl:value-of select="/Form/Settings/BaseId"/>
                        <xsl:value-of select="Name" />
                    </xsl:attribute>

                    <xsl:attribute name="devicefingerprint">
                        <xsl:text></xsl:text>
                    </xsl:attribute>

                    <xsl:attribute name="dev-fp-opts">
                        <xsl:value-of select="FPOptions"/>
                    </xsl:attribute>

                    <xsl:call-template name="ctl-attr-common">
                        <xsl:with-param name="cssclass">
                            <xsl:text>form-control </xsl:text>
                            <xsl:text> device-fingerprint</xsl:text>
                            <xsl:value-of select="$addclass"/>
                        </xsl:with-param>
                        <xsl:with-param name="hasId">yes</xsl:with-param>
                        <xsl:with-param name="hasName">yes</xsl:with-param>
                        <xsl:with-param name="bind">yes</xsl:with-param>
                        <xsl:with-param name="touchEvent">keyup</xsl:with-param>
                    </xsl:call-template>

                    <!--</input>-->
                </input>
            </div>
        </div>

    </xsl:template>

</xsl:stylesheet>
