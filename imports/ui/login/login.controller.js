/**
 * Created by MikaelKnutsson on 07/07/2016.
 */

import angular from 'angular';
import {Meteor} from 'meteor/meteor';

import './login.html';

export class LoginController{

	constructor($scope, $state, toastr, $animate, $log, $reactive, $mdDialog) {
		'ngInject';
		this.$state = $state;
		this.toastr = toastr;
		this.$mdDialog = $mdDialog;
		$reactive(this).attach($scope);

		this.message = '';
		this.username = '';
		this.password = '';
	}

	login() {
		Meteor.loginWithPassword(this.username, this.password,
			this.$bindToContext((err) => {
				if (err) {
					this.message = err.reason;
				} else {
					this.$state.go('app.dashboardSpecialist')
						.then((ev)=> {
							if (Roles.userIsInRole(Meteor.userId(), ['patient'])) {
								this.$mdDialog.show({

									controller: 'DailyQuestionController',
									controllerAs: 'vm',
									templateUrl: 'imports/ui/patient/dailyquestion/dailyquestion.html',
									parent: angular.element(document.body),
									targetEvent: ev,
									clickOutsideToClose: true,
									locals: {
										userId: this.userId

									}

								})
							}



					})
				}
			})

		);
	}

}
