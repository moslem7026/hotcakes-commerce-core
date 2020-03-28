﻿<?xml version="1.0" encoding="utf-8"?>

<xsl:stylesheet version="1.0"
                xmlns:xsl="http://www.w3.org/1999/XSL/Transform"
                xmlns:utils="af:utils">

    <xsl:import href="label.xsl"/>
    <xsl:import href="attr-container.xsl"/>
    <xsl:output method="html" indent="no" omit-xml-declaration="yes" />

    <xsl:template name="ctl-dropdown-checkboxes">
        <!--If label is a column, render it here-->
        <xsl:if test="/Form/Settings/LabelAlign != 'inside' and /Form/Settings/LabelAlign != 'top'">
            <xsl:call-template name="ctl-label" />
        </xsl:if>

        <div>
            <xsl:call-template name="ctl-attr-container">
                <xsl:with-param name="addClasses">
                    <xsl:text> checkbox-list </xsl:text>
                </xsl:with-param>
            </xsl:call-template>

            <!--If label is top, render it here-->
            <xsl:if test="/Form/Settings/LabelAlign = 'top'">
                <xsl:call-template name="ctl-label" />
            </xsl:if>

            <div class="input-group">

                <!--{{<xsl:text>form.fields.</xsl:text>
                        <xsl:value-of select="Name"/>}}-->
                <input type="text" readonly="readonly" style="cursor: text; background-color: #fff;">
                    <xsl:attribute name="class">
                        <xsl:text>form-control </xsl:text>
                        <xsl:if test="/Form/Settings/ClientSideValidation ='True' and IsRequired='True' and CanValidate = 'True'">
                            required-ddwithcb
                        </xsl:if>
                    </xsl:attribute>
                    <xsl:attribute name="data-ng-model">
                        <xsl:text>form.fields.</xsl:text>
                        <xsl:value-of select="Name"/>
                        <xsl:text>.text</xsl:text>
                    </xsl:attribute>
                    <xsl:attribute name="name">
                        <xsl:value-of select="/Form/Settings/BaseId"/>
                        <xsl:value-of select="Name" />
                    </xsl:attribute>
                    <xsl:attribute name="id">
                        <xsl:value-of select="/Form/Settings/BaseId"/>
                        <xsl:value-of select="Name" />
                    </xsl:attribute>
                    <xsl:attribute name="data-val">
                        <xsl:text>{{ form.fields.</xsl:text>
                        <xsl:value-of select="Name"/>
                        <xsl:text>.value }}</xsl:text>
                    </xsl:attribute>
                    <xsl:attribute name="data-ng-click">
                        <xsl:text>form.fields.</xsl:text>
                        <xsl:value-of select="Name"/>
                        <xsl:text>.show = true;</xsl:text>
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
                    <xsl:if test="IsEnabled != 'True'">
                        <xsl:attribute name="disabled">disabled</xsl:attribute>
                    </xsl:if>
                    <!--<xsl:call-template name="ctl-attr-placeholder" />-->
                </input>

                <span class="input-group-btn">
                    <button type="button" class="btn btn-default">
                        <xsl:attribute name="dropdown-watch"></xsl:attribute>
                        <xsl:attribute name="disable-checkboxes">
                            <xsl:value-of select="DisableCheckboxes"></xsl:value-of>
                        </xsl:attribute>
                        <xsl:attribute name="dropdown-name">
                            <xsl:text>form.fields.</xsl:text>
                            <xsl:value-of select="Name"/>
                        </xsl:attribute>
                        <xsl:attribute name="data-ng-click">
                            <xsl:text>form.fields.</xsl:text>
                            <xsl:value-of select="Name"/>
                            <xsl:text>.show = !</xsl:text>
                            <xsl:text>form.fields.</xsl:text>
                            <xsl:value-of select="Name"/>
                            <xsl:text>.show;</xsl:text>
                        </xsl:attribute>

                        <xsl:if test="IsEnabled != 'True'">
                            <xsl:attribute name="disabled">disabled</xsl:attribute>
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

                        <xsl:attribute name="title">
                            <xsl:text>{{ form.fields.</xsl:text>
                            <xsl:value-of select="Name"/>
                            <xsl:text>.show ? "Click to collapse" : "Click to expand" }}</xsl:text>

                        </xsl:attribute>

                        <span class="glyphicon glyphicon-chevron-down">
                            <xsl:attribute name="data-ng-class">
                                <xsl:text>{ 'glyphicon-chevron-down': </xsl:text>
                                <xsl:text>!form.fields.</xsl:text>
                                <xsl:value-of select="Name"/>
                                <xsl:text>.show, 'glyphicon-chevron-up':</xsl:text>
                                <xsl:text>form.fields.</xsl:text>
                                <xsl:value-of select="Name"/>
                                <xsl:text>.show }</xsl:text>
                            </xsl:attribute>
                        </span>
                    </button>
                </span>
            </div>

            <div data-ng-cloak="" class="dropdown-absolute">
                <div class="panel panel-default dropdown-panel">

                    <xsl:attribute name="data-ng-show">
                        <xsl:text>form.fields.</xsl:text>
                        <xsl:value-of select="Name"/>
                        <xsl:text>.show</xsl:text>
                    </xsl:attribute>

                    <div style="text-align: center;">
                        <xsl:if test="string-length(MaxSelection)=0 or MaxSelection = ''">
                            <a href="">
                                <xsl:attribute name="data-ng-click">
                                    <xsl:text>form.fields.</xsl:text>
                                    <xsl:value-of select="Name"/>
                                    <xsl:text>.checkAll(); concatValues(form.fields.</xsl:text>
                                    <xsl:value-of select="Name"/>
                                    <xsl:text>)</xsl:text>
                                </xsl:attribute>
                                <xsl:value-of select="utils:localize('button.selectall', 'Select all')"></xsl:value-of>
                            </a>
                            |
                        </xsl:if>

                        <a href="">
                            <xsl:attribute name="data-ng-click">
                                <xsl:text>form.fields.</xsl:text>
                                <xsl:value-of select="Name"/>
                                <xsl:text>.uncheckAll(); concatValues(form.fields.</xsl:text>
                                <xsl:value-of select="Name"/>
                                <xsl:text>)</xsl:text>
                            </xsl:attribute>
                            <xsl:value-of select="utils:localize('button.clearall', 'Clear all')"></xsl:value-of>
                        </a>
                    </div>

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
                        <div style="" >

                            <!--<div style="min-width: 240px;">-->
                            <xsl:attribute name="class">
                                <xsl:text>checkbox </xsl:text>
                                <!--<xsl:text>checkbox checkbox-inline </xsl:text>-->
                                <xsl:value-of select="utils:tokenize(CssClass)"/>
                            </xsl:attribute>

                            <xsl:attribute name="data-ng-repeat">
                                <xsl:text>o in form.fields.</xsl:text>
                                <xsl:value-of select="Name"/>
                                <xsl:text>.options</xsl:text>
                                <!--<xsl:if test="LinkTo != ''">
                                <xsl:text>| filter: fnFactoryFilterByField('</xsl:text>
                                <xsl:value-of select="Name" />
                                <xsl:text>','</xsl:text>
                                <xsl:value-of select="LinkTo" />
                                <xsl:text>')</xsl:text>
                            </xsl:if>-->
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

                                    <xsl:if test="MaxSelection!=''">
                                        <xsl:attribute name="max-selection">
                                            <xsl:value-of select="utils:tokenize(MaxSelection)"/>
                                        </xsl:attribute>
                                    </xsl:if>

                                    <xsl:attribute name="data-value">
                                        <xsl:text>form.fields.</xsl:text>
                                        <xsl:value-of select="Name"/>
                                        <xsl:text>.value</xsl:text>
                                    </xsl:attribute>

                                    <xsl:attribute name="class">
                                        <xsl:text>normalCheckBox ddwcb-checkbox ignore-submit-hidden-fields </xsl:text>
                                        <xsl:if test="/Form/Settings/ClientSideValidation ='True' and IsRequired='True' and CanValidate = 'True'"> required-cblist </xsl:if>
                                    </xsl:attribute>

                                    <xsl:attribute name="data-validation-group">
                                        <xsl:value-of select="/Form/Settings/BaseId"/>
                                        <xsl:value-of select="Name"/>
                                        <xsl:text>-group</xsl:text>
                                    </xsl:attribute>

                                    <xsl:attribute name="name">
                                        <!--the minus here is important, it triggers some js code-->
                                        <xsl:value-of select="/Form/Settings/BaseId"/><xsl:value-of select="Name" />-{{$index}}
                                    </xsl:attribute>
                                    <xsl:attribute name="id">
                                        <xsl:value-of select="/Form/Settings/BaseId"/><xsl:value-of select="Name" />{{$index}}
                                    </xsl:attribute>

                                    <xsl:attribute name="data-ng-model">
                                        <xsl:text>o.selected</xsl:text>
                                    </xsl:attribute>

                                    <xsl:attribute name="data-ng-truevalue">
                                        <xsl:text>o.value</xsl:text>
                                    </xsl:attribute>

                                    <xsl:attribute name="value">
                                        <xsl:text>{{o.path}}</xsl:text>
                                    </xsl:attribute>

                                    <xsl:attribute name="data-ng-change">
                                        <xsl:text>concatValues(form.fields.</xsl:text>
                                        <xsl:value-of select="Name"/>
                                        <xsl:text>)</xsl:text>
                                    </xsl:attribute>

                                    <xsl:if test="BindOnChange != ''">
                                        <xsl:attribute name="data-ng-change">
                                            <xsl:text>concatValues(form.fields.</xsl:text>
                                            <xsl:value-of select="Name"/>
                                            <xsl:text>);</xsl:text>
                                            <xsl:text>form.fields.</xsl:text>
                                            <xsl:value-of select="Name"/>
                                            <xsl:text>.onChange(form);</xsl:text>
                                        </xsl:attribute>
                                    </xsl:if>

                                    <xsl:attribute name="data-ng-disabled">o.disabled</xsl:attribute>

                                    <!--<xsl:if test="BindValue != ''">
                            <xsl:attribute name="data-af-bindvalue">
                                <xsl:value-of select="utils:parseAngularJs(BindValue, 'true')"/>
                            </xsl:attribute>
                        </xsl:if>-->

                                    <!--<xsl:attribute name="value">
                            <xsl:value-of select="@value"/>
                        </xsl:attribute>
                        <xsl:if test="contains(Value, @value)">
                            <xsl:attribute name="checked">checked</xsl:attribute>
                        </xsl:if>-->
                                    <xsl:if test="IsEnabled != 'True'">
                                        <xsl:attribute name="disabled">disabled</xsl:attribute>
                                    </xsl:if>
                                </input>
                                {{ o.text }}
                                <!--<xsl:value-of select="."/>-->
                            </label>
                            <div repeat-done="" ng-if="$last">
                            </div>
                        </div>
                    </fieldset>
                    <div class="clearfix"></div>
                </div>
            </div>

            <div class="err-placeholder"></div>

        </div>

    </xsl:template>

</xsl:stylesheet>
