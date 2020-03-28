<?xml version="1.0" encoding="utf-8"?>

<xsl:stylesheet version="1.0"
                xmlns:xsl="http://www.w3.org/1999/XSL/Transform"
                xmlns:utils="af:utils">

    <xsl:import href="attr-common.xsl"/>
    <xsl:import href="attr-container.xsl"/>
    <!--<xsl:import href="label.xsl"/>-->
    <xsl:output method="html" indent="no" omit-xml-declaration="yes" />

    <xsl:template name="ctl-file-manager">
        <xsl:param name="addClass"></xsl:param>
        <xsl:if test="/Form/Settings/LabelAlign != 'inside' and /Form/Settings/LabelAlign != 'top' and DisplayInPopup != 'True'">
            <xsl:call-template name="ctl-label" />
        </xsl:if>
        <div>
            <xsl:call-template name="ctl-attr-container" />
            <xsl:if test="/Form/Settings/LabelAlign = 'top' and DisplayInPopup != 'True'">
                <xsl:call-template name="ctl-label" />
            </xsl:if>

            <xsl:if test="ShortDesc != '' and /Form/Settings/LabelAlign = 'inside' and DisplayInPopup != 'True'">
                <xsl:attribute name="title">
                    <xsl:value-of select="ShortDesc"/>
                </xsl:attribute>
            </xsl:if>
            <div load-on-demand="'filemanager'">
                <div data-settings="settings" submit-data="" filemanager="" data-register-control="registerControl(control)" update-field="updateField(field, val)">
                    <xsl:attribute name="name">
                        <xsl:value-of select="/Form/Settings/BaseId"/>
                        <xsl:value-of select="Name" />
                    </xsl:attribute>

                    <xsl:attribute name="id">
                        <xsl:value-of select="/Form/Settings/BaseId"/>
                        <xsl:value-of select="Name" />
                    </xsl:attribute>

                    <xsl:attribute name="data-field">
                        <xsl:text>settings.Fields['</xsl:text>
                        <xsl:value-of select="Name" />
                        <xsl:text>']</xsl:text>
                    </xsl:attribute>

                    <xsl:attribute name="data-fieldid">
                        <xsl:value-of select="Id"/>
                    </xsl:attribute>

                    <xsl:attribute name="data-container-class">
                        <xsl:value-of select="ContainerClass"/>
                    </xsl:attribute>

                    <xsl:attribute name="data-btn-in-upload">
                        <xsl:value-of select="DisplayBtnInUpload"/>
                    </xsl:attribute>

                    <xsl:attribute name="data-form-btn">
                        <xsl:value-of select="UploadButton"/>
                    </xsl:attribute>

                    <xsl:attribute name="data-btn-in-browser">
                        <xsl:value-of select="DisplayBtnInBrowser"/>
                    </xsl:attribute>

                    <xsl:attribute name="data-display-in-popup">
                        <xsl:value-of select="DisplayInPopup"/>
                    </xsl:attribute>
                  
                  <xsl:attribute name="data-restricted-file-name-characters">
                        <xsl:value-of select="RestrictedFileNameCharacters"/>
                    </xsl:attribute>

                  <xsl:attribute name="data-restricted-error-message">
                        <xsl:value-of select="RestrictedErrorMessage"/>
                    </xsl:attribute>

                    <xsl:attribute name="data-popup-width">
                        <xsl:value-of select="PopupWidth"/>
                    </xsl:attribute>

                    <xsl:attribute name="data-popup-height">
                        <xsl:value-of select="PopupHeight"/>
                    </xsl:attribute>

                    <xsl:attribute name="data-file-browser">
                        <xsl:value-of select="EnableFileBrowser"/>
                    </xsl:attribute>

                    <xsl:attribute name="data-default-browse-view">
                        <xsl:value-of select="DefaultBrowseView"/>
                    </xsl:attribute>

                    <xsl:attribute name="data-file-size-limit">
                        <xsl:value-of select="FileSizeLimit"/>
                    </xsl:attribute>

                    <xsl:attribute name="data-file-ext">
                        <xsl:value-of select="FileExt"/>
                    </xsl:attribute>

                    <xsl:attribute name="data-upload-multiple">
                        <xsl:value-of select="UploadMultiple"/>
                    </xsl:attribute>

                    <xsl:attribute name="data-auto-upload">
                        <xsl:value-of select="AutoUpload"/>
                    </xsl:attribute>

                    <xsl:attribute name="data-display-total-progress-bar">
                        <xsl:value-of select="DisplayTotalProgressBar"/>
                    </xsl:attribute>

                    <xsl:attribute name="data-resize-width">
                        <xsl:value-of select="ResizeWidth"/>
                    </xsl:attribute>

                    <xsl:attribute name="data-resize-height">
                        <xsl:value-of select="ResizeHeight"/>
                    </xsl:attribute>

                    <xsl:attribute name="data-resize-method">
                        <xsl:value-of select="ResizeMethod"/>
                    </xsl:attribute>

                    <xsl:attribute name="data-call-back">
                        <xsl:value-of select="CallBack"/>
                    </xsl:attribute>

                    <xsl:call-template name="ctl-attr-common">
                        <xsl:with-param name="hasId">yes</xsl:with-param>
                        <xsl:with-param name="hasName">yes</xsl:with-param>
                        <xsl:with-param name="bind">yes</xsl:with-param>
                    </xsl:call-template>

                </div>
            </div>
        </div>

    </xsl:template>

</xsl:stylesheet>
