/**
 * Created by MikaelKnutsson on 08/07/2016.
 */

import angular from 'angular';
import './signuppatient.html';
import {Roles} from 'meteor/alanning:roles';

export class SignupPatientController {

	constructor($reactive, $scope, $state, $stateParams) {
		'ngInject';
		this.token = $stateParams.token || null;
		this.mail = $stateParams.mail || null;
		$reactive(this).attach($scope);
		this.username = this.ssn || '';
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
				Roles.addUsersToRoles(userId, ['patient']);
				if(this.token){
					Meteor.call('patiendata.confirm', this.token);
				}
				//Meteor.call('util.addUserToPatient', userId),
					this.$state.go('app.dashboardSpecialist');
			}
		}));
	}

}
