/**
 * Cart
 * Based on https://shopify.github.io/buy-button-js/
 */
 var Cart = ( function() {
  var settings = {
    // these settings are defined in <meta> tags in the <head>
    // see the HTML settings of this codepen
    api: {
      domain: null,
      apiKey: null,
      appId: null
    },
    classes: {
      visible: 'is-active'
    }
  }

  var selector = {
    product: '.product',
    cart: '.shopify-buy-cart-wrapper',
    toggle: '.shopify-buy__cart-toggle',
    close: '.shopify-buy__btn--close'
  }

  var state = {
    visible: false
  }

  var client;
  var ui;



  var init = function() {
    console.log( 'Cart.init()' );

    // Read the API data from <meta> tags in the head
    // Check the HTML settings of this codepen
    $.each( settings.api, function( key, value ) {
      if( $( 'meta[name="shopify--' + key + '"]' ).length ) {
        settings.api[key] = $( 'meta[name="shopify--' + key + '"]' ).attr( 'content' );
      }
    } );

    client = ShopifyBuy.buildClient( {
      apiKey: settings.api.apiKey,
      domain: settings.api.domain,
      appId: settings.api.appId
    } );

    ui = ShopifyBuy.UI.init( client );

    build();

    bindEventHandlers();
  }

  var bindEventHandlers = function() {
    $( document )
      .on( 'click', function( event ) {
        // click anywhere outside of the cart and toggle
        var target = $( event.target );
        if(
          state.visible &&
          !target.is( selector.cart ) &&
          !target.closest( selector.cart ).length &&
          !target.is( selector.toggle ) &&
          !target.closest( selector.toggle ).length ) {
          closeCart();
        }
      } )
      .on( 'click', selector.close, function() {
        closeCart();
      } )
      .on( 'click', selector.toggle, function() {
        openCart();
      } );
  }

  var build = function() {
    console.log( 'Cart.build()' );

    // quit if there are no products
    if( !$( selector.product ).length ) {
      return false;
    }

    $( selector.product ).each( function() {
      var product = $( this );
      var id = product.attr( 'data-product-id' );

      ui.createComponent( 'product', {
        id: id,
        node: product[0],
        moneyFormat: '{{amount_with_comma_separator}} €',
        options: {
          product: {
            iframe: false,
            contents: {
              'title': false,
              'variantTitle': false,
              'price': true,
              'options': false,
              'description': false,
              'quantity': false,
              'button': true,
              'img': false
            },
            text: {
              button: 'Buy'
            },
            events: {
              addVariantToCart: function( product ) {
                openCart();
              },
              updateQuantity: function( product ) {},
              openModal: function( product ) {},
              openOnlineStore: function( product ) {},
              openCheckout: function( product ) {}
            }
          },
          cart: {
            iframe: false,
            text: {
              currency: 'EUR',
            },
            events: {
              openCheckout: function( cart ) {},
              updateItemQuantity: function( cart ) {},
            }
          },
          modal: {},
          productSet: {},
          toggle: {
            iframe: false,
            contents: {
              count: true,
              icon: false,
              title: false
            },
            text: {
              title: 'Cart'
            }
          },
          modalProduct: {},
          option: {},
          lineItem: {}
        }

      } );
    } );
  }

  var toggleCart = function() {
    console.log( 'Cart.toggleCart()' );

    if( state.visible ) {
      closeCart();
    } else {
      openCart();
    }
  }

  var openCart = function() {
    console.log( 'Cart.openCart()' );

    $( selector.cart )
      .addClass( settings.classes.visible );

    state.visible = true;
    $( document ).trigger( 'cart/open' );
  }

  var closeCart = function() {
    console.log( 'Cart.closeCart()' );

    $( selector.cart )
      .removeClass( settings.classes.visible );

    state.visible = false;
    $( document ).trigger( 'cart/close' );
  }

  return {
    init: function() { init(); }
  }
} )();

$( document ).ready( function() {
  Cart.init();
} );
