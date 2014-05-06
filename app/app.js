"use strict";angular.module("calling",[]).controller("calling",["contact","$scope","aocControls","$timeout",function(a,b,c,d){var e=a.currentCoordinates.split(",").map(parseFloat);b.contact=a,d(function(){c("contactLocation").gmap.center({lat:e[0],lng:e[1]})},10)}]),angular.module("home",[]).controller("home",["$scope","aocControls","contactList","$location",function(a,b,c,d){a.$aoc=b,a.contacts=c,a.call=function(a){d.path("/calling/"+a)}}]).service("contacts",["$resource",function(a){return a("./contacts.json")}]),angular.module("filters",[]).constant("paginationValue",10).filter("paginated",["paginationValue",function(a){return function(b,c){var d=c*a;return b.slice(d,d+a)}}]).filter("pages",["paginationValue",function(a){return function(b){for(var c=b.length/a,d=-1,e=[];++d<c;)e.push(d);return e}}]).filter("unixDate",function(){return function(a){return moment.unix(parseInt(a)).valueOf()}}).filter("happyBirthday",function(){return function(a){var b=moment(),c=b.year(),d=moment(a).year(c),e=d.isBefore(b);e&&d.add("years",1);var f=d.diff(b,"days");return 0===f?"Don’t forget to wish you friend a happy birthday today!!":f+" days until birthday!! "}}),angular.module("carCall",["aocConfig","ngResource","filters","calling","home","ngRoute"]).config(["$routeProvider",function(a){a.when("/calling/:id",{controller:"calling",resolve:{contact:["contacts","$route",function(a,b){return a.query().$promise.then(function(a){return a.filter(function(a){return a.id==b.current.params.id})[0]})}]},templateUrl:"calling.html"}).when("/home",{controller:"home",resolve:{contactList:["contacts",function(a){return a.query().$promise}]},templateUrl:"home.html"}).otherwise({redirectTo:"/home"})}]),angular.module("aocConfig",["aoc"]).run(["aocConfigure",function(a){a({dialog:function(){return{actions:{"default":["open","close","destroy"]}}},gmap:["element",function(a){var b={center:{lat:0,lng:0},zoom:6};return{actions:{custom:{center:function(c){return new google.maps.Map(a[0],angular.extend(b,{center:c}))}}},createFn:function(){return a}}}]})}]);