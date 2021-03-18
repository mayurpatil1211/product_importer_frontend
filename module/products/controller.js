
angular.module('ProductApp')

.directive('fileModel', ['$parse', function ($parse) {
            return {
               restrict: 'A',
               link: function(scope, element, attrs) {
                  var model = $parse(attrs.fileModel);
                  var modelSetter = model.assign;
                  
                  element.bind('change', function() {
                     scope.$apply(function() {
                        modelSetter(scope, element[0].files[0]);
                     });
                  });
               }
            };
         }])

.controller('productListController', [ '$rootScope', '$scope', '$http', '$location', '$window', '$cookies',

	function($rootScope, $scope, $http, $location, $window, $cookies){

        $scope.result_form = false
        $scope.loading = false
		$scope.totalItems = 0;
		$scope.currentPage = 1;
		$scope.num_pages = 0;
		$scope.maxSize = 20;


		
		var formdata = new FormData();
        $scope.getTheFiles = function ($files) {
            angular.forEach($files, function (value, key) {
            	console.log(key, value)
                formdata.append(key, value);
            });
            console.log(formdata)
        };
		
		$scope.upload_file = function(){
			console.dir($scope.myFile)
			var file = $scope.myFile;
			var fd = new FormData();
			fd.append('file', file);
			
			$http.post($rootScope.BaseURL+"api/upload/file", fd, {
                  transformRequest: angular.identity,
                  headers: {'Content-Type': undefined}
               })
			.then(function success(response){
				
				alert(response.data.message)
				// $window.location.reload();
			},
			function error(error){
				alert(error.data.message)
			})
		}

		$scope.pageChanged = () => {
			$scope.get_product_list();
		  };

		$scope.click = function (event) {
		    event.preventDefault();
		}

		$rootScope.BaseURL = 'http://127.0.0.1:8000/'
		$scope.login_success = false
		$scope.login_error_status = false


		$scope.get_product_list=()=>{
			$scope.loading = true;
			$http.get($rootScope.BaseURL+"api/product?page=" + $scope.currentPage + "&query=" + ($scope.search ? $scope.search : ''))
			.then(function success(response){
				console.log(response)
				$scope.loading = false;
				$scope.products = response.data.products
				$scope.products_length = $scope.products.length
				$scope.totalItems = response.data.total_count
				let temp = Math.ceil($scope.totalItems/100);
				$scope.num_pages = temp
				$scope.totalItems = temp
			},

			function error(error){
				$scope.loading = false;
				console.log(error)
			})
		}
		

		$scope.get_product_list();

		$scope.update_product_modal = function(product){
			$scope.description = product.description
			$scope.id = product.id
			$scope.name = product.name
			$scope.sku = product.sku
		}


		$scope.update_product = function(){
		data = {
			"sku": $scope.sku,
			"name" : $scope.name,
			"description" : $scope.description
		}


		$http.put($rootScope.BaseURL+"api/update/product", data)
			.then(function success(response){
				$scope.product_update_footer = true
				if(response.data.status==true){
					$scope.product_update_success = response.data.status
					$scope.product_update_failed = false
					$scope.new_subscription_id = ""
					$scope.get_product_list();
				}else{
					$scope.product_update_success = false
					$scope.product_update_failed = true
				}
			},
			function error(error){
				$scope.product_update_success = false
				$scope.product_update_footer = true
				$scope.product_update_failed = true
			})
		}

	
}])


