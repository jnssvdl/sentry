<script lang="ts">
	import type { PageProps } from './$types';
	import * as Table from '$lib/components/ui/table/index.js';
	import { FileText, Calendar, ChartBarStacked, Users } from '@lucide/svelte';
	import StatCard from '$lib/components/StatCard.svelte';
	import { formatDate } from '$lib/utils';

	let { data }: PageProps = $props();

	let submissionCount = $derived(data.submissions.length);
	let uniqueCategories = $derived(new Set(data.submissions.map((s) => s.categoryId)).size);
	let uniqueFaculties = $derived(new Set(data.submissions.map((s) => s.facultyId)).size);
</script>

<div class="px-4 py-8 sm:px-6 lg:px-8">
	<!-- Header Section -->
	<div class="container mx-auto mb-12 max-w-7xl">
		<div class="mb-8">
			<h1 class="mb-2 text-4xl font-bold tracking-tight sm:text-5xl">Submissions</h1>
			<p class="text-lg">Manage and review all submitted works</p>
		</div>

		<!-- Stats Bar -->
		<div class="mb-8 grid grid-cols-1 gap-4 sm:grid-cols-3">
			<StatCard label="Total Submissions" value={submissionCount} Icon={FileText} />
			<StatCard label="Categories" value={uniqueCategories} Icon={ChartBarStacked} />
			<StatCard label="Faculties" value={uniqueFaculties} Icon={Users} />
		</div>
	</div>

	<!-- Table Section -->
	<div class="container mx-auto max-w-7xl">
		<div class="overflow-hidden rounded-xl border shadow-sm">
			<div class="overflow-x-auto">
				<Table.Root>
					<Table.Header>
						<Table.Row class="border-b bg-card">
							<Table.Head class="px-6 py-4 text-left font-semibold">Submitted to</Table.Head>
							<Table.Head class="px-6 py-4 text-left font-semibold">Category</Table.Head>
							<Table.Head class="px-6 py-4 text-left font-semibold">Date submitted</Table.Head>
						</Table.Row>
					</Table.Header>

					<Table.Body>
						{#if data.submissions.length === 0}
							<Table.Row class="border-b">
								<Table.Cell colspan={3} class="px-6 py-12 text-center text-muted-foreground">
									<div class="flex flex-col items-center gap-2">
										<FileText class="h-8 w-8 opacity-40" />
										<p class="text-base">No submissions found yet</p>
									</div>
								</Table.Cell>
							</Table.Row>
						{:else}
							{#each data.submissions as submission (submission.submissionId)}
								<Table.Row class="border-b">
									<!-- Faculty -->
									<Table.Cell class="px-6 py-4 font-medium">
										<div class="flex items-center gap-3">
											<div class="shrink-0">
												<div
													class="flex h-10 w-10 items-center justify-center rounded-full bg-accent"
												>
													<span class="text-sm font-semibold text-accent-foreground">
														{submission.facultyFirstName.charAt(
															0
														)}{submission.facultyLastName.charAt(0)}
													</span>
												</div>
											</div>

											<div>
												<p class="font-medium">
													{submission.facultyFirstName}
													{submission.facultyLastName}
												</p>
												<a
													href={`mailto:${submission.facultyEmail}`}
													class="text-xs text-muted-foreground underline-offset-4 hover:underline"
												>
													{submission.facultyEmail}
												</a>
											</div>
										</div>
									</Table.Cell>

									<!-- Category -->
									<Table.Cell class="px-6 py-4">
										<span
											class="inline-flex items-center rounded-full bg-accent px-3 py-1 text-sm font-medium text-accent-foreground"
										>
											{submission.categoryName}
										</span>
									</Table.Cell>

									<!-- Date -->
									<Table.Cell class="px-6 py-4 text-sm">
										<div class="flex items-center gap-2">
											<Calendar class="h-4 w-4 text-muted-foreground" />
											{formatDate(submission.createdAt.toString())}
										</div>
									</Table.Cell>
								</Table.Row>
							{/each}
						{/if}
					</Table.Body>
				</Table.Root>
			</div>

			<!-- Footer Info -->
			{#if data.submissions.length > 0}
				<div class="border-t bg-card px-6 py-4">
					<p class="text-sm">
						Showing <span class="font-medium">{submissionCount}</span>
						submission{submissionCount !== 1 ? 's' : ''}
					</p>
				</div>
			{/if}
		</div>
	</div>
</div>
