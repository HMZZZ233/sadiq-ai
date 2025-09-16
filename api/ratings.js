export default async function handler(req, res) {
    if (req.method === "POST") {
        try {
            const { username, message, rating, ip } = req.body;
            const text = `
🌟 *RATINGS BARU BOS* 🌟
👤 *Username*: ${username}
✅ *Ratings*: ${rating}/5
💌 *Message*: ${message}
💻 *IP Address*: ${ip}
            `;
            const BOT_TOKEN = process.env.BOT_TOKEN;
            const CHAT_ID = process.env.CHAT_ID;
            await fetch(`https://api.telegram.org/bot${BOT_TOKEN}/sendMessage`, {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({
                    chat_id: CHAT_ID,
                    text,
                    parse_mode: "Markdown"
                }),
            });
            return res.status(200).json({ success: true, message: "Rating berhasil dikirim!" });
        } catch (error) {
            console.error(error);
            return res.status(500).json({ success: false, error: "Internal Server Error" });
        }
    } else {
        res.setHeader("Allow", ["POST"]);
        return res.status(405).end(`Method ${req.method} Not Allowed`);
    }
}
