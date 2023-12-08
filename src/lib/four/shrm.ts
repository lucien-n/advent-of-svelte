import type { Fetch } from '$lib/types';

export const getSantaHeartRate = async (fetch: Fetch): Promise<number> => {
	const res = await fetch('https://advent.sveltesociety.dev/data/2023/day-four.json');
	const data = await res.json();

	const { heartRate } = data ?? -1;

	return heartRate;
};
