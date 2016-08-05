/**
 * Created by MikaelKnutsson on 08/07/2016.
 */

import {NavbarController} from './navbar.controller.js';

export function novaMoodNavBar() {
	'ngInject';
	return {
		restrict: 'E',
		scope: {
			creationDate: '='
		},
		transclude: true,
		templateUrl: 'imports/ui/navbar/navbar.html',
		controller: NavbarController,
		controllerAs: 'vm',
		bindToController: true
	};
}
