/**
 * Created by MikaelKnutsson on 14/07/2016.
 */

import { Notifications } from './notifications.collection.js';

if (Meteor.isServer) {
	Meteor.publish('notifications', function publishNotifications(){
		return Notifications.find({userId: this.userId});
	});
}
