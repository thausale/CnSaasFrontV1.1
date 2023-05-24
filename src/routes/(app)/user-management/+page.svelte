<script>
	import { goto } from '$app/navigation';
	import { User } from '$lib/components/stores.js';
	import { onMount } from 'svelte';
	import { apiClient } from '$lib/api/UserApi.js';
	import { Accordion, AccordionItem, ProgressBar } from '@skeletonlabs/skeleton';

	let loading = false;
	export let data;
	const { users } = data;
</script>

<!-- // TODO: UsersAccordion component, with a loading prop -->
{#if loading}
	<ProgressBar meter="variant-filled-primary" />
{:else}
	<div class=" container mx-auto px-4 py-10 max-w-2xl">
		<Accordion>
			{#each users as user}
				<AccordionItem>
					<svelte:fragment slot="summary">
						<h3>{user.firstName} {user.lastName} id: {user.id}</h3>
					</svelte:fragment>

					<svelte:fragment slot="content">
						<ul>
							<li>first name: {user.firstName}</li>
							<li>last name: {user.lastName}</li>
							<li>email: {user.email}</li>
							<li>role: {user.role_name}</li>
						</ul>
					</svelte:fragment>
				</AccordionItem>
			{/each}
		</Accordion>
	</div>
{/if}

<!-- 
			{#if users.length > 0}
			<Accordion>
				{#each users as user}
				<AccordionItem>
					<svelte:fragment slot="summary">
					<h3>{user.firstName} {user.lastName}</h3>
				</svelte:fragment>

				<svelte:fragment slot="content">
					<h2>help</h2>
				</svelte:fragment>
			</AccordionItem>
		{/each}
		<AccordionItem />
	</Accordion>
{/if} -->
