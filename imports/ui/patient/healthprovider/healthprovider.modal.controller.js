/**
 * Created by MikaelKnutsson on 25/07/2016.
 */
import './healthprovider.modal.html';
import {Roles} from 'meteor/alanning:roles';

import {PatientData} from './../../../api/patientdata';

export class PatientHealthProviderModalController {

    constructor($scope, $mdDialog, $q, $reactive, patient, patientData, $mdToast, $logger) {
        'ngInject';
        this.$scope = $scope;
        this.$mdDialog = $mdDialog;
        this.$q = $q;
        this.$mdToast = $mdToast;
        this.$logger = $logger;
        this.patient = patient;
        $reactive(this).attach($scope);
        this.isUpdate = false;


        if (patientData) {
            this.patientData = patientData;
        } else {
            this.patientData = {};
        }

        this.subscribe('users.patient');
        this.subscribe('users.specialist');
        this.subscribe('patients');
        this.subscribe('patientdata');


        this.helpers({
            specialist(){
                let userId = this.getReactively('patientData.userId');
                return Meteor.users.findOne({_id: userId});
            }
        })

    }



}