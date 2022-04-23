
var config = {
  // these settings are defined in <meta> tags in the <head>
  // see the HTML settings of this codepen
  domain: 'slayley.myshopify.com', // ex 'storename.myshopify.com'
  storefrontAccessToken: 'eb093d547b84f2875d7358517b9510d9', // previously 'apiKey', now deprecated
  adminAccessToken: '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'
}

var ui = ShopifyBuy.UI.init(client);
  var productNodes = document.querySelectorAll('[data-product-id]');
  Array.prototype.slice.call(productNodes).forEach(function (node) {
    var productId = node.dataset.shopifyProduct;
  });

var client = ShopifyBuy.buildClient({
  domain: config.domain,
  storefrontAccessToken: config.storefrontAccessToken
});

var ui = ShopifyBuy.UI.init(client);
ui.createComponent('productSet', {
  id: ['7401764421800', '7397012897960'],
  node: document.getElementById('product-101'),
  options: {
    product: {
      iframe: false,
      //layout: 'full',
      order: [
        'img',
        'imgWithCarousel',
        'title',
        'variantTitle',
        'price',
        'description',
        'container',
        'options',
        'quantity',
        'button',
        'buttonWithQuantity',
        'details'
      ],
      contents: {
        img: false,
        imgWithCarousel: true,
        title: true,
        variantTitle: false,
        price: true,
        unitPrice: true,
        options: true,
        quantity: false,
        quantityIncrement: false,
        quantityDecrement: false,
        quantityInput: true,
        button: true,
        buttonWithQuantity: false,
        description: false,
        details: true
      },
      templates: {
        details: '<div class="{{data.classes.product.details}}">' +
        '<div class="{{data.classes.product.description}}">{{data.description}}</div>' +
        '</div>'
      },
      classes: {
        details: 'slayify-details'
      },
      text: {
        button: 'Buy'
      }
    },
    productSet: {
      iframe: false,
      //classes: {
      //  wrapper: 'slayify-collection-wrapper',
      //  productSet: 'slayify-collection',
      //  title: 'slayify-collection__title',
      //  collection: 'slayify-collection',
      //  products: 'slayify-collection-products',
      //  product: 'slayify-collection-product',
      //  paginationButton: 'slayify-collection-pagination-button slayify-btn'
      //},
    }
  }
});
