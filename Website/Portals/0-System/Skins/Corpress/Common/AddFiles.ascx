<%-- JS files --%>
<!--[if lt IE 9]>
		<script src="http://html5shim.googlecode.com/svn/trunk/html5.js"></script>
<![endif]-->
<dnn:STYLES runat="server" ID="StylesIE8" Name="IE8Minus" StyleSheet="css/ie8style.css" Condition="LT IE 9" UseSkinPath="true"/>
<!-- bootstrap -->
<dnn:DnnJsInclude runat="server" FilePath="bootstrap/js/bootstrap.js" PathNameAlias="SkinPath" />
<!-- basic -->
<dnn:DnnJsInclude runat="server" FilePath="js/jquery.goup.min.js" PathNameAlias="SkinPath" />
<dnn:DnnJsInclude runat="server" FilePath="js/modernizr.custom.js" PathNameAlias="SkinPath" />
<dnn:DnnJsInclude runat="server" FilePath="js/jquery.sticky.js" PathNameAlias="SkinPath" />
<dnn:DnnJsInclude runat="server" FilePath="js/viewport.js" PathNameAlias="SkinPath" />
<!-- fancybox -->
<dnn:DnnJsInclude runat="server" FilePath="js/jquery.fancybox.js" PathNameAlias="SkinPath" />
<dnn:DnnJsInclude runat="server" FilePath="js/jquery.fancybox2.js" PathNameAlias="SkinPath" />
<%--slider --%>
<dnn:DnnJsInclude runat="server" FilePath="slider/jquery.bxslider.js" PathNameAlias="SkinPath" />
<dnn:DnnJsInclude runat="server" FilePath="slider/slider.js" PathNameAlias="SkinPath" />
<dnn:DnnJsInclude runat="server" FilePath="slider/jquery.nivo.slider.js" PathNameAlias="SkinPath" />
<dnn:DnnJsInclude runat="server" FilePath="slider/jquery.mousewheel.min.js" PathNameAlias="SkinPath" />
<dnn:DnnJsInclude runat="server" FilePath="slider/jquery.touchSwipe.min.js" PathNameAlias="SkinPath" />
<dnn:DnnJsInclude runat="server" FilePath="slider/owl.carousel.js" PathNameAlias="SkinPath" />

<%--DNNStandard --%>
<dnn:DnnJsInclude runat="server" FilePath="/DNNStandard/DNNStandard.js" PathNameAlias="SkinPath" />
<dnn:DnnJsInclude runat="server" FilePath="~/Resources/Shared/Scripts/jquery/jquery.hoverIntent.min.js" />
<%--DNNMega --%>
<dnn:DnnJsInclude runat="server" FilePath="DNNMega/jquery.dnnmega.debug.js" PathNameAlias="SkinPath" />

<%--TreeView  --%>
<dnn:DnnJsInclude runat="server" FilePath="TreeView/jquery.treeview.js" PathNameAlias="SkinPath" />

<!-- back to top-->
<script type="text/javascript" language="javascript">
$('#goup').goup({
    imgsrc:'<%=SkinPath%>/images/up.png'});
</script>

<!-- StickyNav LoginStatus-->
<script type="text/javascript">
if("<%=UserController.GetCurrentUserInfo().IsInRole("Administrators") %>"=="True")
{
   $(".StickyNav").addClass("loginstatus");
   
}

</script>			  
<!-- stat count -->
<script type="text/javascript">
    (function($) {
        "use strict";
        function count($this){
        var current = parseInt($this.html(), 10);
        current = current + 1; /* Where 50 is increment */    
        $this.html(++current);
            if(current > $this.data('count')){
                $this.html($this.data('count'));
            } else {    
                setTimeout(function(){count($this)}, 50);
            }
        }            
        $(".stat-count").each(function() {
          $(this).data('count', parseInt($(this).html(), 10));
          $(this).html('0');
          count($(this));
        });
   })(jQuery);
</script>


