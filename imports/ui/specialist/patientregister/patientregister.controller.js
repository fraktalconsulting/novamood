import angular from 'angular';
import './patientregister.html';
import {PatientData} from '../../../api/patientdata';
import {MadrsQuestions} from '../../../api/madrsquestions';

export class PatientRegisterController {
	constructor($reactive, $scope, $mdDialog, $mdToast) {
		'ngInject';
		this.$mdDialog = $mdDialog;
		this.$mdToast = $mdToast;
		$reactive(this).attach($scope);

		this.subscribe('users.specialist');
		this.subscribe('madrsquestions');

		this.helpers({
			patients() {
				return PatientData.find({specialist: Meteor.userId(), activePatient: true})
			},
		});


		this.query = {
			order: 'username',
			limit: 5,
			page: 1
		};

		this.fab = {
			hidden: false,
			isOpen: false,
			hoover: true
		};

		this.selected = [];
		this.rowSelection = true;
		this.multiSelect = true;
	}


	openPatient(ev, patient) {
		this.$mdDialog.show({
			controller: 'PatientModalController',
			controllerAs: 'vm',
			templateUrl: 'imports/ui/specialist/patientregister/patient.modal.html',
			parent: angular.element(document.body),
			targetEvent: ev,
			clickOutsideToClose: true,
			locals: {
				patientData: patient,
				patient: this.patient
			}
		}).then(()=> {

		}, ()=> {

		});
	}

	deleteRows(ev) {
		this.$mdDialog.show(this.$mdDialog.confirm()
			.title('Delete patient')
			.textContent('Are you sure you want to delete selected rows?')
			.ariaLabel('Delete patient')
			.targetEvent(ev)
			.ok('Delete')
			.cancel('Cancel')).then(()=> {
			this.selected.forEach((entry)=> {
				if (entry.pending === true) {
					PatientData.remove(entry._id);
				} else {
					PatientData.update({_id: entry._id}, {
						$set: {
							activePatient: false
						}
					})
				}
			});
			this.selected = [];
		});
	}



	getFirstName(userId){
		let user = Meteor.users.findOne({_id: userId});
		if(user) {
			return user.profile.firstName;
		}
		else{
			return null;
		}
	}

	getLastName(userId){
		let user = Meteor.users.findOne({_id: userId});
		if(user) {
			return user.profile.lastName;
		}
		else{
			return null;
		}
	}

	getPhoneNumber(userId){
		let user = Meteor.users.findOne({_id:userId});
		if(user){
			return user.profile.phoneNumber;
			console.log(user.profile.phoneNumber)
		}
		else{
			return null;
		}
	}

}
