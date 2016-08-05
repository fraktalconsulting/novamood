/**
 * Created by MikaelKnutsson on 11/07/2016.
 */

import './resetpassword.html';

export class ResetPasswordController {
	constructor($reactive, $scope, $mdToast, $logger, $state) {
		'ngInject';
		this.$scope = $scope;
		$reactive(this).attach($scope);
		this.$mdToast = $mdToast;
		this.$logger = $logger;
		this.$state = $state;


		this.message = '';
	}

	reset() {

		this.password = '';
		this.oldPassword = '';
		this.repeatedPassword = '';

		if (this.oldPassword === this.repeatedPassword) {

			Accounts.changePassword({
				password: this.password
			}, this.$bindToContext((error) => {

			if (error) {
				this.message = error.reason;
			} else {
				this.message = '';
				this.$mdToast.show(
					this.$mdToast.simple()
						.textContent('Password updated!')
						.hideDelay(3000)
				);
			}
			}))
		}
	}

	cancel() {
		this.$mdDialog.cancel();
	}


}

