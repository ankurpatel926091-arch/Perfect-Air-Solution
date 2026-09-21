import React, { useState } from 'react';
import { useGetProjectsQuery, useDeleteProjectMutation } from '@/store/api';
import { toast } from 'sonner';
import AdminProjectModal from './AdminProjectModal';
import Loader from '@/components/ui/Loader';

const AdminProjects = () => {
  const { data: projects = [], isLoading } = useGetProjectsQuery();
  const [deleteProject] = useDeleteProjectMutation();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedProject, setSelectedProject] = useState<any>(null);
  const [deletingId, setDeletingId] = useState<string | null>(null);
  const [confirmDeleteId, setConfirmDeleteId] = useState<string | null>(null);

  const handleAdd = () => {
    setSelectedProject(null);
    setIsModalOpen(true);
  };

  const handleEdit = (project: any) => {
    setSelectedProject(project);
    setIsModalOpen(true);
  };

  const handleDeleteConfirm = async (id: string) => {
    try {
      setDeletingId(id);
      await deleteProject(id).unwrap();
      toast.success('Project deleted successfully');
    } catch {
      toast.error('Failed to delete project');
    } finally {
      setDeletingId(null);
      setConfirmDeleteId(null);
    }
  };

  return (
    <div className="min-h-screen bg-neutral-50 p-6 md:p-10">

      {/* ── Header ── */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-10">
        <div>
          <p className="text-xs font-semibold tracking-[0.2em] uppercase text-neutral-400 mb-1">
            Portfolio Management
          </p>
          <h1 className="heading-1 text-neutral-900">Projects</h1>
          <p className="text-neutral-500 mt-1 text-sm">
            {projects.length} {projects.length === 1 ? 'project' : 'projects'} in portfolio
          </p>
        </div>
        <button
          onClick={handleAdd}
          className="group inline-flex items-center gap-2 bg-neutral-900 hover:bg-neutral-700 text-white text-sm font-semibold px-5 py-3 rounded-md transition-all duration-200 shadow-sm hover:shadow-md active:scale-95 whitespace-nowrap"
        >
          <span className="text-lg leading-none transition-transform duration-200 group-hover:rotate-90">+</span>
          Add New Project
        </button>
      </div>

      {/* ── Content ── */}
      {isLoading ? (
        <div className="flex flex-col items-center justify-center py-32 gap-4">
          <Loader />
          <p className="text-sm text-neutral-400 animate-pulse">Loading projects...</p>
        </div>
      ) : projects.length === 0 ? (
        /* ── Empty State ── */
        <div className="flex flex-col items-center justify-center py-32 text-center">
          <div className="w-20 h-20 rounded-md bg-neutral-100 border-2 border-dashed border-neutral-300 flex items-center justify-center mb-5">
            <svg className="w-8 h-8 text-neutral-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
            </svg>
          </div>
          <h3 className="text-lg font-semibold text-neutral-700 mb-1">No projects yet</h3>
          <p className="text-sm text-neutral-400 mb-6 max-w-xs">
            Showcase your completed work by adding portfolio projects.
          </p>
          <button
            onClick={handleAdd}
            className="inline-flex items-center gap-2 bg-neutral-900 text-white text-sm font-semibold px-5 py-2.5 rounded-md hover:bg-neutral-700 transition-all active:scale-95 cursor-pointer"
          >
            <span>+</span> Add First Project
          </button>
        </div>
      ) : (
        /* ── Project Cards Grid ── */
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5">
          {projects.map((project: any) => (
            <ProjectCard
              key={project._id}
              project={project}
              isDeleting={deletingId === project._id}
              confirmingDelete={confirmDeleteId === project._id}
              onEdit={() => handleEdit(project)}
              onDeleteRequest={() => setConfirmDeleteId(project._id)}
              onDeleteConfirm={() => handleDeleteConfirm(project._id)}
              onDeleteCancel={() => setConfirmDeleteId(null)}
            />
          ))}

          {/* Add New Ghost Card */}
          <button
            onClick={handleAdd}
            className="group flex flex-col items-center justify-center gap-2 rounded-md border-2 border-dashed border-neutral-300 hover:border-neutral-500 bg-white hover:bg-neutral-50 min-h-[200px] transition-all duration-200 cursor-pointer"
          >
            <div className="w-10 h-10 rounded-full bg-neutral-100 group-hover:bg-neutral-200 flex items-center justify-center transition-colors">
              <span className="text-2xl text-neutral-400 group-hover:text-neutral-600 leading-none">+</span>
            </div>
            <span className="text-xs font-medium text-neutral-400 group-hover:text-neutral-600 transition-colors">Add Project</span>
          </button>
        </div>
      )}

      <AdminProjectModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        project={selectedProject}
      />
    </div>
  );
};

