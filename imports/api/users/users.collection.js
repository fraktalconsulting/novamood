/**
 * Created by MikaelKnutsson on 07/07/2016.
 *
 */
import { Mongo } from 'meteor/mongo';
import {Meteor} from 'meteor/meteor';
import { SimpleSchema } from 'meteor/aldeed:simple-schema';


const UserProfileSchema = new SimpleSchema({
	firstName: {
		type: String
	},
	lastName: {
		type: String
	},
	ssn: {
		type: String
	},
	gender: {
		type: String,
		allowedValues: ['male', 'female']
	},
	workPlace: {
		type: String,
		optional: true
	},
	thumbnail: {
		type: String,
		optional: true
	},
	phoneNumber: {
		type: String,
		optional: true
	},
	zipCode: {
		type: String,
		optional: true
	},
	address: {
		type: String,
		optional: true
	},
	city: {
		type: String,
		optional: true
	},
	role: {
		type: String,
		optional: true
	},
	isPatient: {
		type: Boolean,
		optional: true
	},
	DailyStart: {
		type: Date,
		optional: true
	},
	DailyEnd: {
		type: Date,
		optional: true
	}

});

const UserMadrsSchema = new SimpleSchema({
	madrsDate: {
		type: Date,
		optional: true
	},
	madrsExpires: {
		type: Date,
		optional: true
	},
	specialist: {
		type: String,
		optional: true
	},
	isReported: {
		type: Boolean,
		optional: true
	},

})

const UserMessageSchema = new SimpleSchema({
	messageId: {
		type: String
	},
	patientId: {
		type: String,
		optional: true
	},
	title: {
		type: String
	},
	content: {
		type: String
	},
	specialist: {
		type: String
	},
	action: {
		type: String,
		allowedValues: ['message',  'invite']
	},
	referenceId: {
		type: String,
		optional: true
	},
	isRead: {
		type: Boolean
	},
	createdAt: {
		type: Date
	},
	updatedAt: {
		type: Date,
		autoValue: function () {
			if (this.isUpdate) {
				return new Date();
			}
		},
		denyInsert: true,
		optional: true
	}
});

const UserSchema = new SimpleSchema({
	username: {
		type: String,
		optional: true
	},
	emails: {
		type: Array,
		optional: true
	},
	"emails.$": {
		type: Object
	},
	"emails.$.address": {
		type: String,
		regEx: SimpleSchema.RegEx.Email
	},
	"emails.$.verified": {
		type: Boolean
	},
	createdAt: {
		type: Date
	},
	profile: {
		type: UserProfileSchema,
		optional: true
	},
	services: {
		type: Object,
		optional: true,
		blackbox: true
	},
	roles: {
		type: [String],
		optional: true
	},
	heartbeat: {
		type: Date,
		optional: true
	},
	messages: {
		type: [UserMessageSchema],
		optional: true
	},
	colleagues: {
		optional: true,
		type: [String]
	},
	specialist: {
		optional: true,
		type: [String]
	},
	invitedPatients: {
		optional: true,
		type: [String]
	},
	deleted: {
		type: Boolean,
		optional: true
	},
	madrsDateOfPerforming: {
		type: [UserMadrsSchema],
		optional: true
	}

});

Meteor.users.attachSchema(UserSchema);
