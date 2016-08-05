/**
 * Created by MikaelKnutsson on 14/07/2016.
 */
import { Mongo } from 'meteor/mongo';
import { SimpleSchema } from 'meteor/aldeed:simple-schema';

export const Notifications = new Mongo.Collection('notifications');

export const NotificationSchema = new SimpleSchema({
	userId: {
		type: String
	},
	patientId: {
		type: String,
		optional: true
	},
	title:{
		type: String
	},
	content: {
		type: String
	},
	action: {
		type: String,
		allowedValues: ['message', 'invite']
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
	}
});

Notifications.attachSchema(NotificationSchema);
