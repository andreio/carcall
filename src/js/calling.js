'use strict';

angular.module('calling', [])
    .controller('calling', ['contact','$scope','aocControls','$timeout',function (contact, $scope, aocControls, $timeout) {
        var coordinates = contact.currentCoordinates.split(',').map(parseFloat);
        $scope.contact = contact;
        $timeout(function () {
            aocControls('contactLocation').gmap.center({lat: coordinates[0], lng: coordinates[1]});
        }, 10);
    }]);