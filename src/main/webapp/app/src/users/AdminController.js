(function(){

  angular
       .module('users')
       .controller('AdminController', [
          'adminService', '$scope', '$interval', '$rootScope', AdminController
       ]);
  ;

  function AdminController(adminService, $scope, $interval, $rootScope) {
    var self = this;
      self.searchStatsByNameOrder = '_id';
      self.searchStatsByTypeOrder = '_id';

      var updateData = function() {
          adminService.getSearchStatsByType().then(function (response) {
              self.searchStatsByType = response.data;
              $scope.labelsPie = [];
              $scope.dataPie = [];

              var searchStatsByType = response.data;
              for (var i = 0; i < searchStatsByType.length; i++) {
                  var item = searchStatsByType[i];
                  $scope.labelsPie.push(item._id.toUpperCase());
                  $scope.dataPie.push(item.count);
              }
          });

          adminService.getSearchStatsByName().then(function (response) {
              self.searchStatsByName = response.data;
              $scope.labelsBarChart = [];
              $scope.seriesBarChart = ["Nombre de recherches "];
              $scope.dataBarChart = [];

              var searchStatsByName = response.data;
              var dataTable = [];
              for (var i = 0; i < searchStatsByName.length; i++) {
                  var item = searchStatsByName[i];
                  $scope.labelsBarChart.push(item._id);
                  dataTable.push(item.count);
              }
              $scope.dataBarChart.push(dataTable);
          });
      }
      updateData();

      self.myInterval = $interval(updateData, 2000);

      var dereg = $rootScope.$on('$locationChangeSuccess', function() {
          $interval.cancel(self.myInterval);
          dereg();
      });

  }

})();

