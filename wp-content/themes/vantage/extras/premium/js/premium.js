/**
 * (c) Greg Priday, freely distributable under the terms of the GPL 2.0 license.
 */

jQuery( function ( $ ) {
    var minPrice = Number( $('#theme-upgrade input[name=variable_pricing_custom]').attr('min') );

    // Handle clicking the play button
    $('#theme-upgrade #click-to-play').click(function(e){
        e.preventDefault();
        // Open the Vimeo video in a new window
        window.open($(this).attr('href'), 'videowindow', 'width=640,height=362,resizeable,scrollbars');
    })

    $( '#theme-upgrade .buy-button').click(function(e){
        e.preventDefault();
        $(this).closest('form').submit();
        $( '#theme-upgrade-info' ).slideDown();
        $( 'html, body' ).animate( {'scrollTop':0} );
        return false;
    });

    $('#theme-upgrade #purchase-form').submit(function(){
        window.open('', 'paymentwindow', 'width=960,height=800,resizeable,scrollbars');
        this.target = 'paymentwindow';
    });

    $('#theme-upgrade #purchase-form.supporters-pack .download a').click(function(e){
        e.preventDefault();
        window.open($(this).attr('href'), 'paymentwindow', 'width=960,height=800,resizeable,scrollbars');
    });

    $('#theme-upgrade #purchase-form .options input[type=radio]').change(function(){
        var val = $(this).val();
        if($(this).hasClass('custom-price')) {
            val = $('#theme-upgrade #purchase-form .options input[name=variable_pricing_custom]').val();
            val = parseFloat(val).toFixed(2);
            if(isNaN(val)) val = minPrice;
            val = Math.max(val,minPrice);
        }

        $('#theme-upgrade #purchase-form input[name=amount]').val(val);
        $('#theme-upgrade #purchase-form .variable-pricing-submit em').html('$'+val);

        if(val >= 15) $('#theme-upgrade .support-message').slideUp();
        else $('#theme-upgrade .support-message').slideDown();
    });

    $('#theme-upgrade #purchase-form .options input[name=variable_pricing_custom]').keyup(function(){
        var val = $(this).val().replace(/[^0-9.]/g, '');
        val = parseFloat(val).toFixed(2);
        if(isNaN(val)) val = minPrice;
        val = Math.max(val,minPrice);

        $(this).closest('form').find('.custom-price').click();

        $('#theme-upgrade #purchase-form input[name=amount]').val(val);
        $('#theme-upgrade #purchase-form .variable-pricing-submit em').html('$'+val);

        if(val >= 15) $('#theme-upgrade .support-message').slideUp();
        else $('#theme-upgrade .support-message').slideDown();
    }).change(function(){ $(this).keyup(); });


    // Display the form
    $( '#theme-upgrade-already-paid' ).click( function () {
        $( '#theme-upgrade-info' ).slideToggle();
        return false;
    } );

} );