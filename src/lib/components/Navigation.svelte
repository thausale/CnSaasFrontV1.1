<script>
	import { drawerStore } from '@skeletonlabs/skeleton';
	import { notifications } from '$lib/stores/notifications';

	function drawerClose() {
		drawerStore.close();
	}

	export let role;
</script>

<nav class="list-nav p-04">
	<!-- (optionally you can provide a label here) -->
	<ul>
		<li>
			<a href="/notifications" on:click={drawerClose}>
				<span class="badge bg-primary-500">{$notifications}</span>
				<span class="flex-auto">Notifications</span>
			</a>
		</li>
		<li>
			<a
				href="/login"
				on:click={() => {
					localStorage.clear();
					drawerClose();
				}}
			>
				<span class="badge bg-primary-500">💀</span>
				<span class="flex-auto">Logout</span>
			</a>
		</li>
		<li>
			<a href="/" on:click={drawerClose}>
				<span class="badge bg-primary-500">🏠</span>
				<span class="flex-auto">Home</span>
			</a>
		</li>
		<li>
			<a href="/data" on:click={drawerClose}>
				<span class="badge bg-primary-500">📖</span>
				<span class="flex-auto">Data</span>
			</a>
		</li>
		<li>
			<a href="/transfer" on:click={drawerClose}>
				<span class="badge bg-primary-500">📖</span>
				<span class="flex-auto">Transfer Beer</span>
			</a>
		</li>
		{#if role === 'admin'}
			<li>
				<a href="/user-management" on:click={drawerClose}>
					<span class="badge bg-primary-500">🧙‍♂️</span>
					<span class="flex-auto">Manage users</span>
				</a>
			</li>
			<li>
				<a href="/role-management" on:click={drawerClose}>
					<span class="badge bg-primary-500">🕵️‍♀️</span>
					<span class="flex-auto">Manage Roles</span>
				</a>
			</li>
		{/if}
		<!-- ... -->
	</ul>
</nav>
