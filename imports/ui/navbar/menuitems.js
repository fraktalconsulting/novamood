/**
 * Created by MikaelKnutsson on 12/07/2016.
 */
export const itemsPatient = {
	heading: 'Patient',
	items: [
		{
			name: 'Mina vårdgivare',
			type: 'link',
			state: 'app.healthProvider'
		}
	]
};

export const itemsSpecialist = {
	heading: 'Specialist',
	items: [
		{
			name: 'Patientregister',
			type: 'link',
			state: 'app.patientRegister'
		},
		{
			name: 'Mina Kollegor',
			type: 'link',
			state: 'app.colleagues'
		},
	]
};
