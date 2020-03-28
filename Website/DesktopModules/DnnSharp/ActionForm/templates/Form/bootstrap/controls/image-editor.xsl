<?xml version="1.0" encoding="utf-8"?>

<xsl:stylesheet version="1.0"
                xmlns:xsl="http://www.w3.org/1999/XSL/Transform"
                xmlns:utils="af:utils">

  <xsl:import href="attr-common.xsl"/>
  <xsl:import href="attr-container.xsl"/>
  <!--<xsl:import href="label.xsl"/>-->
  <xsl:output method="html" indent="no" omit-xml-declaration="yes" />

  <xsl:template name="ctl-image-editor">
    <xsl:param name="addClass"></xsl:param>
    <xsl:if test="/Form/Settings/LabelAlign != 'inside' and /Form/Settings/LabelAlign != 'top'">
      <xsl:call-template name="ctl-label" />
    </xsl:if>
    <div>
      <xsl:call-template name="ctl-attr-container" />
      <xsl:if test="/Form/Settings/LabelAlign = 'top'">
          <xsl:call-template name="ctl-label" />
      </xsl:if>

      <xsl:if test="ShortDesc != '' and /Form/Settings/LabelAlign = 'inside'">
          <xsl:attribute name="title">
              <xsl:value-of select="ShortDesc"/>
          </xsl:attribute>
      </xsl:if>
      <div load-on-demand="'imageeditor'">
        <div data-settings="settings" submit-data="" imageeditor="" data-register-control="registerControl(control)" update-field="updateField(field, val)">
          <xsl:attribute name="name">
            <xsl:value-of select="/Form/Settings/BaseId"/>
            <xsl:value-of select="Name" />
          </xsl:attribute>
          <xsl:if test="IsEnabled != 'True'">
            <xsl:attribute name="disabled">disabled</xsl:attribute>
          </xsl:if>
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

          <xsl:attribute name="data-output">
            <xsl:value-of select="Output"/>
          </xsl:attribute>

          <xsl:attribute name="data-drag-mode">
            <xsl:value-of select="DragMode"/>
          </xsl:attribute>

          <xsl:attribute name="data-crop-box-resizable">
            <xsl:value-of select="CropBoxResizable"/>
          </xsl:attribute>

          <xsl:attribute name="data-crop-box-width">
            <xsl:value-of select="CropBoxWidth"/>
          </xsl:attribute>
          
          <xsl:attribute name="data-crop-box-height">
            <xsl:value-of select="CropBoxHeight"/>
          </xsl:attribute>
          
          <xsl:attribute name="data-popup-width">
            <xsl:value-of select="PopupWidth"/>
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
