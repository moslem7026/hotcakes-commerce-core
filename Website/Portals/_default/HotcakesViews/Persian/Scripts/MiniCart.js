jQuery(function ($) {
    // Common ----------------------
    var $target = $('#hcMiniCartTooltip');
    var $minicart = $('#hcMiniCart');
    var $iconbox = $minicart.find(".hc-iconbox");
    var $cartActions = $('#hcMiniCartTooltip').find('.dnnActions');
    var itemsRendered = false;

    function InitCommon() {
        if ($cartActions.length) {
            $cartActions.hide();
        }

        if ($target.length) {
            $minicart.hover(function () {
                $iconbox.css("background-color", "#FFF");
                timer = setTimeout(function () {   $target.slideDown().position(
                    'right'
                ); }, 1000);
                if (itemsRendered)
                    return;
                LoadItems();
            }, function () {
                clearTimeout(timer);
                $target.slideUp(function () {
                    $iconbox.css("background-color", "");
                });
            });
        }
    }

    function LoadItems() {

 itemsRendered = true;
        $.post(hcc.getServiceUrl("Cart/MiniCartItems"), {}, function (data) {
           
            RenderMiniCartItems(data);
            if ($cartActions.length) {
                $cartActions.show();
            }
        });
    }

    function RenderMiniCartItems(cartViewModel) {
        $grid = $target.find('.dnnGrid');

        if ($grid.length) {
            $ajaxLoader = $grid.find('.hcAjaxLoader');

            if ($ajaxLoader.length)
                $ajaxLoader.remove();

            var builtTable = '';
            $.each(cartViewModel.LineItems, function (key, item) {
                builtTable += '<tr><td>';

                if (item.ShowImage)
                    builtTable += '<a href="' + item.LinkUrl + '" title="' + item.Item.ProductName + '"><img src="' + item.ImageUrl + '" alt="' + item.Item.ProductName + '" /></a>';
                else
                    builtTable += '&nbsp;';

                builtTable += '</td>';

                builtTable += '<td><a href="' + item.LinkUrl + '" title="' + item.Item.ProductName + '">' + item.Item.ProductName + '</a></td>';

                builtTable += '<td>';
                if (item.HasDiscounts) {
                    builtTable += '<div class="hc-discount">$' + item.Item.LineTotalWithoutDiscounts + '</div>';
                }
                builtTable += ' تومان' + item.Item.LineTotal;
                builtTable += '</td></tr>';
            });

            builtTable += '<tr class="hc-subtotal"><td colspan="2">' + hcc.l10n.miniCart_SubTotal + '</td><td>$' + cartViewModel.CurrentOrder.TotalOrderBeforeDiscounts + '</td></tr>';

            $grid.append(builtTable);
        }
    }

    $(document).ready(function () {
        InitCommon();
    });
});