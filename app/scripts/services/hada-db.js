'use strict';

(function () {
    var app = angular.module('hadaAdminApp');
    app.service('hada-dal', ['hadaServer', '$moment', '$http', HadaDalService]);

    function HadaDalService(serverUrl, moment, $http) {
        this.getTypes = getTypes;
        this.createDish = createDish;
        this.createMenu = createMenu;
        this.getMenus = getMenus;
        this.getAvailableDishes = getAvailableDishes;
        function getTypes() {
            return [{ displayName: "בשרי", id: 1 }, { displayName: "טבעוני", id: 2 }, { displayName: "צמחוני", id: 3 }]
        }

        function createDish(dish) {
            return addItem("dishes", dish);
        }

        function createMenu(menu) {
            return addItem("menus", menu);
        }

        function getMenus(date) {
            var momentDate = moment.isMoment(date) ? date : moment(date);
            return getItems("menus").then(results => {
                return results.filter(m => moment(m.date).isSame(momentDate, "day"))
            }
            );
        }

        function addItem(key, item) {
            return $http.post(serverUrl + '/' + key, { item: item })

            /*var items = getItems(key);
            if (!items)
                items = [];
            item.id = items.length + 1;
            items.push(item);
            var itemsStr = JSON.stringify(items);
            localStorage.setItem(key, itemsStr);*/
        }

        function getItems(key) {
            return $http.get(serverUrl + '/' + key)
                .then(res => {
                    return res.data;
                })
            /*var itemsStr = localStorage.getItem(key);
            if (!itemsStr)
                return [];
            var items = JSON.parse(itemsStr);

            return items;*/
        }

        function getAvailableDishes() {
            return getItems("dishes");
        }
    }
})()