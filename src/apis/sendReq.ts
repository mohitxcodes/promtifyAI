export async function sendMessage(userMessage : string, chatHistory : any = []) {
    const res = await fetch('http://localhost:3000/api/chat', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        messages: [...chatHistory, { role: 'user', content: userMessage }]
        // optionally: model: 'llama-3.3-70b-versatile'
      })
    });
    const data = await res.json();
    return data.reply;
}