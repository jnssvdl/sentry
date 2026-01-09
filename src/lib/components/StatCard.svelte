<script lang="ts">
	import { type IconProps } from '@lucide/svelte';
	import type { Component } from 'svelte';

	let { label, value, Icon }: { label: string; value: number; Icon: Component<IconProps> } =
		$props();
</script>

<div class="rounded-lg border bg-card p-6 shadow-sm">
	<div class="flex items-center justify-between">
		<div>
			<p class="text-sm font-medium">{label}</p>
			<p class="mt-1 text-3xl font-bold">{value}</p>
		</div>
		<div class="rounded-lg bg-accent p-3">
			<Icon class="h-6 w-6 text-accent-foreground" />
		</div>
	</div>
</div>
