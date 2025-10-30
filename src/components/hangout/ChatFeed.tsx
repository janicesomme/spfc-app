import { useState } from "react";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Avatar } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { MessageSquare, Send } from "lucide-react";

interface Message {
  id: string;
  username: string;
  content: string;
  timestamp: string;
  isSystem?: boolean;
  reactions?: string[];
  replyCount?: number;
}

interface Reply {
  id: string;
  username: string;
  content: string;
  timestamp: string;
}

const mockMessages: Message[] = [
  {
    id: "1",
    username: "RedDevil99",
    content: "Love this product! 🔥",
    timestamp: "2m ago",
    reactions: ["❤️", "🔥"],
    replyCount: 3,
  },
  {
    id: "2",
    username: "System",
    content: "🎉 4 people just bought this product!",
    timestamp: "3m ago",
    isSystem: true,
  },
  {
    id: "3",
    username: "FanGirl23",
    content: "When will you restock the jerseys?",
    timestamp: "5m ago",
    reactions: ["😂"],
    replyCount: 1,
  },
  {
    id: "4",
    username: "TopRed",
    content: "Amazing quality, highly recommend",
    timestamp: "7m ago",
    reactions: ["❤️"],
    replyCount: 2,
  },
  {
    id: "5",
    username: "System",
    content: "🎉 2 people just bought this product!",
    timestamp: "8m ago",
    isSystem: true,
  },
];

const mockReplies: Record<string, Reply[]> = {
  "1": [
    { id: "r1", username: "ManUtdFan", content: "Totally agree! Just ordered mine", timestamp: "1m ago" },
    { id: "r2", username: "RedArmy", content: "Same here, can't wait!", timestamp: "1m ago" },
    { id: "r3", username: "TopRed", content: "Quality looks amazing", timestamp: "30s ago" },
  ],
  "3": [
    { id: "r4", username: "RedDevil99", content: "Next week I think!", timestamp: "4m ago" },
  ],
  "4": [
    { id: "r5", username: "FanGirl23", content: "Thanks for the review!", timestamp: "6m ago" },
    { id: "r6", username: "NewFan", content: "How's the sizing?", timestamp: "5m ago" },
  ],
};

