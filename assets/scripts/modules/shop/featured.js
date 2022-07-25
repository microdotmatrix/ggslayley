import $ from 'jquery'
window.$ = $;
import Client from 'shopify-buy/index.unoptimized.umd'

export function Shop() {
  const client = Client.buildClient({
    domain: 'slayley.myshopify.com',
    storefrontAccessToken: 'eb093d547b84f2875d7358517b9510d9',
    apiKey: 'eb093d547b84f2875d7358517b9510d9',
    appId: '1'
  });
	let product;
	let cart = client.checkout;
	let cartLineItemCount;
	//grab collection ID from div.collection#collection-id in HTML
  let collectionID = $('body').find('.collection').attr('id');
  let collect = 'gid://shopify/Collection/' + collectionID;
	// check for existing cart in local storage, if one doesn't exist
	// create new cart object
	if(localStorage.getItem('lastCartId')) {
		client.checkout.fetch(localStorage.getItem('lastCartId')).then((remoteCart) => {
			cart = remoteCart;
			cartLineItemCount = cart.lineItems.length;
			renderCartItems();
		});
	} else {
		client.checkout.create().then((newCart) => {
			cart = newCart;
			localStorage.setItem('lastCartId', cart.id);
			cartLineItemCount = 0;
		});
	}
	let previousFocusItem;

  const query = {
    query: '',
    sortBy: 'title'
  }
  let productList;
  client.collection.fetchWithProducts(collect).then((collection) => {
    // console.log(products);
    // Loop ober the products and create a card to be displayed
    // Products ==  the array of products within the collection
    productList = collection.products;
    for (let i = 0; i < productList.length; i++) {
			let product = productList[i];
      let productHTML = `
        <div class="splide__slide__container">
          <div class="product" id="buy-button-${i}" data-layout="featured" data-product-id="${product.attrs.id}">
            <div class="image-overlay-container splide__slide__container">
              <img class="variant-image" src="${product.selectedVariantImage}">
            </div>
            <div class="product-details">
              <h4 class="product-title"></h4>
              <div class="variant-thumbs">
              <div class="variant-selectors"></div>
              <div class="product-options">
                <div class="product-description"></div>
                <div class="button-container">
                  <button class="btn buy-button js-prevent-cart-listener add-button" data-product-id="${product.attrs.id}" data-variant-id="${product.selectedVariant}">Add To Cart</button>
                  <div class="variant-price"></div>
                </div>
              </div>
            </div>
          </div>
        </div>
      `;
			$('.collection').append(productHTML);
			let selectedVariant = product.selectedVariant;
			let selectedVariantImage = product.selectedVariantImage;
			let varCount = product.variants.length;
			if (varCount > 1) {
				let variantSelectors = generateSelectors(i, product.variants);
				updateVariantSelectors(i, variantSelectors);
				updateVariantTitle(i, product.variants[i].title);
        let variantAltImages = generateImages(i, product.variants);

			}
			updateProductTitle(i, product.title);
			updateProductDescription(i, product.descriptionHtml);
			updateVariantImage(i, selectedVariantImage);
			updateVariantPrice(i, selectedVariant.attrs.price);
		}
		updateCartTabButton();
		bindEventListeners();
		attachOnVariantSelectListeners();
		updateCollectionTitle();
	});
  	/* Bind Event Listeners
  	============================================================ */
	function bindEventListeners() {
		// cart close button listener
		$('.cart .btn--close').on('click', closeCart);
		// click away listener to close cart
		$(document).on('click', function(evt) {
			if((!$(evt.target).closest('.cart').length) && (!$(evt.target).closest('.js-prevent-cart-listener').length)) {
				closeCart();
			}
		});
		// escape key handler
		let ESCAPE_KEYCODE = 27;
		$(document).on('keydown', function (evt) {
			if (evt.which === ESCAPE_KEYCODE) {
				if (previousFocusItem) {
					$(previousFocusItem).focus();
					previousFocusItem = ''
				}
				closeCart();
			}
		});
		// checkout button click listener
		$('.btn--cart-checkout').on('click', function () {
			let checkoutURL = cart.checkoutUrl;
			// if ($('input.cartAttribute').is(':checked')) {
			// 	let val = $('input.cartAttribute').val();
			// 	checkoutURL += '&attributes[ATTRIBUTE NAME]=' + val;
			// }
			let checkoutWindow = window.open(checkoutURL);
			window.addEventListener("message", checkoutPostMessageListener, checkoutWindow);
		});
		// buy button click listener
		$('.buy-button').on('click', buyButtonClickHandler);
		// increment quantity click listener
		$('.cart').on('click', '.quantity-increment', function () {
			let variantId = $(this).data('variant-id');
			incrementQuantity(variantId);
		});
		// decrement quantity click listener
		$('.cart').on('click', '.quantity-decrement', function() {
			let variantId = $(this).data('variant-id');
			decrementQuantity(variantId);
		});
		// update quantity field listener
		$('.cart').on('keyup', '.cart-item__quantity', debounce(fieldQuantityHandler, 250));
		// cart tab click listener
		$('.btn--cart-tab').click(function() {
			setPreviousFocusItem(this);
			openCart();
		});
		// open product modal
		//$('.collection').on('click', '.image-overlay, .variant-image, .variant-select, .product-title, .product-options', function(){
			//console.log('clicked');
			//$(this).parents('.product').find('.product-modal').show();
			//if (!$('.product-modal-underlay').length) {
			//$('body').append('<div class = "product-modal-underlay"></div>');
			//}
		//});
		// close product modal
		//$('body').on('click', '.product-modal-underlay, .product-modal-close', hideModal);
	}
	/* Event Listener handles post messages from checkout page
	============================================================ */
	function checkoutPostMessageListener(event) {
		let origin = event.origin || event.originalEvent.origin;
		if (origin !== 'https://checkout.shopify.com') {
			return;
		}
		let data = JSON.parse(event.data);
		if (data.current_checkout_page === '/checkout/thank_you') {
			cart.clearLineItems();
			/* enter in your home page here */
			//window.location = 'http://localhost/shopify-buy-sdk-example/';
		}
	}
 	/* Attach and control listeners onto buy button
  	============================================================ */
	function buyButtonClickHandler(evt) {
		evt.preventDefault();
		let productID = $(this).attr('data-product-id');
		let variantID = $(this).attr('data-variant-id');
		let cartLineItem = findCartItemByVariantId(variantID);
		let quantity = cartLineItem ? cartLineItem.quantity + 1 : 1;
		client.product.fetch(productID).then((product) => {
		 	for (let i = 0; i < product.variants.length; i++) {
		 		if (product.variants[i].id == variantID) {
		 			variantObject = product.variants[i];
					addOrUpdateVariant(cartLineItem, variantObject, quantity);
					setPreviousFocusItem(evt.target);
					$('#checkout').focus();
		 		}
		 	}
		});
	}
  	/* Generate DOM elements for variant selectors
  	============================================================ */
	function generateSelectors(num, variants) {
		let options;
		for (let i = 0; i < variants.length; i++) {
			options += '<option value = "' + variants[i].id + '">' + variants[i].title + '</option>';
		}
		return 	'<select name = "variant-selection" class = "product' + num + '">' + options + '</select>';
	}

  // Variant Image Alternate generation function...
  function generateImages(num, variants) {
    let thumbs;
    for (let i = 0; i < variants.length; i++) {
      thumbs += '<img src = "' + variants[i].image.src + '">';
    }
    return '<div class="let-thumb">' + thumbs + '</div>';
  }

  	/* Variant option change handler
  	============================================================ */
	function attachOnVariantSelectListeners() {
		$('.collection').on('change', 'select[name=variant-selection]', function(event) {
			let element = $(this);
			let num = element.attr('class').replace("product", "");
			let productID = element.closest('.product').attr('data-product-id');
			let variantID = element.val();
			let variantName = element.find('option:selected').text();
			$('.add-button[data-product-id="'+ productID +'"]').attr('data-variant-id', variantID)
			client.product.fetch(productID).then((product) => {
			 	for (let i = 0; i < product.variants.length; i++) {
			 		if (product.variants[i].id == variantID) {
			 			let selectedVariant = product.variants[i];
						updateVariantImage(num, selectedVariant.image);
						updateVariantTitle(num, selectedVariant);
						updateVariantPrice(num, selectedVariant);
			 		}
			 	}
			});
		});
	}
	/* Update collection title
	/*************************************************************/
	function updateCollectionTitle() {
		client.collection.fetchWithProducts(collectionID).then((collection) => {
			let collectionTitle = collection.attrs.title;
			$('h2.collection-title').text(collectionTitle);
		});
	}
	/* Update product title
	============================================================ */
	function updateProductTitle(i, title) {
		$('#buy-button-'+i).find('.product-title').text(title);
	}
	/* Update product description
	============================================================ */
	function updateProductDescription(i, description) {
		$('#buy-button-'+i).find('.product-description').html(description);
	}
	/* Update product image based on selected variant
	============================================================ */
	function updateVariantImage(i, image) {
		let src = (image) ? image.src : client.NO_IMAGE_URI;
		$('#buy-button-'+i).find('.variant-image').attr('src', src);
	}
	/* Update product variant title based on selected variant
	============================================================ */
	function updateVariantTitle(i, selectedVariant) {
		$('#buy-button-'+i).find('.variant-title').text(selectedVariant.title);
	}
	/* Update product variant price based on selected variant
	============================================================ */
	function updateVariantPrice(i, selectedVariant) {
		$('#buy-button-'+i).find('.variant-price').text('$' + selectedVariant.minVariantPrice);
	}
	/* Update product variant selectors
	============================================================ */
	function updateVariantSelectors(i, variantSelectors) {
		$('#buy-button-'+i).find('.variant-selectors').html(variantSelectors);
	}
	/*************************************************************/
	/* Decrease quantity amount by 1
	============================================================ */
	function decrementQuantity(variantId) {
		updateQuantity(function(quantity) {
			return quantity - 1;
		}, variantId);
	}
	/* Increase quantity amount by 1
	============================================================ */
	function incrementQuantity(variantId) {
		updateQuantity(function(quantity) {
			return quantity + 1;
		}, variantId);
	}
	/* Update product variant quantity in cart
	============================================================ */
	function updateQuantity(fn, variantId) {
		let quantity;
		let cartLineItem = findCartItemByVariantId(variantId);
		if (cartLineItem) {
			quantity = fn(cartLineItem.quantity);
			updateVariantInCart(cartLineItem, quantity);
		}
	}
	/* Update product variant quantity in cart through input field
	============================================================ */
	function fieldQuantityHandler(evt) {
		let variantId = parseInt($(this).closest('.cart-item').attr('data-variant-id'), 10);
		let cartLineItem = findCartItemByVariantId(variantId);
		let quantity = evt.target.value;
		if (cartLineItem) {
			updateVariantInCart(cartLineItem, quantity);
		}
	}
	/* Debounce taken from _.js
	============================================================ */
	function debounce(func, wait, immediate) {
		let timeout;
		return function() {
			let context = this, args = arguments;
			let later = function() {
				timeout = null;
				if (!immediate) func.apply(context, args);
			};
			let callNow = immediate && !timeout;
			clearTimeout(timeout);
			timeout = setTimeout(later, wait);
			if (callNow) func.apply(context, args);
		}
	}
	/*************************************************************/
	/* Hide Modal
	============================================================ */
	function hideModal() {
		$('.product-modal').hide();
		$('.product-modal-underlay').remove();
	}
	/* Open Cart
	============================================================ */
	function openCart() {
		$('.cart').addClass('js-active');
		hideModal();
	}
	/* Close Cart
	============================================================ */
	function closeCart() {
		$('.cart').removeClass('js-active');
		$('.overlay').removeClass('js-active');
	}
	/* Find Cart Line Item By Variant Id
	============================================================ */
	function findCartItemByVariantId(variantId) {
		return cart.lineItems.filter((item) => {
			return (item.variant_id == variantId);
		})[0];
	}
  	/* Determine action for variant adding/updating/removing
  	============================================================ */
	function addOrUpdateVariant(cartLineItem, variantObject, quantity) {
		openCart();
		let variantObjectID = variantObject.id;
		if (cartLineItem) {
			updateVariantInCart(cartLineItem, quantity);
		} else {
			addVariantToCart(variantObject, quantity);
		}
		updateCartTabButton();
	}
  	/* Update details for item already in cart. Remove if necessary
  	============================================================ */
	function updateVariantInCart(cartLineItem, quantity) {
		let variantId = cartLineItem.variant_id;
		let cartLength = cart.lineItems.length;
		cart.updateLineItem(cartLineItem.id, quantity).then(function(updatedCart) {
			let $cartItem = $('.cart').find('.cart-item[data-variant-id="' + variantId + '"]');
			if (updatedCart.lineItems.length >= cartLength) {
					$cartItem.find('.cart-item__quantity').val(cartLineItem.quantity);
					$cartItem.find('.cart-item__price').text(formatAsMoney(cartLineItem.line_price));
			} else {
				$cartItem.addClass('js-hidden').bind('transitionend webkitTransitionEnd oTransitionEnd MSTransitionEnd', function() {
				   $cartItem.remove();
				});
			}
			updateCartTabButton();
			updateTotalCartPricing();
			if (updatedCart.lineItems.length < 1) {
				closeCart();
			}
		}).catch(function (errors) {
			console.log('Fail');
			console.error(errors);
		});
	}
  	/* Add 'quantity' amount of product 'variant' to cart
  	============================================================ */
	function addVariantToCart(variantObject, quantity) {
		openCart();
		let lineItems = $('<div class = "lineItems"></div>');
		cart.addVariants({ variant: variantObject, quantity: quantity }).then(function(cart) {
			for (let i = 0; i < cart.lineItems.length; i++) {
				lineItems.append(renderCartItem(cart.lineItems[i]));
			}
			let $cartItemContainer = $('.cart-item-container');
			$cartItemContainer.empty();
			$cartItemContainer.append(lineItems);
		}).catch(function (errors) {
			console.log('Fail');
			console.error(errors);
		});
		updateTotalCartPricing();
		updateCartTabButton();
	}
	/* Update cart tab button
	============================================================ */
	function updateCartTabButton() {
		if (cart.lineItems.length > 0) {
			$('.btn--cart-tab .btn__counter').html(cart.lineItemCount);
			$('.btn--cart-tab').addClass('js-active');
		} else {
			$('.btn--cart-tab').removeClass('js-active');
			$('.cart').removeClass('js-active');
		}
	}
  	/* Return required markup for single item rendering
  	============================================================ */
	function renderCartItem(lineItem) {
		console.log(lineItem);
		let lineItemEmptyTemplate = $('#CartItemTemplate').html();
		let $lineItemTemplate = $(lineItemEmptyTemplate);
		let itemImage = lineItem.image.src;
		$lineItemTemplate.attr('data-variant-id', lineItem.variant_id);
		$lineItemTemplate.addClass('js-hidden');
		$lineItemTemplate.find('.cart-item__img').css('background-image', 'url(' + itemImage + ')');
		$lineItemTemplate.find('.cart-item__title').text(lineItem.title);
		if (lineItem.variant_title != 'Default Title') {
			$lineItemTemplate.find('.cart-item__variant-title').text(lineItem.variant_title);
		}
		$lineItemTemplate.find('.cart-item__price').text(formatAsMoney(lineItem.line_price));
		$lineItemTemplate.find('.cart-item__quantity').attr('value', lineItem.quantity);
		$lineItemTemplate.find('.quantity-decrement').attr('data-variant-id', lineItem.variant_id);
		$lineItemTemplate.find('.quantity-increment').attr('data-variant-id', lineItem.variant_id);
		$lineItemTemplate.removeClass('js-hidden');
		return $lineItemTemplate;
	}
 	/* Render the line items currently in the cart
  	============================================================ */
	function renderCartItems() {
		let $cartItemContainer = $('.cart-item-container');
		$cartItemContainer.empty();
		let lineItemEmptyTemplate = $('#CartItemTemplate').html();
		let $cartLineItems = cart.lineItems.map(function (lineItem, index) {
			return renderCartItem(lineItem);
		});
		$cartItemContainer.append($cartLineItems);
		setTimeout(function() {
			$cartItemContainer.find('.js-hidden').removeClass('js-hidden');
		}, 0);
		updateTotalCartPricing();
	}
	/* Update Total Cart Pricing
	============================================================ */
	function updateTotalCartPricing() {
		$('.cart .pricing').text(formatAsMoney(cart.subtotal));
	}
	/* Format amount as currency
	============================================================ */
	function formatAsMoney(amount, currency, thousandSeparator, decimalSeparator, localeDecimalSeparator) {
		currency = currency || '$';
		thousandSeparator = thousandSeparator || ',';
		decimalSeparator = decimalSeparator || '.';
		localeDecimalSeparator = localeDecimalSeparator || '.';
		let regex = new RegExp('(\\d)(?=(\\d{3})+\\.)', 'g');
		return currency + parseFloat(amount, 10).toFixed(2)
			.replace(localeDecimalSeparator, decimalSeparator)
			.replace(regex, '$1' + thousandSeparator)
		.toString();
	}
	/* Set previously focused item for escape handler
	============================================================ */
	function setPreviousFocusItem(item) {
		previousFocusItem = item;
	}
}
