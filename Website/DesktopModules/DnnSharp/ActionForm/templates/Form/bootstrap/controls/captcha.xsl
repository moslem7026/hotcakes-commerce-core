<?xml version="1.0" encoding="utf-8"?>

<xsl:stylesheet version="1.0"
                xmlns:xsl="http://www.w3.org/1999/XSL/Transform"
                xmlns:utils="af:utils">

  <xsl:import href="label.xsl"/>
  <xsl:import href="attr-common.xsl"/>
  <xsl:import href="attr-container.xsl"/>
  <xsl:output method="html" indent="no" omit-xml-declaration="yes" />

  <xsl:template name="ctl-captcha">

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
      <div class="row">

        <div>
          <xsl:attribute name="class">
            <xsl:choose>
              <xsl:when test="OneLine = 'True'">col-sm-6</xsl:when>
              <xsl:otherwise>col-sm-12</xsl:otherwise>
            </xsl:choose>
          </xsl:attribute>

          <xsl:if test="ShortDesc != '' and /Form/Settings/LabelAlign = 'inside'">
            <xsl:attribute name="title">
              <xsl:value-of select="ShortDesc"/>
            </xsl:attribute>
          </xsl:if>
          <div>
            <!--<xsl:if test="ShowRefreshButton = 'True' and OneLine = 'True'">-->
            <xsl:attribute name="class">
              <xsl:text>col-xs-10</xsl:text>
            </xsl:attribute>
            <!--</xsl:if>-->
            <img class="imgcode">
              <xsl:attribute name="src">
                <xsl:value-of select="Data/ImageUrl"/>
              </xsl:attribute>
              <xsl:attribute name="data-af-field">
                <xsl:value-of select="Name"/>
              </xsl:attribute>
              <xsl:attribute name="data-fieldid">
                <xsl:value-of select="Id"/>
              </xsl:attribute>
              <xsl:attribute name="style">
                <xsl:text>margin: 0px 4px 2px 0; width: 100%;</xsl:text>
                <xsl:if test="OneLine = 'True'"> height: 33px;</xsl:if>
              </xsl:attribute>
            </img>
          </div>
          <xsl:if test="ShowRefreshButton != 'False'">
            <div>
              <button type="button" class="btn btn-sm btn-default">
                <xsl:attribute name="ng-click">
                  <xsl:text>refreshCaptcha(</xsl:text>
                  <xsl:value-of select="/Form/Settings/ModuleId"/>
                  <xsl:text>,'</xsl:text>
                  <xsl:value-of select="Name"/>
                  <xsl:text>');</xsl:text>
                </xsl:attribute>
                <i class="glyphicon glyphicon-refresh"></i>
              </button>
            </div>
          </xsl:if>
        </div>

        <input type="hidden">
          <xsl:attribute name="name">
            <xsl:value-of select="/Form/Settings/BaseId"/>
            <xsl:value-of select="Name"/>
            <xsl:text>captchaenc</xsl:text>
          </xsl:attribute>
          <xsl:attribute name="id">
            <xsl:value-of select="/Form/Settings/BaseId"/>
            <xsl:value-of select="Name" />
            <xsl:text>captchaenc</xsl:text>
          </xsl:attribute>
          <xsl:attribute name="value">
            <xsl:value-of select="Data/CaptchaEncrypted" />
          </xsl:attribute>
          <xsl:attribute name="data-ng-model">
            <xsl:text>form.fields.</xsl:text>
            <xsl:value-of select="Name"/>
            <xsl:text>.value</xsl:text>
          </xsl:attribute>
        </input>

        <div>
          <xsl:attribute name="class">
            <xsl:choose>
              <xsl:when test="OneLine = 'True'">col-sm-6</xsl:when>
              <xsl:otherwise>col-sm-12</xsl:otherwise>
            </xsl:choose>
          </xsl:attribute>

          <input type="text">
            <xsl:call-template name="ctl-attr-common">
              <xsl:with-param name="cssclass">
                <xsl:text>form-control inpcode</xsl:text>
                <xsl:if test="/Form/Settings/ClientSideValidation ='True' and IsRequired='True' and CanValidate = 'True'"> required</xsl:if>
              </xsl:with-param>
              <xsl:with-param name="hasId">yes</xsl:with-param>
              <xsl:with-param name="hasName">yes</xsl:with-param>
            </xsl:call-template>

            <xsl:call-template name="ctl-attr-placeholder" />

            <xsl:attribute name="value">
              <xsl:value-of select="Value"/>
            </xsl:attribute>
            <xsl:attribute name="data-ng-model">
              <xsl:text>form.fields.</xsl:text>
              <xsl:value-of select="Name"/>
              <xsl:text>.tbValue</xsl:text>
            </xsl:attribute>
          </input>
        </div>
      </div>
    </div>
  </xsl:template>

</xsl:stylesheet>