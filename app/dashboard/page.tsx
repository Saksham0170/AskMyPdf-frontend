'use client';
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import FileUpload from "@/components/FileUpload"
import { useState, useEffect, useRef } from "react"
import { useApi } from "@/hooks/use-api"
import { Loader2, FileText, ChevronLeft, ChevronRight, Plus, ChevronDown, ChevronUp, X, Trash2 } from "lucide-react"
import { useDashboard } from "@/components/DashboardLayoutClient"

interface Source {
  fileName: string;
  page: number;
  preview: string;
  score: number;
}

interface MessageData {
  id: string;
  role: string;
  content: string;
  chatId: string;
  createdAt: string;
}

interface QuestionResponse {
  question: MessageData;
  answer: MessageData;
  sources: Source[];
}

interface Message {
  question: string;
  answer: string;
  sources: Source[];
  timestamp: Date;
}

interface PdfRecord {
  id: string;
  chatId: string;
  fileName: string;
  realName: string;
  createdAt: Date;
  updatedAt: Date;
}

interface ChatMessage {
  id: string;
  chatId: string;
  role: 'USER' | 'AI';
  content: string;
  createdAt: Date;
}

interface ChatDetails {
  id: string;
  userId: string;
  identifier: string | null;
  createdAt: Date;
  updatedAt: Date;
  pdfs: PdfRecord[];
  messages: ChatMessage[];
}

