export class LoggerService {

	constructor($q, $window) {
		'ngInject';
		this.$q = $q;
		this.sendLevel = 4;
		this.level = 4;
		this.console = $window.console;
	}

	info(message, meta) {
		if (this.level >= 2) {
			if(meta){
				this.console.info(message, meta)
			} else {
				this.console.info(message);
			}
		}
		if (this.sendLevel >= 2) {
			return this.log('info', message, meta);
		}
	}

}

