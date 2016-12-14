// Ionic Starter App

// angular.module is a global place for creating, registering and retrieving Angular modules
// 'starter' is the name of this angular module example (also set in a <body> attribute in index.html)
// the 2nd parameter is an array of 'requires'
// 'starter.controllers' is found in controllers.js
angular.module('starter', ['ionic', 'starter.controllers'])

.run(function($ionicPlatform) {
  $ionicPlatform.ready(function() {
    // Hide the accessory bar by default (remove this to show the accessory bar above the keyboard
    // for form inputs)
    if (window.cordova && window.cordova.plugins.Keyboard) {
      cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);
      cordova.plugins.Keyboard.disableScroll(true);

    }
    if (window.StatusBar) {
      // org.apache.cordova.statusbar required
      StatusBar.styleDefault();
    }
  });
})

.config(function($stateProvider, $urlRouterProvider) {
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
  // if none of the above states are matched, use this as the fallback
  $urlRouterProvider.otherwise('/app/subjects');
});