export const ChatFeed = () => {
  const [selectedMessage, setSelectedMessage] = useState<Message | null>(null);
  const [replyText, setReplyText] = useState("");

  const handleMessageClick = (message: Message) => {
    if (!message.isSystem) {
      setSelectedMessage(message);
    }
  };

  const handleSendReply = () => {
    if (replyText.trim()) {
      // In production, this would send the reply
      console.log("Sending reply:", replyText);
      setReplyText("");
    }
  };

  return (
    <div className="flex-1 bg-white border-y border-gray-200">
      <div className="grid grid-cols-1 md:grid-cols-2 h-full">
        {/* Main Chat Feed */}
        <div className="border-r border-gray-200">
          <div className="p-4 border-b border-gray-200">
            <h3 className="text-black font-semibold">Community Chat</h3>
            <p className="text-gray-600 text-xs">Click a message to view thread</p>
          </div>

          <ScrollArea className="h-[300px] p-4">
            <div className="space-y-4">
              {mockMessages.map((message) => (
                <div
                  key={message.id}
                  onClick={() => handleMessageClick(message)}
                  className={`${
                    message.isSystem
                      ? "bg-[#C8102E]/10 border border-[#C8102E]/20 rounded-lg p-3"
                      : "cursor-pointer hover:bg-gray-50 rounded-lg p-2 transition-colors"
                  } ${selectedMessage?.id === message.id ? "bg-gray-100" : ""}`}
                >
                  <div className="flex items-start gap-3">
                    {!message.isSystem && (
                      <Avatar className="h-8 w-8 bg-gray-100 flex items-center justify-center flex-shrink-0">
                        <span className="text-xs text-gray-700">
                          {message.username.slice(0, 2).toUpperCase()}
                        </span>
                      </Avatar>
                    )}

                    <div className="flex-1 min-w-0">
                      <div className="flex items-baseline gap-2">
                        <span
                          className={`text-sm font-medium ${
                            message.isSystem
                              ? "text-[#C8102E]"
                              : "text-black"
                          }`}
                        >
                          {message.username}
                        </span>
                        <span className="text-xs text-gray-500">
                          {message.timestamp}
                        </span>
                      </div>
                      <p className="text-sm text-black mt-1">
                        {message.content}
                      </p>
                      <div className="flex items-center gap-2 mt-2">
                        {message.reactions && message.reactions.length > 0 && (
                          <div className="flex gap-1">
                            {message.reactions.map((reaction, idx) => (
                              <span
                                key={idx}
                                className="text-xs bg-gray-100 px-2 py-0.5 rounded-full"
                              >
                                {reaction}
                              </span>
                            ))}
                          </div>
                        )}
                        {!message.isSystem && message.replyCount && message.replyCount > 0 && (
                          <div className="flex items-center gap-1 text-xs text-gray-500">
                            <MessageSquare className="h-3 w-3" />
                            <span>{message.replyCount} {message.replyCount === 1 ? 'reply' : 'replies'}</span>
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </ScrollArea>
        </div>

        {/* Thread View */}
        <div className="flex flex-col">
          <div className="p-4 border-b border-gray-200">
            <h3 className="text-black font-semibold">Thread</h3>
            <p className="text-gray-600 text-xs">
              {selectedMessage ? "Reply to discussion" : "Select a message to view thread"}
            </p>
          </div>

          {selectedMessage ? (
            <>
              <ScrollArea className="flex-1 h-[240px] p-4">
                <div className="space-y-4">
                  {/* Original Message */}
                  <div className="bg-gray-50 rounded-lg p-3 border-l-4 border-[#C8102E]">
                    <div className="flex items-start gap-3">
                      <Avatar className="h-8 w-8 bg-gray-100 flex items-center justify-center flex-shrink-0">
                        <span className="text-xs text-gray-700">
                          {selectedMessage.username.slice(0, 2).toUpperCase()}
                        </span>
                      </Avatar>
                      <div className="flex-1 min-w-0">
                        <div className="flex items-baseline gap-2">
                          <span className="text-sm font-medium text-black">
                            {selectedMessage.username}
                          </span>
                          <span className="text-xs text-gray-500">
                            {selectedMessage.timestamp}
                          </span>
                        </div>
                        <p className="text-sm text-black mt-1">
                          {selectedMessage.content}
                        </p>
                      </div>
                    </div>
                  </div>

                  {/* Replies */}
                  {mockReplies[selectedMessage.id]?.map((reply) => (
                    <div key={reply.id} className="pl-4">
                      <div className="flex items-start gap-3">
                        <Avatar className="h-7 w-7 bg-gray-100 flex items-center justify-center flex-shrink-0">
                          <span className="text-xs text-gray-700">
                            {reply.username.slice(0, 2).toUpperCase()}
                          </span>
                        </Avatar>
                        <div className="flex-1 min-w-0">
                          <div className="flex items-baseline gap-2">
                            <span className="text-sm font-medium text-black">
                              {reply.username}
                            </span>
                            <span className="text-xs text-gray-500">
                              {reply.timestamp}
                            </span>
                          </div>
                          <p className="text-sm text-gray-700 mt-1">
                            {reply.content}
                          </p>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </ScrollArea>

              {/* Reply Input */}
              <div className="p-4 border-t border-gray-200">
                <div className="flex gap-2">
                  <Input
                    value={replyText}
                    onChange={(e) => setReplyText(e.target.value)}
                    placeholder="Write a reply..."
                    className="flex-1"
                    onKeyPress={(e) => e.key === 'Enter' && handleSendReply()}
                  />
                  <Button
                    onClick={handleSendReply}
                    size="icon"
                    className="bg-[#C8102E] hover:bg-[#A00D24]"
                  >
                    <Send className="h-4 w-4" />
                  </Button>
                </div>
              </div>
            </>
          ) : (
            <div className="flex-1 flex items-center justify-center p-8">
              <div className="text-center text-gray-400">
                <MessageSquare className="h-12 w-12 mx-auto mb-2 opacity-50" />
                <p className="text-sm">Select a message to view replies</p>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
