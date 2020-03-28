﻿<?xml version="1.0" encoding="utf-8"?>

<xsl:stylesheet version="1.0"
                xmlns:xsl="http://www.w3.org/1999/XSL/Transform"
                xmlns:utils="af:utils">

    <xsl:import href="label.xsl"/>
    <xsl:import href="attr-container.xsl"/>
    <xsl:output method="html" indent="no" omit-xml-declaration="yes" />

    <xsl:template name="ctl-checkbox-list">
        <!--If label is a column, render it here-->
        <xsl:if test="/Form/Settings/LabelAlign != 'inside' and /Form/Settings/LabelAlign != 'top'">
            <xsl:call-template name="ctl-label" />
        </xsl:if>

        <div role="group" aria-label="checkbox list">
            <xsl:attribute name="id">
                <xsl:value-of select="/Form/Settings/BaseId"/>
                <xsl:value-of select="Name"/>
            </xsl:attribute>
            <xsl:call-template name="ctl-attr-container">
                <xsl:with-param name="addClasses">
                    <xsl:text> checkbox-list </xsl:text>
                </xsl:with-param>
            </xsl:call-template>

            <!--If label is top, render it here-->
            <xsl:if test="/Form/Settings/LabelAlign = 'top' or /Form/Settings/LabelAlign = 'inside'">
                <xsl:call-template name="ctl-label" />
            </xsl:if>

            <fieldset>
                <xsl:if test="Legend != ''">
                    <xsl:attribute name="class">
                        <xsl:text>checkboxlist-fieldset </xsl:text>
                        <xsl:value-of select="FieldsetClasses"/>
                    </xsl:attribute>
                    <xsl:attribute name="style">
                        <xsl:value-of select="FieldsetStyles"/>
                    </xsl:attribute>

                    <legend>
                        <xsl:attribute name="class">
                            <xsl:value-of select="LegendClasses"/>
                        </xsl:attribute>
                        <xsl:attribute name="style">
                            <xsl:value-of select="LegendStyles"/>
                        </xsl:attribute>
                        <xsl:value-of select="Legend"/>
                    </legend>
                </xsl:if>
                <div data-ng-cloak="">
                    <xsl:attribute name="class">
                        <xsl:text>checkbox </xsl:text>
                        <xsl:if test="Horizontal = 'True'"> checkbox-inline </xsl:if>
                        <xsl:value-of select="utils:tokenize(CssClass)"/>
                    </xsl:attribute>
                    <xsl:attribute name="data-ng-repeat">
                        <xsl:text>o in form.fields.</xsl:text>
                        <xsl:value-of select="Name"/>
                        <xsl:text>.options</xsl:text>
                    </xsl:attribute>

                    <xsl:attribute name="data-ng-model">
                        <xsl:text>form.fields.</xsl:text>
                        <xsl:value-of select="Name"/>
                        <xsl:text>.value</xsl:text>
                    </xsl:attribute>

                    <xsl:if test="CssStyles != ''">
                        <xsl:attribute name="style">
                            <xsl:value-of select="utils:tokenize(CssStyles)"/>
                        </xsl:attribute>
                    </xsl:if>

                    <label>

                        <xsl:if test="ShortDesc != '' and /Form/Settings/LabelAlign = 'inside'">
                            <xsl:attribute name="title">
                                <xsl:value-of select="ShortDesc"/>
                            </xsl:attribute>
                        </xsl:if>

                        <input type="checkbox">

                            <xsl:attribute name="name">
                                <!--the minus here is important, it triggers some js code-->
                                <xsl:value-of select="/Form/Settings/BaseId"/><xsl:value-of select="Name" />-{{$index}}
                            </xsl:attribute>
                            <xsl:attribute name="field-id">
                                <xsl:value-of select="Name" />
                            </xsl:attribute>

                            <xsl:attribute name="class">
                                <xsl:text>normalCheckBox multiple-choice-checkbox ignore-submit-hidden-fields</xsl:text>
                                <xsl:if test="/Form/Settings/ClientSideValidation ='True' and IsRequired='True' and CanValidate = 'True'"> required-cblist </xsl:if>
                                <xsl:value-of select="utils:tokenize(CssClass)"/>
                                <xsl:if test="ValidationGroup != ''">
                                    <xsl:text> </xsl:text>
                                    <xsl:value-of select="ValidationGroup"/>
                                    <xsl:if test="GroupValidator != ''">
                                        <xsl:text> </xsl:text>
                                        <xsl:value-of select="ValidationGroup"/>-<xsl:value-of select="GroupValidatorJsName"/>
                                    </xsl:if>
                                </xsl:if>
                                <xsl:text> </xsl:text>
                                <xsl:if test="/Form/Settings/ClientSideValidation ='True' and CanValidate = 'True'">
                                    <xsl:value-of select="CustomValidator1JsName"/>
                                    <xsl:text> </xsl:text>
                                    <xsl:value-of select="CustomValidator2JsName" />
                                </xsl:if>
                                <xsl:text> </xsl:text>
                            </xsl:attribute>

                            <xsl:attribute name="data-validation-group">
                                <xsl:value-of select="/Form/Settings/BaseId"/>
                                <xsl:value-of select="Name"/>
                                <xsl:text>-group</xsl:text>
                            </xsl:attribute>

                            <xsl:attribute name="id">
                                <xsl:value-of select="/Form/Settings/BaseId"/>
                                <xsl:value-of select="Name" />-{{$index}}
                            </xsl:attribute>

                            <xsl:attribute name="data-ng-model">
                                <xsl:text>o.selected</xsl:text>
                            </xsl:attribute>

                            <xsl:attribute name="data-ng-truevalue">
                                <xsl:text>o.value</xsl:text>
                            </xsl:attribute>

                            <xsl:attribute name="value">
                                <xsl:text>{{o.value}}</xsl:text>
                            </xsl:attribute>

                            <xsl:attribute name="data-ng-change">
                                <xsl:text>concatValues(form.fields.</xsl:text>
                                <xsl:value-of select="Name"/>
                                <xsl:text>)</xsl:text>
                            </xsl:attribute>

                            <xsl:if test="BindEnable != ''">
                                <xsl:attribute name="data-ng-disabled">
                                    <!-- the exclamation point inverts the logic,
                the property is called Enable to be consistent with other properties -->
                                    <xsl:text>!(</xsl:text>
                                    <xsl:value-of select="utils:parseAngularJs(BindEnable, 'true')"/>
                                    <xsl:text>)</xsl:text>
                                </xsl:attribute>
                            </xsl:if>

                            <xsl:if test="BindOnChange != ''">
                                <xsl:attribute name="data-ng-change">
                                    <xsl:text>concatValues(form.fields.</xsl:text>
                                    <xsl:value-of select="Name"/>
                                    <xsl:text>);</xsl:text>
                                    <xsl:text>form.fields.</xsl:text>
                                    <xsl:value-of select="Name"/>
                                    <xsl:text>.onChange(form, o);</xsl:text>
                                </xsl:attribute>
                            </xsl:if>
                            <xsl:if test="IsEnabled != 'True'">
                                <xsl:attribute name="disabled">disabled</xsl:attribute>
                            </xsl:if>
                        </input>
                        <span data-ng-bind-html="$sce.trustAsHtml(o.text)"></span>
                        <!--<xsl:value-of select="."/>-->
                    </label>
                    <div repeat-done="" ng-if="$last">
                    </div>
                </div>
            </fieldset>

            <div class="err-placeholder"></div>

        </div>

    </xsl:template>

</xsl:stylesheet>
