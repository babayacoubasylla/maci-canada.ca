"use client";

import { Header } from "@/components/layout/Header";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useState } from "react";

export default function Messagerie() {
    const [messages, setMessages] = useState<any[]>([
        { id: 1, contenu: "Bonjour, comment va votre enfant ?", isMe: false },
        { id: 2, contenu: "Bonjour, il va bien merci !", isMe: true },
    ]);
    const [newMessage, setNewMessage] = useState("");

    const sendMessage = async () => {
        if (!newMessage.trim()) return;

        // TODO: Appeler l'API pour sauvegarder le message
        setMessages([...messages, { id: Date.now(), contenu: newMessage, isMe: true }]);
        setNewMessage("");
    };

    return (
        <div>
            <Header />
            <div className="container py-10">
                <h1 className="text-3xl font-bold text-[#0f2942] mb-8">Messagerie</h1>

                <div className="grid md:grid-cols-3 gap-6">
                    <div className="bg-white border rounded-xl p-4">
                        <h2 className="font-semibold mb-4">Conversations</h2>
                        <div className="space-y-2">
                            <div className="p-3 bg-slate-100 rounded-lg">Mme Tremblay</div>
                            <div className="p-3 hover:bg-slate-50 rounded-lg">Direction</div>
                        </div>
                    </div>

                    <div className="md:col-span-2 bg-white border rounded-xl flex flex-col h-[500px]">
                        <div className="p-4 border-b font-semibold">Discussion avec Mme Tremblay</div>

                        <div className="flex-1 p-4 space-y-4 overflow-y-auto">
                            {messages.map((msg, index) => (
                                <div key={index} className={`flex ${msg.isMe ? "justify-end" : ""}`}>
                                    <div className={`p-3 rounded-lg max-w-[80%] ${msg.isMe ? "bg-[#C41E3A] text-white" : "bg-slate-100"}`}>
                                        {msg.contenu}
                                    </div>
                                </div>
                            ))}
                        </div>

                        <div className="p-4 border-t flex gap-2">
                            <Input
                                value={newMessage}
                                onChange={(e) => setNewMessage(e.target.value)}
                                placeholder="Écrire un message..."
                            />
                            <Button onClick={sendMessage} className="bg-[#C41E3A]">Envoyer</Button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}