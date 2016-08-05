/**
 * Created by MikaelKnutsson on 15/07/2016.
 */

import {Mongo} from 'meteor/mongo';
import { SimpleSchema } from 'meteor/aldeed:simple-schema';

export const DailyQuestions = new Mongo.Collection('dailyquestion');

const DailyQuestionSchema = new SimpleSchema({

    dailyId: {
        type: String,
        index: true,
        optional: true
    },

    userId: {
        type: String,
        index: true,
        optional: true,
        autoValue: function(){
            return this.userId
        }
    },

    verySad: {
        type: String,
        optional: true
    },
    sad: {
        type: String,
        optional: true
    },
    neutral: {
        type: String,
        optional: true
    },
    happy: {
        type: String,
        optional: true
    },
    veryHappy: {
        type: String,
        optional: true
    },
    answer: {
        type: String,
        optional: true
    },
    dailyStartDate: {
        type: Date,
        optional: true
    },
    dailyEndDate: {
        type: Date,
        optional: true
    },
    noEndDate: {
        type: Date,
        optional: true
    },
    answeredDaily: {
        type: Boolean,
        optional: true
    },
    createdAt: {
        type: String,
        optional: true
    }

});


DailyQuestions.attachSchema(DailyQuestionSchema);

if (Meteor.isServer) {
    Meteor.publish('dailyquestions', function dailyQuestionsPublication() {
        return DailyQuestions.find({});
    });
}


