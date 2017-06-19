'use strict';

(function () {
    var app = angular.module('hadaAdminApp');
    app.service('hada-dal', ['hadaServer', '$moment', HadaDalService]);

    function HadaDalService(serverUrl, moment) {
        this.getTypes = getTypes;
        this.createDish = createDish;
        this.createMenu = createMenu;
        this.getMenus = getMenus;
        this.getAvailableDishes = getAvailableDishes;
        function getTypes() {
            return [{ displayName: "בשרי", id: 1 }, { displayName: "טבעוני", id: 2 }, { displayName: "צמחוני", id: 3 }]
        }

        function createDish(dish) {
            addItem("dishes", dish);
        }

        function createMenu(menu) {
            addItem("menues", menu);
        }

        function getMenus(date) {
            var momentDate = moment.isMoment(date) ? date : moment(date);
            return getItems("menues").filter(m => moment(m.date).isSame(momentDate,"day"));
        }

        function addItem(key, item) {
            var items = getItems(key);
            if (!items)
                items = [];
            item.id = items.length + 1;
            items.push(item);
            var itemsStr = JSON.stringify(items);
            localStorage.setItem(key, itemsStr);
        }

        function getItems(key) {
            var itemsStr = localStorage.getItem(key);
            if (!itemsStr)
                return [];
            var items = JSON.parse(itemsStr);

            return items;
        }

        function getAvailableDishes() {
            return getItems("dishes");
        }
    }
})()