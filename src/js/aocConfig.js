"use strict";

angular.module('aocConfig', ['aoc']).run(["aocConfigure", function (aocConfigure) {
    aocConfigure({
        'dialog': function () {
            return {
                actions: {
                    'default': ['open', 'close', 'destroy']
                }
            }
        },
        'gmap': ['element', function (element) {
            var defSettings = {
                center: {lat: 0, lng: 0},
                zoom: 6
            };
            return {
                actions: {
                    custom: {
                        center: function (coordinates) {
                            return new google.maps.Map(element[0], angular.extend(defSettings, {center: coordinates}));
                        }
                    }
                },
                createFn: function () {
                    return element;
                }
            }


        }]
    });


}]);


