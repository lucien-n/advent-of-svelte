import type { Child } from '$lib/one/types';
import { fail } from '@sveltejs/kit';
import { superValidate } from 'sveltekit-superforms/server';
import type { Actions, PageServerLoad } from './$types';
import { newSchema } from './new-schema';

export const load: PageServerLoad = async ({ fetch }) => {
	const childrenPromise: Promise<Child[]> = fetch(
		'https://advent.sveltesociety.dev/data/2023/day-one.json'
	).then((res) => res.json());

	return {
		streamed: {
			childrenPromise
		},
		form: superValidate(newSchema)
	};
};

export const actions: Actions = {
	default: async (event) => {
		const form = await superValidate(event, newSchema);

		if (!form.valid) {
			return fail(400, {
				form
			});
		}

		const { name, tally } = form.data;

		console.log(name, tally);
	}
};
