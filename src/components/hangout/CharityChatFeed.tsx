import { ScrollArea } from "@/components/ui/scroll-area";
import { Avatar } from "@/components/ui/avatar";

interface Message {
  id: string;
  username: string;
  content: string;
  timestamp: string;
  isSystem?: boolean;
  isCharity?: boolean;
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
    content: "🎉 £45 added from a hoodie purchase!",
    timestamp: "3m ago",
    isSystem: true,
    isCharity: true,
  },
  {
    id: "3",
    username: "FanGirl23",
    content: "Amazing cause, happy to support!",
    timestamp: "5m ago",
    reactions: ["❤️"],
  },
  {
    id: "4",
    username: "TopRed",
    content: "Let's get to £3000!",
    timestamp: "7m ago",
    reactions: ["🔥", "💪"],
  },
  {
    id: "5",
    username: "System",
    content: "🎗 £30 added from a mug purchase!",
    timestamp: "8m ago",
    isSystem: true,
    isCharity: true,
  },
];

export const CharityChatFeed = () => {
  return (
    <div className="flex-1 bg-white border-y border-gray-200">
      <div className="p-4 border-b border-gray-200">
        <h3 className="text-black font-semibold">Community Chat</h3>
        <p className="text-gray-600 text-xs">Join the conversation — Shopping for a cause!</p>
      </div>

      <ScrollArea className="h-[300px] p-4">
        <div className="space-y-4">
          {mockMessages.map((message) => (
            <div
              key={message.id}
              className={`${
                message.isCharity
                  ? "bg-gradient-to-r from-[#D4AF37]/10 to-[#F5E6D3]/10 border border-[#D4AF37]/30 rounded-lg p-3"
                  : message.isSystem
                  ? "bg-[#C8102E]/10 border border-[#C8102E]/20 rounded-lg p-3"
                  : ""
              }`}
            >
              <div className="flex items-start gap-3">
                {!message.isSystem && (
                  <Avatar className="h-8 w-8 bg-gray-100 flex items-center justify-center">
                    <span className="text-xs text-gray-700">
                      {message.username.slice(0, 2).toUpperCase()}
                    </span>
                  </Avatar>
                )}

                <div className="flex-1 min-w-0">
                  <div className="flex items-baseline gap-2">
                    <span
                      className={`text-sm font-medium ${
                        message.isCharity
                          ? "text-[#D4AF37]"
                          : message.isSystem
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
                  {message.reactions && message.reactions.length > 0 && (
                    <div className="flex gap-1 mt-2">
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
                </div>
              </div>
            </div>
          ))}
        </div>
      </ScrollArea>
    </div>
  );
};
