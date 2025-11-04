import AppLayout from "@/components/layout/app-layout";
import { ModelBenchmark } from "@/components/dashboard/model-benchmark";
import { PerformanceCharts } from "@/components/dashboard/performance-charts";
import { Separator } from "@/components/ui/separator";

export default function DashboardPage() {
  return (
    <AppLayout>
      <div className="flex flex-col h-full">
        <header className="p-4 border-b">
          <h2 className="text-xl font-semibold">Model Dashboard</h2>
        </header>
        <main className="flex-1 p-4 md:p-6 lg:p-8 space-y-8 overflow-y-auto">
          <PerformanceCharts />
          <Separator />
          <ModelBenchmark />
        </main>
      </div>
    </AppLayout>
  );
}
