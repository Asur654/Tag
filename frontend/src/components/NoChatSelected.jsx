import { MessageSquare } from "lucide-react";

const NoChatSelected = () => {
  return (
    <div className="w-full flex flex-1 flex-col items-center justify-center p-16 bg-base-100/50">
      <div className="max-w-md text-center space-y-6">
        {/* Icon Display */}
        <div className="flex justify-center gap-4 mb-4">
          <div className="relative">
            <div
              className="w-16 h-16 rounded-2xl bg-primary/10 flex items-center
             justify-center animate-bounce"
            >
              <MessageSquare className="w-8 h-8 text-primary " />
            </div>
          </div>
        </div>

        {/* Welcome Text */}
        <h2 className="text-2xl font-bold">Welcome to Tag!</h2>
        <p className="text-base-content/60">
          Select a conversation from the sidebar to start chatting
        </p>

        <div className="flex justify-center">
          <div className="relative inline-block">
            <button
              type="button"
              aria-label="More information"
              className="group relative flex h-7 w-7 items-center justify-center rounded-full border border-primary/40 bg-primary/5 text-sm font-bold text-primary transition hover:bg-primary/10 focus:outline-none focus:ring-2 focus:ring-primary/30"
            >
              i
              <span className="pointer-events-none absolute left-1/2 top-full z-10 mt-3 w-72 -translate-x-1/2 rounded-lg border border-base-300 bg-base-200 px-3 py-2 text-left text-xs leading-5 text-base-content shadow-lg opacity-0 transition-opacity duration-200 group-hover:opacity-100 group-focus-visible:opacity-100">
                If a user opens app then it will show here. Or else you can Open
                duplicate Window in Incognito Tab and you that window user will
                show here
              </span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default NoChatSelected;
