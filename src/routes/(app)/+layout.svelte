<script>
	// The ordering of these imports is critical to your app working properly
	import '@skeletonlabs/skeleton/themes/theme-skeleton.css';
	// If you have source.organizeImports set to true in VSCode, then it will auto change this ordering
	import '@skeletonlabs/skeleton/styles/all.css';
	// Most of your app wide CSS should be put in this file
	import '../../app.postcss';
	import {AppShell, AppBar, Avatar } from "@skeletonlabs/skeleton" 
	import Navigation from '$lib/components/Navigation.svelte';
	import { Drawer, drawerStore } from '@skeletonlabs/skeleton';
	import Clock from '$lib/components/Clock.svelte';
	import HamburgerButton from '$lib/components/HamburgerButton.svelte';
	import { get } from 'svelte/store';

	import { User } from '$lib/components/stores';
	import { Token } from '$lib/components/stores';
	import { goto } from '$app/navigation';
	import { Toast, toastStore } from '@skeletonlabs/skeleton';

	console.log(get(User))
	const initials = $User.firstName[0] + $User.lastName[0]

function goToProfile(){
	goto("/profile")
}
</script>

<Drawer>
	<Navigation/>
</Drawer>

<Toast />


<AppShell slotSidebarLeft="w-0 md:w-44 bg-surface-500/10 ">
	<svelte:fragment slot="header">
		<AppBar>
			<svelte:fragment slot="lead"  >
				<div class="flex flex-col">

					<Clock />
					<HamburgerButton />
				</div>
				
				
			</svelte:fragment>
			<svelte:fragment slot="trail">
				<a href="/profile">
					<Avatar initials={initials} />
				</a>
			</svelte:fragment>
			<!-- TODO: Maybe put the notifications bar in the headline -->
			<!-- <svelte:fragment slot="headline">(headline)</svelte:fragment> -->
		</AppBar>
		
	</svelte:fragment>
	<svelte:fragment slot="sidebarLeft">
		<Navigation />
	</svelte:fragment>
	<!-- (sidebarRight) -->
	<!-- (pageHeader) -->
	<!-- Router Slot -->
	<slot />
	<!-- ---- / ---- -->
	<!-- (pageFooter) -->
	<!-- (footer) -->
</AppShell>