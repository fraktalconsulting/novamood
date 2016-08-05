/**
 * Created by MikaelKnutsson on 11/07/2016.
 */
import './dashboard.html';

import {MadrsQuestions} from './../../../api/madrsquestions';
import {PatientData} from './../../../api/patientdata';

export class DashboardController {
    constructor($scope, $state, $reactive, $mdToast, $logger, $mdDialog) {
        'ngInject';
        this.$state = $state;
        this.$scope = $scope;
        this.$mdDialog = $mdDialog;
        this.$logger = $logger;
        this.$mdToast = $mdToast;
        $reactive(this).attach($scope);


        this.todos = [
            {
                what: 'Brunch this weekend?',
                who: 'Min Li Chan',
                when: '3:08PM',
                notes: " I'll be in your neighborhood doing errands"
            },
            {
                what: 'Brunch this weekend?',
                who: 'Min Li Chan',
                when: '3:08PM',
                notes: " I'll be in your neighborhood doing errands"
            },
            {
                what: 'Brunch this weekend?',
                who: 'Min Li Chan',
                when: '3:08PM',
                notes: " I'll be in your neighborhood doing errands"
            },
            {
                what: 'Brunch this weekend?',
                who: 'Min Li Chan',
                when: '3:08PM',
                notes: " I'll be in your neighborhood doing errands"
            },
            {
                what: 'Brunch this weekend?',
                who: 'Min Li Chan',
                when: '3:08PM',
                notes: " I'll be in your neighborhood doing errands"
            },
        ];

        this.showPatientDashboard = false;
        this.showReported = false;

        this.selectedEndDate = this.madrsDateOfExpire;


        this.subscribe('patients');
        this.subscribe('users.specialists');
        this.subscribe('madrsquestions');
        this.subscribe('userList');
        this.subscribe('users');

        this.helpers({

            patients() {
                return PatientData.find({specialist: Meteor.userId(), activePatient: true, pending: null})
            },

            showSections(){
                if (Roles.userIsInRole(Meteor.userId(), ['patient'])) {
                    this.showPatientDashboard = true;
                }
            },
            madrsScheduleDates(){
                let from = new Date();
                let to = new Date(from.getFullYear(), from.getMonth(), from.getDate() + 7, from.getHours(), from.getMinutes());
                let thisUser = Meteor.users.findOne({_id: Meteor.userId()});
                if(thisUser && thisUser.madrsDateOfPerforming){
                    return thisUser.madrsDateOfPerforming.filter((obj) => {
                            if(obj.madrsDate > from ){
                                return true;
                            }else{
                                return false;
                            }

                        }
                    )
                }
            },
            madrsCurrentDates(){
                let from = new Date();
                let to = new Date(from.getFullYear(), from.getMonth(), from.getDate() - 1, from.getHours(), from.getMinutes());
                console.log(from);
                console.log(to);
                let thisUser = Meteor.users.findOne({_id: Meteor.userId()});
                if(thisUser && thisUser.madrsDateOfPerforming){
                    return thisUser.madrsDateOfPerforming.filter((obj) => {
                        if(obj.madrsDate <= from && obj.madrsExpires > to && obj.isReported === false){
                            return true;
                        }else{
                            return false;
                        }

                    }
                    )
                }
            },

            madrsQuestions(){
                return MadrsQuestions.find({});
            },
            colleagues() {
                if (Roles.userIsInRole(Meteor.userId(), ['specialist'])) {
                    return Meteor.users.find();
                }

            }

        })


        this.query = {
            order: 'username',
            limit: 5,
            page: 1
        };

        this.fab = {
            hidden: false,
            isOpen: false,
            hoover: true
        };

        this.selected = [];
        this.rowSelection = true;
        this.multiSelect = true;


    }

    deleteRows(ev) {
            this.selected.forEach((item) => {
                var index = this.data.indexOf(item);

                if(index !== -1) {
                    this.data.splice(index, 1);
                }
            });
        };




    dailyQuestion(ev) {
        this.$mdDialog.show({
            controller: 'DailyQuestionController',
            controllerAs: 'vm',
            templateUrl: 'imports/ui/patient/dailyquestion/dailyquestion.html',
            parent: angular.element(document.body),
            targetEvent: ev,
            clickOutsideToClose: true,
            locals: {
                userId: this.userId

            }

        }).then(()=> {

            console.log(userId);

        }, ()=> {

        });
    }

    madrsQuestion(ev) {

        this.$mdDialog.show({
            controller: 'MadrsController',
            controllerAs: 'vm',
            templateUrl: 'imports/ui/patient/madrs/madrs.html',
            parent: angular.element(document.body),
            targetEvent: ev,
            clickOutsideToClose: true,
            locals: {
                userId: this.userId

            }


        }).then(()=> {
            console.log(userId);

        }, ()=> {

        });
    }


    getName(userId) {
        let user = Meteor.users.findOne({_id: userId});
        if (user) {
            return user.profile.firstName + '' + user.profile.lastName;
        }
        else {
            return null;
        }
        console.log("profiler", user);
    }

    getUser(specialist) {
        let test = Meteor.users.findOne({_id: specialist});
        if (test) {
            return test.profile.firstName + ' ' + test.profile.lastName;
        }
        else {
            return null;
        }
        console.log("profiler", test);
    }
}


