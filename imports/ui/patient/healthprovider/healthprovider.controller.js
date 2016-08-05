/**
 * Created by MikaelKnutsson on 12/07/2016.
 */

import angular from 'angular';
import './healthprovider.html';
import {PatientData} from '../../../api/patientdata';

export class PatientHealthProviderController {
	constructor($reactive, $scope, $mdDialog, $mdToast) {
		'ngInject';
		this.$mdDialog = $mdDialog;
		this.$mdToast = $mdToast;
		$reactive(this).attach($scope);

		this.showDeleted = false;
		this.searchInput = '';

		this.subscribe('users.specialist');
		this.subscribe('users.patient');
		this.subscribe('patientdata.patient');
		this.subscribe('userList');

		this.helpers({
			specialists() {
				return PatientData.find({userId: Meteor.userId(), activePatient: true})
			}
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


	openSpecialist(ev, patient) {
		this.$mdDialog.show({
			controller: 'PatientHealthProviderModalController',
			controllerAs: 'vm',
			templateUrl: 'imports/ui/patient/healthprovider/healthprovider.modal.html',
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

	deleteRows() {
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
	}


	getUser(specialist){
		let test = Meteor.users.findOne({_id: specialist});
		if(test) {
			return test.profile.firstName + ' ' + test.profile.lastName;
		}
		else{
			return null;
		}
		console.log("profiler", test);
	}

	getEmail(specialist){
		let user = Meteor.users.findOne({_id: specialist});
		if(user) {
			return user.username
		}
		else{
			return null;
		}
	}

	getPhoneNumber(specialist){
		let user = Meteor.users.findOne({_id: specialist});
		if(user){
			return user.profile.phoneNumber;
		}
		else{
			return null;
		}
	}

	getWorkPlace(specialist){
		let user = Meteor.users.findOne({_id: specialist});
		if(user){
			return user.profile.workPlace;
		}
		else{
			return null;
		}
	}

}
