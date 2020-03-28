<?xml version="1.0" encoding="utf-8"?>

<xsl:stylesheet version="1.0"
                xmlns:xsl="http://www.w3.org/1999/XSL/Transform"
                xmlns:utils="af:utils">

  <xsl:import href="label.xsl"/>
  <xsl:import href="attr-common.xsl"/>
  <xsl:import href="attr-container.xsl"/>
  <xsl:output method="html" indent="no" omit-xml-declaration="yes" />

  <xsl:template name="ctl-textbox">
    <xsl:param name="type" />
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
          
      <div load-on-demand="'angulartextbox'" >

        <!--render the control-->
        <input type="$type">
          <xsl:attribute name="angulartextbox"></xsl:attribute>
          <xsl:if test="/Form/Settings/FloatingLabels = 'True'">
            <xsl:attribute name="floating-label"></xsl:attribute>
          </xsl:if>
          <xsl:call-template name="ctl-attr-common">
            <xsl:with-param name="cssclass">
              <xsl:text>form-control </xsl:text>
              <xsl:if test="/Form/Settings/ClientSideValidation ='True' and IsRequired='True' and CanValidate = 'True'"> required-dnnsf </xsl:if>
              <xsl:text> </xsl:text>
              <xsl:value-of select="$addclass"/>
            </xsl:with-param>
            <xsl:with-param name="hasId">yes</xsl:with-param>
            <xsl:with-param name="hasName">yes</xsl:with-param>
            <xsl:with-param name="bind">yes</xsl:with-param>
            <xsl:with-param name="touchEvent">keyup</xsl:with-param>
          </xsl:call-template>
          <xsl:if test="Mask != ''">
            <xsl:attribute name="data-input-mask">
              <xsl:value-of select="Mask"/>
            </xsl:attribute>
            <xsl:attribute name="mask-options">
              <xsl:value-of select="MaskOptions"/>
            </xsl:attribute>
          </xsl:if>
          <xsl:if test="/Form/Settings/ClientSideValidation ='True' and ConfirmationOf != ''">
            <xsl:attribute name="data-password-confirm">
              <xsl:value-of select="/Form/Settings/BaseId"/>
              <xsl:value-of select="ConfirmationOf"/>
            </xsl:attribute>
          </xsl:if>
          <xsl:if test="/Form/Settings/ClientSideValidation ='True' and ConfirmationOfTextBox != ''">
            <xsl:attribute name="data-textbox-confirm">
              <xsl:value-of select="/Form/Settings/BaseId"/>
              <xsl:value-of select="ConfirmationOfTextBox"/>
            </xsl:attribute>
          </xsl:if>
          <xsl:attribute name="af-field-title">
            <xsl:value-of select="Title"/>
          </xsl:attribute>
          <xsl:attribute name="type">
            <xsl:value-of select="$type"/>
          </xsl:attribute>
 
          <xsl:if test="ShortDesc != '' and /Form/Settings/LabelAlign = 'inside'">
            <xsl:attribute name="title">
              <xsl:value-of select="ShortDesc"/>
            </xsl:attribute>
          </xsl:if>

          <xsl:if test="MaxLength != ''">
            <xsl:attribute name="maxlength">
              <xsl:value-of select="MaxLength"/>
            </xsl:attribute>
          </xsl:if>

          <xsl:attribute name="defer-request-by">
            <xsl:value-of select="DeferRequestBy"/>
          </xsl:attribute>

          <xsl:call-template name="ctl-attr-placeholder" />
                    
          <xsl:if test="IsEnabled != 'True'">
            <xsl:attribute name="disabled">disabled</xsl:attribute>
          </xsl:if>
          <xsl:if test="Readonly = 'True'">
            <xsl:attribute name="readonly">readonly</xsl:attribute>
          </xsl:if>

          <xsl:if test="AutocompleteUrl != ''">
            <xsl:attribute name="data-autocomplete">
              <xsl:value-of select="AutocompleteUrl"/>
            </xsl:attribute>
          </xsl:if>

          <xsl:if test="$type = 'number'">
            <xsl:attribute name="max-number">
              <xsl:value-of select="MaxValue"/>
            </xsl:attribute>
          </xsl:if>

          <xsl:if test="AutofillAttribute != ''">
            <xsl:attribute name="autocomplete">
              <xsl:value-of select="AutofillAttribute"/>
            </xsl:attribute>
          </xsl:if>

          <xsl:if test="AutofillName != ''">
            <xsl:attribute name="name">
              <xsl:value-of select="AutofillName"/>
            </xsl:attribute>
          </xsl:if>

          <!-- END AUTOFILL ATTRIBUTES -->
        </input>
        
      </div>
      <xsl:if test="ShowHidePassword = 'True'">
        <div class="container-btn-vertical-center">
          <button type="button" class="btn btn-default" ng-click="showPassword($event)" >
            <i class="fa fa-eye"></i>
          </button>
          <button type="button" class="btn btn-default" ng-click="hidePassword($event)" style="display:none">
            <i class="fa fa-eye-slash"></i>
          </button>
        </div>
      </xsl:if>
    </div>
  </xsl:template>
  

</xsl:stylesheet>
