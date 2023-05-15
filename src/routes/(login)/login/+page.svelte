<script>
	// The ordering of these imports is critical to your app working properly
	import '@skeletonlabs/skeleton/themes/theme-skeleton.css';
	// If you have source.organizeImports set to true in VSCode, then it will auto change this ordering
	import '@skeletonlabs/skeleton/styles/all.css';

	import '../../../app.postcss';

	// Environment variables
	import { PUBLIC_URI } from '$env/static/public';

	// Components import
	import { focusTrap, ProgressRadial } from '@skeletonlabs/skeleton';
	import { goto } from '$app/navigation';
	import { blur } from 'svelte/transition';

	// Store imports
	import { User } from '$lib/components/stores';
	import { Token } from '$lib/components/stores';
	import { get } from 'svelte/store';
	import { apiClient } from '$lib/api/UserApi';

	let email = 'admin@admin';
	let password = 'password';
	let errorMessage = '';
	let loading = false;

	function setUserData(userInfo) {
		User.update((storeData) => {
			return { ...storeData, user: userInfo };
		});
	}

	async function handleSubmit() {
		//Remove error message
		errorMessage = '';
		loading = true;

		const data = await apiClient.login({ email, password });
		//This if launches if the credentials are wrong
		if (data.error) {
			console.log('wrong credentials');
			errorMessage = data.error;
			loading = false;
			return;
		}

		console.log(data);

		// Set userdata in the store
		User.set(data.user);
		// setUserData(data.user)

		// set laravel's plain text sanctum token (needed as bearer token)
		Token.set(data.plainTextToken);

		//Go to landing page
		goto('/');

		loading = false;
	}
</script>

<div class="flex items-center justify-center h-screen flex-col">
	<div class="border p-10 rounded-container-token border-primary-400 w-screen md:w-auto">
		<h1 class="p-10">Login to cnSaas</h1>
		<form action="" use:focusTrap={true} on:submit|preventDefault={handleSubmit}>
			{#if errorMessage}
				<p class="error" transition:blur>{errorMessage}</p>
			{:else}
				<p />
			{/if}
			<label class="label">
				<span>Email</span>
				<input
					class="input"
					title="Input (text)"
					type="text"
					placeholder="Input"
					bind:value={email}
				/>
			</label>
			<label class="label">
				<span>Password</span>
				<input class="input" type="text" placeholder="Input" bind:value={password} />
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
