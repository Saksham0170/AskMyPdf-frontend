'use client';
import type { ReactNode } from "react"
import { NavBar } from "@/components/Navbar"
import { SidebarProvider, SidebarTrigger, useSidebar } from "@/components/ui/sidebar"
import { AppSidebar } from "@/components/Sidebar"
import { useApi } from "@/hooks/use-api"
import { useState, createContext, useContext } from "react"

interface Chat {
    id: string;
    _id?: string;
    userId: string;
    createdAt: string;
    identifier?: string | null;
}

interface DashboardContextType {
    selectedChatId: string | null;
    setSelectedChatId: (chatId: string | null) => void;
    refreshChats: () => void;
    onChatSelect: (chatId: string | null) => void;
    closeSidebar: () => void;
}

const DashboardContext = createContext<DashboardContextType | undefined>(undefined);

export const useDashboard = () => {
    const context = useContext(DashboardContext);
    if (!context) {
        throw new Error('useDashboard must be used within DashboardLayoutClient');
    }
    return context;
};

function DashboardContent({ children, selectedChatId, setSelectedChatId, fetchUserChats, handleChatSelect, chats }: {
    children: ReactNode;
    selectedChatId: string | null;
    setSelectedChatId: (chatId: string | null) => void;
    fetchUserChats: () => void;
    handleChatSelect: (chatId: string | null) => void;
    chats: any[];
}) {
    const { setOpen, setOpenMobile } = useSidebar();

    const closeSidebar = () => {
        setOpen(false);
        setOpenMobile(false);
    };

    return (
        <DashboardContext.Provider value={{ selectedChatId, setSelectedChatId, refreshChats: fetchUserChats, onChatSelect: handleChatSelect, closeSidebar }}>
            <div className="min-h-screen flex w-full">
                <AppSidebar
                    chats={chats}
                    selectedChatId={selectedChatId}
                    onChatSelect={setSelectedChatId}
                    onRefreshChats={fetchUserChats}
                />
                <div className="flex-1 flex flex-col overflow-hidden">
                    {/* Header with Sidebar Trigger */}
                    <header className="sticky top-0 z-40 border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
                        <div className="flex h-14 items-center px-4">
                            <SidebarTrigger className="mr-3" />
                            <div className="flex-1">
                                <NavBar />
                            </div>
                        </div>
                    </header>

                    {/* Main Content */}
                    <main className="flex-1 overflow-y-auto">
                        <div className="h-full px-4 py-8 md:py-10">
                            {children}
                        </div>
                    </main>
                </div>
            </div>
        </DashboardContext.Provider>
    );
}

export function DashboardLayoutClient({ children }: { children: ReactNode }) {
    const [chats, setChats] = useState<Chat[]>([]);
    const [selectedChatId, setSelectedChatId] = useState<string | null>(null);
    const { fetchApi } = useApi();

    const fetchUserChats = async () => {
        try {
            const data = await fetchApi('/api/chat');
            setChats(data || []);
        } catch (err) {
            console.error('Error fetching chats:', err);
        }
    };

    const handleChatSelect = (chatId: string | null) => {
        setSelectedChatId(chatId);
    };

    return (
        <SidebarProvider>
            <DashboardContent
                selectedChatId={selectedChatId}
                setSelectedChatId={setSelectedChatId}
                fetchUserChats={fetchUserChats}
                handleChatSelect={handleChatSelect}
                chats={chats}
            >
                {children}
            </DashboardContent>
        </SidebarProvider>
    )
}
