<script>
	// Skeleton Components
	import { Accordion, AccordionItem, Avatar } from '@skeletonlabs/skeleton';
	import { toastStore } from '@skeletonlabs/skeleton';
	// Stores & Classes
	import { User } from '$lib/components/stores';
	import { apiClient } from '$lib/api/UserApi';

	// Components
	import InPlaceEdit from '$lib/components/inPlaceEdit.svelte';

	const toastSettings = {
		message: 'Data successfully updated ! ',
		background: 'variant-filled-primary'
	};

	let loading = false;

	const fullName = $User.firstName + ' ' + $User.lastName;
	const { email, role, permissions } = $User;

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

			// console.log(`updated ${field}, new value is: "${newValue}"`);
		};
	}
</script>

<div class="accordion">
	<h1>Profile Page</h1>
	<Accordion>
		<AccordionItem open>
			<!-- <svelte:fragment slot="lead">(icon)</svelte:fragment> -->
			<svelte:fragment slot="summary">
				<h3>Basic settings</h3>
			</svelte:fragment>
			<svelte:fragment slot="content">
				<p class="editable">underlined settings can be adjusted</p>
				<ul class="list">
					<li>
						<span>Name:</span>

						<span class="flex-auto">{fullName}</span>
					</li>
					<li>
						<span class="editable">Email:</span>
						{#if loading}
							<div class="placeholder animate-pulse" style="width: 10vw;" />
						{:else}
							<InPlaceEdit bind:value={$User.email} on:submit={submit('email')} />
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
			<svelte:fragment slot="summary"><h3>Advanced settings</h3></svelte:fragment>
			<svelte:fragment slot="content">
				{#each Object.entries($User) as [key, value]}
					<li>{key}: {value}</li>
				{/each}
			</svelte:fragment>
		</AccordionItem>
	</Accordion>
</div>

<style>
	.accordion {
		display: flex;
		margin-left: 10vw;
		margin-top: 10vh;
		font-size: large;
		flex-direction: column;
		max-width: 50vw;
	}
	h1 {
		margin-bottom: 5vh;
	}

	.editable {
		text-decoration: underline;
	}
</style>
