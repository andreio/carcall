"use strict";

angular.module('carCall', ['aocConfig', 'ngResource', 'filters', 'calling', 'home', 'ngRoute'])
    .config(['$routeProvider',function ($routeProvider) {
        $routeProvider
            .when('/calling/:id', {
                controller: 'calling',
                resolve: {'contact':["contacts",'$route', function (contacts, $route) {
                    return contacts.query().$promise.then(function (val) {
                        return val.filter(function (contact) {
                            return contact.id == $route.current.params.id
                        })[0]
                    })
                }]},
                templateUrl: 'calling.html'})
            .when('/home', {
                controller: 'home',
                resolve: {'contactList': ['contacts',function (contacts) {
                    return contacts.query().$promise;
                }]},
                templateUrl: 'home.html'
            })
            .otherwise({redirectTo: '/home'})
    }]);


