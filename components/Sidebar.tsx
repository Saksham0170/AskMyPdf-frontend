'use client';
import {
    Sidebar,
    SidebarContent,
    SidebarFooter,
    SidebarGroup,
    SidebarHeader,
    SidebarMenuButton,
    SidebarMenu,
    SidebarMenuItem,
} from "@/components/ui/sidebar"
import { Button } from "@/components/ui/button"
import {
    MessageSquarePlus,
    Loader2,
} from "lucide-react"
import { useEffect, useRef, useCallback } from "react"

interface Chat {
    id: string;
    _id?: string;
    userId: string;
    createdAt: string;
    identifier?: string | null;
    pdfs?: Array<{ name: string; url: string }>;
}

interface AppSidebarProps {
    chats: Chat[];
    selectedChatId: string | null;
    onChatSelect: (chatId: string | null) => void;
    onRefreshChats: () => void;
    loadMoreChats: () => void;
    hasMoreChats: boolean;
    isLoadingChats: boolean;
}

export function AppSidebar({ chats, selectedChatId, onChatSelect, onRefreshChats, loadMoreChats, hasMoreChats, isLoadingChats }: AppSidebarProps) {
    const scrollRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        onRefreshChats();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    const handleScroll = useCallback(() => {
        const element = scrollRef.current;
        if (!element || !hasMoreChats || isLoadingChats) return;

        const { scrollTop, scrollHeight, clientHeight } = element;
        // Load more when user scrolls to bottom (with 100px threshold)
        if (scrollTop + clientHeight >= scrollHeight - 100) {
            loadMoreChats();
        }
    }, [loadMoreChats, hasMoreChats, isLoadingChats]);
    return (
        <Sidebar className="border-r">
            <SidebarHeader className="border-b p-4">
                {/* Action Buttons */}
                <div className="space-y-2">
                    <Button
                        variant="ghost"
                        className="w-full justify-start"
                        size="sm"
                        onClick={() => onChatSelect(null)}
                    >
                        <MessageSquarePlus className="mr-2 h-4 w-4" />
                        New Chat
                    </Button>
                </div>
            </SidebarHeader>

            <SidebarContent className="flex flex-col flex-1">
                <SidebarGroup className="flex flex-col flex-1">
                    <div className="px-4 py-2 shrink-0">
                        <h3 className="text-sm font-medium text-muted-foreground mb-2">Chats</h3>
                    </div>

                    {/* Scrollable Chat History */}
                    <div className="flex-1 overflow-y-auto px-2" ref={scrollRef} onScroll={handleScroll}>
                        <SidebarMenu>
                            {chats.length === 0 ? (
                                <div className="px-4 py-8 text-center text-sm text-muted-foreground">
                                    No chats yet. Upload a PDF to start!
                                </div>
                            ) : (
                                <>
                                    {chats.map((chat) => {
                                        const chatId = chat.id || chat._id || '';
                                        const isSelected = selectedChatId === chatId;
                                        const displayName = chat.identifier || `Chat - ${new Date(chat.createdAt).toLocaleDateString()}`;
                                        return (
                                            <SidebarMenuItem key={chatId}>
                                                <SidebarMenuButton
                                                    className={`w-full justify-start px-3 py-2 h-auto ${isSelected ? 'bg-accent' : ''
                                                        }`}
                                                    onClick={() => onChatSelect(chatId)}
                                                >
                                                    <div className="flex-1 min-w-0">
                                                        <div className="text-sm truncate">
                                                            {displayName}
                                                        </div>
                                                    </div>
                                                </SidebarMenuButton>
                                            </SidebarMenuItem>
                                        );
                                    })}
                                    {hasMoreChats && (
                                        <div className="px-4 py-2 flex justify-center">
                                            <Button
                                                variant="outline"
                                                size="sm"
                                                onClick={loadMoreChats}
                                                disabled={isLoadingChats}
                                                className="w-full"
                                            >
                                                {isLoadingChats ? (
                                                    <>
                                                        <Loader2 className="h-4 w-4 animate-spin mr-2" />
                                                        Loading...
                                                    </>
                                                ) : (
                                                    'Load More Chats'
                                                )}
                                            </Button>
                                        </div>
                                    )}
                                </>
                            )}
                        </SidebarMenu>
                    </div>
                </SidebarGroup>
            </SidebarContent>

            <SidebarFooter className="border-t p-4">
                <div className="text-xs text-muted-foreground text-center">
                    {chats.length} conversation{chats.length !== 1 ? 's' : ''}
                </div>
            </SidebarFooter>
        </Sidebar>
    )
}