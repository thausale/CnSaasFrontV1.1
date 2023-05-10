<script>
	// The ordering of these imports is critical to your app working properly
	import '@skeletonlabs/skeleton/themes/theme-skeleton.css';
	// If you have source.organizeImports set to true in VSCode, then it will auto change this ordering
	import '@skeletonlabs/skeleton/styles/all.css';

	import '../../../app.postcss';
	import { focusTrap, ProgressRadial } from '@skeletonlabs/skeleton';
	import { PUBLIC_URI } from '$env/static/public';
	import { goto } from '$app/navigation';

	let email = 'admin@admin';
	let password = 'password';
	let errorMessage = '';
	let loading = false;

	console.log(PUBLIC_URI);

	async function handleSubmit() {
		console.log('handleSubmit');
		//Remove error message
		errorMessage = '';
		loading = true;

		//Check login info with laravel api
		// const response = await fetch(`${PUBLIC_URI}/login`, {
		// 	method: 'POST',
		// 	headers: {
		// 		'Content-Type': 'application/json'
		// 	},
		// 	body: JSON.stringify({
		// 		email,
		// 		password
		// 	})
		// });

		// const data = await response.json();

		//This if launches if the credentials are wrong
		// if (data.error) {
		// 	console.log('wrong credentials');
		// 	errorMessage = data.error;
		// 	console.log(errorMessage);
		// 	return;
		// }

		//Set userdata in the store
		// userStore.set(data.user);

		// console.log(userStore.getInfo());

		// console.log($user);
		//This now holds the user's data
		//TODO:create JWT token from laravel API

		//TODO:Set JWT in a session cookie

		//TODO:Go to landing page
		// goto('/');
	}
</script>

<div class="flex items-center justify-center h-screen flex-col">
	<div class="border p-10 rounded-container-token border-primary-400 w-screen md:w-auto">
		<h1 class="p-10">Login to cnSaas</h1>
		<form action="" use:focusTrap={true} on:submit|preventDefault={handleSubmit}>
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
