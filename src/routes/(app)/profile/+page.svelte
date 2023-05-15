<script>
	import { Accordion, AccordionItem } from '@skeletonlabs/skeleton';
	import { User } from '$lib/components/stores';
	import InPlaceEdit from '$lib/components/inPlaceEdit.svelte';
	import { apiClient } from '$lib/api/UserApi';
	import { toastStore } from '@skeletonlabs/skeleton';

	const toastSettings = {
		message: 'Data successfully updated ! ',
		background: 'variant-filled-primary'
	};

	let loading = false;

	console.log(loading);
	const fullName = $User.firstName + ' ' + $User.lastName;
	const { email, role, permissions } = $User;
	let title = 'this is a test';

	function submit(field) {
		return ({ detail: newValue }) => {
			loading = true;
			const id = $User.id;

			(async function () {
				try {
					const data = await apiClient.editUser(field, newValue);
					console.log(data);
					loading = false;
					toastStore.trigger(toastSettings);
				} catch (error) {
					console.error(error);
					loading = false;
					//res.status(500).json({ status: 'failed', message: error.message });
				}
			})();

			// IRL: POST value to server here
			console.log(`updated ${field}, new value is: "${newValue}"`);
		};
	}
</script>

<h1>Profile Page</h1>

<Accordion>
	<AccordionItem open>
		<!-- <svelte:fragment slot="lead">(icon)</svelte:fragment> -->
		<svelte:fragment slot="summary">Basic settings</svelte:fragment>
		<svelte:fragment slot="content">
			<h1>
				<InPlaceEdit bind:value={title} on:submit={submit('title')} />
			</h1>
			<ul class="list">
				<li>
					<span>Name:</span>

					<span class="flex-auto">{fullName}</span>
				</li>
				<li>
					<span>Email:</span>
					{#if loading}
						<div class="placeholder animate-pulse" style="width: 10vw;" />
					{:else}
						<InPlaceEdit bind:value={$User.email} on:submit={submit('email')} class="flex-auto" />
					{/if}
				</li>
				<li>
					<span>Role:</span>
					<span class="flex-auto">{role}</span>
				</li>
				<li>
					<span>Permissions:</span>
					<span class="flex-auto">{permissions || 'none'}</span>
				</li>
			</ul>
		</svelte:fragment>
	</AccordionItem>

	<AccordionItem>
		<svelte:fragment slot="summary">Advanced settings</svelte:fragment>
		<svelte:fragment slot="content">
			{#each Object.entries($User) as [key, value]}
				<li>{key}: {value}</li>
			{/each}
		</svelte:fragment>
	</AccordionItem>
</Accordion>
