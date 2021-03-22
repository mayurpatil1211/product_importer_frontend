
angular.module('ProductApp')

.controller('webhookController', [ '$rootScope', '$scope', '$http', '$location', '$window', '$cookies',
	function($rootScope, $scope, $http, $location, $window, $cookies){

		$rootScope.BaseURL = 'https://pmayur.eastus.cloudapp.azure.com/'


		$scope.result_form = false
        $scope.loading = false
		$scope.resend_gps_data = {}
		



		$scope.get_webhook_list=()=>{
			$scope.loading = true;
			$http.get($rootScope.BaseURL+"api/webhook")
			.then(function success(response){
				console.log(response)
				$scope.loading = false;
				$scope.webhooks = response.data.webhooks
			},

			function error(error){
				$scope.loading = false;
				console.log(error)
			})
		}
		

		$scope.get_webhook_list();

		$scope.add_webhook = function(){
			console.log($scope.link, $scope.method)

			data = {
				'link': $scope.link,
				'method':$scope.method
			}

			$http.post($rootScope.BaseURL+"api/webhook", data)
			.then(function success(response){
				$scope.webhook_footer = true
				if(response.data.status==true){
					$scope.webhook_success = response.data.status
					$scope.webhook_failed = false
					$scope.get_webhook_list();
				}else{
					$scope.webhook_success = false
					$scope.webhook_failed = true
				}
			},
			function error(error){
				$scope.webhook_success = false
				$scope.webhook_footer = true
				$scope.webhook_failed = true
			})
		}


		$scope.delete_webhook = function(webhook){
			data = {
				"id":webhook.id
			}
			$http.delete($rootScope.BaseURL+"api/webhook?id="+webhook.id)
			.then(function success(response){
				if(response.data.status==true){
					alert('Webhook deleted successfully.')
					$scope.get_webhook_list();
				}else{
					alert('Error during deleting webhook.')
				}
			},
			function error(error){
				alert('Error during deleting webhook.')
			})
		}


	

	
}])


