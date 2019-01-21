(function () {
'use strict';

angular.module('NarrowItDownApp', [])
.controller('NarrowItDownController', NarrowItDownController)
.service('MenuSearchService', MenuSearchService)
.constant('ApiBasePath', "https://davids-restaurant.herokuapp.com")
.directive('foundItems', FoundItemsDirective);


function FoundItemsDirective() {
  var ddo = {
    templateUrl: 'foundItems.html',
    scope: {
      items: '<',
      onRemove: '&'
    },
    controller: FoundItemsDirectiveController,
    controllerAs: 'list',
    bindToController: true
  };

  return ddo;
}


function FoundItemsDirectiveController() {
  var list = this;

  list.isNothingFound = function() {
    if (list.items.length === 0) {
      return true;
    }
    return false;
  };
}


NarrowItDownController.$inject = ['MenuSearchService'];
function NarrowItDownController(MenuSearchService) {
  var menu = this;
  menu.searchTerm = "";
  menu.found = [];

  menu.fetchItems = function () {
    console.log(menu.searchTerm);
    var promise = MenuSearchService.getMatchedMenuItems(menu.searchTerm);

    if (menu.searchTerm.trim() === "") {
        menu.found = [];
    } else {
      promise.then(function (response) {
        console.log(response);
        menu.found = response;
      })
      .catch(function (error) {
        console.log(error);
      })
    }

  };

  menu.removeItem = function (itemIndex) {
    menu.found.splice(itemIndex, 1);
  };
}


MenuSearchService.$inject = ['$http', 'ApiBasePath', '$filter'];
function MenuSearchService($http, ApiBasePath, $filter) {
  var service = this;

  service.getMatchedMenuItems = function (searchTerm) {

    return $http({
      method: "GET",
      url: (ApiBasePath + "/menu_items.json")
    }).then(function (result) {
    // process result and only keep items that match
    var foundItems = $filter('filter')(result.data.menu_items, function (obj) {
                        if(obj.description.indexOf(searchTerm) !== -1)
                        return obj;
                });

    // return processed items
    return foundItems;
});
  };

}

})();
