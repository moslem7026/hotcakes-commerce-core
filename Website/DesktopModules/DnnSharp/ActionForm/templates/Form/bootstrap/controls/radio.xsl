<?xml version="1.0" encoding="utf-8"?>

<xsl:stylesheet version="1.0"
                xmlns:xsl="http://www.w3.org/1999/XSL/Transform"
                xmlns:utils="af:utils">

    <xsl:import href="attr-container.xsl"/>
    <xsl:import href="label.xsl"/>
    <xsl:output method="html" indent="no" omit-xml-declaration="yes" />

    <xsl:template name="ctl-radio">

        <!--If label is a column, render it here-->
        <xsl:if test="/Form/Settings/LabelAlign != 'inside' and /Form/Settings/LabelAlign != 'top'">
            <xsl:call-template name="ctl-label" />
        </xsl:if>
      <div class="radiocontainer">
        <div role="radiogroup" aria-label="radio group">
            <xsl:attribute name="id">
                <xsl:value-of select="/Form/Settings/BaseId"/>
                <xsl:value-of select="Name" />
            </xsl:attribute>
            <xsl:call-template name="ctl-attr-container">
              <xsl:with-param name="addClasses">
                <xsl:text> multiple-choice-radio </xsl:text>
              </xsl:with-param>
            </xsl:call-template>

            <!--If label is top, render it here-->
            <xsl:if test="/Form/Settings/LabelAlign = 'top' or /Form/Settings/LabelAlign = 'inside'">
                <xsl:call-template name="ctl-label" />
            </xsl:if>

            <div data-ng-cloak="">
                <xsl:if test="RadioType = 'True'">
                </xsl:if>
                <xsl:attribute name="class">
                    <xsl:if test="RadioType = 'True'">
                        <xsl:text> radio-as-buttons </xsl:text>
                    </xsl:if>
                    <xsl:if test="/Form/Settings/ClientSideValidation ='True' and IsRequired='True' and CanValidate = 'True'">
                        <xsl:text> required </xsl:text>
                    </xsl:if>
                    <xsl:value-of select="utils:tokenize(CssClass)"/>
                    <xsl:text> radio </xsl:text>
                    <xsl:if test="Horizontal = 'True'"> radio-inline </xsl:if>
                </xsl:attribute>

                <xsl:attribute name="data-ng-repeat">
                    <xsl:text>o in form.fields.</xsl:text>
                    <xsl:value-of select="Name"/>
                    <xsl:text>.options</xsl:text>
                </xsl:attribute>

                <label>
                    <xsl:if test="CssStyles != ''">
                        <xsl:attribute name="style">
                            <xsl:value-of select="utils:tokenize(CssStyles)"/>
                        </xsl:attribute>
                    </xsl:if>

                    <xsl:if test="ShortDesc != '' and /Form/Settings/LabelAlign = 'inside'">
                        <xsl:attribute name="title">
                            <xsl:value-of select="ShortDesc"/>
                        </xsl:attribute>
                    </xsl:if>

                    <xsl:if test="RadioType = 'True'">
                        <xsl:attribute name="class">
                            <xsl:text>radio-boxes-labels</xsl:text>
                        </xsl:attribute>
                    </xsl:if>

                    <input type="radio">
                        <xsl:attribute name="name">
                            <xsl:value-of select="/Form/Settings/BaseId"/>
                            <xsl:value-of select="Name" />
                        </xsl:attribute>
                        <xsl:attribute name="id">
                            <xsl:value-of select="/Form/Settings/BaseId"/>
                            <xsl:value-of select="Name" />
                          <xsl:text>-{{$index}}</xsl:text>
                        </xsl:attribute>
                      <xsl:attribute name="field-id">
                            <xsl:value-of select="Name" />
                        </xsl:attribute>
                        <xsl:attribute name="value">
                            <xsl:value-of select="@value"/>
                        </xsl:attribute>
                        <xsl:attribute name="class">
                            <xsl:text>normalCheckBox ignore-submit-hidden-fields </xsl:text>
                            <xsl:if test="/Form/Settings/ClientSideValidation ='True' and IsRequired='True' and CanValidate = 'True'">
                                <xsl:text> required </xsl:text>
                            </xsl:if>
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

                        <xsl:attribute name="data-ng-model">
                            <xsl:text>form.fields.</xsl:text>
                            <xsl:value-of select="Name"/>
                            <xsl:text>.value</xsl:text>
                        </xsl:attribute>

                        <xsl:attribute name="data-ng-truevalue">
                            <xsl:text>o.value</xsl:text>
                        </xsl:attribute>

                        <xsl:attribute name="value">
                            <xsl:text>{{o.value}}</xsl:text>
                        </xsl:attribute>

                        <xsl:if test="IsEnabled != 'True'">
                            <xsl:attribute name="disabled">disabled</xsl:attribute>
                        </xsl:if>

                        <xsl:attribute name="data-ng-click">
                            <xsl:text>form.fields.</xsl:text>
                            <xsl:value-of select="Name"/>
                            <xsl:text>.touched = true;</xsl:text>
                        </xsl:attribute>

                        <xsl:if test="BindValue != ''">
                            <xsl:attribute name="data-af-bindvalue">
                                <xsl:value-of select="utils:parseAngularJs(BindValue, 'true')"/>
                            </xsl:attribute>
                        </xsl:if>

                        <xsl:if test="BindOnChange != ''">
                            <xsl:attribute name="data-ng-change">
                                <xsl:text>form.fields.</xsl:text>
                                <xsl:value-of select="Name"/>
                                <xsl:text>.onChange(form);</xsl:text>
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
                    </input>
                    <span data-ng-bind-html="$sce.trustAsHtml(dnnsf.localization[o.text] || o.text)">
                      <xsl:attribute name="title">
                        <xsl:text>{{$sce.trustAsHtml(dnnsf.localization[o.text] || o.text)}}</xsl:text>
                      </xsl:attribute>
                        <xsl:if test="RadioType = 'True'">
                            <xsl:attribute name="class">
                                <xsl:text>radio-boxes-buttons btn </xsl:text>
                                <xsl:value-of select="BtnClass"/>
                            </xsl:attribute>
                            <xsl:attribute name="style">
                                <xsl:value-of select="BtnStyles"/>
                            </xsl:attribute>
                        </xsl:if>
                    </span>
                </label>

                <xsl:if test="RadioType = 'True'">
                    <div class="radio-btn-text">
                        <span class="radio-boxes-buttons-words">
                            <xsl:attribute name="style">
                                <xsl:value-of select="WordBetweenStyles"/>
                                <xsl:text>;</xsl:text>
                            </xsl:attribute>
                            <xsl:attribute name="ng-if">
                                <!--the last button shouldn't have a word after it-->
                                <xsl:text>($index + 1) !== form.fields.</xsl:text>
                                <xsl:value-of select="Name"/>
                                <xsl:text>.options.length</xsl:text>
                            </xsl:attribute>
                            <xsl:value-of select="WordBetween"/>
                        </span>
                    </div>
                </xsl:if>
                <div repeat-done="" ng-if="$last">
                </div>
            </div>

        </div>
        <div class="err-placeholder" style="padding-left:15px"></div>
      </div>

    </xsl:template>

</xsl:stylesheet>
