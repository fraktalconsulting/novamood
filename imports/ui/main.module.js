/**
 * Created by MikaelKnutsson on 05/08/2016.
 */

import angular from 'angular';
import angularMeteor from 'angular-meteor';
import angularMeteorAuth from 'angular-meteor-auth';
import ngAnimate from 'angular-animate';
import ngSanitize from 'angular-sanitize';
import uiRouter from 'angular-ui-router';
import ngTranslate from 'angular-translate';
import ngToastr from 'angular-toastr';
import ngMaterial from 'angular-material';
import ngTable from 'angular-material-data-table';
import ngFileUpload from 'ng-file-upload';

import 'angular-moment';
import 'angular-material/angular-material.css';
import 'angular-translate-loader-static-files';

import 'angular-material-data-table/dist/md-data-table.min.css';
import 'angular-material-datetimepicker/css/material-datetimepicker.min.css';
import 'angular-local-storage/dist/angular-local-storage.js';
import 'sc-date-time/sc-date-time.css';
import 'later/later.min';

import 'angular-chart.js/dist/angular-chart.min.js';
import 'chart.js/dist/Chart.min.js'


import {router} from './main.route';
import {config} from './main.config';

import {LoggerService} from './logger.service'
import {AccountController} from './account/account.controller';
import {SignupSpecialistController} from './signup/signupspecialist.controller';
import {SignupPatientController} from './signup/signuppatient.controller';
import {NavbarController} from './navbar/navbar.controller';
import {ResetPasswordController} from './account/resetpassword.controller';
import {DailyQuestionController} from './patient/dailyquestion/dailyquestion.controller';
import {DashboardController} from './specialist/dashboard/dashboard.controller';
import {MadrsController} from './patient/madrs/madrs.controller';
import {PatientRegisterController} from './specialist/patientregister/patientregister.controller';
import {PatientModalController} from './specialist/patientregister/patient.modal.controller';
import {PatientHealthProviderController} from './patient/healthprovider/healthprovider.controller';
import {PatientHealthProviderModalController} from './patient/healthprovider/healthprovider.modal.controller';
import {ColleagueController} from './specialist/colleagues/colleagues.controller';
import {ColleagueModalController} from './specialist/colleagues/colleagues.modal.controller';
import {LoginController} from './login/login.controller';

import {novaMoodNavBar} from './navbar/navbar.directive';
import {menuLink} from './navbar/menulink.directive';



export default angular.module('novamood', [
            angularMeteor,
            angularMeteorAuth,
            ngSanitize,
            ngAnimate,
            uiRouter,
            ngTranslate,
            ngToastr,
            ngMaterial,
            ngTable,
            ngFileUpload,
            'LocalStorageModule',
            'chart.js'

])


    .controller('SignupSpecialistController', SignupSpecialistController)
    .controller('SignupPatientController', SignupPatientController)
    .controller('NavbarController', NavbarController)
    .controller('AccountController', AccountController)
    .controller('ResetPasswordController', ResetPasswordController)
    .controller('DailyQuestionController', DailyQuestionController)
    .controller('DashboardController', DashboardController)
    .controller('MadrsController', MadrsController)
    .controller('PatientRegisterController', PatientRegisterController)
    .controller('PatientModalController', PatientModalController)
    .controller('PatientHealthProviderController', PatientHealthProviderController)
    .controller('PatientHealthProviderModalController', PatientHealthProviderModalController)
    .controller('ColleagueController', ColleagueController)
    .controller('ColleagueModalController', ColleagueModalController)
    .controller('LoginController', LoginController)
    .directive('novaMoodNavBar', novaMoodNavBar)
    .directive('menuLink', menuLink)
    .service('$logger', LoggerService)
    .config(router)
    .config(config)
