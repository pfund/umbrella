(function(){

  angular
       .module('users')
       .controller('UserController', [
          'userService', '$mdSidenav', '$mdBottomSheet', '$log', '$q',
          UserController
       ])
      .controller('DemoCtrl', [
          'sinistreService', '$timeout', '$q', '$log',
          DemoCtrl
      ]);
  ;

  /**
   * Main Controller for the Angular Material Starter App
   * @param $scope
   * @param $mdSidenav
   * @param avatarsService
   * @constructor
   */
  function UserController( userService, $mdSidenav, $mdBottomSheet, $log) {
    var self = this;

    self.selected     = null;
    self.users        = [ ];
    self.selectUser   = selectUser;
    self.toggleList   = toggleUsersList;
    self.makeContact  = makeContact;

    // Load all registered users

    userService
          .loadAllUsers()
          .then( function( users ) {
            self.users    = [].concat(users);
            self.selected = users[1];
          });

    // *********************************
    // Internal methods
    // *********************************

    /**
     * Hide or Show the 'left' sideNav area
     */
    function toggleUsersList() {
      $mdSidenav('left').toggle();
    }

    /**
     * Select the current avatars
     * @param menuId
     */
    function selectUser ( user ) {
      self.selected = angular.isNumber(user) ? $scope.users[user] : user;
    }

    /**
     * Show the Contact view in the bottom sheet
     */
    function makeContact(selectedUser) {

        $mdBottomSheet.show({
          controllerAs  : "cp",
          templateUrl   : './src/users/view/contactSheet.html',
          controller    : [ '$mdBottomSheet', ContactSheetController],
          parent        : angular.element(document.getElementById('content'))
        }).then(function(clickedItem) {
          $log.debug( clickedItem.name + ' clicked!');
        });

        /**
         * User ContactSheet controller
         */
        function ContactSheetController( $mdBottomSheet ) {
          this.user = selectedUser;
          this.actions = [
            { name: 'Phone'       , icon: 'phone'       , icon_url: 'assets/svg/phone.svg'},
            { name: 'Twitter'     , icon: 'twitter'     , icon_url: 'assets/svg/twitter.svg'},
            { name: 'Google+'     , icon: 'google_plus' , icon_url: 'assets/svg/google_plus.svg'},
            { name: 'Hangout'     , icon: 'hangouts'    , icon_url: 'assets/svg/hangouts.svg'}
          ];
          this.contactUser = function(action) {
            // The actually contact process has not been implemented...
            // so just hide the bottomSheet

            $mdBottomSheet.hide(action);
          };
        }
    }


  }

    function DemoCtrl (sinistreService, $timeout, $q, $log) {
        var self = this;
        self.simulateQuery = false;
        self.isDisabled    = false;
        self.repos         = []; //loadAll();
        self.querySearch   = querySearch;
        self.selectedItemChange = selectedItemChange;
        self.searchTextChange   = searchTextChange;
        // ******************************
        // Internal methods
        // ******************************
        /**
         * Search for repos... use $timeout to simulate
         * remote dataservice call.
         */
        function querySearch (query) {
            var results = query ? self.repos.filter( createFilterFor(query) ) : self.repos,
                deferred;
            if (self.simulateQuery) {
                deferred = $q.defer();
                $timeout(function () { deferred.resolve( results ); }, Math.random() * 1000, false);
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
                sinistreService.getSinistre(item.name).then(function (result) {
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
            .then( function( repos ) {
                var normalizedRepos = repos.map( function (repo) {
                    repo.normalized = removeAccents(angular.lowercase(repo.name));
                    return repo;
                });

                self.repos    = [].concat(normalizedRepos);
            });
        /**
         * Create filter function for a query string
         */
        function createFilterFor(query) {
            var normalized = angular.lowercase(query);
            normalized = removeAccents(normalized)
            return function filterFn(item) {
                return (item.normalized.indexOf(normalized) != -1);
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
                noaccent = ['A','a','E','e','I','i','O','o','U','u','N','n','C','c'];

            for (var i = 0; i < accent.length; i++){
                source = source.replace(accent[i], noaccent[i]);
            }

            return source;
        }
    }

})();

