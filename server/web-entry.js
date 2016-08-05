/**
 * Created by MikaelKnutsson on 08/07/2016.
 */

import { Notify } from './notify';
import {logger} from './logger';

export function webEntry (){

    logger.info('Server started');
    Notify.setup();
}
