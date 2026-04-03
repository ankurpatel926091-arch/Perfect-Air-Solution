import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

const BASE_URL = import.meta.env.VITE_API_BASE_URL;

// ─── REST API ─────────────────────────────────────────────────────────────────
export const api = createApi({
    reducerPath: 'api',
    baseQuery: fetchBaseQuery({
        baseUrl: `${BASE_URL}/api`,
        prepareHeaders: (headers) => {
            const token = localStorage.getItem('adminToken');
            if (token) headers.set('Authorization', `Bearer ${token}`);
            return headers;
        },
    }),
    tagTypes: ['Blog', 'Service', 'Brand', 'Project'],
    endpoints: (builder) => ({

        // ================= AUTH =================
        loginAdmin: builder.mutation<{ token: string; user: string }, { email: string; password: string }>({
            query: (credentials) => ({
                url: '/auth/login',
                method: 'POST',
                body: credentials,
            }),
        }),

        loginUser: builder.mutation<{ token: string; user: string }, { email: string; password: string }>({
            query: (credentials) => ({
                url: '/auth/login-user',
                method: 'POST',
                body: credentials,
            }),
        }),

        registerUser: builder.mutation<{ token: string; user: string }, { name: string; email: string; password: string }>({
            query: (userData) => ({
                url: '/auth/register',
                method: 'POST',
                body: userData,
            }),
        }),

        // ================= BLOGS =================
        getBlogs: builder.query<Record<string, unknown>[], void>({
            query: () => '/blogs',
            providesTags: ['Blog'],
        }),

        deleteBlog: builder.mutation<{ message: string }, string>({
            query: (id) => ({
                url: `/blogs/${id}`,
                method: 'DELETE',
            }),
            invalidatesTags: ['Blog'],
        }),

        // ================= SERVICES =================
        getServices: builder.query<Record<string, unknown>[], void>({
            query: () => '/services',
            providesTags: ['Service'],
        }),

        deleteService: builder.mutation<{ message: string }, string>({
            query: (id) => ({
                url: `/services/${id}`,
                method: 'DELETE',
            }),
            invalidatesTags: ['Service'],
        }),

        // ================= BRANDS =================
        getBrands: builder.query<Record<string, unknown>[], void>({
            query: () => '/brands',
            providesTags: ['Brand'],
        }),

        deleteBrand: builder.mutation<{ message: string }, string>({
            query: (id) => ({
                url: `/brands/${id}`,
                method: 'DELETE',
            }),
            invalidatesTags: ['Brand'],
        }),

        // ================= PROJECTS =================
        getProjects: builder.query<Record<string, unknown>[], void>({
            query: () => '/projects',
            providesTags: ['Project'],
        }),

        deleteProject: builder.mutation<{ message: string }, string>({
            query: (id) => ({
                url: `/projects/${id}`,
                method: 'DELETE',
            }),
            invalidatesTags: ['Project'],
        }),
    }),
});

// ─── Auth header helper ───────────────────────────────────────────────────────
const getAuthHeaders = () => {
    const token = localStorage.getItem('adminToken');
    return token ? { Authorization: `Bearer ${token}` } : {};
};

// ─── REST helpers: Blog ───────────────────────────────────────────────────────
// Required fields: title, category, content (JSON stringified array), image (File)

/** POST /api/blogs — create a blog post with image */
export const addBlogREST = async (formData: FormData) => {
    const res = await fetch(`${BASE_URL}/api/blogs`, {
        method: 'POST',
        headers: getAuthHeaders(),
        body: formData,
    });
    if (!res.ok) throw new Error(await res.text());
    return res.json();
};

/** PUT /api/blogs/:id — update a blog post; image optional */
export const updateBlogREST = async (id: string, formData: FormData) => {
    const res = await fetch(`${BASE_URL}/api/blogs/${id}`, {
        method: 'PUT',
        headers: getAuthHeaders(),
        body: formData,
    });
    if (!res.ok) throw new Error(await res.text());
    return res.json();
};

/**
 * Build FormData for a blog post.
 * content must be an array — it is JSON.stringify'd automatically.
 *
 * Usage:
 *   const fd = buildBlogFormData({ title, category, content }, imageFile);
 *   await addBlogREST(fd);
 */
