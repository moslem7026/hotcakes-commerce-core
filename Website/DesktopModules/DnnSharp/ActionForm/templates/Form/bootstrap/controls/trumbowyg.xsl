<?xml version="1.0" encoding="utf-8"?>

<xsl:stylesheet version="1.0"
                xmlns:xsl="http://www.w3.org/1999/XSL/Transform"
                xmlns:utils="af:utils">

  <xsl:import href="label.xsl"/>
  <xsl:import href="attr-common.xsl"/>
  <xsl:import href="attr-container.xsl"/>
  <xsl:output method="html" indent="no" omit-xml-declaration="yes" />

  <xsl:template name="ctl-trumbowyg">
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
      <div load-on-demand="'trumbowyg'">
        <!--render the control-->
        <div trumbowyg="" data-itemvalue="value" update-field="updateField(field, val)">

          <xsl:if test="IsEnabled != 'True'">
            <xsl:attribute name="disabled">disabled</xsl:attribute>
          </xsl:if>

          <xsl:attribute name="initial-value">
            <xsl:value-of select="InitalValue"/>
          </xsl:attribute>
          <xsl:if test="ImageManager!=''">
             <xsl:attribute name="file-manager">
              <xsl:value-of select="/Form/Settings/BaseId"/>
              <xsl:value-of select="ImageManager"/>
            </xsl:attribute>
          </xsl:if>
         

          <xsl:attribute name="btns">
            <xsl:value-of select="Buttons"/>
          </xsl:attribute>

          <xsl:attribute name="btns-def">
            <xsl:value-of select="ButtonDropdowns"/>
          </xsl:attribute>

          <xsl:attribute name="btns-grps">
            <xsl:value-of select="BtnGroups"/>
          </xsl:attribute>
          
          <xsl:attribute name="ngdisabled">
            <xsl:value-of select="IsEnabled"/>
          </xsl:attribute>

          <xsl:attribute name="lang">
            <xsl:value-of select="Language"/>
          </xsl:attribute>

          <xsl:attribute name="theme">
            <xsl:value-of select="DarkTheme"/>
          </xsl:attribute>
          
          <xsl:attribute name="removeformatpastedoption">
            <xsl:value-of select="RemoveFormatPastedOption"/>
          </xsl:attribute>
          
          <xsl:attribute name="tagstoremoveoption">
            <xsl:value-of select="TagsToRemoveOption"/>
          </xsl:attribute>
          
          <xsl:attribute name="tagstoremove">
            <xsl:value-of select="TagsToRemove"/>
          </xsl:attribute>
          
          <xsl:attribute name="tagstokeepoption">
            <xsl:value-of select="TagsToKeepOption"/>
          </xsl:attribute>
          
          <xsl:attribute name="tagstokeep">
            <xsl:value-of select="TagsToKeep"/>
          </xsl:attribute>
          
          <xsl:attribute name="semantic">
            <xsl:value-of select="Semantic"/>
          </xsl:attribute>
          
          <xsl:if test="ShortDesc != '' and /Form/Settings/LabelAlign = 'inside'">
            <xsl:attribute name="title">
              <xsl:value-of select="ShortDesc"/>
            </xsl:attribute>
          </xsl:if>

          <xsl:call-template name="ctl-attr-common">
            <xsl:with-param name="cssclass">
              <xsl:value-of select="$addclass"/>
              <xsl:text> </xsl:text>
              <xsl:if test="/Form/Settings/ClientSideValidation ='True' and IsRequired='True' and CanValidate = 'True'">required-dnnsf</xsl:if>
            </xsl:with-param>
            <xsl:with-param name="hasId">yes</xsl:with-param>
            <xsl:with-param name="hasName">yes</xsl:with-param>
            <xsl:with-param name="bind">yes</xsl:with-param>
          </xsl:call-template>
          <xsl:call-template name="ctl-attr-placeholder" />
        </div>
      </div>
          <span class="err-placeholder"></span>
    </div>

  </xsl:template>

</xsl:stylesheet>
