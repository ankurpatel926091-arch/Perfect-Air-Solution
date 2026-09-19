import React from "react";
import { Link } from "react-router-dom";
import {
  FileText,
  Briefcase,
  Tag,
  FolderKanban,
  CalendarClock,
  Plus,
  ArrowUpRight,
  Globe,
  TrendingUp,
  Activity,
} from "lucide-react";
import { useGetBlogsQuery, useGetServicesQuery, useGetBrandsQuery, useGetProjectsQuery, useGetBookingsQuery } from "../../store/api";

/* ─── tiny helper ─────────────────────────────────────────────── */
const CountBadge = ({ loading, count }: { loading: boolean; count: number }) =>
  loading ? (
    <span className="inline-block w-10 h-8 rounded-md bg-neutral-100 animate-pulse" />
  ) : (
    <span>{count}</span>
  );

/* ─── stat card ───────────────────────────────────────────────── */
interface StatCardProps {
  label: string;
  count: number;
  loading: boolean;
  icon: React.ElementType;
  accent: string;        // tailwind text color
  accentBg: string;      // tailwind bg color (subtle)
  accentBorder: string;  // tailwind border color
  path: string;
  addPath?: string;
}

const StatCard: React.FC<StatCardProps> = ({
  label, count, loading, icon: Icon,
  accent, accentBg, accentBorder, path, addPath,
}) => (
  <div className={`relative overflow-hidden rounded-md border ${accentBorder} bg-white group transition-all duration-300 hover:shadow-md`}>
    {/* subtle top stripe */}
    <div className={`h-1 w-full ${accent.replace("text-", "bg-")}`} />

    <div className="p-6">
      {/* icon */}
      <div className={`inline-flex p-3 rounded-md ${accentBg} ${accent} mb-4`}>
        <Icon size={20} />
      </div>

      {/* count */}
      <p className={`text-4xl font-black tracking-tight text-neutral-900 font-syne`}>
        <CountBadge loading={loading} count={count} />
      </p>
      <p className="text-neutral-500 text-sm font-medium mt-1">{label}</p>

      {/* actions */}
      <div className="flex items-center gap-3 mt-5 pt-4 border-t border-neutral-100">
        <Link
          to={path}
          className={`flex items-center gap-1 text-xs font-semibold ${accent} hover:underline`}
        >
          Manage <ArrowUpRight size={12} />
        </Link>
        {addPath && (
          <Link
            to={addPath}
            className="ml-auto flex items-center gap-1 text-xs bg-neutral-900 text-white px-3 py-1.5 rounded-md hover:bg-neutral-700 transition-colors font-semibold"
          >
            <Plus size={11} /> Add
          </Link>
        )}
      </div>
    </div>
  </div>
);

/* ─── quick action button ─────────────────────────────────────── */
const QuickAction = ({ to, icon: Icon, label, sub, external = false }: any) => {
  const inner = (
    <div className="flex items-center gap-4 p-4 rounded-md border border-neutral-200 bg-white hover:border-neutral-400 hover:shadow-md transition-all duration-200 group cursor-pointer">
      <div className="p-2.5 rounded-md bg-neutral-100 text-neutral-600 group-hover:bg-neutral-900 group-hover:text-white transition-colors">
        <Icon size={18} />
      </div>
      <div>
        <p className="text-sm font-semibold text-neutral-900">{label}</p>
        <p className="text-xs text-neutral-400">{sub}</p>
      </div>
      <ArrowUpRight size={14} className="ml-auto text-neutral-300 group-hover:text-neutral-900 transition-colors" />
    </div>
  );

  return external ? (
    <a href={to} target="_blank" rel="noreferrer">{inner}</a>
  ) : (
    <Link to={to}>{inner}</Link>
  );
};

