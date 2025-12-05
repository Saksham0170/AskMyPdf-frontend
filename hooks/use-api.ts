/**
 * Custom hook for making authenticated API calls to Express backend
 * 
 * File uploads now use Supabase Storage with a 3-step process:
 * 1. Generate signed upload URLs from backend
 * 2. Upload files directly to Supabase Storage
 * 3. Confirm uploads to backend to save metadata
 * 
 * Usage:
 * 
 * const { fetchApi, uploadFiles, isLoading } = useApi()
 * 
 * const handleUpload = async () => {
 *   const result = await uploadFiles(chatId, files)
 * }
 */

import { useAuth } from '@clerk/nextjs'
import { useState, useCallback } from 'react'
import { api } from '@/lib/api'

interface UploadUrlData {
    fileName: string;
    path: string;
    token: string;
    signedUrl: string;
}

interface PdfRecord {
    id: string;
    chatId: string;
    fileName: string;
    realName: string;
    createdAt: Date;
    updatedAt: Date;
}

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
        async (chatId: string, files: File[]): Promise<PdfRecord[]> => {
            setIsLoading(true)
            setError(null)

            try {
                // Get Clerk session token
                const token = await getToken()

                // Step 1: Generate upload URLs
                const fileNames = files.map(file => file.name)
                const uploadData: UploadUrlData[] = await api.fetch(`/api/files/${chatId}/upload-urls`, token, {
                    method: 'POST',
                    body: JSON.stringify({ fileNames })
                })

                // Step 2: Upload files to Supabase using signed URLs
                const uploadPromises = files.map(async (file, index) => {
                    const { signedUrl, path, fileName } = uploadData[index]

                    const uploadResponse = await fetch(signedUrl, {
                        method: 'PUT',
                        body: file,
                        headers: {
                            'Content-Type': file.type || 'application/pdf',
                        },
                    })

                    if (!uploadResponse.ok) {
                        throw new Error(`Failed to upload ${fileName}`)
                    }

                    return { fileName, path }
                })

                const uploads = await Promise.all(uploadPromises)

                // Step 3: Confirm uploads to backend
                const result: PdfRecord[] = await api.fetch(`/api/files/${chatId}/confirm-uploads`, token, {
                    method: 'POST',
                    body: JSON.stringify({ uploads })
                })

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
