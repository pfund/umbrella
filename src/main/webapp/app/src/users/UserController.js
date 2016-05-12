(function () {

    angular
        .module('users')
        .controller('SinistreController', [
            'sinistreService', '$mdSidenav', '$mdBottomSheet', '$log', '$q',
            SinistreController
        ])
        .controller('DemoCtrl', [
            'sinistreService', '$timeout', '$q', '$log',
            DemoCtrl
        ]);
    ;

    function SinistreController(sinistreService, $mdSidenav, $mdBottomSheet, $log) {
        var self = this;

        self.showSinistreDescription = showSinistreDescription;

        /**
         * Show the sinistre view in the bottom sheet
         */
        function showSinistreDescription(selectedSinistre) {

            $mdBottomSheet.show({
                controllerAs: "sdc",
                templateUrl: './src/users/view/sinistreDescription.html',
                controller: ['$mdBottomSheet', SinistreDescriptionController],
                parent: angular.element(document.getElementById('sinistre'))
            }).then(function (clickedItem) {
                $log.debug(clickedItem.name + ' clicked!');
            });

            /**
             * User sinistre controller
             */
            function SinistreDescriptionController($mdBottomSheet) {
                this.sinistre = selectedSinistre;

                this.sinistreHide = function (action) {
                    // The actually contact process has not been implemented...
                    // so just hide the bottomSheet

                    $mdBottomSheet.hide(action);
                };
            }
        }
    }

    function DemoCtrl(sinistreService, $timeout, $q, $log) {
        var self = this;
        self.simulateQuery = false;
        self.isDisabled = false;
        self.repos = []; //loadAll();
        self.querySearch = querySearch;
        self.selectedItemChange = selectedItemChange;
        self.searchTextChange = searchTextChange;
        // ******************************
        // Internal methods
        // ******************************
        /**
         * Search for repos... use $timeout to simulate
         * remote dataservice call.
         */
        function querySearch(query) {
            var results = query ? self.repos.filter(createFilterFor(query)) : self.repos,
                deferred;
            if (self.simulateQuery) {
                deferred = $q.defer();
                $timeout(function () {
                    deferred.resolve(results);
                }, Math.random() * 1000, false);
                return deferred.promise;
            } else {
                return results;
            }
        }

        function searchTextChange(text) {
            $log.info('Text changed to ' + text);
        }

        function selectedItemChange(item) {
            self.detail = undefined;
            if (item) {
                sinistreService.getSinistre(item).then(function (result) {
                        self.detail = result;
                    }
                );
            }
            $log.info(JSON.stringify(self.detail));
            $log.info('Item changed to ' + JSON.stringify(item));
        }

        /**
         * Build `components` list of key/value pairs
         */
        sinistreService
            .loadAllSinistres()
            .then(function (repos) {
                var normalizedRepos = repos.map(function (repo) {
                    repo.normalized = removeAccents(angular.lowercase(repo.name));
                    return repo;
                });

                self.repos = [].concat(normalizedRepos);
            });
        /**
         * Create filter function for a query string
         */
        function createFilterFor(query) {
            var normalized = angular.lowercase(query);
            normalized = removeAccents(normalized);
            return function filterFn(item) {
                var splitted = normalized.split(" ");
                for (var i = 0; i < splitted.length; i++) {
                    if (item.normalized.indexOf(splitted[i]) == -1) {
                        return false;
                    }
                }
                return true;
            };
        }

        function removeAccents(source) {
            var accent = [
                    /[\300-\306]/g, /[\340-\346]/g, // A, a
                    /[\310-\313]/g, /[\350-\353]/g, // E, e
                    /[\314-\317]/g, /[\354-\357]/g, // I, i
                    /[\322-\330]/g, /[\362-\370]/g, // O, o
                    /[\331-\334]/g, /[\371-\374]/g, // U, u
                    /[\321]/g, /[\361]/g, // N, n
                    /[\307]/g, /[\347]/g, // C, c
                ],
                noaccent = ['A', 'a', 'E', 'e', 'I', 'i', 'O', 'o', 'U', 'u', 'N', 'n', 'C', 'c'];

            for (var i = 0; i < accent.length; i++) {
                source = source.replace(accent[i], noaccent[i]);
            }

            return source;
        }
    }

})();

