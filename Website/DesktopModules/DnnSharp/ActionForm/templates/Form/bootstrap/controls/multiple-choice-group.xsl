<?xml version="1.0" encoding="utf-8"?>

<xsl:stylesheet version="1.0"
                xmlns:xsl="http://www.w3.org/1999/XSL/Transform"
                xmlns:msxsl="urn:schemas-microsoft-com:xslt"
                xmlns:utils="af:utils">

  <xsl:import href="attr-container.xsl"/>
  <xsl:import href="radio.xsl"/>
  <xsl:import href="checkbox-list.xsl"/>
  <xsl:output method="html" indent="no" omit-xml-declaration="yes" />

  <!--This template renders button bar for actions-->
  <!--<xsl:template match="/Form/Settings/RenderAction">
        
    </xsl:template>-->

  <!--This template is used to render a button bar, called from template above and /main.xsl-->
  <xsl:template name="ctl-multiple-choice-group">

    <div load-on-demand="'multipleChoiceGroup'">
      <div multiple-choice-group="">
        <xsl:attribute name="class-to-add">
          <xsl:text>af-</xsl:text>
          <xsl:value-of select="Name" />
        </xsl:attribute>
        <xsl:attribute name="number-of-columns-for-label">
          <xsl:value-of select="NumberOfColumnsForLabel"/>
        </xsl:attribute>
      </div>
    </div>

    <div>
      <xsl:attribute name="class">
        <xsl:text>field-container multiple-choice-group-container </xsl:text>
        <xsl:text>af-</xsl:text>
        <xsl:value-of select="Name" />
        <xsl:text> </xsl:text>
        <xsl:value-of select="utils:tokenize(CssClass)"/>
      </xsl:attribute>

      <xsl:attribute name="style">
        <xsl:if test="CssStyles != ''">
          <xsl:value-of select="utils:tokenize(CssStyles)"/>
        </xsl:if>
      </xsl:attribute>

      <xsl:if test="IsEnabled = 'True'">
        <xsl:for-each select="MultipleChoiceFieldsList/Item">
          <xsl:for-each select="/Form/Fields/Field[Name=current()/text()]">
            <xsl:choose>
              <xsl:when test ="InputType = 'closed-multiple-checkbox'">
                <xsl:call-template name="ctl-checkbox-list" />
              </xsl:when>
              <xsl:otherwise>
                <xsl:call-template name="ctl-radio" />
              </xsl:otherwise>
            </xsl:choose>
          </xsl:for-each>
          <xsl:text> </xsl:text>
        </xsl:for-each>
      </xsl:if>
    </div>

  </xsl:template>

</xsl:stylesheet>
