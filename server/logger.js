/**
 * Created by MikaelKnutsson on 13/07/2016.
 */
import * as winston from 'winston';
import * as util from 'util';
import {Logs} from '/imports/api/logs';

var CollectionLogger = winston.transports.CollectionLogger = Meteor.bindEnvironment(function (options) {
	//
	// Name this logger
	//
	this.name = 'collectionLogger';

	//
	// Set the level from your options
	//
	this.level = options.level || 'info';

	//
	// Configure your storage backing as you see fit
	//
	this.json = true;
	this.collection = options.collection;
	this.handleExceptions = options.handleExceptions || false;
});

//
// Inherit from `winston.Transport` so you can take advantage
// of the base functionality and `.handleExceptions()`.
//
util.inherits(CollectionLogger, winston.Transport);

CollectionLogger.prototype.log = (level, msg, meta, callback) => {
	meta.level = level;
	meta.message = msg;
	meta.timestamp = new Date();
	this.collection.insert(meta);
	callback(null, true);
};

var log = new (winston.Logger)({
	transports: [
		new (winston.transports.Console)({
			colorize: true,
			handleExceptions: true,
			json: false,
			timestamp: true,
			level: 'debug'
		}),
		new (winston.transports.CollectionLogger)({
			handleExceptions: true,
			collection: Logs
		})
	]
});

export const logger = log;
