import { Outlet, Link, useNavigate, useLocation } from "react-router-dom";
import { useEffect } from "react";
import { LayoutDashboard, FileText, Briefcase, Tags, LogOut, Image as ImageIcon, CalendarClock } from "lucide-react";
import { useAdminAuth } from "@/context/AdminAuthContext";

const AdminLayout = () => {
  const { isAuthenticated, logout } = useAdminAuth();
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    if (!isAuthenticated) {
      navigate('/admin/login');
    }
  }, [isAuthenticated, navigate]);

  if (!isAuthenticated) {
    return <div className="flex h-screen items-center justify-center">Redirecting...</div>;
  }

  const navItems = [
    { label: "Dashboard", path: "/admin", icon: LayoutDashboard },
    { label: "Blogs", path: "/admin/blogs", icon: FileText },
    { label: "Services", path: "/admin/services", icon: Briefcase },
    { label: "Brands", path: "/admin/brands", icon: Tags },
    { label: "Projects", path: "/admin/projects", icon: ImageIcon },
    { label: "Bookings", path: "/admin/bookings", icon: CalendarClock },
  ];

  return (
    <div className="flex h-screen bg-neutral-50 overflow-hidden">
      {/* Sidebar */}
      <aside className="w-64 bg-white border-r border-neutral-200 flex flex-col">
        <div className="p-6 border-b border-neutral-200">
          <Link to="/" className="text-xl font-bold font-syne text-[#0284C7] tracking-tight">
            PERFECT AIR <span className="text-[#051B30]">ADMIN</span>
          </Link>
        </div>
        
        <nav className="flex-1 p-4 space-y-2 overflow-y-auto">
          {navItems.map((item) => {
            const Icon = item.icon;
            const isActive = location.pathname === item.path;
            return (
              <Link
                key={item.path}
                to={item.path}
                className={`flex items-center gap-3 px-4 py-3 rounded-md transition-colors ${
                  isActive 
                    ? "bg-sky-50 text-[#0284C7] font-semibold" 
                    : "text-neutral-600 hover:bg-neutral-100"
                }`}
              >
                <Icon size={20} className={isActive ? "text-[#0284C7]" : "text-neutral-500"} />
                {item.label}
              </Link>
            );
          })}
        </nav>

        <div className="p-4 border-t border-neutral-200 flex items-center justify-between">
          <div className="flex flex-col">
            <span className="text-sm font-medium text-slate-800">Administrator</span>
          </div>
          <button 
            onClick={() => {
              logout();
              navigate('/admin/login');
            }}
            className="p-2 text-neutral-500 hover:text-red-600 hover:bg-neutral-100 rounded-md transition-colors cursor-pointer"
            title="Logout"
          >
            <LogOut size={20} />
          </button>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 overflow-y-auto p-8">
        <Outlet />
      </main>
    </div>
  );
};

export default AdminLayout;
