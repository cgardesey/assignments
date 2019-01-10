(function () {
'use strict';

angular.module('ShoppingListCheckOff', [])
.controller('ShoppingListAddController', ShoppingListAddController)
.controller('AlreadyBoughtController', AlreadyBoughtController)
.service('ShoppingListCheckOffService', ShoppingListCheckOffService);

ShoppingListAddController.$inject = ['ShoppingListCheckOffService'];
function ShoppingListAddController(ShoppingListCheckOffService) {
  var toBuy = this;

  toBuy.items = ShoppingListCheckOffService.getToBuyItems();
  toBuy.to_buy_array = ShoppingListCheckOffService.to_buy_array;

  toBuy.buy = function (itemIndex) {
    ShoppingListCheckOffService.buy(itemIndex);
  };
}


AlreadyBoughtController.$inject = ['ShoppingListCheckOffService'];
function AlreadyBoughtController(ShoppingListCheckOffService) {
  var bought = this;

  bought.items = ShoppingListCheckOffService.getBoughtItems();
  bought.bought_array = ShoppingListCheckOffService.bought_array;
}


function ShoppingListCheckOffService() {
  var service = this;

  // List of items to buy
  var to_buy_array = [
    { name: "cookies", quantity: 10 },
    { name: "Cheese", quantity: 20 },
    { name: "Eggs", quantity: 30 },
    { name: "Bread", quantity: 40 },
    { name: "chocolate", quantity: 50 }
  ];

// List of bought items
var bought_array = [];

  var addItem = function (item) {
    bought_array.push(item);
  };

  var removeItem = function (itemIdex) {
    to_buy_array.splice(itemIdex, 1);
  };

  service.buy = function (itemIdex) {
    addItem(to_buy_array[itemIdex]);
    removeItem(itemIdex);
  };

  service.getToBuyItems = function () {
    return to_buy_array;
  };

  service.getBoughtItems = function () {
    return bought_array;
  };
}

})();
