"use strict";

angular.module('home', [])
    .controller('home',['$scope','aocControls','contactList','$location', function ($scope, aocControls, contactList, $location) {
        $scope.$aoc = aocControls;
        $scope.contacts = contactList;
        $scope.call = function (contactId) {
            $location.path("/calling/" + contactId);
        }
    }])
    .service('contacts', ['$resource',function ($resource) {
        return $resource('./contacts.json');
    }]);