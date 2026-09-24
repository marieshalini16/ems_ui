import StatusBadge from "../../../componenets/dashboard/DashboardStatusBadge";
import DashboardTable, { type TableColumn } from "../../../componenets/dashboard/DashboardTable";
import type { RecentEmployee } from "./admin-dashboard.api";
import Card from "../../../componenets/ui/Card";


interface RecentEmployeesProps {
    employees: RecentEmployee[];
}


export default function RecentEmployees({ employees }: RecentEmployeesProps) {
    const columns: TableColumn<RecentEmployee>[] = [
        {
            key: "name",
            header: "Name",

            render: (employee) => (
                <span className="font-medium text-text-primary">
                    {employee.name}
                </span>
            ),
        },

        {
            key: "department",
            header: "Department",

            render: (employee) => (
                <span>
                    {employee.department}
                </span>
            ),
        },

        {
            key: "status",
            header: "Status",

            render: (employee) => (
                <StatusBadge
                    label={employee.status}
                    variant={employee.status === "Active" ? "success" : "danger"}
                />
            ),
        },
    ];

    return (
        <Card className="overflow-hidden p-0">
            <div className="flex items-center justify-between border-b border-border-light px-5 py-4">
                <div>
                    <h2 className="text-sm font-semibold text-text-primary">
                        Recent Employees
                    </h2>
                </div>

                <button
                    type="button"
                    className="text-xs font-medium text-primary-600 transition duration-fast hover:text-primary-700"
                >
                    View all
                </button>
            </div>

            <DashboardTable
                columns={columns}
                data={employees}
                emptyMessage="No recent employees"
            />
        </Card>
    );
}