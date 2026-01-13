<script lang="ts">
	import * as Sidebar from '$lib/components/ui/sidebar/index.js';
	import AppSidebar from '$lib/components/AppSidebar.svelte';
	import ModeToggle from '$lib/components/ModeToggle.svelte';
	import Button from '$lib/components/ui/button/button.svelte';
	import { LogOut } from '@lucide/svelte';

	let { children } = $props();
</script>

<Sidebar.Provider>
	<AppSidebar />

	<div class="flex min-h-screen w-full flex-col">
		<header class="border-b bg-background px-4">
			<div class="container mx-auto flex h-16 max-w-7xl items-center justify-between gap-4">
				<Sidebar.Trigger />

				<div class="flex gap-4">
					<ModeToggle />

					<form action="/logout" method="POST">
						<Button type="submit" variant="destructive">
							Logout
							<LogOut />
						</Button>
					</form>
				</div>
			</div>
		</header>

		<main class="flex-1">
			{@render children()}
		</main>
	</div>
</Sidebar.Provider>
