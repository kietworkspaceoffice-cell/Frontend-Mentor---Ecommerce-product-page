const slidesContainer = document.querySelector('.slideshow-container');
const slideItems = document.querySelectorAll('.slideshow-container > div');
const next = document.querySelector('.next-btn');
const prev = document.querySelector('.prev-btn');
const anchors = document.querySelectorAll('.slideshow-thumbnails > a');
const galleryActive = document.querySelector('.gallery-active');
const closeGallery = document.querySelector('.close-gallery');

const cartBtn = document.querySelector('.open-cart');
const openMenu = document.querySelector('.menu-icon');
const closeMenu = document.querySelector('.close-icon');
const navMenu = document.getElementById('page-navigation');
const mobileLightBox = document.querySelector('.light-box-background');
const cartBox = document.querySelector('.cart-box');

const quantityValue = document.querySelector('.quantity-value');
const decreaseBtn = document.querySelector('.decrease-btn');
const increaseBtn = document.querySelector('.increase-btn');

const cartQuantity = document.querySelector('.multiple');
const cartLastPrice = document.querySelector('.last-price');
const productCart = document.querySelector('.product-cart');
const cartCheckout = document.querySelector('.cart-checkout');
const alertEmpty = document.querySelector('.alert-empty-cart');
const cartAlert = document.querySelector('.cart-alert');

const clearCartBox = document.querySelector('.clear-cart-product');

const addToCartBtn = document.querySelector('.add-to-cart-btn');

let productQuantity = 0;
let cartUnitQuantity = 0;
let lastPrice;


cartBtn.addEventListener('click', () => {
  cartBox.classList.toggle("active");
});

function checkCart() {
  if (cartUnitQuantity > 0) {
    productCart.style.display = "flex";
    cartCheckout.style.display = "block";
    alertEmpty.style.display = "none";
    cartAlert.style.display = "block";
    cartAlert.innerHTML = cartUnitQuantity;

  } else if (cartUnitQuantity == 0) {
    productCart.style.display = "none";
    cartCheckout.style.display = "none";
    alertEmpty.style.display = "block";
    cartAlert.style.display = "none";
  }
};


checkCart();

clearCartBox.addEventListener('click', () => {
  cartUnitQuantity = 0;
  checkCart();
})

increaseBtn.addEventListener('click', () => {
  productQuantity = productQuantity + 1;
  quantityValue.innerHTML = productQuantity;
  return productQuantity;
});

decreaseBtn.addEventListener('click', () => {
  if (productQuantity > 0) {
    productQuantity--;
    quantityValue.innerHTML = productQuantity;
  }
  quantityValue.innerHTML = productQuantity;
  return productQuantity;
});

// cart box value
addToCartBtn.addEventListener('click', () => {
  cartUnitQuantity = cartUnitQuantity + productQuantity;
  console.log(cartUnitQuantity);
  cartQuantity.innerHTML = cartUnitQuantity;
  lastPrice = 125*cartUnitQuantity;
  console.log(lastPrice);
  cartLastPrice.innerHTML = "&#36;" + lastPrice + ".00";
  checkCart();
});




// open menu
openMenu.addEventListener('click', () => {
  navMenu.classList.toggle('active');
  mobileLightBox.classList.toggle('active');
});
closeMenu.addEventListener('click', () => {
  navMenu.classList.remove('active');
  mobileLightBox.classList.remove('active');
});

mobileLightBox.addEventListener('click', () => {
  navMenu.classList.remove('active');
  mobileLightBox.classList.remove('active');
});



// product gallery
$(document).ready(function(){
  $('.slideshow-container').slick({
    infinite: true,
    slidesToShow: 1,
    slidesToScroll: 1,
    arrows: false,
    asNavFor: '.container-active',
  })
})

$('.slideshow-thumbnails a').on('click', function() {
  const target = $(this).data('target');
  $('.slideshow-container').slick('slickGoTo', target.split('-').pop() - 1);
});


$('.prev-btn').on('click', function(){
  $('.slideshow-container').slick('slickPrev');
});
$('.next-btn').on('click', function(){
  $('.slideshow-container').slick('slickNext');
});

// prduct gallery active
$(document).ready(function(){
  $('.container-active').slick({
    infinite: true,
    slidesToShow: 1,
    slidesToScroll: 1,
    arrows: false,
    // asNavFor: '.slide-thumbnails-active',
  });
});

$('.slide-thumbnails-active a').on('click', function() {
  const target = $(this).data('target');
  $('.container-active').slick('slickGoTo', target.split('-').pop() - 1);
});


$('.prev-btn-active').on('click', function(){
  $('.container-active').slick('slickPrev');
});
$('.next-btn-active').on('click', function(){
  $('.container-active').slick('slickNext');
});

slidesContainer.addEventListener('click', function(){
  galleryActive.classList.toggle('active');
  $('.container-active').slick('setPosition');
});

closeGallery.addEventListener('click', function() {
  galleryActive.classList.remove('active');
})