/* ─── main component ──────────────────────────────────────────── */
const AdminDashboard = () => {
  const { data: blogs = [], isLoading: blogsLoading } = useGetBlogsQuery();
  const { data: services = [], isLoading: servicesLoading } = useGetServicesQuery();
  const { data: brands = [], isLoading: brandsLoading } = useGetBrandsQuery();
  const { data: projects = [], isLoading: projectsLoading } = useGetProjectsQuery();
  const { data: bookings = [], isLoading: bookingsLoading } = useGetBookingsQuery();

  const totalLoading = blogsLoading || servicesLoading || brandsLoading || projectsLoading || bookingsLoading;

  const stats: StatCardProps[] = [
    {
      label: "Blog Posts",
      count: blogs.length,
      loading: blogsLoading,
      icon: FileText,
      accent: "text-blue-600",
      accentBg: "bg-blue-50",
      accentBorder: "border-blue-100",
      path: "/admin/blogs",
      addPath: "/admin/blogs/new",
    },
    {
      label: "Services",
      count: services.length,
      loading: servicesLoading,
      icon: Briefcase,
      accent: "text-orange-500",
      accentBg: "bg-orange-50",
      accentBorder: "border-orange-100",
      path: "/admin/services",
      addPath: "/admin/services/new",
    },
    {
      label: "Projects",
      count: projects.length,
      loading: projectsLoading,
      icon: FolderKanban,
      accent: "text-violet-600",
      accentBg: "bg-violet-50",
      accentBorder: "border-violet-100",
      path: "/admin/projects",
      addPath: "/admin/projects/new",
    },
    {
      label: "Brands",
      count: brands.length,
      loading: brandsLoading,
      icon: Tag,
      accent: "text-emerald-600",
      accentBg: "bg-emerald-50",
      accentBorder: "border-emerald-100",
      path: "/admin/brands",
      addPath: "/admin/brands/new",
    },
    {
      label: "Bookings",
      count: bookings.length,
      loading: bookingsLoading,
      icon: CalendarClock,
      accent: "text-cyan-600",
      accentBg: "bg-cyan-50",
      accentBorder: "border-cyan-100",
      path: "/admin/bookings",
    },
  ];

  const totalContent = blogs.length + services.length + projects.length + brands.length + bookings.length;

  return (
    <div className="space-y-8 animate-fade-in">

      {/* ── header ── */}
      <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-4">
        <div>
          <p className="text-xs font-semibold uppercase tracking-widest text-neutral-400 mb-1">Admin Panel</p>
          <h1 className="heading-1 text-neutral-900">Dashboard</h1>
          <p className="text-neutral-500 mt-1 text-sm">
            Manage all your website content from one place.
          </p>
        </div>

        {/* live summary pill */}
        <div className="flex items-center gap-2 bg-neutral-900 text-white text-xs font-semibold px-4 py-2 rounded-full self-start sm:self-auto">
          <Activity size={12} className="animate-pulse text-green-400" />
          {totalLoading ? "Loading…" : `${totalContent} total items`}
        </div>
      </div>

      {/* ── stat cards ── */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-5">
        {stats.map((s, i) => (
          <StatCard key={i} {...s} />
        ))}
      </div>

      {/* ── overview strip ── */}
      <div className="rounded-md border border-neutral-200 bg-gradient-to-r from-neutral-950 to-neutral-800 text-white p-6 flex flex-col sm:flex-row items-start sm:items-center gap-6">
        <TrendingUp size={32} className="shrink-0 text-neutral-400" />
        <div className="flex-1">
          <p className="font-bold text-lg font-syne">Content Overview</p>
          <p className="text-neutral-400 text-sm mt-0.5">
            You have{" "}
            <span className="text-white font-semibold">{blogs.length} blog posts</span>,{" "}
            <span className="text-white font-semibold">{services.length} services</span>,{" "}
            <span className="text-white font-semibold">{projects.length} projects</span>, and{" "}
            <span className="text-white font-semibold">{brands.length} brands</span> published, with{" "}
            <span className="text-white font-semibold">{bookings.length} bookings</span> received.
          </p>
        </div>
        <a
          href="/"
          target="_blank"
          rel="noreferrer"
          className="flex items-center gap-2 shrink-0 bg-white text-neutral-900 text-xs font-bold px-4 py-2.5 rounded-md hover:bg-neutral-100 transition-colors"
        >
          <Globe size={14} /> View Live Site
        </a>
      </div>

      {/* ── quick actions ── */}
      <div>
        <h2 className="text-base font-bold font-syne text-neutral-800 mb-4">Quick Actions</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-3">
          <QuickAction to="/admin/blogs/new" icon={FileText} label="New Blog Post" sub="Write & publish" />
          <QuickAction to="/admin/services/new" icon={Briefcase} label="New Service" sub="Add offering" />
          <QuickAction to="/admin/projects/new" icon={FolderKanban} label="New Project" sub="Showcase work" />
          <QuickAction to="/admin/brands/new" icon={Tag} label="New Brand" sub="Upload logo" />
          <QuickAction to="/admin/bookings" icon={CalendarClock} label="View Bookings" sub="Leads & requests" />
        </div>
      </div>

    </div>
  );
};

export default AdminDashboard;
