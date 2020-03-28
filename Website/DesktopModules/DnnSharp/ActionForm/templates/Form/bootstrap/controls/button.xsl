﻿<?xml version="1.0" encoding="utf-8"?>

<xsl:stylesheet version="1.0"
                xmlns:xsl="http://www.w3.org/1999/XSL/Transform"
                xmlns:utils="af:utils">

    <xsl:import href="attr-container.xsl"/>
    <xsl:output method="html" indent="no" omit-xml-declaration="yes" />

    <xsl:template name="ctl-button">

        <button type ="button">
            <xsl:if test="IsEnabled != 'True'">
                <xsl:attribute name="disabled">disabled</xsl:attribute>
            </xsl:if>
          <xsl:attribute name="data-loading-text">
            <xsl:if test="not(ButtonExecutingActionMessage) or ButtonExecutingActionMessage != 'custom'">
              <xsl:value-of select="utils:localize('button.pleaseWait', 'Please Wait...')"></xsl:value-of>
            </xsl:if>
            <xsl:if test="ButtonExecutingActionMessage = 'custom'">
              <xsl:value-of select="ButtonWaitingMessage"/>
            </xsl:if>
          </xsl:attribute>

            <xsl:attribute name="id">
                <xsl:value-of select="/Form/Settings/BaseId"/>
                <xsl:value-of select="Name"/>
            </xsl:attribute>
            <xsl:attribute name="data-name">
                <xsl:value-of select="Name"></xsl:value-of>
            </xsl:attribute>
            <xsl:attribute name="class">
                btn submit form-button af-btn-loading
                <xsl:text> </xsl:text>
                <xsl:value-of select="ButtonSize"></xsl:value-of>
                <xsl:text> </xsl:text>
                <xsl:choose>
                    <xsl:when test="ButtonType!=''">
                        <xsl:value-of select="ButtonType"></xsl:value-of>
                    </xsl:when>
                    <xsl:otherwise>btn-default</xsl:otherwise>
                </xsl:choose>

                <!--apply alignment only when not in custom layout-->
                <xsl:text> </xsl:text>
                <xsl:if test="/Form/Settings/RenderContext = 'Form'">
                    <xsl:if test="ButtonAlign = 'block'"> btn-block </xsl:if>
                </xsl:if>
                <xsl:text> </xsl:text>
                <xsl:value-of select="utils:tokenize(CssClass)"/>
            </xsl:attribute>

            <xsl:attribute name="style">
                <xsl:if test="CssStyles != ''">
                    <xsl:value-of select="utils:tokenize(CssStyles)"/>
                </xsl:if>
            </xsl:attribute>

            <xsl:if test="ShortDesc != ''">
                <xsl:attribute name="title">
                    <xsl:value-of select="ShortDesc"/>
                </xsl:attribute>
            </xsl:if>

            <xsl:if test="BindEnable != ''">
                <xsl:attribute name="data-ng-disabled">
                    <!-- the exclamation point inverts the logic,
                the property is called Enable to be consistent with other properties -->
                    <xsl:text>!(</xsl:text>
                    <xsl:value-of select="utils:parseAngularJs(BindEnable, 'true')"/>
                    <xsl:text>)</xsl:text>
                </xsl:attribute>
            </xsl:if>

            <xsl:if test="BindShow != ''">
                <xsl:attribute name="data-ng-show">
                    <xsl:value-of select="utils:parseAngularJs(BindShow, 'true')"/>
                </xsl:attribute>
            </xsl:if>

            <xsl:if test="BindOnChange != ''">
                <xsl:attribute name="data-ng-click">
                    <xsl:text>form.fields.</xsl:text>
                    <xsl:value-of select="Name"/>
                    <xsl:text>.onChange(form);</xsl:text>
                </xsl:attribute>
            </xsl:if>

            <xsl:if test="not(CausesValidation) or CausesValidation != 'False'">
                <xsl:attribute name="data-validation">on</xsl:attribute>
            </xsl:if>
          
            <xsl:if test="not(IsDefaultButton) or IsDefaultButton != 'False'">
              <xsl:attribute name="data-default-button">on</xsl:attribute>
            </xsl:if>
          
            <xsl:attribute name="data-submiturl">
                <xsl:value-of select="/Form/Settings/AjaxSubmitUrl"/>&amp;event=click&amp;b=<xsl:value-of select="Id"/>
            </xsl:attribute>

            <xsl:attribute name="data-submitquery">
                <xsl:value-of select="/Form/Settings/AjaxSubmitQuery"/>&amp;event=click&amp;b=<xsl:value-of select="Id"/>
            </xsl:attribute>

            <xsl:value-of select="TitleTokenized"/>

            <xsl:if test="ButtonIcon!=''">
                <i>
                    <xsl:attribute name="class">
                        <xsl:text>fa fa-action-form </xsl:text>
                        <xsl:value-of select="ButtonIcon"/>
                    </xsl:attribute>
                </i>
            </xsl:if>
        </button>
    </xsl:template>

</xsl:stylesheet>
