'use strict';
(function () {
  var app = angular.module("hadaAdminApp");

  app.controller('DayMenuCtrl', ['$routeParams', 'hada-dal', '$location', '$mdToast', DayMenuController]);

  function DayMenuController(routeParams, serverDb, $location, $mdToast) {
    var vm = this;
    vm.date = routeParams.date;
    vm.menus = [];

    function ctor() {
      serverDb.getAvailableDishes()
        .then(results => {
          vm.dishes = results;
        })
      serverDb.getMenus(new Date(vm.date))
        .then(results => {
          vm.menus = results;
          if (!vm.menus.length) {
            addMenu("ארוחת בוקר");
            addMenu("ארוחת צהריים");
            addMenu("ארוחת ערב");
            vm.created = false;
          }
          else {
            vm.menus = adaptMenusFromServer(vm.menus)
            vm.created = true;
          }
        })
    }
    vm.createMenus = function () {
      var menus = adaptMenusToServer(vm.menus);
      menus.forEach(function (element) {
        serverDb.createMenu(element);
      }, this);
      $location.path("/");
      $mdToast.show(
        $mdToast.simple()
          .textContent("נוצר התפריט להיום :)")
          .position("bottom left")
          .hideDelay(3000)
      );
    }

    vm.selectDish = function (menu, dish) {
      menu.dishes[dish.id].isSelected = !menu.dishes[dish.id].isSelected;
    }

    function adaptMenusToServer(menus, dishes) {
      return menus.map(m => {
        var dishes = [];
        for (var i in m.dishes)
          if (m.dishes[i].isSelected)
            dishes.push(m.dishes[i].id)
        return { type: m.type, dishes: dishes, date: m.date }
      })
    }
    function adaptMenusFromServer(menus) {
      return menus.map(m => {
        var selectedDishes = [];
        for (var i in vm.dishes) {
          var dish = vm.dishes[i];
          selectedDishes[dish.id] = { id: dish.id, isSelected: m.dishes.indexOf(dish.id) >= 0 }
        }

        return { type: m.type, dishes: selectedDishes, date: m.date };
      })
    }

    function addMenu(type) {
      var selectedDishes = [];
      for (var i in vm.dishes) {
        var dish = vm.dishes[i];
        selectedDishes[dish.id] = { id: dish.id, isSelected: false }
      }

      vm.menus.push({ "type": type, "dishes": selectedDishes, "date": new Date(vm.date) });
    }
    ctor();
  }
})();
