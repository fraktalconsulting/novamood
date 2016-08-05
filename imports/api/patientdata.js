/**
 * Created by MikaelKnutsson on 12/07/2016.
 */
import {Meteor} from 'meteor/meteor';
import {Mongo} from 'meteor/mongo';
import { Roles } from 'meteor/alanning:roles';
import { SimpleSchema } from 'meteor/aldeed:simple-schema';

export const PatientData = new Mongo.Collection('patientdata');


export const PatientDataSchema = new SimpleSchema({
	patientId: {
		type: String,
		index: true,
		optional: true
	},
	userId: {
		type: String,
		index: true,
		optional: true
	},
	username: {
		type: String,
		optional: true
	},
	firstName: {
		type: String,
		optional: true
	},
	lastName: {
		type: String,
		optional: true
	},
	phoneNumber: {
		type: String,
		optional: true
	},
	thumbnail: {
		type: String,
		optional: true
	},
	activePatient: {
		type: Boolean,
		optional: true
	},
	pending: {
		type: Boolean,
		optional: true
	},
	pendingEmail: {
		type: String,
		optional: true
	},
	pendingSent: {
		type: Boolean,
		optional: true
	},
	pendingSentAt: {
		type: Date,
		optional: true
	},
	specialist: {
		type: String,
		optional: true
	},
	deleted: {
		type: Boolean,
		optional: true
	},
	invitedPatients: {
		optional: true,
		type: [String]
	},

	specialistName: {
		type: String,
		optional: true
	}
});

PatientData.attachSchema(PatientDataSchema);

if (Meteor.isServer) {


	Meteor.publish('patientdata', function patientDataPublication() {
		return PatientData.find({});
	});

	Meteor.publish('patients', function patientsPublication () {
		return PatientData.find({invitedPatients: this.userId});
	});

	Meteor.publish('patientdata.patient', function patientDataPublication(patientId) {
		if(Roles.userIsInRole(this.userId, ['patient'], patientId)){
			return PatientData.find({patientId: patientId})
		}else{
			return this.ready();
		}
	});


}


Meteor.methods({

	'patientData.invitePatient'(patientData){
		if (Meteor.isServer) {
			let logger = require('../../server/logger').logger;
			logger.debug('about to insert patientData', patientData);
			patientData.pending = true;
			PatientData.insert(patientData, (err, id)=> {
				if (err) {
					logger.info('invite patient insert failed', err);
				} else {

					const Notify = require('../../server/notify').Notify;
					let data = JSON.parse(JSON.stringify(patientData));
					data._id = id;
					logger.verbose('Notifying patient with new invite', {email: data.pendingEmail});
					Notify.notifyInvite(data, id);
					PatientData.update({_id: id}, {
						$set: {
							pendingSent: true
						}
					});
				}
			});
		}
	},


	'patientdata.confirm'(id, patientData){
		var data = PatientData.findOne({_id: id});
		var user = Meteor.users.findOne({_id: this.userId});
		if (data && user) {
			PatientData.update({_id: id}, {
				$set: {
					userId: this.userId,
					username: user.username,
					firstName: user.profile.firstName,
					lastName: user.profile.lastName,
					thumbnail: user.profile.thumbnail,
					phoneNumber: user.profile.phoneNumber

				},
				$unset: {
					pending: false
				}
			});
			if (Meteor.isServer) {
				let logger = require('../../server/logger').logger;
				logger.info('User confirmed invite');
			}
		} else {
			Meteor.Error('Patiendata doesn\'t exist', '');
		}
	}

});
