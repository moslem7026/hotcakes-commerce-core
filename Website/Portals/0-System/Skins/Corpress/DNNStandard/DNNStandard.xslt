<?xml version="1.0" encoding="UTF-8"?>
<!DOCTYPE stylesheet [
  <!ENTITY space "<xsl:text> </xsl:text>">
  <!ENTITY cr "<xsl:text>
</xsl:text>">
]>
<xsl:stylesheet version="1.0" xmlns:xsl="http://www.w3.org/1999/XSL/Transform">
<xsl:output method="html"/>
<xsl:param name="ControlID" />
<xsl:param name="Options" />
  <xsl:param name="ManifestPath" />
  
  <xsl:template match="/*">
    <xsl:apply-templates select="root" />
  </xsl:template>
  
<xsl:template match="root">
  <div id="dnnMenu" class="DNNStandard dnnMenu">
<ul class="topLevel">
        <xsl:apply-templates select="node">
          <xsl:with-param name="nodeType">root</xsl:with-param>
        </xsl:apply-templates>
</ul>
</div>
</xsl:template>


  <xsl:template match="node">
    <xsl:param name="nodeType" />
    <li>
      <!-- Set the slass of the LI element-->
      <xsl:variable name="nodeClass">
        <xsl:text>item</xsl:text>
        <xsl:if test="@selected = 1"> selected</xsl:if>
		<xsl:if test="@breadcrumb = 1"> current</xsl:if>
        <xsl:if test="@first = 1"> first</xsl:if>
        <xsl:if test="@last = 1"> last</xsl:if>
        <xsl:if test="node"> haschild</xsl:if>
      </xsl:variable>
      <xsl:attribute name="class">
        <xsl:value-of select="$nodeClass"/>
      </xsl:attribute>


      <xsl:choose>
        <!-- Process root menu items -->
        <xsl:when test="$nodeType = 'root'">
          <!-- Menu item enabled? -->
          <xsl:choose>
            <xsl:when test="@enabled = 1">
              <a href="{@url}">
                <i class="menuicon"></i>
                <span>
				<xsl:if test="@icon">
                    <img src="{@icon}" class="pageicon" />
                </xsl:if>
                  <xsl:value-of select="@text" disable-output-escaping="yes"/>
                </span>
              </a>
            </xsl:when>
            <xsl:otherwise>
              <a style="cursor:pointer">
                <span>
                <xsl:if test="@icon">
                    <img src="{@icon}" class="pageicon" />
                </xsl:if>
                  <xsl:value-of select="@text" disable-output-escaping="yes"/>
                </span>
              </a>
            </xsl:otherwise>
          </xsl:choose>


          <!-- Process children (if any) -->
          <xsl:if test="node">
            <div class="subLevel">
              <ul>
                <xsl:apply-templates select="node">
                  <xsl:with-param name="nodeType">subLevel</xsl:with-param>
                </xsl:apply-templates>
              </ul>
            </div>
          </xsl:if>
        </xsl:when>


        <xsl:when test="$nodeType = 'subLevel'">
          <!-- Menu item enabled? -->
          <xsl:choose>
            <xsl:when test="@enabled = 1">
              <a href="{@url}">
                <div>
                  <span>
                  <xsl:choose>
                    <xsl:when test="@icon">
                      <img src="{@icon}" class="pageicon" />
                    </xsl:when>
                  </xsl:choose>
                    <xsl:value-of select="@text" disable-output-escaping="yes"/>
                  </span>
                  <xsl:if test="node">
                  </xsl:if>
                </div>
              </a>
            </xsl:when>
            <xsl:otherwise>
              <a>
                <div>
                  <span>
                  <xsl:choose>
                    <xsl:when test="@icon">
                      <img src="{@icon}" class="pageicon" />
                    </xsl:when>
                  </xsl:choose>
                    <xsl:value-of select="@text" disable-output-escaping="yes"/>
                  </span>
                  <xsl:if test="node">
                  </xsl:if>                  
                </div>
              </a>
            </xsl:otherwise>
          </xsl:choose>
          
          <!-- Process children (if any) -->
          <xsl:if test="node">
            <div class="subLevelRight">
              <ul>
                <xsl:apply-templates select="node">
                  <xsl:with-param name="nodeType">subLevel</xsl:with-param>
                </xsl:apply-templates>
              </ul>
            </div>
          </xsl:if>
        </xsl:when>


      </xsl:choose>
    
    </li>
</xsl:template>
</xsl:stylesheet>