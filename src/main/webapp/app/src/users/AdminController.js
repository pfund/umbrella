(function(){

  angular
       .module('users')
       .controller('AdminController', [
          'adminService', AdminController
       ]);
  ;

  function AdminController(adminService) {
    var self = this;
    adminService.getSearchStatsByType().then(function(response) {
        self.searchStatsByType = response.data;
    });
    }

})();

