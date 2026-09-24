import Card from "../../../componenets/ui/Card";
import TaskDonut from "./TaskDonut";
import type { AdminDashboardData } from "./admin-dashboard.api";

export default function TaskStatistics({ statistics }: { statistics: AdminDashboardData["taskStatistics"];}) 
{
  
  return (
    <Card className="overflow-hidden p-0">
      <div className="border-b border-border-light px-5 py-4">
        <h2 className="text-sm font-semibold text-text-primary">
          Task Statistics
        </h2>
      </div>

      <div className="flex min-h-[230px] items-center gap-8 p-6">
        <TaskDonut
          statistics={statistics}
        />

        <div className="flex-1 space-y-4">
          {statistics.map((item) => (
            <div
              key={item.status}
              className="flex items-center justify-between"
            >
              <div className="flex items-center gap-2">
                <span
                  className={`h-2.5 w-2.5 rounded-full ${
                    item.variant === "warning" ? "bg-warning-500"
                      : item.variant === "info" ? "bg-info-500" : "bg-success-500"
                  }`}
                />

                <span className="text-xs text-text-secondary">
                  {item.status}
                </span>
              </div>

              <span className="text-xs font-semibold text-text-primary">
                {item.count}
              </span>
            </div>
          ))}
        </div>
      </div>
    </Card>
  );
}

