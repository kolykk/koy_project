angular.module('ui.bootstrap.demo', ['ngAnimate', 'ui.bootstrap']);
angular.module('ui.bootstrap.demo').controller('ModalDemoCtrl', function ($scope, $uibModal, $log , $http) {

  $http.get("http://localhost:3000/manageinfo/getdata").then(function (response) {
    $scope.items = response;
  });

  $scope.open = function (size , check) {
    // console.log("check is "+check);
    var modalInstance = $uibModal.open({
      templateUrl: 'myModalContent.html',
      controller: 'ModalInstanceCtrl',
      size: size,
      resolve: {
        items: function () {
          // $http.get("http://localhost:3000/manageinfo/getdata").then(function (response) {
            // console.log("response is "+response);
            for (var i = 0; i < $scope.items.data.length; i++) {
              // body
            		if(check == $scope.items.data[i].s_id){
                  console.log("$scope.items.data[i].s_name is "+$scope.items.data[i].s_name);
                  return $scope.items.data[i];
            		}
            }
          // });

        }
      }
    });
  };

  $scope.open_details = function (size , check) {
    console.log("check is "+check);
    var modalInstance = $uibModal.open({
      templateUrl: 'myModalContent_detail.html',
      controller: 'ModalInstanceCtrl',
      size: size,
      resolve: {
        items: function () {
          $http.get("http://localhost:3000/manageinfo/details/"+check).then(function (response) {

            // console.log("response is "+response);

            // for (var i = 0; i < $scope.items.data.length; i++) {
            //   // body
            // 		if(check == $scope.items.data[i].s_id){
            //       return $scope.items.data[i];
            // 		}
            // }
            // $scope.items = response;


            // console.log("response.data[0] is "+response.data[0].s_name);
            // console.log("response.data[1] is "+response.data[1].s_name);
            $scope.details = response.data[0];
            console.log("$scope.details is "+$scope.details.s_name);
            return response.data[0];
          });
        }
      }
    });
  };

  $scope.open_delete = function (size , check) {
      console.log("check is "+check);
      var modalInstance = $uibModal.open({
        templateUrl: 'myModal.html',
        controller: 'ModalInstanceCtrl',
        size: size,
        resolve: {
          items: function () {
              return check;
          }
        }
      });
  };


});


angular.module('ui.bootstrap.demo').controller('ModalDemoCtrl', function ($scope, $uibModal, $log , $http) {

  $http.get("http://localhost:3000/manageinfo/getdata").then(function (response) {
    $scope.items = response;
  });

  $scope.open = function (size , check) {
    // console.log("check is "+check);
    var modalInstance = $uibModal.open({
      templateUrl: 'myModalContent.html',
      controller: 'ModalInstanceCtrl',
      size: size,
      resolve: {
        items: function () {
          // $http.get("http://localhost:3000/manageinfo/getdata").then(function (response) {
            // console.log("response is "+response);
            for (var i = 0; i < $scope.items.data.length; i++) {
              // body
            		if(check == $scope.items.data[i].s_id){
                  console.log("$scope.items.data[i].s_name is "+$scope.items.data[i].s_name);
                  return $scope.items.data[i];
            		}
            }
          // });

        }
      }
    });
  };

  $scope.open_details = function (size , check) {
    console.log("check is "+check);
    var modalInstance = $uibModal.open({
      templateUrl: 'myModalContent_detail.html',
      controller: 'ModalInstanceCtrl',
      size: size,
      resolve: {
        items: function () {
          $http.get("http://localhost:3000/manageinfo/details/"+check).then(function (response) {

            // console.log("response is "+response);

            // for (var i = 0; i < $scope.items.data.length; i++) {
            //   // body
            // 		if(check == $scope.items.data[i].s_id){
            //       return $scope.items.data[i];
            // 		}
            // }
            // $scope.items = response;


            // console.log("response.data[0] is "+response.data[0].s_name);
            // console.log("response.data[1] is "+response.data[1].s_name);
            $scope.details = response.data[0];
            console.log("$scope.details is "+$scope.details.s_name);
            return response.data[0];
          });
        }
      }
    });
  };

  $scope.open_delete = function (size , check) {
      console.log("check is "+check);
      var modalInstance = $uibModal.open({
        templateUrl: 'myModal.html',
        controller: 'ModalInstanceCtrl',
        size: size,
        resolve: {
          items: function () {
              return check;
          }
        }
      });
  };


});

// Please note that $uibModalInstance represents a modal window (instance) dependency.
// It is not the same as the $uibModal service used above.

angular.module('ui.bootstrap.demo').controller('ModalInstanceCtrl', function ($scope, $uibModalInstance , items, $http) {
  $scope.items = items;
  // console.log("$scope.items = ",$scope.items);
  // console.log("$scope.items.updated_at = ",$scope.items.updated_at);
  $scope.ok = function () {
    $http.put("http://localhost:3000/manageinfo/update/"+$scope.items.s_id , $scope.items);
    alert('Update your account');
  };

  $scope.cancel = function () {
    $uibModalInstance.dismiss('cancel');
  };

  $scope.delete = function () {
    var delete_check = items
    console.log("delete_check is "+delete_check);
    $http.delete("http://localhost:3000/manageinfo/delete/"+delete_check).then(function (response) {
      console.log("response is "+response);
      $scope.items = response;
      location.reload();
    });
  };
});
