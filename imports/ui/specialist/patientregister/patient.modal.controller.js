/**
 * Created by MikaelKnutsson on 12/07/2016.
 */
import './patient.modal.html';
import {Roles} from 'meteor/alanning:roles';

import {PatientData} from './../../../api/patientdata';
import {MadrsQuestions} from './../../../api/madrsquestions';
import {DailyQuestions} from './../../../api/dailyquestions';

export class PatientModalController {

    constructor($scope, $mdDialog, $q, $reactive, patientData, patient, $state, $mdToast, $logger) {
        'ngInject';
        this.$scope = $scope;
        this.$mdDialog = $mdDialog;
        this.$q = $q;
        this.$mdToast = $mdToast;
        this.$logger = $logger;
        this.$state = $state;
        this.patient = patient;
        $reactive(this).attach($scope);
        this.isUpdate = false;
        this.switchTrue = true;
        this.madrsDateOfPerforming = [];

        if (patientData) {
            this.patientData = patientData;
            this.patientId = this.patientData.userId;
            if (!this.patientData.specialist) {
                this.patientData.specialist = [];
            }
        } else {
            this.patientData = {};
            this.patientData.specialist = Meteor.userId();
            //    this.patientData.specialist.push(Meteor.userId().toString());
        }

        this.auto = {
            isDisabled: false,
            noCache: true,
            selectedItem: null,
            searchText: ''
        };


        //////////////
        //STATISTICS//
        /////////////


        this.dataMadrs = [];

        this.onClick = function (points, evt) {
            console.log(points, evt);
        };
        this.datasetOverride = [{yAxisID: 'y-axis-1'}];
        this.options = {
            scales: {
                yAxes: [
                    {
                        id: 'y-axis-1',
                        type: 'linear',
                        display: true,
                        position: 'left'
                    }
                ]
            }
        };

        this.Colors = ['#875F9A', '#875F9A', '#875F9A', '#875F9A', '#875F9A', '#875F9A',
            '#875F9A', '#875F9A', '#875F9A', '#875F9A', '#875F9A', '#875F9A',
            '#875F9A', '#875F9A', '#875F9A', '#875F9A', '#875F9A', '#875F9A',
            '#875F9A', '#875F9A', '#875F9A', '#875F9A', '#875F9A', '#875F9A',
            '#875F9A', '#875F9A', '#875F9A', '#875F9A', '#875F9A', '#875F9A'];

        this.madrsOptions = {
            scales: {
                yAxes: [{
                    display: true,
                    ticks: {
                        suggestedMin: 0,    // minimum will be 0, unless there is a lower value.
                        // OR //
                        beginAtZero: true   // minimum value will be 0.
                    }
                }]
            }
        };

        this.seriesMadrs = ['Series A', 'Series B'];

        this.selectedStartDate = new Date();
        this.selectedEndDate = new Date();
        this.madrsDate = new Date();
        this.madrsExpireDate = new Date(this.madrsDate.getFullYear(), this.madrsDate.getMonth(), this.madrsDate.getDate() + 7, this.madrsDate.getHours(), this.madrsDate.getMinutes());

        this.subscribe('patients');
        this.subscribe('patientdata');
        this.subscribe('madrsquestions');
        this.subscribe('dailyquestions');
        this.subscribe('users.patient');
        this.subscribe('users.specialist');
        this.subscribe('users.madrs');


        this.helpers({
            patients() {
                return PatientData.find({activePatient: true})
            },
            patient(){
                let thisUser = this.getReactively('patientData.userId');
                return Meteor.users.findOne({_id: thisUser});
            },
            madrsQuestions(){
                return MadrsQuestions.find({});
            },

            MadrsAnswers(){
                let userId = this.getReactively('patientData.userId');
                if (userId) {
                    this.dataMadrs = MadrsQuestions.find({userId: patientData.userId}).map((obj)=> {
                        return (obj.question1 + obj.question2 + obj.question3 + obj.question4 + obj.question5 + obj.question6 + obj.question7 + obj.question8 + obj.question9);
                    });

                    if (this.dataMadrs.length < 0) {
                        console.log("tom lista");
                    }
                    console.log(this.dataMadrs);
                }
                else {
                    return null;
                }

            },

            Madrslabels(){
                var startDate = this.getReactively('selectedStartDate');
                var endDate = this.getReactively('selectedEndDate');
                this.selectedStartDate = startDate.getDate() + "/" + (startDate.getMonth() + 1) + "/" + startDate.getFullYear();
                console.log(this.selectedStartDate);
                this.selectedEndDate = endDate.getDate() + "/" + (endDate.getMonth() + 1) + "/" + endDate.getFullYear();

                let userId = this.getReactively('patientData.userId');
                if (userId) {
                    this.labelsMadrs = MadrsQuestions.find({userId: patientData.userId}).map((obj)=> {
                        return obj.createdAt;
                    });
                    console.log(this.labelsMadrs);
                } else {
                    return null;
                }
            },

            DailyAnswers(){
                let userId = this.getReactively('patientData.userId');
                if (userId) {
                    this.dataDaily = DailyQuestions.find({userId: patientData.userId}).map((obj) => {
                        return obj.answer;
                    });
                    console.log(this.dataDaily);
                } else {
                    return null;
                }
            },
            Dailylabels(){

                let userId = this.getReactively('patientData.userId');
                if (userId) {
                    this.labelsDaily = DailyQuestions.find({userId: patientData.userId}).map((obj) => {
                        return obj.createdAt;
                    });
                } else {
                    return null;
                }
            },

        })


    }


