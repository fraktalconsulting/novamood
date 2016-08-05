/**
 * Created by MikaelKnutsson on 07/07/2016.
 */

import {check} from 'meteor/check'

Meteor.methods({


'addUserToPatient'(userId){
	if(Meteor.isServer){

	}
},

	'users.setMessagesRead'() {

		check(this.userId, String);

		Meteor.users.update({_id: this.userId, 'messages.isRead': false}, {
			$set: {
				'messages.$.isRead': true
			}
		});

	},

	'users.sendVerificationEmail'() {
		if(Meteor.isServer) {
			let userId = Meteor.userId();
			if (userId) {
				return Accounts.sendVerificationEmail(userId);
			}
		}
	}


});
