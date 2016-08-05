/**
 * Created by MikaelKnutsson on 13/07/2016.
 */
import './menulink.html';

export function menuLink() {
	return {
		scope: {
			item: '=item',
			controller: '=controller'
		},
		templateUrl: 'imports/ui/navbar/menulink.html',
		controller: function ($scope) {
			'ngInject';

			$scope.focusSection = function () {
				// set flag to be used later when
				// $locationChangeSuccess calls openPage()
				/// $scope.controller.autoFocusContent = true;
			};
		}
	};
}