    cancel() {
        this.$mdDialog.cancel();
    }

    onStartDateChange(){
        this.$state.go ('app.patientRegister', {range: this.viewRange, from: this.selectedStartDate}, {
            location: true,
            notify: false,
            reload: false
        });
        var date = this.selectedStartDate;
        this.fromDate = new Date(date.getFullYear(), date.getMonth(), date.getDate(), 0);
        this.toDate = new Date(date.getFullYear(), date.getMonth(), date.getDate(), 23, 59, 59, 99);
    }

    onEndDateChange(){
        this.$state.go ('app.patientRegister', {range: this.viewRange, from: this.selectedEndDate}, {
            location: true,
            notify: false,
            reload: false
        });
        var date = this.selectedEndDate;
        this.fromDate = new Date(date.getFullYear(), date.getMonth(), date.getDate(), 23, 59, 59, 99);
        this.toDate = new Date(date.getFullYear(), date.getMonth(), date.getDate(), 0);
    }



    saveDailyDate() {

        Meteor.users.update({_id: this.userId}, {
            $set: {
                "profile.DailyStart": this.patient.profile.DailyStart,
                "profile.DailyEnd": this.patient.profile.DailyEnd
            }
        }, null, this.$bindToContext((error)=> {
            if (error) {
                this.$logger.error('Error while updating dates', error);
                this.$mdToast.show(
                    this.$mdToast.simple()
                        .textContent('Couldn\'t update dates')
                        .hideDelay(3000)
                );
            } else {
                this.$mdToast.show(
                    this.$mdToast.simple()
                        .textContent('Dates succesfully updated!')
                        .hideDelay(3000)
                );
            }
        }));
    }


    saveDate(patientId) {

        this.madrsDateOfPerforming = [];
        this.madrsDateOfExpire = [];

        let thisUser = this.patientData._id;
        let data = PatientData.findOne(thisUser);
        console.log("data;", data);

        this.madrsDateOfPerforming.specialist = Meteor.userId();
        this.madrsDateOfPerforming.madrsDate = this.madrsDate;
        this.madrsDateOfPerforming.madrsExpires = new Date(this.madrsDateOfPerforming.madrsDate.getFullYear(), this.madrsDateOfPerforming.madrsDate.getMonth(), this.madrsDateOfPerforming.madrsDate.getDate() + 7, this.madrsDateOfPerforming.madrsDate.getHours(), this.madrsDateOfPerforming.madrsDate.getMinutes());
        //this.madrsDateOfExpire.push(this.madrsExpireDate);
        this.madrsDateOfPerforming.isReported = false;

        console.log("DATUM;", this.madrsDateOfPerforming.madrsDate);
        console.log("madrslista;", this.madrsDateOfPerforming);
        console.log("användare:", data.userId);

        Meteor.users.update(data.userId, {
                $addToSet: {
                    madrsDateOfPerforming: {
                        madrsDate: this.madrsDateOfPerforming.madrsDate,
                        madrsExpires: this.madrsDateOfPerforming.madrsExpires,
                        specialist: this.madrsDateOfPerforming.specialist,
                        isReported: this.madrsDateOfPerforming.isReported
                    }

                }
            }
            , null,
            this.$bindToContext((error) => {
                if (error) {
                    this.$logger.error('Error while saving date', error);
                    this.$mdToast.show(
                        this.$mdToast.simple()
                            .textContent('Couldn\'t save date')
                            .hideDelay(3000)
                    );
                } else {
                    this.$mdToast.show(
                        this.$mdToast.simple()
                            .textContent('date saved!')
                            .hideDelay(3000)
                    );
                }
            }))
    }


    removeDate(patientId) {
        this.madrsDateOfPerforming = [];
        let data = PatientData.findOne({patientId: patientId});
        console.log("data;", data);
        console.log("användare:", data.userId);

        Meteor.users.update(data.userId, {
                $pull: {
                    madrsDateOfPerforming: {
                        madrsDates: this.madrsDateOfPerforming
                    }

                }
            }
            , null,
            this.$bindToContext((error) => {
                if (error) {
                    this.$logger.error('Error while saving date', error);
                    this.$mdToast.show(
                        this.$mdToast.simple()
                            .textContent('Couldn\'t save date')
                            .hideDelay(3000)
                    );
                } else {
                    this.$mdToast.show(
                        this.$mdToast.simple()
                            .textContent('date saved!')
                            .hideDelay(3000)
                    );
                }
            }))
    }


    save() {

        this.patientData.activePatient = true;
        if (this.patientData._id) {
            PatientData.update({_id: this.patientData._id}, {
                $set: this.patientData
            }),

                this.$mdToast.show(
                    this.$mdToast.simple()
                        .textContent('Patient updated!')
                        .hideDelay(3000)
                );
            this.$mdDialog.hide();
        } else {

            this.patientData.pendingEmail = this.auto.searchText;
            console.log(this.patientData.pendingEmail);
            console.log("sent from", this.patientData.specialist[0])
            this.call('patientData.invitePatient', this.patientData, (err)=> {
                if (err) {
                    this.$logger.warn('Couldn\'t invite patient', err);
                } else {
                    this.$mdToast.show(
                        this.$mdToast.simple()
                            .textContent('Patient Invited!')
                            .hideDelay(3000)
                    );
                    this.$mdDialog.hide();
                }
            });
        }
    }


    selectedItemChange(item) {
        if (item) {
            this.patientData = JSON.parse(JSON.stringify(item));
        } else {
            this.patient = {};
            this.patient.profile = {};
            this.isInvite = true;
        }
    }
}
