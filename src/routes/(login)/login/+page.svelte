<script>
	// The ordering of these imports is critical to your app working properly
	import '@skeletonlabs/skeleton/themes/theme-skeleton.css';
	// If you have source.organizeImports set to true in VSCode, then it will auto change this ordering
	import '@skeletonlabs/skeleton/styles/all.css';

	import '../../../app.postcss';

	// // Environment variables
	import { PUBLIC_URI } from '$env/static/public';

	// // Components import
	import { focusTrap, ProgressRadial } from '@skeletonlabs/skeleton';
	import { goto } from '$app/navigation';
	import { blur } from 'svelte/transition';

	// // Store imports
	import { User } from '$lib/components/stores';
	import { Token } from '$lib/components/stores';
	import { get } from 'svelte/store';
	import { apiClient } from '$lib/api/UserApi';

	import { enhance } from '$app/forms';

	export let form;
	$: console.log('form', form);
	let email = 'admin@admin';
	let password = 'password';
	let loading = false;

	if (form?.error) {
		loading = false;
	}
</script>

<h1>test</h1>

<div class="flex items-center justify-center h-screen flex-col">
	<div class="border p-10 rounded-container-token border-primary-400 w-screen md:w-auto">
		<h1 class="p-10">Login to cnSaas</h1>
		<form
			use:enhance
			method="POST"
			action="?/login"
			use:focusTrap={true}
			on:submit={() => (loading = true)}
		>
			{#if form?.error}
				<p class="error" transition:blur>{form.error}</p>
			{:else}
				<p />
			{/if}
			<label class="label">
				<span>Email</span>
				<input
					class="input"
					name="email"
					title="Input (text)"
					type="text"
					placeholder="email"
					bind:value={email}
				/>
			</label>
			<label class="label">
				<span>Password</span>
				<input
					class="input"
					type="text"
					name="password"
					placeholder="password"
					bind:value={password}
				/>
			</label>
			<button type="submit" class="btn variant-filled-primary mt-5">
				{#if loading}
					<ProgressRadial width="w-6" />
				{:else}
					login
				{/if}
			</button>
		</form>
	</div>
</div>

<style>
	.error {
		color: red;
	}

	p {
		min-height: 24px;
	}
</style>
