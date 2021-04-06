import React, { useEffect, useState } from "react";
import Chat from "../src/components/chat";

function Home(props) {
    const { socket } = props;
    const [chatLog, setChatLog] = useState([]);

    useEffect(() => {
        socket.on("chat message", (data) => {
            setChatLog([...chatLog, data]);
        });

        socket.on("user joined", (data) => {
            const message = `${data.username} joined the chat (${data.numUsers} total)`;
            setChatLog([...chatLog, {...data, message}]);
        });

        return () => {
            socket.off("chat message");
        };
    });

    const onSend = (message) => {
        socket.emit("chat message", message);
        console.log("sent message");
    };

    return <Chat chatLog={chatLog} onSend={onSend} />;
}

export default Home;