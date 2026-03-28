import { createApi } from '@reduxjs/toolkit/query/react';
import { graphqlRequestBaseQuery } from '@rtk-query/graphql-request-base-query';
import { gql } from 'graphql-request';

// const BASE_URL = import.meta.env.VITE_API_BASE_URL || 'https://api.limrasales.com';
const BASE_URL = import.meta.env.VITE_API_BASE_URL;

// ─── GraphQL API ─────────────────────────────────────────────────────────────
export const api = createApi({
    reducerPath: 'api',
    baseQuery: graphqlRequestBaseQuery({
        url: `${BASE_URL}/graphql`,
        prepareHeaders: (headers) => {
            const token = localStorage.getItem('adminToken');
            if (token) headers.set('Authorization', `Bearer ${token}`);
            return headers;
        },
    }),
    tagTypes: ['Blog', 'Service', 'Brand', 'Project'],
    endpoints: (builder) => ({

        // ================= AUTH =================
        loginAdmin: builder.mutation<any, any>({
            query: (variables) => ({
                document: gql`
                    mutation Login($email: String!, $password: String!) {
                        login(email: $email, password: $password) {
                            token
                            user
                        }
                    }
                `,
                variables,
            }),
        }),

        loginUser: builder.mutation<any, any>({
            query: (variables) => ({
                document: gql`
                    mutation LoginUser($email: String!, $password: String!) {
                        loginUser(email: $email, password: $password) {
                            token
                            user
                        }
                    }
                `,
                variables,
            }),
        }),

        registerUser: builder.mutation<any, any>({
            query: (variables) => ({
                document: gql`
                    mutation RegisterUser($name: String!, $email: String!, $password: String!) {
                        registerUser(name: $name, email: $email, password: $password) {
                            token
                            user
                        }
                    }
                `,
                variables,
            }),
        }),

        // ================= BLOGS (GraphQL: read + delete only) =================
        // Create & Update → REST: POST/PUT /api/blogs  (multipart/form-data)
        // Required fields: title, category, content (JSON array), image (File)
        getBlogs: builder.query<any[], void>({
            query: () => ({
                document: gql`
                    query GetBlogs {
                        getBlogs {
                            id
                            _id
                            title
                            content
                            category
                            image
                            createdAt
                            updatedAt
                        }
                    }
                `,
            }),
            transformResponse: (res: any) => res.getBlogs,
            providesTags: ['Blog'],
        }),

        deleteBlog: builder.mutation<any, string>({
            query: (id) => ({
                document: gql`
                    mutation DeleteBlog($id: ID!) {
                        deleteBlog(id: $id)
                    }
                `,
                variables: { id },
            }),
            invalidatesTags: ['Blog'],
        }),

        // ================= SERVICES (GraphQL: read + delete only) =================
        // Create & Update → REST: POST/PUT /api/services  (multipart/form-data)
        getServices: builder.query<any[], void>({
            query: () => ({
                document: gql`
                    query GetServices {
                        getServices {
                            id
                            _id
                            slug
                            icon
                            image
                            badge
                            title
                            tagline
                            desc
                            longDesc
                            highlights
                            duration
                            price
                            rating
                            reviews
                            process { step title desc }
                            faqs { q a }
                        }
                    }
                `,
            }),
            transformResponse: (res: any) => res.getServices,
            providesTags: ['Service'],
        }),

        deleteService: builder.mutation<any, string>({
            query: (id) => ({
                document: gql`
                    mutation DeleteService($id: ID!) {
                        deleteService(id: $id)
                    }
                `,
                variables: { id },
            }),
            invalidatesTags: ['Service'],
        }),

        // ================= BRANDS (GraphQL: read + delete only) =================
        // Create & Update → REST: POST/PUT /api/brands  (multipart/form-data)
        getBrands: builder.query<any[], void>({
            query: () => ({
                document: gql`
                    query GetBrands {
                        getBrands {
                            id
                            _id
                            heroImage
                            createdAt
                            updatedAt
                        }
                    }
                `,
            }),
            transformResponse: (res: any) => res.getBrands,
            providesTags: ['Brand'],
        }),

        deleteBrand: builder.mutation<any, string>({
            query: (id) => ({
                document: gql`
                    mutation DeleteBrand($id: ID!) {
                        deleteBrand(id: $id)
                    }
                `,
                variables: { id },
            }),
            invalidatesTags: ['Brand'],
        }),

        // ================= PROJECTS (GraphQL: read + delete only) =================
        // Create & Update → REST: POST/PUT /api/projects  (multipart/form-data)
        // Fields: featuredImage (single), images (up to 10)
        getProjects: builder.query<any[], void>({
            query: () => ({
                document: gql`
                    query GetProjects {
                        getProjects {
                            id
                            _id
                            slug
                            title
                            description
                            location
                            completionDate
                            images
                            featuredImage
                        }
                    }
                `,
            }),
            transformResponse: (res: any) => res.getProjects,
            providesTags: ['Project'],
        }),

        deleteProject: builder.mutation<any, string>({
            query: (id) => ({
                document: gql`
                    mutation DeleteProject($id: ID!) {
                        deleteProject(id: $id)
                    }
                `,
                variables: { id },
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
    data: Record<string, any>,
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
    data: Record<string, any>,
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