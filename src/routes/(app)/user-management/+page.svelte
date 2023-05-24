<script>
	import { goto } from '$app/navigation';
	import { User } from '$lib/components/stores.js';
	import { onMount } from 'svelte';
	import { apiClient } from '$lib/api/UserApi.js';
	import { Accordion, AccordionItem, ProgressBar } from '@skeletonlabs/skeleton';

	let loading = false;
	export let data;
	const { users } = data;
	console.log(users);

	import { Table } from '@skeletonlabs/skeleton';
	import { tableMapperValues } from '@skeletonlabs/skeleton';

	const table = {
		// A list of heading labels.
		head: ['firstName', 'lastName', 'role', 'email'],
		// The data visibly shown in your table body UI.
		body: tableMapperValues(users, ['firstName', 'lastName', 'role_name', 'email']),
		// Optional: The data returned when interactive is enabled and a row is clicked.
		meta: tableMapperValues(users, ['firstName', 'lastName', 'role_name', 'email', 'id']),
		// Optional: A list of footer labels.
		foot: ['Total', '', `<code class="code">${users.length}</code>`]
	};

	function selectionHandler(e) {
		console.log(e.detail);
	}
</script>

<!-- // TODO: UsersAccordion component, with a loading prop -->
{#if loading}
	<ProgressBar meter="variant-filled-primary" />
{:else}
	<!-- TODO: Add modal when clicked to edit user -->
	<Table source={table} class=" p-4" interactive="true" on:selected={selectionHandler} />
{/if}