<script type="text/javascript" language="javascript">
jQuery(function($){
<!-- Standard Menu -->
	$('.dnnMenu .topLevel>li:eq(0)').addClass("menu1");
	$('.dnnMenu .topLevel>li:eq(1)').addClass("menu2");
	$('.dnnMenu .topLevel>li:eq(2)').addClass("menu3");
	$('.dnnMenu .topLevel>li:eq(3)').addClass("menu4");
	$('.dnnMenu .topLevel>li:eq(4)').addClass("menu5");
	$('.dnnMenu .topLevel>li:eq(5)').addClass("menu6");
	$('.dnnMenu .topLevel>li:eq(6)').addClass("menu7");
	$('.dnnMenu .topLevel>li:eq(7)').addClass("menu8");
	$('.dnnMenu .topLevel>li:eq(8)').addClass("menu9");
	$('.dnnMenu .topLevel>li:eq(9)').addClass("menu10");
	
<!-- Mega Menu-->
	$('.dnnmega>li:eq(0)').addClass("menu1");
	$('.dnnmega>li:eq(1)').addClass("menu2");
	$('.dnnmega>li:eq(2)').addClass("menu3");
	$('.dnnmega>li:eq(3)').addClass("menu4");
	$('.dnnmega>li:eq(4)').addClass("menu5");
	$('.dnnmega>li:eq(5)').addClass("menu6");
	$('.dnnmega>li:eq(6)').addClass("menu7");
	$('.dnnmega>li:eq(7)').addClass("menu8");
	$('.dnnmega>li:eq(8)').addClass("menu9");
	$('.dnnmega>li:eq(9)').addClass("menu10");
});

</script>


<!-- Add Icons For the top Menu, This works only with first menu level -->
<script type="text/javascript" language="javascript">
jQuery(function($){
<!-- Standard Menu Icon -->
	$('.dnnMenu .topLevel>li:eq(0)>a>i').addClass("fa fa-home");         /* Page 1 */
	$('.dnnMenu .topLevel>li:eq(1)>a>i').addClass("fa fa-leaf");         /* Page 2 */
	$('.dnnMenu .topLevel>li:eq(2)>a>i').addClass("fa fa-gears");        /* Page 3 */
	$('.dnnMenu .topLevel>li:eq(3)>a>i').addClass("fa fa-folder-open");  /* Page 4 */
	$('.dnnMenu .topLevel>li:eq(4)>a>i').addClass("fa fa-pencil");       /* Page 5 */
	$('.dnnMenu .topLevel>li:eq(5)>a>i').addClass("fa fa-camera");       /* Page 6 */
	$('.dnnMenu .topLevel>li:eq(6)>a>i').addClass("fa fa-shopping-bag"); /* Page 7 */
	$('.dnnMenu .topLevel>li:eq(7)>a>i').addClass("fa fa-info");         /* Page 8 */
	$('.dnnMenu .topLevel>li:eq(8)>a>i').addClass("fa fa-music");        /* Page 9 */
	$('.dnnMenu .topLevel>li:eq(9)>a>i').addClass("fa fa-send");         /* Page 10 */

	
<!-- Mega Menu Icon -->
	$('.dnnmega>li:eq(0)>a>i').addClass("fa fa-home");         /* Page 1 */
	$('.dnnmega>li:eq(1)>a>i').addClass("fa fa-leaf");         /* Page 2 */
	$('.dnnmega>li:eq(2)>a>i').addClass("fa fa-gears");        /* Page 3 */
	$('.dnnmega>li:eq(3)>a>i').addClass("fa fa-folder-open");  /* Page 4 */
	$('.dnnmega>li:eq(4)>a>i').addClass("fa fa-pencil");       /* Page 5 */
	$('.dnnmega>li:eq(5)>a>i').addClass("fa fa-camera");       /* Page 6 */
	$('.dnnmega>li:eq(6)>a>i').addClass("fa fa-shopping-bag"); /* Page 7 */
	$('.dnnmega>li:eq(7)>a>i').addClass("fa fa-info");         /* Page 8 */
	$('.dnnmega>li:eq(8)>a>i').addClass("fa fa-music");        /* Page 9 */
	$('.dnnmega>li:eq(9)>a>i').addClass("fa fa-send");         /* Page 10 */
});

</script>