export default function DashboardPage() {
  const { selectedChatId, setSelectedChatId, refreshChats, closeSidebar } = useDashboard();
  const [question, setQuestion] = useState("");
  const [messages, setMessages] = useState<Message[]>([]);
  const [isAsking, setIsAsking] = useState(false);
  const [chatDetails, setChatDetails] = useState<ChatDetails | null>(null);
  const [isLoadingChat, setIsLoadingChat] = useState(false);
  const [currentPdfIndex, setCurrentPdfIndex] = useState(0);
  const [pdfUrls, setPdfUrls] = useState<Map<string, string>>(new Map());
  const [isLoadingPdf, setIsLoadingPdf] = useState(false);
  const [showUploadDialog, setShowUploadDialog] = useState(false);
  const [expandedSources, setExpandedSources] = useState<Set<number>>(new Set());
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const { fetchApi } = useApi();

  const chatPdfs = chatDetails?.pdfs || [];
  const hasPdfs = chatPdfs.length > 0;
  const currentPdf = chatPdfs[currentPdfIndex];

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  // Auto-scroll when messages change
  useEffect(() => {
    scrollToBottom();
  }, [messages, isLoadingChat]);

  // Fetch chat details when selectedChatId changes
  useEffect(() => {
    const fetchChatDetails = async () => {
      if (!selectedChatId) {
        setChatDetails(null);
        setMessages([]);
        setCurrentPdfIndex(0);
        setPdfUrls(new Map());
        return;
      }

      // Close sidebar when chat is selected
      closeSidebar();

      setIsLoadingChat(true);
      try {
        const data: ChatDetails = await fetchApi(`/api/chat/${selectedChatId}`);
        setChatDetails(data);

        // Convert existing messages to display format
        const formattedMessages: Message[] = [];
        for (let i = 0; i < data.messages.length; i += 2) {
          const userMsg = data.messages[i];
          const aiMsg = data.messages[i + 1];

          if (userMsg && userMsg.role === 'USER' && aiMsg && aiMsg.role === 'AI') {
            formattedMessages.push({
              question: userMsg.content,
              answer: aiMsg.content,
              sources: [],
              timestamp: new Date(aiMsg.createdAt)
            });
          }
        }

        setMessages(formattedMessages);
        setCurrentPdfIndex(0);
      } catch (err) {
        console.error('Error fetching chat details:', err);
      } finally {
        setIsLoadingChat(false);
      }
    };

    fetchChatDetails();
  }, [selectedChatId, fetchApi]);

  // Fetch PDF URL when currentPdfIndex changes
  useEffect(() => {
    const fetchPdfUrl = async () => {
      if (!currentPdf || pdfUrls.has(currentPdf.id)) return;

      setIsLoadingPdf(true);
      try {
        const response = await fetchApi(`/api/files/access/${currentPdf.id}`);
        if (response.success && response.data.signedUrl) {
          setPdfUrls(prev => new Map(prev).set(currentPdf.id, response.data.signedUrl));
        }
      } catch (err) {
        console.error('Error fetching PDF URL:', err);
      } finally {
        setIsLoadingPdf(false);
      }
    };

    fetchPdfUrl();
  }, [currentPdf, pdfUrls, fetchApi]);

  const handleChatCreated = (chatId: string) => {
    setSelectedChatId(chatId);
    refreshChats();
    closeSidebar();
  };

  const handleUploadComplete = async () => {
    if (!selectedChatId) return;

    // Refresh chat details to get new PDFs
    try {
      const data: ChatDetails = await fetchApi(`/api/chat/${selectedChatId}`);
      setChatDetails(data);

      // Show the newly uploaded PDF (last one)
      if (data.pdfs.length > 0) {
        setCurrentPdfIndex(data.pdfs.length - 1);
      }

      // Close the upload dialog
      setShowUploadDialog(false);
    } catch (err) {
      console.error('Error refreshing chat:', err);
    }
  };

  const handleAskQuestion = async () => {
    if (!question.trim() || !selectedChatId) return;

    setIsAsking(true);
    try {
      const response: QuestionResponse = await fetchApi(`/api/chat/${selectedChatId}/question`, {
        method: 'POST',
        body: JSON.stringify({ question })
      });

      setMessages(prev => [...prev, {
        question: response.question.content,
        answer: response.answer.content,
        sources: response.sources || [],
        timestamp: new Date(response.answer.createdAt)
      }]);

      setQuestion("");
    } catch (err) {
      console.error('Error asking question:', err);
    } finally {
      setIsAsking(false);
    }
  };

  const handlePrevPdf = () => {
    setCurrentPdfIndex(prev => Math.max(0, prev - 1));
  };

  const handleNextPdf = () => {
    setCurrentPdfIndex(prev => Math.min(chatPdfs.length - 1, prev + 1));
  };

  const handleDeletePdf = async () => {
    if (!currentPdf) return;

    const confirmDelete = window.confirm(`Are you sure you want to delete "${currentPdf.realName}"?`);
    if (!confirmDelete) return;

    try {
      await fetchApi(`/api/files/delete/${currentPdf.id}`, {
        method: 'DELETE'
      });

      // Refresh chat details to get updated PDF list
      if (selectedChatId) {
        const data: ChatDetails = await fetchApi(`/api/chat/${selectedChatId}`);
        setChatDetails(data);

        // Adjust current index if needed
        if (currentPdfIndex >= data.pdfs.length && data.pdfs.length > 0) {
          setCurrentPdfIndex(data.pdfs.length - 1);
        } else if (data.pdfs.length === 0) {
          setCurrentPdfIndex(0);
        }
      }
    } catch (err) {
      console.error('Error deleting PDF:', err);
      alert('Failed to delete PDF. Please try again.');
    }
  };

  const toggleSources = (messageIndex: number) => {
    setExpandedSources(prev => {
      const newSet = new Set(prev);
      if (newSet.has(messageIndex)) {
        newSet.delete(messageIndex);
      } else {
        newSet.add(messageIndex);
      }
      return newSet;
    });
  };

  // No chat selected
  if (!selectedChatId) {
    return (
      <div className="flex items-center justify-center h-[calc(100vh-8rem)]">
        <div className="max-w-2xl w-full px-4">
          <FileUpload
            selectedChatId={null}
            onChatCreated={handleChatCreated}
            onUploadComplete={refreshChats}
            compact={false}
          />
        </div>
      </div>
    );
  }

  // Chat selected but no PDFs uploaded
  if (!hasPdfs && !isLoadingChat) {
    return (
      <div className="flex items-center justify-center h-[calc(100vh-8rem)]">
        <div className="max-w-md p-6 border rounded-lg bg-card">
          <div className="mb-4">
            <h2 className="text-xl font-semibold">Upload PDFs to Get Started</h2>
          </div>
          <div>
            <p className="text-sm text-muted-foreground mb-4">
              Upload at least one PDF to start asking questions.
            </p>
            <FileUpload
              selectedChatId={selectedChatId}
              onChatCreated={handleChatCreated}
              onUploadComplete={handleUploadComplete}
            />
          </div>
        </div>
      </div>
    );
  }

  // Full interface with PDFs
  return (
    <div className="flex gap-4 h-[calc(100vh-8rem)]">
      {/* Left Panel - PDF Viewer */}
      <div className="w-1/2 flex flex-col border rounded-lg bg-card overflow-hidden">
        <div className="flex-1 min-h-0 overflow-auto flex items-center justify-center bg-muted/20">
          {isLoadingPdf || isLoadingChat ? (
            <div className="flex items-center justify-center h-full">
              <Loader2 className="h-8 w-8 animate-spin text-muted-foreground" />
            </div>
          ) : currentPdf && pdfUrls.has(currentPdf.id) ? (
            <iframe
              src={pdfUrls.get(currentPdf.id)}
              className="w-full h-full border-0"
              title={currentPdf.realName}
            />
          ) : (
            <div className="flex items-center justify-center h-full text-muted-foreground">
              <p className="text-sm">No PDF to display</p>
            </div>
          )}
        </div>
        <div className="border-t p-3 flex-shrink-0 bg-card">
          <div className="flex items-center justify-between gap-2">
            <span className="text-sm font-medium truncate">{currentPdf?.realName || 'PDF Viewer'}</span>
            <div className="flex items-center gap-2">
              {hasPdfs && (
                <Button
                  variant="outline"
                  size="sm"
                  onClick={handleDeletePdf}
                  className="text-red-500 hover:text-red-600 hover:bg-red-50 dark:hover:bg-red-950"
                >
                  <Trash2 className="h-4 w-4" />
                </Button>
              )}
              {hasPdfs && chatPdfs.length > 1 && (
                <>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={handlePrevPdf}
                    disabled={currentPdfIndex === 0}
                  >
                    <ChevronLeft className="h-4 w-4" />
                  </Button>
                  <span className="text-sm text-muted-foreground">
                    PDF {currentPdfIndex + 1} / {chatPdfs.length}
                  </span>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={handleNextPdf}
                    disabled={currentPdfIndex === chatPdfs.length - 1}
                  >
                    <ChevronRight className="h-4 w-4" />
                  </Button>
                </>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Right Panel - Chat Interface */}
      <div className="w-1/2 flex flex-col border rounded-lg bg-card overflow-hidden">
        {/* Conversation */}
        <div className="flex-1 overflow-y-auto p-4">
          {isLoadingChat ? (
            <div className="flex items-center justify-center py-8">
              <Loader2 className="h-6 w-6 animate-spin text-muted-foreground" />
              <span className="ml-2 text-sm text-muted-foreground">Loading messages...</span>
            </div>
          ) : messages.length > 0 ? (
            <div className="space-y-4">
              {messages.map((msg, idx) => (
                <div key={idx} className="space-y-3">
                  {/* Question */}
                  <div className="bg-primary/5 rounded-2xl px-4 py-3 border border-primary/10">
                    <p className="text-sm font-medium text-foreground">Q: {msg.question}</p>
                  </div>

                  {/* Answer */}
                  <div className="bg-muted/50 rounded-2xl px-4 py-3 border border-border/50">
                    <p className="text-sm whitespace-pre-wrap leading-relaxed">{msg.answer}</p>
                  </div>

                  {/* Sources */}
                  {msg.sources && msg.sources.length > 0 && (
                    <div>
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => toggleSources(idx)}
                        className="text-xs text-muted-foreground hover:text-foreground"
                      >
                        {expandedSources.has(idx) ? (
                          <>
                            <ChevronUp className="h-3 w-3 mr-1" />
                            Hide {msg.sources.length} source{msg.sources.length !== 1 ? 's' : ''}
                          </>
                        ) : (
                          <>
                            <ChevronDown className="h-3 w-3 mr-1" />
                            Show {msg.sources.length} source{msg.sources.length !== 1 ? 's' : ''}
                          </>
                        )}
                      </Button>

                      {expandedSources.has(idx) && (
                        <div className="mt-2 space-y-1.5">
                          {msg.sources.map((source, sourceIdx) => (
                            <div
                              key={sourceIdx}
                              className="flex items-center gap-2 text-xs text-muted-foreground bg-muted/50 rounded px-2 py-1.5"
                            >
                              <FileText className="h-3 w-3 shrink-0" />
                              <span className="font-medium truncate">{source.fileName}</span>
                              <span>• Page {source.page}</span>
                              <span className="ml-auto shrink-0">
                                {(source.score * 100).toFixed(0)}%
                              </span>
                            </div>
                          ))}
                        </div>
                      )}
                    </div>
                  )}
                </div>
              ))}
              <div ref={messagesEndRef} />
            </div>
          ) : (
            <div className="flex items-center justify-center h-full">
              <p className="text-sm text-muted-foreground">
                {hasPdfs ? 'Ask a question to start the conversation' : 'Upload PDFs to get started'}
              </p>
            </div>
          )}
        </div>

        {/* Question Input - Fixed at bottom */}
        {hasPdfs && (
          <div className="border-t p-4 flex-shrink-0 bg-background/50 backdrop-blur-sm">
            <div className="flex gap-2 items-end">
              <Button
                variant="outline"
                size="icon"
                onClick={() => setShowUploadDialog(!showUploadDialog)}
                className={`shrink-0 rounded-xl ${showUploadDialog ? 'text-red-500 hover:text-red-600' : ''}`}
              >
                {showUploadDialog ? (
                  <X className="h-4 w-4" />
                ) : (
                  <Plus className="h-4 w-4" />
                )}
              </Button>
              <Input
                placeholder="Ask Anything"
                value={question}
                onChange={(e) => setQuestion(e.target.value)}
                onKeyDown={(e) => {
                  if (e.key === 'Enter' && !e.shiftKey) {
                    e.preventDefault();
                    handleAskQuestion();
                  }
                }}
                className="flex-1 rounded-xl border-border/50"
              />
              <Button
                type="button"
                onClick={handleAskQuestion}
                disabled={isAsking || !question.trim()}
                className="shrink-0 rounded-xl bg-purple-600 hover:bg-purple-700 text-white px-5"
              >
                {isAsking ? (
                  <Loader2 className="h-4 w-4 animate-spin" />
                ) : (
                  'Send'
                )}
              </Button>
            </div>

            {/* Upload Dialog */}
            <div className={`overflow-hidden transition-all duration-600 ease-in-out ${showUploadDialog ? 'max-h-96 opacity-100 mt-4' : 'max-h-0 opacity-0'}`}>
              <div className="p-4 border rounded-xl bg-background">
                <FileUpload
                  selectedChatId={selectedChatId}
                  onChatCreated={handleChatCreated}
                  onUploadComplete={handleUploadComplete}
                  compact={true}
                />
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
