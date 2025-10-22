import { ScrollArea } from "@/components/ui/scroll-area";
import { Avatar } from "@/components/ui/avatar";

interface Message {
  id: string;
  username: string;
  content: string;
  timestamp: string;
  isSystem?: boolean;
  reactions?: string[];
}

const mockMessages: Message[] = [
  {
    id: "1",
    username: "RedDevil99",
    content: "Love this product! 🔥",
    timestamp: "2m ago",
    reactions: ["❤️", "🔥"],
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
  },
  {
    id: "4",
    username: "TopRed",
    content: "Amazing quality, highly recommend",
    timestamp: "7m ago",
    reactions: ["❤️"],
  },
  {
    id: "5",
    username: "System",
    content: "🎉 2 people just bought this product!",
    timestamp: "8m ago",
    isSystem: true,
  },
];

export const ChatFeed = () => {
  return (
    <div className="flex-1 bg-[#0D0D0D] border-y border-[#171717]">
      <div className="p-4 border-b border-[#171717]">
        <h3 className="text-[#EAEAEA] font-semibold">Community Chat</h3>
        <p className="text-[#A0A0A0] text-xs">Join the conversation</p>
      </div>

      <ScrollArea className="h-[300px] p-4">
        <div className="space-y-4">
          {mockMessages.map((message) => (
            <div
              key={message.id}
              className={`${
                message.isSystem
                  ? "bg-[#C8102E]/10 border border-[#C8102E]/20 rounded-lg p-3"
                  : ""
              }`}
            >
              <div className="flex items-start gap-3">
                {!message.isSystem && (
                  <Avatar className="h-8 w-8 bg-[#171717] flex items-center justify-center">
                    <span className="text-xs text-[#A0A0A0]">
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
                          : "text-[#EAEAEA]"
                      }`}
                    >
                      {message.username}
                    </span>
                    <span className="text-xs text-[#A0A0A0]">
                      {message.timestamp}
                    </span>
                  </div>
                  <p className="text-sm text-[#EAEAEA] mt-1">
                    {message.content}
                  </p>
                  {message.reactions && message.reactions.length > 0 && (
                    <div className="flex gap-1 mt-2">
                      {message.reactions.map((reaction, idx) => (
                        <span
                          key={idx}
                          className="text-xs bg-[#171717] px-2 py-0.5 rounded-full"
                        >
                          {reaction}
                        </span>
                      ))}
                    </div>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
      </ScrollArea>
    </div>
  );
};
