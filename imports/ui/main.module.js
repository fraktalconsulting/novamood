/**
 * Created by MikaelKnutsson on 05/08/2016.
 */

import angular from 'angular';
import ngMaterial from 'angular-material';
import uiRouter from 'angular-ui-router';
import angularMeteor from 'angular-meteor';
import ngToastr from 'angular-toastr';


import {router} from './main.route';
import {config} from './main.config';

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
        uiRouter,
        ngMaterial,
        angularMeteor,
        ngToastr,

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
    .config(router)
    .config(config)
