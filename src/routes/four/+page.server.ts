import { getSantaHeartRate } from '$lib/four/shrm';
import type { PageServerLoad } from './$types';

export const load: PageServerLoad = async ({ fetch }) => {
	return {
		streamed: {
			heartRate: getSantaHeartRate(fetch)
		}
	};
};
