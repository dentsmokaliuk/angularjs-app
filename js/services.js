authorsApp.factory('authorsAppService', ['$http', function ($http){

    var authorsAppService = {};
    var urlBase = 'http://localhost:2403/';

    authorsAppService.getAll  = function (url) {
        return $http.get(urlBase + url);
    };

    authorsAppService.create = function (url, item) {
        return $http.post(urlBase + url, item);
    };

    authorsAppService.update = function (url, item) {
        return $http.put(urlBase + url + item.id, item);
    };

    authorsAppService.delete = function (url, item) {
        return $http.delete(urlBase + url + item.id);
    };

    authorsAppService.search = function (id) {
        return $http.get(urlBase + id);
    };
    
    return authorsAppService;

}]);