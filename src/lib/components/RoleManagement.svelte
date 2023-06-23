<script>
	import { modalStore, toastStore } from '@skeletonlabs/skeleton';
	import { enhance } from '$app/forms';
	import { onDestroy } from 'svelte';
	import { ProgressRadial } from '@skeletonlabs/skeleton';
	import { UserApi } from '$lib/api/UserApi';
	import { invalidate } from '$app/navigation';
	import { RoleController } from '$lib/api/RoleController';

	export let role;
	export let id;
	let loading = false;

	const deleteHandler = async () => {
		modalStore.close();
		const modal = {
			type: 'confirm',
			title: `are you sure you want to delete the ${role} role  ?`,
			response: async (r) => {
				if (r) {
					// DELETE ROLE
					const response = await RoleController.deleteRole(id);
					// console.log(response);
					if (response.message) {
						invalidate('Roles');
						const t = {
							message: 'Role deleted',
							// Provide any utility or variant background style:
							background: 'variant-filled-primary'
						};
						toastStore.trigger(t);
					} else {
						const t = {
							message: 'Something went wrong',
							// Provide any utility or variant background style:
							background: 'variant-filled-error'
						};
						toastStore.trigger(t);
					}
				}
			}
		};
		modalStore.trigger(modal);
	};
</script>

<body class="modal p-10 flex flex-col">
	<h1 class="pb-5">Delete Role ?</h1>

	<button
		class="btn variant-filled-secondary mb-5"
		type="button"
		id="deleteButton"
		on:click={deleteHandler}
	>
		Delete
	</button>
	<button class="btn variant-filled-error" type="button" on:click={() => modalStore.close()}>
		Cancel
	</button>
</body>
