//app.js

//var app = angular.module('MyResponseApp',[]);

//Define a new module. This time we declare a dependency on
//the ngResource module, so we can work with the Google API

var app = angular.module("MyResponseApp", ['MyResponseApp.service']);

angular.module('MyResponseApp.service',[]).
    factory('DataSource', ['$http',function($http){
       return {
           get: function(callback){
                $http.get(
                    'data.xml',
                    {transformResponse:function(data) {
                      // convert the data to JSON and provide
                      // it to the success function below
                        var x2js = new X2JS();
                        var json = x2js.xml_str2json( data );
                        return json;
                        }
                    }
                ).
                success(function(data, status) {
                    // send the converted data back
                    // to the callback function
                    callback(data);
                })
           }
       }
    }]);
     
 