/* ── Project Card ── */
interface ProjectCardProps {
  project: any;
  isDeleting: boolean;
  confirmingDelete: boolean;
  onEdit: () => void;
  onDeleteRequest: () => void;
  onDeleteConfirm: () => void;
  onDeleteCancel: () => void;
}

const ProjectCard: React.FC<ProjectCardProps> = ({
  project, isDeleting, confirmingDelete,
  onEdit, onDeleteRequest, onDeleteConfirm, onDeleteCancel,
}) => {
  return (
    <div className="group relative bg-white rounded-md border border-neutral-200 hover:border-neutral-300 hover:shadow-md transition-all duration-200 overflow-hidden flex flex-col">

      {/* Image */}
      <div className="relative h-40 bg-neutral-100 overflow-hidden flex-shrink-0">
        {project.featuredImage ? (
          <img
            src={project.featuredImage}
            alt={project.title}
            className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
          />
        ) : (
          <div className="w-full h-full flex items-center justify-center">
            <svg className="w-10 h-10 text-neutral-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
            </svg>
          </div>
        )}
        {/* Gallery count badge */}
        {project.images?.length > 0 && (
          <div className="absolute bottom-2 right-2 flex items-center gap-1 bg-black/60 text-white text-xs font-medium px-2 py-1 rounded-md backdrop-blur-sm">
            <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
            </svg>
            {project.images.length}
          </div>
        )}
      </div>

      {/* Info */}
      <div className="p-4 flex flex-col gap-1.5 flex-1">
        <h3 className="font-semibold text-neutral-900 text-sm leading-snug line-clamp-2">{project.title}</h3>
        <div className="flex items-center gap-3 mt-auto pt-1 flex-wrap">
          {project.location && (
            <span className="inline-flex items-center gap-1 text-xs text-neutral-500">
              <svg className="w-3 h-3 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
              </svg>
              {project.location}
            </span>
          )}
          {project.completionDate && (
            <span className="inline-flex items-center gap-1 text-xs text-neutral-500">
              <svg className="w-3 h-3 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
              </svg>
              {project.completionDate}
            </span>
          )}
        </div>
      </div>

      {/* Hover Action Bar */}
      {!confirmingDelete && (
        <div className="absolute inset-x-0 bottom-0 flex translate-y-full group-hover:translate-y-0 transition-transform duration-200">
          <button
            onClick={onEdit}
            className="flex-1 py-2.5 bg-neutral-900 hover:bg-neutral-700 text-white text-xs font-semibold transition-colors flex items-center justify-center gap-1 cursor-pointer"
          >
            <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z" />
            </svg>
            Edit
          </button>
          <div className="w-px bg-neutral-700" />
          <button
            onClick={onDeleteRequest}
            className="flex-1 py-2.5 bg-neutral-900 hover:bg-red-600 text-white text-xs font-semibold transition-colors flex items-center justify-center gap-1 cursor-pointer"
          >
            <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
            </svg>
            Delete
          </button>
        </div>
      )}

      {/* Inline Delete Confirmation */}
      {confirmingDelete && (
        <div className="absolute inset-0 bg-white/95 backdrop-blur-sm flex flex-col items-center justify-center gap-3 p-4">
          <div className="w-9 h-9 rounded-full bg-red-100 flex items-center justify-center">
            <svg className="w-4 h-4 text-red-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01M10.29 3.86L1.82 18a2 2 0 001.71 3h16.94a2 2 0 001.71-3L13.71 3.86a2 2 0 00-3.42 0z" />
            </svg>
          </div>
          <div className="text-center">
            <p className="text-sm font-semibold text-neutral-800">Delete project?</p>
            <p className="text-xs text-neutral-500 mt-0.5">This cannot be undone.</p>
          </div>
          <div className="flex gap-2 w-full">
            <button onClick={onDeleteCancel} className="flex-1 py-2 rounded-md border border-neutral-200 text-xs font-medium text-neutral-600 hover:bg-neutral-100 transition-colors cursor-pointer">
              Cancel
            </button>
            <button onClick={onDeleteConfirm} disabled={isDeleting} className="flex-1 py-2 rounded-md bg-red-500 hover:bg-red-600 text-white text-xs font-semibold transition-colors disabled:opacity-60 cursor-pointer">
              {isDeleting ? '...' : 'Delete'}
            </button>
          </div>
        </div>
      )}

      {/* Spinner overlay */}
      {isDeleting && (
        <div className="absolute inset-0 bg-white/80 flex items-center justify-center">
          <div className="w-5 h-5 border-2 border-neutral-300 border-t-neutral-700 rounded-full animate-spin" />
        </div>
      )}
    </div>
  );
};

export default AdminProjects;