"use strict";

angular.module('filters', [])
    .constant('paginationValue', 10)
    .filter('paginated',['paginationValue', function (paginationValue) {
        return function (value, idx) {
            var page = idx * paginationValue;
            return value.slice(page, page + paginationValue);
        }
    }])
    .filter('pages', ['paginationValue',function (paginationValue) {
        return function (value) {
            var pages = value.length / paginationValue,
                page = -1,
                ret = [];
            while (++page < pages)
                ret.push(page);
            return ret;
        }
    }])
    .filter('unixDate', function () {
        return function (value) {
            return moment.unix(parseInt(value)).valueOf();
        }
    })
    .filter('happyBirthday', function () {
        return function (value) {
            var currentDate = moment(),
                currentYear = currentDate.year(),
                thisYear = moment(value).year(currentYear),
                hasPassed = thisYear.isBefore(currentDate);
            hasPassed && (thisYear.add('years', 1));
            var days = thisYear.diff(currentDate, 'days');
            return days === 0 ? "Don’t forget to wish you friend a happy birthday today!!" : days + " days until birthday!! ";

        }
    });