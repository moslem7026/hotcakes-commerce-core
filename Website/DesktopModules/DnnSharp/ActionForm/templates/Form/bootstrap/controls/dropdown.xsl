﻿<?xml version="1.0" encoding="utf-8"?>

<xsl:stylesheet version="1.0"
                xmlns:xsl="http://www.w3.org/1999/XSL/Transform"
                xmlns:utils="af:utils">

    <xsl:import href="label.xsl"/>
    <xsl:import href="attr-common.xsl"/>
    <xsl:import href="attr-container.xsl"/>
    <xsl:output method="html" indent="no" omit-xml-declaration="yes" />

    <xsl:template match="/Form/Fields/Field[InputType = 'closed-multiple-dropdown']">
        <xsl:call-template name="ctl-dropdown" />
    </xsl:template>
    
    <xsl:template name="ctl-dropdown">
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
          
            <div class="dropdown-loader">
              <xsl:attribute name="data-ng-show">
                <xsl:text>form.fields.</xsl:text>
                <xsl:value-of select="Name"/>
                <xsl:text>.$_loading</xsl:text>
              </xsl:attribute>
              <xsl:attribute name="data-ng-disabled">
                <xsl:text>form.fields.</xsl:text>
                <xsl:value-of select="Name"/>
                <xsl:text>.value == form.fields.</xsl:text>
                <xsl:value-of select="Name"/>
                <xsl:text>.$_loading</xsl:text>
              </xsl:attribute>
              <xsl:text>Loading...</xsl:text>
            </div>
          <xsl:comment>googleoff: all</xsl:comment>
            <select>
              <xsl:call-template name="ctl-attr-common">
                  <xsl:with-param name="cssclass">
                      <xsl:text>form-control ng-cloak</xsl:text>
                      <xsl:if test="/Form/Settings/ClientSideValidation ='True' and IsRequired='True' and CanValidate = 'True'"> required</xsl:if>
                      <xsl:value-of select="$addclass"/>
                  </xsl:with-param>
                  <xsl:with-param name="hasId">yes</xsl:with-param>
                  <xsl:with-param name="hasName">yes</xsl:with-param>
                  <xsl:with-param name="touchEvent">click</xsl:with-param>
              </xsl:call-template>

              <xsl:if test="/Form/Settings/FloatingLabels = 'True'">
                <xsl:attribute name="floating-label"></xsl:attribute>
              </xsl:if>
              
              <xsl:if test="IsEnabled != 'True'">
                  <xsl:attribute name="disabled">disabled</xsl:attribute>
              </xsl:if>

              <xsl:attribute name="data-ng-model">
                  <xsl:text>form.fields.</xsl:text>
                  <xsl:value-of select="Name"/>
                  <xsl:text>.selected</xsl:text>
              </xsl:attribute>

              <xsl:attribute name="data-ng-change">
                  <xsl:text>form.fields.</xsl:text>
                  <xsl:value-of select="Name"/>
                  <xsl:text>.value = form.fields.</xsl:text>
                  <xsl:value-of select="Name"/>
                  <xsl:text>.selected.value || ''</xsl:text>;

                  <xsl:text>form.fields.</xsl:text>
                  <xsl:value-of select="Name"/>
                  <xsl:text>.ddValue = form.fields.</xsl:text>
                  <xsl:value-of select="Name"/>
                  <xsl:text>.selected.value</xsl:text>;

                  <xsl:if test="BindOnChange != ''">
                      <xsl:text>form.fields.</xsl:text>
                      <xsl:value-of select="Name"/>
                      <xsl:text>.onChange(form);</xsl:text>
                  </xsl:if>
              </xsl:attribute>

              <xsl:if test="BindValue != ''">
                  <xsl:attribute name="data-af-bindvalue">
                      <xsl:value-of select="utils:parseAngularJs(BindValue, 'true')"/>
                  </xsl:attribute>
                  <xsl:attribute name="data-af-bindfrom">
                      <xsl:text>form.fields.</xsl:text>
                      <xsl:value-of select="Name"/>
                      <xsl:text>.options</xsl:text>
                  </xsl:attribute>
              </xsl:if>

              <xsl:attribute name="data-ng-options">
                  <xsl:text>o as o.text for o in form.fields.</xsl:text>
                  <xsl:value-of select="Name"/>
                  <xsl:text>.options</xsl:text>
                  <!--<xsl:text> track by o.text</xsl:text>-->
                  <!--<xsl:if test="LinkTo != ''">
                      <xsl:text>| filter: fnFactoryFilterByField('</xsl:text>
                      <xsl:value-of select="Name" />
                      <xsl:text>','</xsl:text>
                      <xsl:value-of select="LinkTo" />
                      <xsl:text>')</xsl:text>
                  </xsl:if>-->
              </xsl:attribute>

              <xsl:attribute name="data-val">
                  <xsl:text>{{form.fields.</xsl:text>
                  <xsl:value-of select="Name" />
                  <xsl:text>.selected.path}}</xsl:text>
              </xsl:attribute>

                        <!--<xsl:if test="/Form/Settings/LabelAlign != 'inside'" >-->
				<option value="">
					<xsl:choose>
						<xsl:when test="/Form/Settings/LabelAlign = 'inside'">
							<xsl:value-of select="Title"/>
						</xsl:when>
						<xsl:otherwise>
							<xsl:value-of select="Empty" />
						</xsl:otherwise>
					</xsl:choose>
				</option>
            </select>
           <xsl:comment>googleon: all</xsl:comment>
            <xsl:if test="Other != ''">
                <label style="padding-left: 10px;">
                    <xsl:attribute name="data-ng-show">
                        <xsl:text>form.fields.</xsl:text>
                        <xsl:value-of select="Name"/>
                        <xsl:text>.ddValue == '</xsl:text>
                        <xsl:value-of select="Other"/>
                        <xsl:text>'</xsl:text>
                    </xsl:attribute>
                    
                    <span>
                        <xsl:value-of select="Other"/>
                    </span>&#160;
                    <input type ="text" style="margin-top: 2px; display: inline; width: auto;" class="form-control">
                        <xsl:attribute name="name">
                            <xsl:value-of select="/Form/Settings/BaseId"/>
                            <xsl:value-of select="Name"/>
                            <xsl:text>-$other</xsl:text>
                        </xsl:attribute>
                        <xsl:attribute name="id">
                            <xsl:value-of select="/Form/Settings/BaseId"/>
                            <xsl:value-of select="Name"/>
                            <xsl:text>-$other</xsl:text>
                        </xsl:attribute>
                        <xsl:attribute name="data-ng-model">
                            <xsl:text>form.fields.</xsl:text>
                            <xsl:value-of select="Name"/>
                            <xsl:text>.otherValue</xsl:text>
                        </xsl:attribute>
                        <xsl:attribute name="data-ng-change">
                            <xsl:text>form.fields.</xsl:text>
                            <xsl:value-of select="Name"/>
                            <xsl:text>.value = form.fields.</xsl:text>
                            <xsl:value-of select="Name"/>
                            <xsl:text>.otherValue</xsl:text>;
                        </xsl:attribute>
                        <xsl:attribute name="class">
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
                            <xsl:text>form-control </xsl:text>
                            <xsl:if test="/Form/Settings/ClientSideValidation ='True' and CanValidate = 'True'">
                                <xsl:value-of select="CustomValidator1JsName"/>
                                <xsl:text> </xsl:text>
                                <xsl:value-of select="CustomValidator2JsName" />
                            </xsl:if>
                            <xsl:text> </xsl:text>
                        </xsl:attribute>
                        <xsl:if test="IsEnabled != 'True'">
                            <xsl:attribute name="disabled">disabled</xsl:attribute>
                        </xsl:if>
                    </input>
                </label>
            </xsl:if>
        </div>
    </xsl:template>

</xsl:stylesheet>
