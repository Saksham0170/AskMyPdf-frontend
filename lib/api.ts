/**
 * API utilities for authenticated requests to Express backend
 */

export class ApiClient {
    private baseUrl: string

    constructor(baseUrl: string = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8000') {
        this.baseUrl = baseUrl
    }

    /**
     * Make authenticated API request
     * @param endpoint - API endpoint (e.g., '/api/documents')
     * @param token - Clerk session token
     * @param options - Fetch options
     */
    async fetch(endpoint: string, token: string | null, options: RequestInit = {}) {
        const headers: Record<string, string> = {
            'Content-Type': 'application/json',
            ...(options.headers as Record<string, string>),
        }

        // Add Clerk token to Authorization header
        if (token) {
            headers['Authorization'] = `Bearer ${token}`
        }

        const response = await fetch(`${this.baseUrl}${endpoint}`, {
            ...options,
            headers,
        })

        if (!response.ok) {
            const error = await response.json().catch(() => ({ message: 'Request failed' }))
            throw new Error(error.message || `HTTP ${response.status}`)
        }

        return response.json()
    }
}

export const api = new ApiClient()
