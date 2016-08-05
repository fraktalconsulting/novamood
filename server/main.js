import { Meteor } from 'meteor/meteor';
import { Roles } from 'meteor/alanning:roles';

import '../imports/api/users/users.collection';
import '../imports/api/users/users.methods';
import '../imports/api/users/users.publish';
import '../imports/api/madrsquestions';
import '../imports/api/patientdata';
import '../imports/api/util';
import '../imports/api/notifications/notifications.collection';
import '../imports/api/notifications/notifications.publish';
import '../imports/api/logs';
import '../imports/api/dailyquestions';

import {webEntry} from './../server/web-entry';
import {workerEntry} from './../server/worker-entry';

import {logger} from './logger';

Meteor.startup(() => {

        webEntry();
        workerEntry();
});
