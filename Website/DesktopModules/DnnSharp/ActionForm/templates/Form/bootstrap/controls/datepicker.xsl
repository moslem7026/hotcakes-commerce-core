﻿<?xml version="1.0" encoding="utf-8"?>

<xsl:stylesheet version="1.0"
                xmlns:xsl="http://www.w3.org/1999/XSL/Transform"
                xmlns:utils="af:utils">

  <xsl:import href="label.xsl"/>
  <xsl:import href="attr-common.xsl"/>
  <xsl:import href="attr-container.xsl"/>
  <xsl:output method="html" indent="no" omit-xml-declaration="yes" />

  <xsl:template name="ctl-datepicker">

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

      <input type="text" data-dom-watch="change">
        <xsl:call-template name="ctl-attr-common">
          <xsl:with-param name="cssclass">
            <xsl:text>form-control datepicker </xsl:text>
            <xsl:if test="/Form/Settings/ClientSideValidation ='True' and IsRequired='True' and CanValidate = 'True'">required</xsl:if>
          </xsl:with-param>
          <xsl:with-param name="hasId">yes</xsl:with-param>
          <xsl:with-param name="hasName">yes</xsl:with-param>
          <xsl:with-param name="bind">yes</xsl:with-param>
          <xsl:with-param name="touchEvent">keyup</xsl:with-param>
        </xsl:call-template>

        <xsl:call-template name="ctl-attr-placeholder" />

        <xsl:if test="ShortDesc != '' and /Form/Settings/LabelAlign = 'inside'">
          <xsl:attribute name="title">
            <xsl:value-of select="ShortDesc"/>
          </xsl:attribute>
        </xsl:if>

        <xsl:attribute name="data-dateformat">
          <xsl:choose>
            <xsl:when test="DateFormat!=''">
              <xsl:value-of select = "DateFormat"></xsl:value-of>
            </xsl:when>
            <xsl:otherwise>
              <xsl:value-of select="/Form/Settings/DateFormat"/>
            </xsl:otherwise>
          </xsl:choose>
        </xsl:attribute>
        <xsl:attribute name="data-theme">
          <xsl:value-of select="/Form/Settings/jQueryTheme"/>
        </xsl:attribute>
        <!--<xsl:attribute name="value">
                    <xsl:value-of select="Value"/>
                </xsl:attribute>-->
        <xsl:if test="Flag[text()='yearpick']">
          <xsl:attribute name="data-changeyear">true</xsl:attribute>
        </xsl:if>
        <xsl:if test="Flag[text()='monthpick']">
          <xsl:attribute name="data-changemonth">true</xsl:attribute>
        </xsl:if>
        <xsl:if test="YearRange != ''">
          <xsl:attribute name="data-yearrange">
            <xsl:value-of select = "YearRange"></xsl:value-of>
          </xsl:attribute>
        </xsl:if>
        <xsl:if test="JsonOptions != ''">
          <xsl:attribute name="data-opts">
            <xsl:value-of select = "JsonOptions"></xsl:value-of>
          </xsl:attribute>
        </xsl:if>
        <xsl:if test="IsEnabled != 'True'">
          <xsl:attribute name="disabled">disabled</xsl:attribute>
        </xsl:if>
      </input>
    </div>
  </xsl:template>

  <xsl:template name="ctl-dateandtime">

    <!--If label is a column, render it here-->
    <xsl:if test="/Form/Settings/LabelAlign != 'inside' and /Form/Settings/LabelAlign != 'top'">
      <xsl:call-template name="ctl-label" />
    </xsl:if>

    <div>
      <xsl:call-template name="ctl-attr-container">
        <xsl:with-param name="addClasses">
          <xsl:if test="DateTimeIcon = 'True'">
            <xsl:text> fix-date-time </xsl:text>
          </xsl:if>
        </xsl:with-param>
      </xsl:call-template>

      <!--If label is top, render it here-->
      <xsl:if test="/Form/Settings/LabelAlign = 'top'">
        <xsl:call-template name="ctl-label" />
      </xsl:if>

      <xsl:if test="DateTimeIcon = 'True'">
        <div class="container-btn-vertical-center">
          <button type="button" class="btn btn-default">

            <xsl:attribute name="data-ng-click">
              <xsl:text>form.fields.</xsl:text>
              <xsl:value-of select="Name"/>
              <xsl:text>.open = true</xsl:text>
            </xsl:attribute>

            <i class="glyphicon glyphicon-calendar"></i>
          </button>
        </div>
      </xsl:if>

      <input type="text" data-dom-watch="change" data-inputmask-alias="datetime">
        <xsl:call-template name="ctl-attr-common">
          <xsl:with-param name="cssclass">
            <xsl:text>form-control </xsl:text>
            <xsl:if test="DateTimeIcon = 'True'">
              <xsl:text>form-control-inline-block </xsl:text>
            </xsl:if>
            <xsl:text> </xsl:text>
            <xsl:if test="/Form/Settings/ClientSideValidation ='True' and IsRequired='True' and CanValidate = 'True'">required</xsl:if>
          </xsl:with-param>
          <xsl:with-param name="hasId">yes</xsl:with-param>
          <xsl:with-param name="hasName">yes</xsl:with-param>
          <xsl:with-param name="bind">yes</xsl:with-param>
          <xsl:with-param name="touchEvent">keyup</xsl:with-param>
        </xsl:call-template>

        <xsl:call-template name="ctl-attr-placeholder" />

        <xsl:if test="ShortDesc != '' and /Form/Settings/LabelAlign = 'inside'">
          <xsl:attribute name="title">
            <xsl:value-of select="ShortDesc"/>
          </xsl:attribute>
        </xsl:if>

        <xsl:attribute name="initial-value">
          <xsl:value-of select="Value"/>
        </xsl:attribute>

        <xsl:if test="DateTimeIcon = 'True'">
          <xsl:attribute name="data-inputmask-inputformat">
            <xsl:choose>
              <xsl:when test="DateTimeFormat != ''">
                <xsl:value-of select = "DateTimeFormat"></xsl:value-of>
              </xsl:when>
              <xsl:when test="PickerType!=''">
                <xsl:value-of select = "PickerType"></xsl:value-of>
              </xsl:when>
              <xsl:otherwise>
                <xsl:text>MM/dd/yyyy HH:mm</xsl:text>
              </xsl:otherwise>
            </xsl:choose>
          </xsl:attribute>
        </xsl:if>

        <xsl:attribute name="datepicker-inline-mode">
          <xsl:value-of select="InlineMode"/>
        </xsl:attribute>

        <xsl:if test="not(DateTimeIcon) or DateTimeIcon != 'True'">
          <xsl:attribute name="data-ng-focus">
            <xsl:text>form.fields.</xsl:text>
            <xsl:value-of select="Name"/>
            <xsl:text>.open = true</xsl:text>
          </xsl:attribute>
        </xsl:if>

        <xsl:attribute name="is-open">
          <xsl:text>form.fields.</xsl:text>
          <xsl:value-of select="Name"/>
          <xsl:text>.open</xsl:text>
        </xsl:attribute>

        <xsl:attribute name="enable-time">
          <xsl:choose>
            <xsl:when test="(PickerType!='' and contains(PickerType,'HH:mm')) or (DateTimeFormat!='' and contains(DateTimeFormat,'HH:mm'))">
              <xsl:text>true</xsl:text>
            </xsl:when>
            <xsl:otherwise>
              <xsl:text>false</xsl:text>
            </xsl:otherwise>
          </xsl:choose>
        </xsl:attribute>

        <xsl:attribute name="enable-date">
          <xsl:choose>
            <xsl:when test="PickerType!='HH:mm'">
              <xsl:text>true</xsl:text>
            </xsl:when>
            <xsl:otherwise>
              <xsl:text>false</xsl:text>
            </xsl:otherwise>
          </xsl:choose>
        </xsl:attribute>


        <xsl:attribute name="datetime-picker">
          <xsl:choose>
            <xsl:when test="DateTimeFormat!=''">
              <xsl:value-of select = "DateTimeFormat"></xsl:value-of>
            </xsl:when>
            <xsl:when test="PickerType!=''">
              <xsl:value-of select = "PickerType"></xsl:value-of>
            </xsl:when>
            <xsl:otherwise>
              <xsl:text>MM/dd/yyyy HH:mm</xsl:text>
            </xsl:otherwise>
          </xsl:choose>
        </xsl:attribute>


        <xsl:if test="JsonOptions != ''">
          <xsl:attribute name="datepicker-options">
            <xsl:value-of select = "JsonOptions"></xsl:value-of>
          </xsl:attribute>
        </xsl:if>
        <xsl:if test="TimeJsonOptions != ''">
          <xsl:attribute name="timepicker-options">
            <xsl:value-of select = "TimeJsonOptions"></xsl:value-of>
          </xsl:attribute>
        </xsl:if>

        <xsl:choose>
          <xsl:when test="IsEnabled != 'True'">
            <xsl:attribute name="disabled">disabled</xsl:attribute>
          </xsl:when>
          <xsl:otherwise>
            <xsl:attribute name="ng-disabled">
              <xsl:text>form.fields.</xsl:text>
              <xsl:value-of select="Name" />
              <xsl:text>.open == true</xsl:text>
            </xsl:attribute>
          </xsl:otherwise>
        </xsl:choose>

      </input>

      <!--<pre>
        <xsl:value-of select="."/>
      </pre>-->
    </div>
  </xsl:template>

</xsl:stylesheet>
