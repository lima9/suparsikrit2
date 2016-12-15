angular.module('starter', ['ionic', 'starter.controllers'])

  .run(function ($ionicPlatform) {
    $ionicPlatform.ready(function () {
      if (window.cordova && window.cordova.plugins.Keyboard) {
        cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);
        cordova.plugins.Keyboard.disableScroll(true);
      }
      if (window.StatusBar) {
        StatusBar.styleDefault();
      }
    });
  })

  .config(function ($stateProvider, $urlRouterProvider) {
    $stateProvider
      .state('app', {
        url: '/app',
        abstract: true,
        templateUrl: 'templates/menu.html',
        controller: 'AppCtrl'
      })

      .state('app.subjects', {
        url: '/subjects',
        views: {
          'menuContent': {
            templateUrl: 'templates/subjects.html',
            controller: 'SubjectsCtrl'
          }
        }
      })
      .state('app.subject', {
        url: '/subjects/:subjectId',
        views: {
          'menuContent': {
            templateUrl: 'templates/subject.html',
            controller: 'SubjectCtrl'
          }
        }
      })
      .state('app.students', {
        url: '/students',
        views: {
          'menuContent': {
            templateUrl: 'templates/students.html',
            controller: 'StudentsCtrl'
          }
        }
      })
      .state('app.student', {
        url: '/students/:studentId',
        views: {
          'menuContent': {
            templateUrl: 'templates/student.html',
            controller: 'StudentCtrl'
          }
        }
      });
    $urlRouterProvider.otherwise('/app/subjects');
  });
