(function () {
    var app = angular.module("hadaAdminApp");

    app.controller('CreateDishCtrl', ['hada-dal', '$mdDialog', '$scope', '$location', CreateDishController]);

    function CreateDishController(dbServer, $mdDialog, scope, $location) {
        var vm = this;
        vm.dish = {};
        vm.dish.image = {};
        function ctor() {
            vm.dish.description = "";
            vm.dish.ingredients = ["a"];
            vm.types = dbServer.getTypes();
            var drEvent = $('.dropify').dropify();;
            drEvent.on('dropify.afterClear', function (event, element) {
                scope.$apply();
            });
        }

        vm.addIngridient = function (ev) {
            // Appending dialog to document.body to cover sidenav in docs app
            var confirm = $mdDialog.prompt()
                .title('הכנסת רכיב חדש')
                .placeholder('הכנס רכיב חדש')
                .ariaLabel('רכיב חדש')
                .initialValue('שמן')
                .targetEvent(ev)
                //.required(true)
                .ok('הוסף!')
                .cancel('התחרטתי');

            $mdDialog.show(confirm).then(function (result) {
                vm.dish.ingredients.push(result);
            });
        };

        vm.createDish = function () {
            var image = vm.getImageData();
            vm.dish.image = image;
            dbServer.createDish(vm.dish);
            $location.path("/");
        }
        vm.getImageData = function () {
            return $(".dropify-render img").attr("src");
        }

        ctor();
    }
})();
