<script lang="ts">
	import { enhance } from '$app/forms';
	import * as Form from '$shadcn/ui/form';
	import type { SubmitFunction, SuperValidated } from 'formsnap';
	import { createEventDispatcher } from 'svelte';
	import { newSchema, type NewSchema } from './new-schema';

	export let form: SuperValidated<NewSchema>;
	const dispatch = createEventDispatcher();

	let loading = false;

	const handleSubmit: SubmitFunction = () => {
		loading = true;
		return async ({ result }) => {
			loading = false;
		};
	};
</script>

<Form.Root schema={newSchema} {form} let:config>
	<form method="POST" use:enhance={handleSubmit} class="flex flex-col gap-2 w-full">
		<Form.Field {config} name="name">
			<Form.Item>
				<Form.Label>Name</Form.Label>
				<Form.Input type="text" placeholder="John" minlength={2} maxlength={80} required />
				<Form.Description />
				<Form.Validation />
			</Form.Item>
		</Form.Field>
		<Form.Field {config} name="tally">
			<Form.Item>
				<Form.Label>Tally</Form.Label>
				<input
					type="number"
					min={-100}
					max={100}
					required
					id="tally"
					name="tally"
					class="flex h-9 w-full rounded-md border border-input bg-background px-3 py-1 text-sm shadow-sm transition-colors file:border-0 file:bg-transparent file:text-foreground file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:cursor-not-allowed disabled:opacity-50"
					placeholder="100"
				/>
				<Form.Validation />
			</Form.Item>
		</Form.Field>
		<Form.Button disabled={loading} class="pt-2">{loading ? 'Adding' : 'Add'}</Form.Button>
	</form>
</Form.Root>
