/**
 * Created by MikaelKnutsson on 08/07/2016.
 */


import {Roles} from 'meteor/alanning:roles';

Meteor.methods({

	'util.addUserToPatient'(userId){
		if (Meteor.isServer) {
			if (Roles.userIsInRole(this.userId, ['patient'])) {
				Roles.addUsersToRoles(userId, ['patient']);
			}
		}
	},


	'util.addUserToSpecialist'(userId){
		if (Meteor.isServer) {
			if (Roles.userIsInRole(this.userId, ['specialist'])) {
				Roles.addUsersToRoles(userId, ['specialist']);
			}
		}
	}


});

