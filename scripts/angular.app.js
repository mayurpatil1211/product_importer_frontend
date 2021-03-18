angular.module('productListController', []);
angular.module('webhookController', []);



angular.module('ProductApp', ['ui.router', 'ngCookies', 'angularUtils.directives.dirPagination', 'productListController', 'ui.bootstrap', 'webhookController'])

.config(['$stateProvider', '$urlRouterProvider', '$locationProvider', function($stateProvider, $urlRouterProvider, $locationProvider){
        $stateProvider
   
        .state('product', {
            url: '/product',
            templateUrl: './module/products/views/index.html',
            controller: 'productListController'
        })

        .state('webhooks', {
            url: '/webhooks',
            templateUrl: './module/webhook/views/index.html',
            controller: 'webhookController'
        })

       
        
         $urlRouterProvider.otherwise('/product');
         // $locationProvider.html5Mode(true);

        
}])




