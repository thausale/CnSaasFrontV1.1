<script>
	// The ordering of these imports is critical to your app working properly
	import '@skeletonlabs/skeleton/themes/theme-skeleton.css';
	// If you have source.organizeImports set to true in VSCode, then it will auto change this ordering
	import '@skeletonlabs/skeleton/styles/all.css';
	// Most of your app wide CSS should be put in this file
	import '../../app.postcss';

	// Skeleton components
	import { AppShell, AppBar, Avatar, ProgressBar } from '@skeletonlabs/skeleton';
	import { Drawer, drawerStore } from '@skeletonlabs/skeleton';
	import { Toast, toastStore } from '@skeletonlabs/skeleton';
	import { LightSwitch } from '@skeletonlabs/skeleton';

	// Custom components
	import Navigation from '$lib/components/Navigation.svelte';
	import Clock from '$lib/components/Clock.svelte';
	import HamburgerButton from '$lib/components/HamburgerButton.svelte';

	//Stores
	import { User } from '$lib/components/stores';
	import { Token } from '$lib/components/stores';

	import { goto } from '$app/navigation';
	export let data;
	User.set(data.user);
	const initials = $User.firstName[0] + $User.lastName[0];

	const { role } = data;
	// console.log('Userstore', $User);
</script>

<Drawer>
	<Navigation {role} />
</Drawer>

<Toast />

<AppShell slotSidebarLeft="w-0 md:w-44 bg-surface-500/10 ">
	<svelte:fragment slot="header">
		<AppBar>
			<svelte:fragment slot="lead">
				<div class="flex flex-col">
					<Clock />
					<HamburgerButton />
				</div>
			</svelte:fragment>
			<svelte:fragment slot="trail">
				<LightSwitch />
				<a href="/profile">
					<Avatar {initials} />
				</a>
			</svelte:fragment>
			<!-- TODO: Maybe put the notifications bar in the headline -->
			<!-- <svelte:fragment slot="headline">(headline)</svelte:fragment> -->
		</AppBar>
	</svelte:fragment>
	<svelte:fragment slot="sidebarLeft">
		<Navigation {role} />
	</svelte:fragment>
	<!-- (sidebarRight) -->
	<!-- (pageHeader) -->
	<!-- Router Slot -->
	<slot />
	<!-- ---- / ---- -->
	<!-- (pageFooter) -->
	<!-- (footer) -->
</AppShell>
