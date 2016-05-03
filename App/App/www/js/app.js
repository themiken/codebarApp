// Ionic Starter App

// angular.module is a global place for creating, registering and retrieving Angular modules
// 'starter' is the name of this angular module example (also set in a <body> attribute in index.html)
// the 2nd parameter is an array of 'requires'
angular.module('starter', ['ionic', 'ngCordova'])

.run(function($ionicPlatform) {
  $ionicPlatform.ready(function() {
    if(window.cordova && window.cordova.plugins.Keyboard) {
      // Hide the accessory bar by default (remove this to show the accessory bar above the keyboard
      // for form inputs)
      cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);

      // Don't remove this line unless you know what you are doing. It stops the viewport
      // from snapping when text inputs are focused. Ionic handles this internally for
      // a much nicer keyboard experience.
      cordova.plugins.Keyboard.disableScroll(true);
    }
    if(window.StatusBar) {
      StatusBar.styleDefault();
    }
  });
})


.controller("codeController", function($scope, $cordovaBarcodeScanner) {
 
    $scope.scanBarcode = function() {
        console.log('1')
        copyItem();
        $cordovaBarcodeScanner.scan().then(function(result) {
            //alert(result.text);
            console.log("Barcode Format -> " + result.format);
            console.log("Cancelled -> " + result.cancelled);
            connectAPI(result.text);
        }, function(error) {
            alert("Ha ocurrido un error -> " + error);
        });
    };
 
});


/***************************************************************************************************/
function connectAPI(resultScan)
{
    $.support.cors = true;
    $.mobile.allowCrossDomainPages = true;
    $.ajax({
        url: "http://themiken.pythonanywhere.com/v1/productos/",
        datatype: "jsonp",
        success: function(data)
        {
            var resultado = resultScan;
            console.log(data.length)
            // console.log(data);

            for (var i = data.length - 1; i >= 0; i--) 
            {
                if(data[i].barcode == resultado)
                {
                    // alert('Nombre :' + data[i].name + '\n' +
                    //       'Descripción: ' + data[i].description + '\n' +
                    //       'Precio: ' + data[i].price + '\n' +
                    //       'Precio IVA: ' + data[i].priceIVA + '\n' +
                    //       'Image URL: ' + data[i].image + '\n' +
                    //       'Codigo: ' + data[i].barcode);
                    copyItem(data[i].name, data[i].description, data[i].price, data[i].priceIVA, data[i].image, data[i].barcode);

                }

            }
        },
        error: function(err)
        {
            console.log(err);
        },
    }); 
}


function copyItem(itemName, itemDescription, itemPrice, itemPriceIVA, itemImage, itemBarcode)
{
  console.log('Im trying copy item...')
  var $item = $("#itemContainer");
  var $clone = $item.clone();
  var $productoContainerID = $("#productoContainerID");
  $clone.find('.productName').html(itemName);
  $clone.find('.productDescription').html(itemDescription);
  $clone.find('.productPrice').html(itemPrice);
  $clone.find('.productPriceIVA').html(itemPriceIVA);
  $clone.find('.figureProductImage').html('<img src=' + itemImage + ' class="productImage"alt="">');
  $clone.find('.productCode').html(itemBarcode);
  $productoContainerID.prepend($clone);

}