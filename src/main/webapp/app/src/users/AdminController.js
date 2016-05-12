(function(){

  angular
       .module('users')
       .controller('AdminController', [
          'adminService', '$scope', AdminController
       ]);
  ;

  function AdminController(adminService, $scope) {
    var self = this;
    adminService.getSearchStatsByType().then(function(response) {
        $scope.labelsPie = [];
        $scope.dataPie = [];

        var searchStatsByType = response.data;
        for (var i = 0; i < searchStatsByType.length; i++) {
            var item = searchStatsByType[i];
            $scope.labelsPie.push(item._id);
            $scope.dataPie.push(item.count);
        }
    });

      adminService.getSearchStatsByName().then(function(response) {
        $scope.labelsBarChart = [];
        $scope.seriesBarChart = ["Nom"];
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

})();

