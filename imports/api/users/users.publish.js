/**
 * Created by MikaelKnutsson on 07/07/2016.
 */

import {Roles} from 'meteor/alanning:roles';
import {PatientData} from '../patientdata';
import {MadrsQuestions} from '../madrsquestions';

if (Meteor.isServer) {


	Meteor.users.allow({
		'update': function () {
			return true;
		}
	});

	Meteor.publish('users', function publishUsers() {
		var currentUser;
		currentUser = this.userId;
		if (currentUser) {

			return Meteor.users.find({
				_id: currentUser
			});
		} else {
			return this.ready();
		}
	});

	Meteor.publish('users.patient', function publishPatientProfile(patientId) {
		let data = PatientData.findOne({patientId: patientId});
		if(data){
			let keys = PatientData.find({patientId: patientId}).map((obj)=>{
				return obj.userId;
			});
			return Meteor.users.find({_id: { $in: keys } });
		}else{
			return this.ready();
		}
	});

	Meteor.publish('users.specialist', function publishSpecialistProfile(specialist) {
		let data = PatientData.findOne({patientId: specialist});
		if(data){
			let keys = PatientData.find({specialist: specialist}).map((obj)=>{
				return obj.userId;
			});
			return Meteor.users.find({_id: { $in: keys } });
		}else{
			return this.ready();
		}
	});


	Meteor.publish('userList', function publishAllUsers (){
		return Meteor.users.find({});
	});

	Meteor.publish('users.all', function publishUsers() {
		if(Roles.userIsInRole(this.userId, 'global-admin')){
			return Meteor.users.find({});
		}else{
			return this.ready();
		}
	});
}

