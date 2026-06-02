const express = require('express');
const axios = require('axios');
const app = express();

app.use(express.json());

// 1. COLE AQUI SUA URL DO WEBHOOK DO DISCORD
const DISCORD_WEBHOOK_URL = 'https://discord.com/api/webhooks/1511514400182505692/euousLMl96rnOKVhEc-nOEEmSTQAickvKKzmScfpgb64SODV1dfTJ4w-odKcYCjAP9K3';

app.post('/leona-webhook', async (req, res) => {
    const data = req.body;

    // Log para você ver no console quando chegar algo
    console.log("Recebido da Leona:", data);

    // 2. Formatando a mensagem para o Discord
    const discordPayload = {
        embeds: [{
            title: "🔴 Instância Desconectada!",
            color: 15158332, // Vermelho
            fields: [
                { name: "Nome da Instância", value: data.instance_name || "N/A", inline: true },
                { name: "Número", value: data.instance_number || "N/A", inline: true },
                { name: "Data/Hora", value: data.timestamp_humanized || "N/A", inline: false }
            ],
            footer: { text: "Monitor Leona Solutions" },
            timestamp: new Date()
        }]
    };

    try {
        await axios.post(DISCORD_WEBHOOK_URL, discordPayload);
        res.status(200).send('Enviado ao Discord');
    } catch (err) {
        console.error("Erro ao enviar para o Discord:", err.message);
        res.status(500).send('Erro no servidor');
    }
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Servidor rodando na porta ${PORT}`));
