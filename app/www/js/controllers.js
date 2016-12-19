var urlapi = "http://localhost:3000/api/";
angular.module('starter.controllers', [])
    .controller('AppCtrl', function ($scope, $ionicModal, $timeout) {
    })
    .controller('SubjectsCtrl', function ($scope, $http) {
        $http.get(urlapi + 'subjects')
            .success(function (data) {
                console.log('data success');
                console.log(data);
                $scope.subjects = data;
            })
            .error(function (data, status) {
                console.log('data error');
                console.log(status);
                console.log(data);
            })
            .then(function (result) {
            });
        $scope.subjectsOrderByMe = function (x) {
            console.log("sorting by " + x);
            $scope.mySubjectsOrderBy = x;
        };
        $scope.filterstudent = function (x) {
            console.log("sorting by " + x);
            $scope.filterstudent = x;
        };
    })
    .controller('SubjectCtrl', function ($scope, $http, $stateParams) {
        $http.get(urlapi + 'subjects/by/id/' + $stateParams.subjectId)
            .success(function (data) {
                console.log('data success');
                console.log(data);
                $scope.subject = data;
            })
            .error(function (data, status) {
                console.log('data error');
                console.log(status);
                console.log(data);
            })
            .then(function (result) {
            });
    })
    .controller('StudentsCtrl', function ($scope, $http) {
        $http.get(urlapi + 'students')
            .success(function (data) {
                console.log('data success');
                console.log(data);
                $scope.students = data;
            })
            .error(function (data, status) {
                console.log('data error');
                console.log(status);
                console.log(data);
            })
            .then(function (result) {
            });
        $scope.studentsOrderByMe = function (y) {
            console.log("sorting by " + y);
            $scope.myStudentsOrderBy = y;
        }
    })
    .controller('StudentCtrl', function ($scope, $http, $stateParams) {
        $http.get(urlapi + 'students/' + $stateParams.studentId)
            .success(function (data) {
                console.log('data success');
                console.log(data);
                $scope.student = data;
            })
            .error(function (data, status) {
                console.log('data error');
                console.log(status);
                console.log(data);
            })
            .then(function (result) {
            });
    });
