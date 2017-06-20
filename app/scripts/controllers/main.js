'use strict';

/**
 * @ngdoc function
 * @name hadaAdminApp.controller:MainCtrl
 * @description
 * # MainCtrl
 * Controller of the hadaAdminApp
 */
(function () {
  var app = angular.module("hadaAdminApp");

  app.controller('MainCtrl', ['daysInterval', '$moment', '$location', 'hada-dal', '$mdToast', MainController]);

  function MainController(daysInterval, moment, $location, serverDb, $mdToast) {
    var vm = this;
    vm.days = getDays();
    vm.dayClicked = dayClicked;
    vm.copyClicked = copyClicked;
    vm.copyMode = false;

    function ctor() {
      vm.days.forEach(function (day, i) {
        serverDb.getMenus(day.date)
          .then(res => {
            vm.days[i].finished = res.length > 0
          })
      }, this);
    }

    function getDays() {
      let currentDate = moment();
      let dateRange = [formatDay(currentDate)];
      for (let i = 1; i <= daysInterval; i++) {
        dateRange.push(formatDay(moment().add(i, 'days')));
        dateRange.unshift(formatDay(moment().subtract(i, 'days')));
      }
      return dateRange;
    }

    function copyClicked($event, model) {
      vm.copyModeDay = model;
      vm.copyMode = !vm.copyMode;
      $event.stopPropagation();
    }

    function dayClicked(day) {
      if (vm.copyMode) {
        copyRequest(vm.copyModeDay, day)
          .then(() => {
            vm.copyMode = false;
            $mdToast.show(
              $mdToast.simple()
                .textContent('שיכפול היום ' + vm.copyModeDay.displayName + " ליום " + day.displayName + " הושלמה בהצלחה")
                .position("bottom left")
                .hideDelay(3000)
            );
          })
      }
      else {
        navigateToMenus(day.url);
      }
    }
    function navigateToMenus(path) {
      $location.path(path);
    }

    function copyRequest(copiedDay, createdDay) {
      return serverDb.getMenus(copiedDay.date)
        .then(menus => {
          menus.forEach(function (element) {
            element.date = createdDay.date.toDate();
            serverDb.createMenu(element);
          }, this);
        })

    }
    function formatDay(date) {
      return {
        displayName: date.format("DD/MM"),
        date: date,
        url: "/meals/" + date.format("MM-DD-YYYY"),
        finished: false
      }
    }
    ctor();
  }
})();
