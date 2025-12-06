'use client';
import type { ReactNode } from "react"
import { Navbar } from "./Navbar";
import { SidebarProvider, useSidebar } from "@/components/ui/sidebar"
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
            <div className="h-screen flex w-full overflow-hidden">
                <AppSidebar
                    chats={chats}
                    selectedChatId={selectedChatId}
                    onChatSelect={setSelectedChatId}
                    onRefreshChats={fetchUserChats}
                />
                <div className="flex-1 flex flex-col overflow-hidden">
                    {/* Header with Sidebar Trigger */}
                    <Navbar showSidebarTrigger={true} />

                    {/* Main Content */}
                    <main className="flex-1 overflow-hidden">
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
