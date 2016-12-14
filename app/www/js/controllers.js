var urlapi = "http://localhost:3000/api/";
angular.module('starter.controllers', [])

.controller('AppCtrl', function($scope, $ionicModal, $timeout) {


})

.controller('SubjectsCtrl', function($scope, $http) {
  $http.get(urlapi + 'subjects')
    .success(function (data, status, headers, config) {
        console.log('data success');
        console.log(data); // for browser console
        $scope.subjects = data; // for UI
    })
    .error(function (data, status, headers, config) {
        console.log('data error');
        console.log(status);
        console.log(data);
    })
    .then(function (result) {

  });

  $scope.subjectsOrderByMe = function(x) {
    console.log("sorting by " + x);
    $scope.mySubjectsOrderBy = x;
  };
})

.controller('SubjectCtrl', function($scope, $http, $stateParams) {
  $http.get(urlapi + 'subjects/'+$stateParams.subjectId)
    .success(function (data, status, headers, config) {
        console.log('data success');
        console.log(data); // for browser console
        $scope.subject = data; // for UI
        //$scope.hide();
    })
    .error(function (data, status, headers, config) {
        console.log('data error');
        console.log(status);
        console.log(data);
    })
    .then(function (result) {
        //students = result.data;
  });
})

.controller('StudentsCtrl', function($scope, $http) {
  $http.get(urlapi + 'students')
    .success(function (data, status, headers, config) {
        console.log('data success');
        console.log(data); // for browser console
        $scope.students = data; // for UI
    })
    .error(function (data, status, headers, config) {
        console.log('data error');
        console.log(status);
        console.log(data);
    })
    .then(function (result) {

  });

  $scope.studentsOrderByMe = function(y) {
    console.log("sorting by " + y);
    $scope.myStudentsOrderBy = y;
  }
})
.controller('StudentCtrl', function($scope, $http, $stateParams) {
  $http.get(urlapi + 'students/'+$stateParams.studentId)
    .success(function (data, status, headers, config) {
        console.log('data success');
        console.log(data); // for browser console
        $scope.student = data; // for UI
        //$scope.hide();
    })
    .error(function (data, status, headers, config) {
        console.log('data error');
        console.log(status);
        console.log(data);
    })
    .then(function (result) {
        //students = result.data;
  });
});
