<script lang="ts">
	import ModeToggle from '$lib/components/ModeToggle.svelte';
	import Button from '$lib/components/ui/button/button.svelte';
	import { LogOut } from '@lucide/svelte';

	let { children } = $props();
</script>

<div class="flex min-h-screen flex-col">
	<header class="border-b bg-background px-4">
		<div class="container mx-auto flex h-16 max-w-7xl items-center justify-between gap-4">
			<h1 class="text-xl font-semibold">Sentry</h1>

			<div class="flex gap-4">
				<ModeToggle />
				<form action="/logout" method="POST">
					<Button type="submit" variant="destructive"
						>Logout
						<LogOut />
					</Button>
				</form>
			</div>
		</div>
	</header>
	<main class="flex-1">
		{@render children()}
	</main>
	<footer class="border-t px-6 py-3 text-center text-sm text-muted-foreground">
		&copy; {new Date().getFullYear()} Sentry | COSC 111A
	</footer>
</div>
