import React, { useState } from 'react';
import { useGetBlogsQuery, useDeleteBlogMutation } from '@/store/api';
import { toast } from 'sonner';
import AdminBlogModal from './AdminBlogModal';
import Loader from '@/components/ui/Loader';
import { Pencil, Trash2, Plus, FileText, LayoutGrid, List } from 'lucide-react';

const AdminBlogs = () => {
  const { data: blogs = [], isLoading } = useGetBlogsQuery();
  const [deleteBlog] = useDeleteBlogMutation();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedBlog, setSelectedBlog] = useState<any>(null);
  const [deletingId, setDeletingId] = useState<string | null>(null);
  const [confirmDeleteId, setConfirmDeleteId] = useState<string | null>(null);
  const [view, setView] = useState<'table' | 'grid'>('table');

  const handleAdd = () => { setSelectedBlog(null); setIsModalOpen(true); };
  const handleEdit = (blog: any) => { setSelectedBlog(blog); setIsModalOpen(true); };

  const handleDeleteConfirm = async (id: string) => {
    try {
      setDeletingId(id);
      await deleteBlog(id).unwrap();
      toast.success('Blog deleted successfully');
    } catch {
      toast.error('Failed to delete blog');
    } finally {
      setDeletingId(null);
      setConfirmDeleteId(null);
    }
  };

  const categories = [...new Set(blogs.map((b: any) => b.category))];

  return (
    <div className="min-h-screen bg-neutral-50 p-6 md:p-10">

      {/* ── Header ── */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-8">
        <div>
          <p className="text-xs font-semibold tracking-[0.2em] uppercase text-neutral-400 mb-1">Content Management</p>
          <h1 className="heading-1 text-neutral-900">Blog Posts</h1>
          <p className="text-neutral-500 mt-1 text-sm">
            {blogs.length} {blogs.length === 1 ? 'post' : 'posts'} across {categories.length} {categories.length === 1 ? 'category' : 'categories'}
          </p>
        </div>
        <button
          onClick={handleAdd}
          className="group inline-flex items-center gap-2 bg-neutral-900 hover:bg-neutral-700 text-white text-sm font-semibold px-5 py-3 rounded-md transition-all duration-200 shadow-sm hover:shadow-md active:scale-95 whitespace-nowrap"
        >
          <span className="text-lg leading-none transition-transform duration-200 group-hover:rotate-90">+</span>
          New Post
        </button>
      </div>

      {/* ── Stats ── */}
      <div className="grid grid-cols-3 gap-4 mb-8">
        {[
          { label: 'Total Posts', value: blogs.length },
          { label: 'Categories', value: categories.length },
          { label: 'With Images', value: blogs.filter((b: any) => b.image).length },
        ].map(stat => (
          <div key={stat.label} className="bg-white rounded-md border border-neutral-200 p-4">
            <p className="text-2xl font-bold text-neutral-900">{stat.value}</p>
            <p className="text-xs text-neutral-500 mt-0.5 font-medium">{stat.label}</p>
          </div>
        ))}
      </div>

      {/* ── Content ── */}
      <div className="bg-white rounded-md border border-neutral-200 overflow-hidden">

        {/* Table toolbar */}
        <div className="px-6 py-4 border-b border-neutral-100 flex items-center justify-between">
          <div className="flex items-center gap-2 text-sm font-semibold text-neutral-700">
            <FileText size={16} />
            All Posts
          </div>
          <div className="flex items-center gap-1 bg-neutral-100 rounded-md p-1">
            <button
              onClick={() => setView('table')}
              className={`p-1.5 rounded-md transition-colors cursor-pointer ${view === 'table' ? 'bg-white shadow-sm text-neutral-900' : 'text-neutral-400 hover:text-neutral-600'}`}
            >
              <List size={14} />
            </button>
            <button
              onClick={() => setView('grid')}
              className={`p-1.5 rounded-md transition-colors cursor-pointer ${view === 'grid' ? 'bg-white shadow-sm text-neutral-900' : 'text-neutral-400 hover:text-neutral-600'}`}
            >
              <LayoutGrid size={14} />
            </button>
          </div>
        </div>

        {isLoading ? (
          <div className="p-20 flex flex-col items-center gap-4">
            <Loader />
            <p className="text-sm text-neutral-400 animate-pulse">Loading posts...</p>
          </div>
        ) : blogs.length === 0 ? (
          <div className="py-24 flex flex-col items-center justify-center text-center gap-3">
            <div className="w-16 h-16 rounded-md bg-neutral-100 border-2 border-dashed border-neutral-300 flex items-center justify-center">
              <FileText size={24} className="text-neutral-400" />
            </div>
            <p className="text-neutral-700 font-semibold">No blog posts yet</p>
            <p className="text-neutral-400 text-sm max-w-xs">Start publishing content to engage your audience.</p>
            <button
              onClick={handleAdd}
              className="mt-2 inline-flex items-center gap-2 px-5 py-2.5 bg-neutral-900 text-white text-sm font-semibold rounded-md hover:bg-neutral-700 transition-all active:scale-95 cursor-pointer"
            >
              <Plus size={15} /> Write First Post
            </button>
          </div>
        ) : view === 'table' ? (

          /* ── Table View ── */
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-neutral-50 border-b border-neutral-200 text-xs uppercase tracking-wide text-neutral-400">
                <th className="px-6 py-3 w-16">Cover</th>
                <th className="px-6 py-3">Title</th>
                <th className="px-6 py-3">Category</th>
                <th className="px-6 py-3">Preview</th>
                <th className="px-6 py-3 text-right">Actions</th>
              </tr>
            </thead>
            <tbody>
              {blogs.map((blog: any) => {
                const preview = Array.isArray(blog.content) ? blog.content[0] : blog.content;
                const isConfirming = confirmDeleteId === blog._id;
                const isDeleting = deletingId === blog._id;

                return (
                  <tr key={blog._id} className="border-b border-neutral-100 hover:bg-neutral-50 transition-colors">
                    <td className="px-6 py-4">
                      {blog.image ? (
                        <img src={blog.image} alt={blog.title} className="w-12 h-12 rounded-md object-cover border border-neutral-200" />
                      ) : (
                        <div className="w-12 h-12 bg-neutral-100 rounded-md flex items-center justify-center">
                          <FileText size={16} className="text-neutral-300" />
                        </div>
                      )}
                    </td>
                    <td className="px-6 py-4">
                      <p className="font-semibold text-neutral-900 text-sm leading-snug max-w-[180px] line-clamp-2">{blog.title}</p>
                    </td>
                    <td className="px-6 py-4">
                      <span className="inline-block px-2.5 py-1 bg-neutral-100 text-neutral-600 text-xs rounded-md font-medium">
                        {blog.category}
                      </span>
                    </td>
                    <td className="px-6 py-4">
                      <p className="text-xs text-neutral-400 max-w-[240px] line-clamp-2 leading-relaxed">{preview || '—'}</p>
                    </td>
                    <td className="px-6 py-4 text-right">
                      {isConfirming ? (
                        <div className="inline-flex items-center gap-2 bg-red-50 border border-red-200 rounded-md px-3 py-2">
                          <span className="text-xs text-red-600 font-medium">Delete?</span>
                          <button
                            onClick={() => handleDeleteConfirm(blog._id)}
                            disabled={isDeleting}
                            className="text-xs font-semibold text-white bg-red-500 hover:bg-red-600 px-2 py-1 rounded-md transition-colors disabled:opacity-50"
                          >
                            {isDeleting ? '...' : 'Yes'}
                          </button>
                          <button
                            onClick={() => setConfirmDeleteId(null)}
                            className="text-xs font-medium text-neutral-500 hover:text-neutral-800 px-2 py-1 hover:bg-neutral-100 rounded-md transition-colors"
                          >
                            No
                          </button>
                        </div>
                      ) : (
                        <div className="flex items-center justify-end gap-2">
                          <button
                            onClick={() => handleEdit(blog)}
                            className="flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold text-neutral-700 border border-neutral-200 rounded-md hover:bg-neutral-100 transition-colors"
                          >
                            <Pencil size={11} /> Edit
                          </button>
                          <button
                            onClick={() => setConfirmDeleteId(blog._id)}
                            className="flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold text-red-500 border border-red-200 rounded-md hover:bg-red-50 transition-colors"
                          >
                            <Trash2 size={11} /> Delete
                          </button>
                        </div>
                      )}
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        ) : (

          /* ── Grid View ── */
          <div className="p-6 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {blogs.map((blog: any) => {
              const preview = Array.isArray(blog.content) ? blog.content[0] : blog.content;
              const isConfirming = confirmDeleteId === blog._id;
              const isDeleting = deletingId === blog._id;

              return (
                <div key={blog._id} className="group relative bg-white rounded-md border border-neutral-200 hover:border-neutral-300 hover:shadow-md transition-all duration-200 overflow-hidden flex flex-col">
                  {/* Cover */}
                  <div className="h-36 bg-neutral-100 overflow-hidden flex-shrink-0 relative">
                    {blog.image ? (
                      <img src={blog.image} alt={blog.title} className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105" />
                    ) : (
                      <div className="w-full h-full flex items-center justify-center">
                        <FileText size={28} className="text-neutral-300" />
                      </div>
                    )}
                    <span className="absolute top-2 left-2 px-2 py-0.5 bg-neutral-900/70 backdrop-blur-sm text-white text-xs font-medium rounded-md">
                      {blog.category}
                    </span>
                  </div>

                  {/* Body */}
                  <div className="p-4 flex flex-col gap-1.5 flex-1">
                    <h3 className="font-semibold text-neutral-900 text-sm line-clamp-2 leading-snug">{blog.title}</h3>
                    <p className="text-xs text-neutral-400 line-clamp-2 leading-relaxed flex-1">{preview || '—'}</p>
                    <p className="text-xs text-neutral-300 mt-1">{blog.content?.length || 0} paragraph{(blog.content?.length || 0) !== 1 ? 's' : ''}</p>
                  </div>

                  {/* Hover actions */}
                  {!isConfirming && (
                    <div className="absolute inset-x-0 bottom-0 flex translate-y-full group-hover:translate-y-0 transition-transform duration-200">
                      <button onClick={() => handleEdit(blog)} className="flex-1 py-2.5 bg-neutral-900 hover:bg-neutral-700 text-white text-xs font-semibold transition-colors flex items-center justify-center gap-1 cursor-pointer">
                        <Pencil size={11} /> Edit
                      </button>
                      <div className="w-px bg-neutral-700" />
                      <button onClick={() => setConfirmDeleteId(blog._id)} className="flex-1 py-2.5 bg-neutral-900 hover:bg-red-600 text-white text-xs font-semibold transition-colors flex items-center justify-center gap-1 cursor-pointer">
                        <Trash2 size={11} /> Delete
                      </button>
                    </div>
                  )}

                  {/* Inline delete confirmation */}
                  {isConfirming && (
                    <div className="absolute inset-0 bg-white/95 backdrop-blur-sm flex flex-col items-center justify-center gap-3 p-4">
                      <div className="w-9 h-9 rounded-full bg-red-100 flex items-center justify-center">
                        <Trash2 size={16} className="text-red-500" />
                      </div>
                      <div className="text-center">
                        <p className="text-sm font-semibold text-neutral-800">Delete post?</p>
                        <p className="text-xs text-neutral-500 mt-0.5">This cannot be undone.</p>
                      </div>
                      <div className="flex gap-2 w-full">
                        <button onClick={() => setConfirmDeleteId(null)} className="flex-1 py-2 rounded-md border border-neutral-200 text-xs font-medium text-neutral-600 hover:bg-neutral-100 transition-colors cursor-pointer">Cancel</button>
                        <button onClick={() => handleDeleteConfirm(blog._id)} disabled={isDeleting} className="flex-1 py-2 rounded-md bg-red-500 hover:bg-red-600 text-white text-xs font-semibold transition-colors disabled:opacity-60 cursor-pointer">
                          {isDeleting ? '...' : 'Delete'}
                        </button>
                      </div>
                    </div>
                  )}

                  {isDeleting && (
                    <div className="absolute inset-0 bg-white/80 flex items-center justify-center">
                      <div className="w-5 h-5 border-2 border-neutral-300 border-t-neutral-700 rounded-full animate-spin" />
                    </div>
                  )}
                </div>
              );
            })}

            {/* Add ghost card */}
            <button
              onClick={handleAdd}
              className="group flex flex-col items-center justify-center gap-2 rounded-md border-2 border-dashed border-neutral-300 hover:border-neutral-500 bg-neutral-50 hover:bg-white min-h-[220px] transition-all duration-200 cursor-pointer"
            >
              <div className="w-10 h-10 rounded-full bg-neutral-100 group-hover:bg-neutral-200 flex items-center justify-center transition-colors">
                <Plus size={20} className="text-neutral-400 group-hover:text-neutral-600" />
              </div>
              <span className="text-xs font-medium text-neutral-400 group-hover:text-neutral-600 transition-colors">New Post</span>
            </button>
          </div>
        )}
      </div>

      <AdminBlogModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} blog={selectedBlog} />
    </div>
  );
};

export default AdminBlogs;