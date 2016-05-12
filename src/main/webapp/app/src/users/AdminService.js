(function(){
  'use strict';

  angular.module('users')
         .service('adminService', ['$http', AdminService]);

  function AdminService($http){
     return {
       getSearchStatsByType: function() {
         return $http.get('https://api.mlab.com/api/1/databases/umbrella/collections/searchstatsbytype?apiKey=HZv0QNkWyHn5AF5Ax0PuDaW8X0p94gia')
             .error(function (data, status) {
               console.log("Erreur lors de la récupération des statistiques par type " + data + " " + status);
             });
       },

         getSearchStatsByName: function() {
             return $http.get('https://api.mlab.com/api/1/databases/umbrella/collections/searchstatsbyname?apiKey=HZv0QNkWyHn5AF5Ax0PuDaW8X0p94gia&s={count:-1}&l=10')
                 .error(function (data, status) {
                     console.log("Erreur lors de la récupération des statistiques par nom " + data + " " + status);
                 });
         }
     };
  }

})();