/**
 * Created by MikaelKnutsson on 08/07/2016.
 */
import { Meteor } from 'meteor/meteor';
import { Roles } from 'meteor/alanning:roles';


export function workerEntry(){

/*	if (Meteor.users.find().count() === 0) {
		Accounts.createUser({
			username: 'root',
			email: 'root@root.com',
			password: 'RootRoot123'
		});
		Roles.createRole('global-admin');
		var user = Meteor.users.findOne({username: 'root'});
		Roles.addUsersToRoles(user._id, 'global-admin', Roles.GLOBAL_GROUP);
		Meteor.users.update({_id: user._id}, {
			$set: {
				profile: {
					firstName: 'root',
					lastName: 'root',
					ssn: '999999999999',
					gender: 'male',
					organization: 'Nova Mood AB',
					address: 'RootStreet 12',
					city: 'Roottown',
					zipcode: '12345'
				}
			}
		});
	} */
}