export const buildBlogFormData = (
    data: { title: string; category: string; content: string[] },
    imageFile?: File | null
): FormData => {
    const fd = new FormData();
    fd.append('title', data.title);
    fd.append('category', data.category);
    fd.append('content', JSON.stringify(data.content));
    if (imageFile) fd.append('image', imageFile);
    return fd;
};

// ─── REST helpers: Brand ─────────────────────────────────────────────────────
/** POST /api/brands — upload heroImage */
export const addBrandREST = async (formData: FormData) => {
    const res = await fetch(`${BASE_URL}/api/brands`, {
        method: 'POST',
        headers: getAuthHeaders(),
        body: formData,
    });
    if (!res.ok) throw new Error(await res.text());
    return res.json();
};

/** PUT /api/brands/:id — update heroImage */
export const updateBrandREST = async (id: string, formData: FormData) => {
    const res = await fetch(`${BASE_URL}/api/brands/${id}`, {
        method: 'PUT',
        headers: getAuthHeaders(),
        body: formData,
    });
    if (!res.ok) throw new Error(await res.text());
    return res.json();
};

// ─── REST helpers: Service ────────────────────────────────────────────────────
/** POST /api/services — create with optional image; arrays JSON.stringify'd */
export const addServiceREST = async (formData: FormData) => {
    const res = await fetch(`${BASE_URL}/api/services`, {
        method: 'POST',
        headers: getAuthHeaders(),
        body: formData,
    });
    if (!res.ok) throw new Error(await res.text());
    return res.json();
};

/** PUT /api/services/:id — update with optional new image */
export const updateServiceREST = async (id: string, formData: FormData) => {
    const res = await fetch(`${BASE_URL}/api/services/${id}`, {
        method: 'PUT',
        headers: getAuthHeaders(),
        body: formData,
    });
    if (!res.ok) throw new Error(await res.text());
    return res.json();
};

/**
 * Build FormData for a service.
 * Arrays (highlights, process, faqs) are JSON.stringify'd automatically.
 */
export const buildServiceFormData = (
    data: Record<string, unknown>,
    imageFile?: File | null
): FormData => {
    const fd = new FormData();
    const arrayFields = ['highlights', 'process', 'faqs'];
    Object.entries(data).forEach(([key, value]) => {
        if (value === undefined || value === null) return;
        fd.append(key, arrayFields.includes(key) ? JSON.stringify(value) : String(value));
    });
    if (imageFile) fd.append('image', imageFile);
    return fd;
};

// ─── REST helpers: Project ────────────────────────────────────────────────────
/** POST /api/projects — create with featuredImage + images[] */
export const addProjectREST = async (formData: FormData) => {
    const res = await fetch(`${BASE_URL}/api/projects`, {
        method: 'POST',
        headers: getAuthHeaders(),
        body: formData,
    });
    if (!res.ok) throw new Error(await res.text());
    return res.json();
};

/** PUT /api/projects/:id — update with optional new images */
export const updateProjectREST = async (id: string, formData: FormData) => {
    const res = await fetch(`${BASE_URL}/api/projects/${id}`, {
        method: 'PUT',
        headers: getAuthHeaders(),
        body: formData,
    });
    if (!res.ok) throw new Error(await res.text());
    return res.json();
};

/**
 * Build FormData for a project.
 * @param data          Plain fields: slug, title, description, location, completionDate
 * @param featuredImage Single featured image file (optional)
 * @param imageFiles    Array of gallery image files (optional, max 10)
 */
export const buildProjectFormData = (
    data: Record<string, unknown>,
    featuredImage?: File | null,
    imageFiles?: File[]
): FormData => {
    const fd = new FormData();
    Object.entries(data).forEach(([key, value]) => {
        if (value === undefined || value === null) return;
        fd.append(key, String(value));
    });
    if (featuredImage) fd.append('featuredImage', featuredImage);
    if (imageFiles?.length) imageFiles.forEach(file => fd.append('images', file));
    return fd;
};

// ─── Exports ──────────────────────────────────────────────────────────────────
export const {
    useLoginAdminMutation,
    useLoginUserMutation,
    useRegisterUserMutation,

    useGetBlogsQuery,
    useDeleteBlogMutation,

    useGetServicesQuery,
    useDeleteServiceMutation,

    useGetBrandsQuery,
    useDeleteBrandMutation,

    useGetProjectsQuery,
    useDeleteProjectMutation,
} = api;