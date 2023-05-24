<script>
	import { enhance } from '$app/forms';
	import { DataApi } from '$lib/api/DataApi';

	export let form;
	// $: console.log('form', form);

	let name = 'test';
	let batch = 'ml-23-158';
	let alcohol = '3.9';
	let EBC = '2';
	let turbidity = '12';

	import { focusTrap } from '@skeletonlabs/skeleton';

	async function handleSubmit() {
		const beerData = {
			name,
			alcohol,
			ebc: EBC,
			turbidity
		};

		console.log(beerData);
		const data = await DataApi.post(beerData);
		console.log(data); // Send the beer data to the server or perform any desired actions
		// For this example, we're simply logging the data
	}
</script>

<main>
	<h1>Beer Form</h1>
	<form class="w-full" use:enhance method="POST">
		{#if form?.error}
			<p class="error" transition:blur>{form.error}</p>
		{:else}
			<p />
		{/if}

		<label class="label mb-5">
			<p>Name:</p>
			<input type="text" bind:value={name} class="input" name="name" required />
		</label>

		<label class="label mb-5">
			<p>batch:</p>
			<input type="text" bind:value={batch} class="input" name="batch" />
		</label>

		<label class="label mb-5">
			<div>Alcohol (%):</div>
			<input type="number" step="0.01" bind:value={alcohol} class="input" name="alcohol" />
		</label>

		<label class="label mb-5">
			<p>EBC:</p>
			<input type="number" bind:value={EBC} class="input" name="EBC" />
		</label>

		<label class="label mb-5">
			<p>turbidity:</p>
			<input type="number" bind:value={turbidity} class="input" name="turbidity" />
		</label>
		<div class="flex items-center">
			<button type="submit" class="btn variant-filled-primary max-w-full">Submit</button>
		</div>
	</form>
</main>

<style>
	label {
		display: grid;
		grid-template-columns: 100px 1fr;
		align-items: center;
	}

	button {
		display: flex;
	}

	form {
		display: flex;
		flex-direction: column;
		align-items: center;
	}
</style>
