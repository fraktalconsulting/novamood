/**
 * Created by MikaelKnutsson on 11/07/2016.
 */
import {Mongo} from 'meteor/mongo';
import { SimpleSchema } from 'meteor/aldeed:simple-schema';

export const MadrsQuestions = new Mongo.Collection('madrs');

const MadrsQuestionSchema = new SimpleSchema({


	userId: {
		type: String,
		index: true,
		optional: true,
		autoValue: function(){
			return this.userId
		}
	},
	question1: {
		type: Number,
		optional: true
	},
	question2: {
		type: Number,
		optional: true
	},
	question3: {
		type: Number,
		optional: true
	},
	question4: {
		type: Number,
		optional: true
	},
	question5: {
		type: Number,
		optional: true
	},
	question6: {
		type: Number,
		optional: true
	},
	question7: {
		type: Number,
		optional: true
	},
	question8: {
		type: Number,
		optional: true
	},
	question9: {
		type: Number,
		optional: true
	},
	total: {
		type: String,
		optional: true
	},
	createdAt:{
		type: String,
		optional: true
	},
	dateOfPerforming: {
		type: Date,
		optional: true
	},
	deleted: {
		type: Boolean,
		optional: true
	}
});


MadrsQuestions.attachSchema(MadrsQuestionSchema);

if (Meteor.isServer) {
	Meteor.publish('madrsquestions', function madrsQuestionsPublication(patientId) {
		return MadrsQuestions.find({patientId: patientId});
	});

}


