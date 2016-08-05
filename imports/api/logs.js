/**
 * Created by MikaelKnutsson on 13/07/2016.
 */
import {Mongo} from 'meteor/mongo';

export const Logs = new Mongo.Collection('logs');

Meteor.methods({
	'log'(level, msg, meta){
		if(Meteor.isServer){
			const logger = require('../../server/logger').logger;
			var m = meta || {};
			m.isClient = true;
			m.userId = this.userId;
			logger[level](msg, m);
		}


	},

	'log.level'(){
		return process.env.LOG_LEVEL || 4;
	}
});
