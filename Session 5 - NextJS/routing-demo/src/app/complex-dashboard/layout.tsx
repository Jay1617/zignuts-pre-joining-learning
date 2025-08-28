export default function ComplexDashboardLayout({
  children,
  users,
  revenue,
  notifications,
}: {
  children: React.ReactNode;
  users: React.ReactNode;
  revenue: React.ReactNode;
  notifications: React.ReactNode;
}) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-4 p-4 min-h-screen bg-gray-50">
      {/* Main content */}
      <div className="md:col-span-2 bg-white p-6 rounded-xl shadow-md">
        {children}
      </div>

      {/* Sidebar widgets */}
      <div className="flex flex-col gap-4">
        <div className="bg-blue-100 p-4 rounded-xl shadow">{users}</div>
        <div className="bg-green-100 p-4 rounded-xl shadow">{revenue}</div>
        <div className="bg-yellow-100 p-4 rounded-xl shadow">
          {notifications}
        </div>
      </div>
    </div>
  );
}
