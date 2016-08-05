/**
 * Created by MikaelKnutsson on 08/07/2016.
 */
import './account.html';

export class AccountController {
	constructor($reactive, $scope, $mdToast, $logger, $mdDialog) {
		'ngInject';
		this.$scope = $scope;
		$reactive(this).attach($scope);
		this.image = null;
		this.$mdToast = $mdToast;
		this.$mdDialog = $mdDialog;
		this.$logger = $logger;


		this.showPatientAccount = false;
		this.showSpecialistAccount = false;

		this.helpers({
			user(){
				if (Meteor.user()) {
					this.image = Meteor.user().profile.thumbnail;
				}
				return Meteor.user();
			},
			showSections(){
				if (Roles.userIsInRole(Meteor.userId(), ['patient'])) {
					this.showPatientAccount = true;
				}
				if (Roles.userIsInRole(Meteor.userId(), ['specialist'])) {
					this.showSpecialistAccount = true;
				}
			},
		});

	}


resetPassword(ev){
	this.$mdDialog.show({
		controller: 'ResetPasswordController',
		controllerAs: 'vm',
		templateUrl: 'imports/ui/account/resetpassword.html',
		parent: angular.element(document.body),
		targetEvent: ev,
		clickOutsideToClose: true,
		locals: {
			userId: this.userId

		}

	}).then(()=> {

		console.log(userId);

	}, ()=> {

	});
}

upload(file)
{
	var reader = new FileReader();
	reader.onload = (loadEvent)=> {
		this.$scope.$apply(()=> {
			this.image = loadEvent.target.result;
			Meteor.users.update({_id: Meteor.userId()}, {
				$set: {
					'profile.thumbnail': this.image
				}
			})
		});
	};
	reader.readAsDataURL(file);
}

updateProfile()
{
	Meteor.users.update({_id: Meteor.userId()}, {
		$set: {
			"profile.firstName": this.user.profile.firstName,
			"profile.lastName": this.user.profile.lastName,
			"profile.role": this.user.profile.role,
			"profile.ssn": this.user.profile.ssn,
			"profile.phoneNumber": this.user.profile.phoneNumber,
			"profile.address": this.user.profile.address,
			"profile.city": this.user.profile.city,
			"profile.zipCode": this.user.profile.zipCode,
		}
	}, null, this.$bindToContext((error)=> {
		if (error) {
			this.$logger.error('Error while updating profile', error);
			this.$mdToast.show(
				this.$mdToast.simple()
					.textContent('Couldn\'t update profile')
					.hideDelay(3000)
			);
		} else {
			this.$mdToast.show(
				this.$mdToast.simple()
					.textContent('Profile succesfully updated!')
					.hideDelay(3000)
			);
		}
	}));


}

}
