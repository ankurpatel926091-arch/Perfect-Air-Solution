import React, { useState, useEffect, useRef } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { useGetProjectsQuery, addProjectREST, updateProjectREST, buildProjectFormData } from '@/store/api';
import { toast } from 'sonner';

interface AdminProjectModalProps {
  isOpen: boolean;
  onClose: () => void;
  project?: any;
}

const emptyForm = {
  slug: '', title: '', description: '', location: '', completionDate: '',
};

const inputClass = "w-full border border-neutral-200 rounded-md px-3 py-2.5 text-sm text-neutral-900 placeholder-neutral-400 focus:outline-none focus:ring-2 focus:ring-neutral-900 focus:border-transparent transition-all";
const labelClass = "block text-xs font-semibold text-neutral-500 uppercase tracking-wide mb-1.5";

const AdminProjectModal: React.FC<AdminProjectModalProps> = ({ isOpen, onClose, project }) => {
  const { refetch } = useGetProjectsQuery();
  const [isLoading, setIsLoading] = useState(false);
  const [activeTab, setActiveTab] = useState<'info' | 'images'>('info');

  const [formData, setFormData] = useState(emptyForm);

  // Featured image
  const [featuredFile, setFeaturedFile] = useState<File | null>(null);
  const [featuredPreview, setFeaturedPreview] = useState<string>('');
  const [isDraggingFeatured, setIsDraggingFeatured] = useState(false);
  const featuredInputRef = useRef<HTMLInputElement>(null);

  // Gallery images
  const [galleryFiles, setGalleryFiles] = useState<File[]>([]);
  const [existingGalleryUrls, setExistingGalleryUrls] = useState<string[]>([]);
  const [isDraggingGallery, setIsDraggingGallery] = useState(false);
  const galleryInputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (isOpen) {
      setActiveTab('info');
      setFeaturedFile(null);
      setGalleryFiles([]);
      setIsDraggingFeatured(false);
      setIsDraggingGallery(false);
      if (project) {
        setFormData({
          slug: project.slug || '',
          title: project.title || '',
          description: project.description || '',
          location: project.location || '',
          completionDate: project.completionDate || '',
        });
        setFeaturedPreview(project.featuredImage || '');
        setExistingGalleryUrls(project.images || []);
      } else {
        setFormData(emptyForm);
        setFeaturedPreview('');
        setExistingGalleryUrls([]);
      }
    }
  }, [project, isOpen]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData(prev => ({ ...prev, [e.target.name]: e.target.value }));
  };

  // ── Featured image handlers ──
  const applyFeatured = (file: File) => {
    setFeaturedFile(file);
    setFeaturedPreview(URL.createObjectURL(file));
  };
  const handleFeaturedDrop = (e: React.DragEvent) => {
    e.preventDefault(); setIsDraggingFeatured(false);
    const file = e.dataTransfer.files?.[0];
    if (file?.type.startsWith('image/')) applyFeatured(file);
    else toast.error('Please drop a valid image');
  };
  const removeFeatured = () => {
    setFeaturedFile(null);
    setFeaturedPreview('');
    if (featuredInputRef.current) featuredInputRef.current.value = '';
  };

  // ── Gallery handlers ──
  const applyGallery = (files: File[]) => {
    const remaining = 10 - existingGalleryUrls.length - galleryFiles.length;
    const toAdd = files.slice(0, remaining);
    if (toAdd.length < files.length) toast.warning(`Only ${remaining} more image(s) allowed (max 10 total)`);
    setGalleryFiles(prev => [...prev, ...toAdd]);
  };
  const handleGalleryDrop = (e: React.DragEvent) => {
    e.preventDefault(); setIsDraggingGallery(false);
    const files = Array.from(e.dataTransfer.files).filter(f => f.type.startsWith('image/'));
    if (files.length) applyGallery(files);
  };
  const handleGalleryInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) applyGallery(Array.from(e.target.files));
  };
  const removeNewGalleryFile = (index: number) => {
    setGalleryFiles(prev => prev.filter((_, i) => i !== index));
  };
  const removeExistingGalleryUrl = (index: number) => {
    setExistingGalleryUrls(prev => prev.filter((_, i) => i !== index));
  };

  const totalImages = existingGalleryUrls.length + galleryFiles.length;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      setIsLoading(true);
      const fd = buildProjectFormData(formData, featuredFile, galleryFiles);

      // When editing, pass existing gallery URLs so backend can preserve them
      // (backend overwrites images[] with new uploads; if no new files, pass nothing)
      if (project) {
        await updateProjectREST(project._id || project.id, fd);
        toast.success('Project updated successfully');
      } else {
        await addProjectREST(fd);
        toast.success('Project created successfully');
      }
      await refetch();
      onClose();
    } catch (err: any) {
      toast.error(err?.message || 'Error saving project');
    } finally {
      setIsLoading(false);
    }
  };

  const isEditing = !!project;
  const tabs = [
    { key: 'info', label: 'Project Info' },
    { key: 'images', label: `Images${totalImages > 0 ? ` (${totalImages})` : ''}` },
  ] as const;

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-2xl p-0 gap-0 bg-white rounded-md overflow-hidden border border-neutral-200 shadow-md">

        {/* ── Header ── */}
        <DialogHeader className="px-6 pt-6 pb-4 border-b border-neutral-100">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-md bg-neutral-900 flex items-center justify-center flex-shrink-0">
              <svg className="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
              </svg>
            </div>
            <div>
              <DialogTitle className="text-base font-semibold text-neutral-900 leading-tight">
                {isEditing ? 'Edit Project' : 'Add New Project'}
              </DialogTitle>
              <p className="text-xs text-neutral-400 mt-0.5">
                {isEditing ? `Editing: ${project.title}` : 'Fill in the details to create a new project'}
              </p>
            </div>
          </div>

          {/* Tabs */}
          <div className="flex gap-1 mt-4 bg-neutral-100 rounded-md p-1">
            {tabs.map(tab => (
              <button
                key={tab.key}
                type="button"
                onClick={() => setActiveTab(tab.key)}
                className={`flex-1 py-2 text-xs font-semibold rounded-md transition-all duration-200 cursor-pointer ${
                  activeTab === tab.key
                    ? 'bg-white text-neutral-900 shadow-sm'
                    : 'text-neutral-500 hover:text-neutral-700'
                }`}
              >
                {tab.label}
              </button>
            ))}
          </div>
        </DialogHeader>

        {/* ── Form ── */}
        <form onSubmit={handleSubmit}>
          <div className="px-6 py-5 overflow-y-auto max-h-[55vh]">

            {/* ── Tab: Project Info ── */}
            {activeTab === 'info' && (
              <div className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div className="col-span-2">
                    <label className={labelClass}>Project Title *</label>
                    <input name="title" required value={formData.title} onChange={handleChange} className={inputClass} placeholder="e.g. Corporate Office Renovation" />
                  </div>
                  <div className="col-span-2">
                    <label className={labelClass}>Slug *</label>
                    <input name="slug" required value={formData.slug} onChange={handleChange} className={inputClass} placeholder="e.g. corporate-office-renovation" />
                  </div>
                  <div>
                    <label className={labelClass}>Location</label>
                    <input name="location" value={formData.location} onChange={handleChange} className={inputClass} placeholder="e.g. Mumbai, India" />
                  </div>
                  <div>
                    <label className={labelClass}>Completion Date</label>
                    <input name="completionDate" value={formData.completionDate} onChange={handleChange} className={inputClass} placeholder="e.g. March 2024" />
                  </div>
                  <div className="col-span-2">
                    <label className={labelClass}>Description *</label>
                    <textarea
                      name="description"
                      required
                      value={formData.description}
                      onChange={handleChange}
                      className={inputClass}
                      rows={4}
                      placeholder="Describe the project scope, outcome, and highlights..."
                    />
                  </div>
                </div>
              </div>
            )}

            {/* ── Tab: Images ── */}
            {activeTab === 'images' && (
              <div className="space-y-6">

                {/* Featured Image */}
                <div>
                  <label className={labelClass}>Featured Image</label>
                  {featuredPreview ? (
                    <div className="rounded-md border border-neutral-200 bg-neutral-50 overflow-hidden">
                      <div className="flex items-center justify-center p-4 min-h-[140px]">
                        <img src={featuredPreview} alt="Featured" className="max-h-32 max-w-full object-contain drop-shadow-sm rounded-md" />
                      </div>
                      <div className="flex items-center justify-between px-4 py-2.5 border-t border-neutral-200 bg-white">
                        <div className="flex items-center gap-2 min-w-0">
                          <div className="w-4 h-4 rounded bg-green-100 flex items-center justify-center flex-shrink-0">
                            <svg className="w-2.5 h-2.5 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
                            </svg>
                          </div>
                          <span className="text-xs text-neutral-500 truncate">
                            {featuredFile ? `${featuredFile.name} (${(featuredFile.size / 1024).toFixed(0)} KB)` : 'Current featured image'}
                          </span>
                        </div>
                        <div className="flex gap-1 ml-2 flex-shrink-0">
                          <button type="button" onClick={() => featuredInputRef.current?.click()} className="text-xs text-neutral-600 hover:text-neutral-900 font-medium px-2 py-1 hover:bg-neutral-100 rounded-md transition-colors cursor-pointer">Replace</button>
                          <button type="button" onClick={removeFeatured} className="text-xs text-red-500 hover:text-red-700 font-medium px-2 py-1 hover:bg-red-50 rounded-md transition-colors cursor-pointer">Remove</button>
                        </div>
                      </div>
                    </div>
                  ) : (
                    <div
                      onDrop={handleFeaturedDrop}
                      onDragOver={(e) => { e.preventDefault(); setIsDraggingFeatured(true); }}
                      onDragLeave={() => setIsDraggingFeatured(false)}
                      onClick={() => featuredInputRef.current?.click()}
                      className={`flex flex-col items-center justify-center min-h-[120px] rounded-md border-2 border-dashed cursor-pointer transition-all duration-200 ${
                        isDraggingFeatured ? 'border-neutral-900 bg-neutral-50 scale-[1.01]' : 'border-neutral-300 hover:border-neutral-400 bg-neutral-50 hover:bg-white'
                      }`}
                    >
                      <div className={`w-10 h-10 rounded-md flex items-center justify-center mb-2 transition-colors ${isDraggingFeatured ? 'bg-neutral-900' : 'bg-neutral-200'}`}>
                        <svg className={`w-5 h-5 transition-colors ${isDraggingFeatured ? 'text-white' : 'text-neutral-500'}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12" />
                        </svg>
                      </div>
                      <p className="text-sm font-semibold text-neutral-600">{isDraggingFeatured ? 'Drop image' : 'Featured image'}</p>
                      <p className="text-xs text-neutral-400 mt-0.5">or <span className="underline underline-offset-2 text-neutral-600 font-medium">browse</span></p>
                    </div>
                  )}
                  <input ref={featuredInputRef} type="file" accept="image/*" onChange={(e) => { const f = e.target.files?.[0]; if (f) applyFeatured(f); }} className="hidden" />
                </div>

                {/* Gallery Images */}
                <div>
                  <div className="flex items-center justify-between mb-1.5">
                    <label className={labelClass + ' mb-0'}>Gallery Images <span className="normal-case font-normal text-neutral-400">(max 10)</span></label>
                    <span className={`text-xs font-medium ${totalImages >= 10 ? 'text-red-500' : 'text-neutral-400'}`}>
                      {totalImages}/10
                    </span>
                  </div>

                  {/* Drop zone (only when under limit) */}
                  {totalImages < 10 && (
                    <div
                      onDrop={handleGalleryDrop}
                      onDragOver={(e) => { e.preventDefault(); setIsDraggingGallery(true); }}
                      onDragLeave={() => setIsDraggingGallery(false)}
                      onClick={() => galleryInputRef.current?.click()}
                      className={`flex flex-col items-center justify-center min-h-[90px] rounded-md border-2 border-dashed cursor-pointer transition-all duration-200 mb-3 ${
                        isDraggingGallery ? 'border-neutral-900 bg-neutral-50 scale-[1.01]' : 'border-neutral-300 hover:border-neutral-400 bg-neutral-50 hover:bg-white'
                      }`}
                    >
                      <p className="text-sm font-semibold text-neutral-500">{isDraggingGallery ? 'Drop images' : 'Add gallery images'}</p>
                      <p className="text-xs text-neutral-400 mt-0.5">Drop multiple or <span className="underline underline-offset-2 text-neutral-600 font-medium">browse</span> · {10 - totalImages} remaining</p>
                    </div>
                  )}
                  <input ref={galleryInputRef} type="file" accept="image/*" multiple onChange={handleGalleryInput} className="hidden" />

                  {/* Existing URLs (from edit mode) */}
                  {existingGalleryUrls.length > 0 && (
                    <div className="mb-3">
                      <p className="text-xs font-semibold text-neutral-400 uppercase tracking-wide mb-2">Current Images</p>
                      <div className="grid grid-cols-5 gap-2">
                        {existingGalleryUrls.map((url, i) => (
                          <div key={i} className="relative group aspect-square rounded-md overflow-hidden border border-neutral-200 bg-neutral-100">
                            <img src={url} alt={`Gallery ${i + 1}`} className="w-full h-full object-cover" />
                            <button
                              type="button"
                              onClick={() => removeExistingGalleryUrl(i)}
                              className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 flex items-center justify-center transition-opacity cursor-pointer"
                            >
                              <svg className="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                              </svg>
                            </button>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}

                  {/* New files queued */}
                  {galleryFiles.length > 0 && (
                    <div>
                      <p className="text-xs font-semibold text-neutral-400 uppercase tracking-wide mb-2">New Images to Upload</p>
                      <div className="grid grid-cols-5 gap-2">
                        {galleryFiles.map((file, i) => (
                          <div key={i} className="relative group aspect-square rounded-md overflow-hidden border border-neutral-200 bg-neutral-100">
                            <img src={URL.createObjectURL(file)} alt={file.name} className="w-full h-full object-cover" />
                            <div className="absolute bottom-0 inset-x-0 bg-green-500/80 flex items-center justify-center py-0.5">
                              <span className="text-white text-[9px] font-semibold">NEW</span>
                            </div>
                            <button
                              type="button"
                              onClick={() => removeNewGalleryFile(i)}
                              className="absolute top-0 right-0 bg-black/50 opacity-0 group-hover:opacity-100 p-0.5 transition-opacity rounded-bl-md cursor-pointer"
                            >
                              <svg className="w-3 h-3 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                              </svg>
                            </button>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}

                  {totalImages === 0 && (
                    <p className="text-xs text-neutral-400 text-center mt-1">No gallery images added yet.</p>
                  )}
                </div>
              </div>
            )}
          </div>

          {/* ── Footer ── */}
          <div className="px-6 pb-6 pt-4 border-t border-neutral-100 flex items-center justify-between">
            {/* Dot indicators */}
            <div className="flex gap-1">
              {tabs.map(tab => (
                <button
                  key={tab.key}
                  type="button"
                  onClick={() => setActiveTab(tab.key)}
                  className={`h-2 rounded-full transition-all duration-200 ${activeTab === tab.key ? 'bg-neutral-900 w-5' : 'bg-neutral-300 hover:bg-neutral-400 w-2'}`}
                />
              ))}
            </div>

            <div className="flex items-center gap-2">
              {activeTab === 'images' && (
                <button
                  type="button"
                  onClick={() => setActiveTab('info')}
                  className="px-4 py-2.5 text-sm font-medium text-neutral-600 hover:text-neutral-900 hover:bg-neutral-100 rounded-md transition-colors cursor-pointer"
                >
                  ← Back
                </button>
              )}
              {activeTab === 'info' ? (
                <button
                  type="button"
                  onClick={() => setActiveTab('images')}
                  className="px-5 py-2.5 bg-neutral-900 hover:bg-neutral-700 text-white text-sm font-semibold rounded-md transition-all active:scale-95 cursor-pointer"
                >
                  Next →
                </button>
              ) : (
                <button
                  type="submit"
                  disabled={isLoading}
                  className="inline-flex items-center gap-2 px-5 py-2.5 bg-neutral-900 hover:bg-neutral-700 text-white text-sm font-semibold rounded-md transition-all duration-200 disabled:opacity-60 active:scale-95 cursor-pointer"
                >
                  {isLoading ? (
                    <>
                      <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                      Saving...
                    </>
                  ) : (
                    <>
                      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                      </svg>
                      {isEditing ? 'Update Project' : 'Save Project'}
                    </>
                  )}
                </button>
              )}
            </div>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default AdminProjectModal;