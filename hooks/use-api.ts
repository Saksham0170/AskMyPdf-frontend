/**
 * Custom hook for making authenticated API calls to Express backend
 * Usage:
 * 
 * const { fetchApi, isLoading } = useApi()
 * 
 * const handleUpload = async () => {
 *   const result = await fetchApi('/api/upload', {
 *     method: 'POST',
 *     body: JSON.stringify({ data })
 *   })
 * }
 */

import { useAuth } from '@clerk/nextjs'
import { useState, useCallback } from 'react'
import { api } from '@/lib/api'

export function useApi() {
    const { getToken } = useAuth()
    const [isLoading, setIsLoading] = useState(false)
    const [error, setError] = useState<Error | null>(null)

    const fetchApi = useCallback(
        async (endpoint: string, options?: RequestInit) => {
            setIsLoading(true)
            setError(null)

            try {
                // Get Clerk session token
                const token = await getToken()

                // Make authenticated request to Express backend
                const result = await api.fetch(endpoint, token, options)
                return result
            } catch (err) {
                const error = err instanceof Error ? err : new Error('Unknown error')
                setError(error)
                throw error
            } finally {
                setIsLoading(false)
            }
        },
        [getToken]
    )

    const uploadFiles = useCallback(
        async (files: File[]) => {
            setIsLoading(true)
            setError(null)

            try {
                // Get Clerk session token
                const token = await getToken()

                // Create FormData and add files with 'pdfs' key
                const formData = new FormData()
                files.forEach((file) => {
                    formData.append('pdfs', file)
                })

                // Make authenticated upload request
                const result = await api.uploadFiles('/api/upload', token, formData)
                return result
            } catch (err) {
                const error = err instanceof Error ? err : new Error('Upload failed')
                setError(error)
                throw error
            } finally {
                setIsLoading(false)
            }
        },
        [getToken]
    )

    return { fetchApi, uploadFiles, isLoading, error }
}
