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
import {novaMoodNavBar} from './navbar/navbar.directive';
import {menuLink} from './navbar/menulink.directive';
import {LoginController} from './login/login.controller';


export default angular.module('novamood', [
        uiRouter,
        ngMaterial,
        angularMeteor,
        ngToastr,

])

    .controller('LoginController', LoginController)
    .directive('novaMoodNavBar', novaMoodNavBar)
    .directive('menuLink', menuLink)
    .config(router)
    .config(config)
