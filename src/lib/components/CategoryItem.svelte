<script lang="ts">
	import { Button } from './ui/button';
	import { Check, Pencil, Trash2, X } from '@lucide/svelte';
	import { enhance } from '$app/forms';
	import Input from './ui/input/input.svelte';

	type Props = {
		category: {
			id: number;
			name: string;
		};
	};

	let { category }: Props = $props();

	let editing = $state(false);
	let newName = $derived(category.name);

	function startEdit() {
		newName = category.name;
		editing = true;
	}

	function cancel() {
		editing = false;
		newName = category.name;
	}

	function clickOutside(node: HTMLElement, handler: () => void) {
		function onClick(event: MouseEvent) {
			if (!node.contains(event.target as Node)) {
				handler();
			}
		}

		document.addEventListener('mousedown', onClick, true);

		return {
			destroy() {
				document.removeEventListener('mousedown', onClick, true);
			}
		};
	}
</script>

{#if editing}
	<form
		method="POST"
		action="?/update"
		use:enhance={() => {
			return async ({ result }) => {
				if (result.type === 'success') {
					category.name = newName;
					editing = false;
				}
			};
		}}
		use:clickOutside={cancel}
		class="flex w-full items-center justify-between gap-2"
	>
		<Input name="name" bind:value={newName} required autofocus />
		<Input type="hidden" name="id" value={category.id} />

		<div class="flex gap-2">
			<Button type="submit" size="icon-sm">
				<Check />
			</Button>
			<Button type="button" onclick={cancel} variant="destructive" size="icon-sm">
				<X />
			</Button>
		</div>
	</form>
{:else}
	<div class="flex w-full items-center justify-between gap-2">
		<span>{category.name}</span>

		<div class="flex gap-2">
			<Button onclick={startEdit} size="icon-sm" variant="outline">
				<Pencil />
			</Button>

			<form method="POST" action="?/delete" use:enhance>
				<Input type="hidden" name="id" value={category.id} />
				<Button type="submit" variant="destructive" size="icon-sm">
					<Trash2 />
				</Button>
			</form>
		</div>
	</div>
{/if}
