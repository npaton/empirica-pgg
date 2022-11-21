import React from "react";
import { Chat } from "../components/Chat";

export function ChatView({ game, player }) {
  if(game.treatment.chat){
    return (
      <div className="h-full w-full absolute bottom-0 left-0 pointer-events-none">
        <div className="pr-20 h-full ">
          <Chat
            messages={game.get("messages") || []}
            avatar={player.get("avatar")}
            onNewMessage={(t) => {
              const text = t.trim();
  
              if (text.length === 0) {
                return;
              }
  
              game.set("messages", [
                ...(game.get("messages") || []),
                {
                  text,
                  avatar: player.get("avatar"),
                  playerId: player._id,
                  id: randID(),
                  timestamp: Date.now(),
                },
              ]);
            }}
          />
        </div>
      </div>
    );
  }
  else{
    return(null)
  };
  
}

function randID() {
  return Math.random().toString(16).slice(8);
}
