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
import { Input } from "@/components/ui/input"
import {
    MessageSquarePlus,
    Search,
    Upload,
} from "lucide-react"

// Mock chat history data
const chatHistory = [
    { id: 1, title: "PDF Analysis Report", timestamp: "2 hours ago" },
    { id: 2, title: "Contract Review Discussion", timestamp: "Yesterday" },
    { id: 3, title: "Research Paper Summary", timestamp: "2 days ago" },
    { id: 4, title: "Financial Document Q&A", timestamp: "3 days ago" },
    { id: 5, title: "Legal Document Analysis", timestamp: "1 week ago" },
    { id: 6, title: "Technical Specification Review", timestamp: "1 week ago" },
    { id: 7, title: "Meeting Minutes Discussion", timestamp: "2 weeks ago" },
    { id: 8, title: "Project Proposal Analysis", timestamp: "2 weeks ago" },
    { id: 9, title: "User Manual Q&A", timestamp: "3 weeks ago" },
    { id: 10, title: "Academic Paper Review", timestamp: "1 month ago" },
    { id: 11, title: "Technical Specification Review", timestamp: "1 week ago" },
    { id: 12, title: "Meeting Minutes Discussion", timestamp: "2 weeks ago" },
    { id: 13, title: "Project Proposal Analysis", timestamp: "2 weeks ago" },
    { id: 14, title: "User Manual Q&A", timestamp: "3 weeks ago" },
    { id: 15, title: "Academic Paper Review", timestamp: "1 month ago" },
]

export function AppSidebar() {
    return (
        <Sidebar className="border-r">
            <SidebarHeader className="border-b p-4">

                {/* Action Buttons */}
                <div className="space-y-2">
                    <Button variant="ghost" className="w-full justify-start" size="sm">
                        <MessageSquarePlus className="mr-2 h-4 w-4" />
                        New Chat
                    </Button>

                    <Button variant="ghost" className="w-full justify-start" size="sm">
                        <Search className="mr-2 h-4 w-4" />
                        Search Chats
                    </Button>

                    <Button variant="ghost" className="w-full justify-start" size="sm">
                        <Upload className="mr-2 h-4 w-4" />
                        Upload PDF
                    </Button>
                </div>
            </SidebarHeader>

            <SidebarContent className="flex flex-col flex-1">
                <SidebarGroup className="flex flex-col flex-1">
                    <div className="px-4 py-2 shrink-0">
                        <h3 className="text-sm font-medium text-muted-foreground mb-2">Chats</h3>
                    </div>

                    {/* Scrollable Chat History */}
                    <div className="flex-1 overflow-y-auto px-2">
                        <SidebarMenu>
                            {chatHistory.map((chat) => (
                                <SidebarMenuItem key={chat.id}>
                                    <SidebarMenuButton className="w-full justify-start p-3 h-auto">
                                        <div className="flex items-start gap-3 w-full">
                                            <div className="flex-1 min-w-0">
                                                <div className="font-medium text-sm truncate">
                                                    {chat.title}
                                                </div>
                                            </div>
                                        </div>
                                    </SidebarMenuButton>
                                </SidebarMenuItem>
                            ))}
                        </SidebarMenu>
                    </div>
                </SidebarGroup>
            </SidebarContent>

            <SidebarFooter className="border-t p-4">
                <div className="text-xs text-muted-foreground text-center">
                    {chatHistory.length} conversations
                </div>
            </SidebarFooter>
        </Sidebar>
    )
}