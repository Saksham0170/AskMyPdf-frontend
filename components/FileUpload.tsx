'use client';
import { Dropzone, DropzoneContent, DropzoneEmptyState } from '@/components/ui/shadcn-io/dropzone';
import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { FileIcon, XIcon, FileTextIcon, UploadIcon } from 'lucide-react';
import { useApi } from '@/hooks/use-api';

interface FileUploadProps {
    selectedChatId: string | null;
    onChatCreated?: (chatId: string) => void;
    onUploadComplete?: () => void;
    compact?: boolean;
}

const FileUpload = ({ selectedChatId, onChatCreated, onUploadComplete, compact = false }: FileUploadProps) => {
    const [files, setFiles] = useState<File[]>([]);
    const { fetchApi, uploadFiles, isLoading, error } = useApi();

    const handleDrop = (newFiles: File[]) => {
        console.log('New files:', newFiles);
        // Add new files to existing files (avoid duplicates) with max 3 files limit
        setFiles(prevFiles => {
            const existingNames = prevFiles.map(f => f.name);
            const uniqueNewFiles = newFiles.filter(f => !existingNames.includes(f.name));
            const combined = [...prevFiles, ...uniqueNewFiles];
            // Limit to 3 files max
            return combined.slice(0, 3);
        });
    };

    const removeFile = (indexToRemove: number) => {
        setFiles(prevFiles => prevFiles.filter((_, index) => index !== indexToRemove));
    };

    const formatFileSize = (bytes: number) => {
        if (bytes === 0) return '0 Bytes';
        const k = 1024;
        const sizes = ['Bytes', 'KB', 'MB', 'GB'];
        const i = Math.floor(Math.log(bytes) / Math.log(k));
        return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
    };

    const getFileIcon = (fileName: string) => {
        const extension = fileName.split('.').pop()?.toLowerCase();
        if (extension === 'pdf') {
            return <FileTextIcon className="h-4 w-4 text-red-500" />;
        }
        return <FileIcon className="h-4 w-4 text-gray-500" />;
    };

    const handleUpload = async () => {
        if (files.length === 0) return;

        try {
            let chatId = selectedChatId;

            // If no chat is selected (New Chat), create a new chat first
            if (!chatId) {
                const chatResponse = await fetchApi('/api/chat', {
                    method: 'POST',
                    body: JSON.stringify({})
                });

                console.log('Chat created:', chatResponse);
                chatId = chatResponse.chatId;

                // Notify parent component about new chat
                if (chatId) {
                    onChatCreated?.(chatId);
                }
            }

            // Upload PDFs to the chat (new or existing)
            if (chatId) {
                const result = await uploadFiles(chatId, files);
                console.log('Upload successful:', result);

                // Clear files after successful upload
                setFiles([]);

                // Notify upload complete (for refreshing chats if uploading to existing)
                onUploadComplete?.();
            }

            // You can add toast notification here
        } catch (err) {
            console.error('Upload error:', err);
            // You can add toast notification here
        }
    };

    return (
        <div className="space-y-4">
            <Dropzone
                accept={{ 'application/pdf': ['.pdf'] }}
                maxFiles={3}
                maxSize={1024 * 1024 * 3} // 3MB
                onDrop={handleDrop}
                onError={(error) => {
                    console.error('Upload error:', error);
                    // You can add toast notification here
                }}
                src={files.length > 0 ? files : undefined}
                className={compact ? "min-h-[100px]" : "min-h-[200px]"}
            >
                <DropzoneEmptyState>
                    <div className={`flex flex-col items-center justify-center ${compact ? 'py-4' : 'py-8'}`}>
                        <FileTextIcon className={`${compact ? 'h-6 w-6' : 'h-10 w-10'} text-muted-foreground mb-2`} />
                        <p className={`${compact ? 'text-sm' : 'text-base'} font-medium mb-1`}>Upload PDF Files</p>
                        <p className="text-xs text-muted-foreground text-center">
                            Drag and drop PDFs here, or click to select
                        </p>
                        {!compact && (
                            <p className="text-xs text-muted-foreground mt-1">
                                Up to 3MB each, 3 files max
                            </p>
                        )}
                    </div>
                </DropzoneEmptyState>
                <DropzoneContent>
                    <div className="flex flex-col items-center justify-center py-4">
                        <FileTextIcon className="h-6 w-6 text-muted-foreground mb-2" />
                        <p className="text-sm font-medium mb-1">
                            {files.length} file{files.length !== 1 ? 's' : ''} ready
                        </p>
                        <p className="text-xs text-muted-foreground">
                            Click to add more files
                        </p>
                    </div>
                </DropzoneContent>
            </Dropzone>

            {/* File List */}
            {files.length > 0 && (
                <div className="space-y-2">
                    <h4 className="text-sm font-medium text-muted-foreground">
                        Uploaded Files ({files.length})
                    </h4>
                    <div className="space-y-2 max-h-60 overflow-y-auto">
                        {files.map((file, index) => (
                            <Card key={`${file.name}-${index}`} className="p-0">
                                <CardContent className="flex items-center justify-between p-3">
                                    <div className="flex items-center gap-3">
                                        {getFileIcon(file.name)}
                                        <div className="flex-1 min-w-0">
                                            <p className="text-sm font-medium truncate" title={file.name}>
                                                {file.name}
                                            </p>
                                            <p className="text-xs text-muted-foreground">
                                                {formatFileSize(file.size)}
                                            </p>
                                        </div>
                                    </div>
                                    <Button
                                        variant="ghost"
                                        size="sm"
                                        onClick={() => removeFile(index)}
                                        className="h-8 w-8 p-0 hover:bg-destructive/10 hover:text-destructive"
                                        title="Remove file"
                                    >
                                        <XIcon className="h-4 w-4" />
                                    </Button>
                                </CardContent>
                            </Card>
                        ))}
                    </div>
                </div>
            )}

            {/* Upload Button */}
            {files.length > 0 && (
                <div className="flex flex-col gap-2">
                    <Button
                        onClick={handleUpload}
                        disabled={isLoading}
                        className="w-full"
                    >
                        {isLoading ? (
                            <>
                                <span className="animate-spin mr-2">⏳</span>
                                Uploading...
                            </>
                        ) : (
                            <>
                                <UploadIcon className="h-4 w-4 mr-2" />
                                Upload {files.length} file{files.length !== 1 ? 's' : ''}
                            </>
                        )}
                    </Button>
                    {error && (
                        <p className="text-sm text-destructive text-center">
                            {error.message}
                        </p>
                    )}
                </div>
            )}
        </div>
    );
};

export default FileUpload;  