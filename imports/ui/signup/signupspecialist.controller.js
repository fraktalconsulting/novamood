/**
 * Created by MikaelKnutsson on 07/07/2016.
 */

import angular from 'angular';
import './signupspecialist.html';

export class SignupSpecialistController{

	constructor($reactive, $scope, $state, $stateParams) {
		'ngInject';
		this.token = $stateParams.token || null;
		this.mail = $stateParams.mail || null;
		$reactive(this).attach($scope);
		this.username = this.mail || '';
		this.password = '';
		this.message = '';
		this.$state = $state;
		this.profile = {};


	}

	register() {
		Accounts.createUser({
			email: this.username,
			username: this.username,
			password: this.password,
			profile: this.profile
		}, this.$bindToContext((err) => {
			if (err) {
				this.message = err.reason;
			} else {
				let userId = Meteor.userId();
				Roles.addUsersToRoles(userId, ['specialist']);
				//Meteor.call('util.addUserToSpecialist'),
				this.$state.go('app.dashboardSpecialist');
			}
		}));
	}

}
