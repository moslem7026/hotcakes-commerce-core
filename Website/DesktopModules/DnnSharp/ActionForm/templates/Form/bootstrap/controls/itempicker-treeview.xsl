﻿<?xml version="1.0" encoding="utf-8"?>

<xsl:stylesheet version="1.0"
                xmlns:xsl="http://www.w3.org/1999/XSL/Transform"
                xmlns:utils="af:utils">

    <xsl:import href="label.xsl"/>
    <xsl:import href="attr-common.xsl"/>
    <xsl:import href="attr-container.xsl"/>
    <xsl:output method="html" indent="no" omit-xml-declaration="yes" />

    <xsl:template name="ctl-item-picker-tree-view">
        <xsl:param name="addclass" />
        <!--<xsl:copy-of select="."/>-->


        <!--If label is a column, render it here-->
        <xsl:if test="/Form/Settings/LabelAlign != 'inside' and /Form/Settings/LabelAlign != 'top'">
            <xsl:call-template name="ctl-label" />
        </xsl:if>


        <div style="">
            <xsl:call-template name="ctl-attr-container" />

            <!--If label is top, render it here-->
            <xsl:if test="/Form/Settings/LabelAlign = 'top'">
                <xsl:call-template name="ctl-label" />
            </xsl:if>
            <div>
                <xsl:if test="InlineTree != 'True'">
                    <xsl:attribute name="class">treecontrol-dropdown-container</xsl:attribute>
                </xsl:if>
                <div class="input-group" style="cursor: pointer; width: 100%;">
                    <xsl:attribute name="ng-click">
                        <xsl:text>form.fields.</xsl:text>
                        <xsl:value-of select="Name"/>
                        <xsl:text>.showdrop == true ? </xsl:text>
                        <xsl:text>form.fields.</xsl:text>
                        <xsl:value-of select="Name"/>
                        <xsl:text>.showdrop = false : </xsl:text>
                        <xsl:text>form.fields.</xsl:text>
                        <xsl:value-of select="Name"/>
                        <xsl:text>.showdrop = true</xsl:text>
                    </xsl:attribute>
                    <input type="text" disabled="" placeholder="Select Item">
                        <xsl:call-template name="ctl-attr-common">
                            <xsl:with-param name="cssclass">
                                <xsl:text>col-md-12 form-control treecontrol-dropdown-input</xsl:text>
                                <xsl:if test="/Form/Settings/ClientSideValidation ='True' and IsRequired='True' and CanValidate = 'True'">
                                    required
                                </xsl:if>
                                <xsl:value-of select="$addclass"/>
                            </xsl:with-param>
                            <xsl:with-param name="hasId">yes</xsl:with-param>
                            <xsl:with-param name="hasName">yes</xsl:with-param>
                            <xsl:with-param name="touchEvent">keyup</xsl:with-param>
                        </xsl:call-template>
                        <xsl:attribute name="data-ng-model">
                            <xsl:text>form.fields.</xsl:text>
                            <xsl:value-of select="Name"/>
                            <xsl:text>.text</xsl:text>
                        </xsl:attribute>
                        <xsl:attribute name="data-val">
                            <xsl:text>{{ form.fields.</xsl:text>
                            <xsl:value-of select="Name"/>
                            <xsl:text>.value }}</xsl:text>
                        </xsl:attribute>
                    </input>
                    <span class="input-group-btn">
                        <xsl:if test="InlineTree = 'True'">
                            <xsl:attribute name="style">
                                <xsl:text>display:none;</xsl:text>
                            </xsl:attribute>
                        </xsl:if>
                        <button type = "button" class = "btn btn-default dropdown-toggle" data-toggle = "dropdown">
                            <span class = "glyphicon glyphicon-chevron-down">
                                <xsl:attribute name="data-ng-class">
                                    <xsl:text>{ 'glyphicon-chevron-down': </xsl:text>
                                    <xsl:text>!form.fields.</xsl:text>
                                    <xsl:value-of select="Name"/>
                                    <xsl:text>.showdrop, 'glyphicon-chevron-up':</xsl:text>
                                    <xsl:text>form.fields.</xsl:text>
                                    <xsl:value-of select="Name"/>
                                    <xsl:text>.showdrop }</xsl:text>
                                </xsl:attribute>
                            </span>
                        </button>
                    </span>
                </div>
            </div>
            <div>
                <xsl:if test="InlineTree != 'True'">
                    <xsl:attribute name="class">panel treecontrol-dropdown-panel</xsl:attribute>
                </xsl:if>
                <div>
                    <xsl:if test="InlineTree != 'True'">
                        <xsl:attribute name="class">treecontrol-dropdown treecontrol-dropdown-container</xsl:attribute>
                        <xsl:attribute name="ng-show">
                            <xsl:text>form.fields.</xsl:text>
                            <xsl:value-of select="Name"/>
                            <xsl:text>.showdrop</xsl:text>
                        </xsl:attribute>
                    </xsl:if>

                    <treecontrol class="tree-boot ng-cloak"  update-field="updateField(field, val)">
                        <xsl:attribute name="tree-model">
                            <xsl:text>form.fields.</xsl:text>
                            <xsl:value-of select="Name"/>
                            <xsl:text>.options</xsl:text>
                        </xsl:attribute>
                        <xsl:attribute name="mid">
                          <xsl:value-of select="/Form/Settings/ModuleId"/>
                        </xsl:attribute>
                        <xsl:attribute name="on-selection">
                            <xsl:text>showSelected(node, selected , form.fields.</xsl:text>
                            <xsl:value-of select="Name"/>
                            <xsl:text>.name)</xsl:text>
                        </xsl:attribute>
                        <xsl:attribute name="on-click-elem">
                            <xsl:text>closeDropdown(e,form.fields.</xsl:text>
                            <xsl:value-of select="Name"/>
                            <xsl:text>.name)</xsl:text>
                        </xsl:attribute>
                        <xsl:attribute name="field">
                            <xsl:text>settings.Fields['</xsl:text>
                            <xsl:value-of select="Name" />
                            <xsl:text>']</xsl:text>
                        </xsl:attribute>
                        <xsl:attribute name="field-id">
                            <xsl:value-of select="Id"/>
                        </xsl:attribute>
                        <xsl:attribute name="get-items">
                            <xsl:text>form.getItemsUrl</xsl:text>
                        </xsl:attribute>
                        <xsl:attribute name="init-val">
                            <xsl:text>'</xsl:text>
                            <xsl:value-of select="Value"/>
                            <xsl:text>'</xsl:text>
                        </xsl:attribute>
                        <xsl:attribute name="data-af-field">
                            <xsl:value-of select="Name" />
                        </xsl:attribute>

                        {{node.text}}
                    </treecontrol>
                </div>
            </div>
        </div>
    </xsl:template>

</xsl:stylesheet>
