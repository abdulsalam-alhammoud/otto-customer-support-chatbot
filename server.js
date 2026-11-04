// das bebilo was wir brauchen
const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');
const fs = require('fs');
const WebSocket = require('ws');  //WebSocket
const app = express();
const PORT = 3001;

// sitting bodyParser mit JSON
app.use(bodyParser.json());
app.use(express.static(path.join(__dirname)));

// speichrung in JSON
const chatFilePath = './chats.json';

// aufgabe speichrung JSON
function saveChatToFile(userMessage, botReply) {
    const chat = { userMessage, botReply, timestamp: new Date() };

    // lese das data wenn die in JSon ist
    fs.readFile(chatFilePath, 'utf8', (err, data) => {
        if (err) {
            if (err.code === 'ENOENT') {
                const chats = [chat];
                fs.writeFile(chatFilePath, JSON.stringify(chats, null, 2), (err) => {
                    if (err) console.error(err);
                });
            } else {
                console.log(err);
            }
            return;
        }

        let chats = [];
        if (data) {
            chats = JSON.parse(data);
        }
        chats.push(chat);

        fs.writeFile(chatFilePath, JSON.stringify(chats, null, 2), (err) => {
            if (err) console.error(err);
        });
    });
}

// bath dekummente zum prüfen
app.post('/chat', (req, res) => {
    const userMessage = req.body.message.toLowerCase();
    let reply;

    // wenn message null ist 
    if (userMessage === '') {
        reply = 'Hallo und herzlich willkommen! Ich kann dir bei verschiedenen Themen helfen, wie zum Beispiel: Kundenkonto, Bestellungen und Zahlungen. Was möchtest du wissen?';
    } else {
        // schlüssel worte
        if (userMessage.includes('kundenkonto')) {
            reply = 'Ich kann dir gerne Fragen zu deinem Kundenkonto beantworten. Worum geht es denn?';
        } else if (userMessage.includes('bestellungen')) {
            reply = 'Was willst du bezüglich deiner Bestellungen fragen?';
        } else if (userMessage.includes('zahlung')) {
            reply = 'Wenn du über die Zahlung sprechen willst, kann ich dir helfen?';
        }
        // zum kundenkonto
        else if (userMessage.includes('vergessen')) {
            reply = 'Solltest du dein Passwort vergessen haben, klick bitte auf "Passwort vergessen" wenn du dich das nächste Mal anmeldest.';
        } else if (userMessage.includes('registrieren')) {
            reply = 'Für eine Registrierung benötigst du eine Email und musst 18 Jahre alt sein.';
        } else if (userMessage.includes('email')) {
            reply = 'Falls du keinen Zugang mehr zu deinem Email-Account hast, ruf uns bitte über die Kundenhotline an. Halte gegebenenfalls deinen Ausweis bereit.';
        } else if (userMessage.includes('passwort')) {
            reply = 'Um ein neues Passwort festzulegen, senden wir dir gerne eine Email zu. Falls nicht, ignoriere diese.';
        } else if (userMessage.includes('löschen')) {
            reply = 'Solltest du dein Konto löschen wollen, findest du die entsprechende Option unter dem Reiter "Konto entfernen".';
        } else if (userMessage.includes('ändern')) {
            reply = 'Um deine Daten zu ändern, musst du auf den Reiter "Konto" klicken.';
        }
        //  zum bestellungen
        else if (userMessage.includes('datum')) {
            reply = 'Um das Lieferdatum einzusehen, musst du auf "Deine Bestellung" klicken.';
        } else if (userMessage.includes('wann')) {
            reply = 'Lieferungen können zwischen 8 und 20 Uhr zugestellt werden.';
        } else if (userMessage.includes('problem')) {
            reply = 'Du hast ein Problem? Bitte schreibe eine Mail an otto-Kundenservice.Problem@otto.com.';
        } else if (userMessage.includes('adresse')) {
            reply = 'Solltest du eine falsche Adresse angegeben haben, kannst du den Lieferort noch bis zu fünf Tage vor dem abgemachten Lieferdatum ändern.';
        } else if (userMessage.includes('nicht angekommen')) {
            reply = 'Das tut uns Leid! Wir werden den Sachverhalt überprüfen und lassen dir eine Mail zukommen!';
        } else if (userMessage.includes('verspätung')) {
            reply = 'Das tut uns Leid, sollte dein Paket zu spät angekommen sein! Leider bekommen wir gerade viele Anfragen, deshalb kann es zu Lieferverzögerungen kommen.';
        }
        //zum zahlung
        else if (userMessage.includes('paypal')) {
            reply = 'Bezahlung via Paypal bieten wir hier an!';
        } else if (userMessage.includes('vorkasse')) {
            reply = 'Du kannst gerne per Vorkasse bezahlen.';
        } else if (userMessage.includes('überweisung')) {
            reply = 'Du kannst den Betrag innerhalb von 14 Tagen überweisen.';
        } else if (userMessage.includes('versandkosten')) {
            reply = 'Die Versandkosten betragen grundsätzlich 4,99€. Ab einem Warenwert von 30€ ist der Versand kostenlos.';
        } else if (userMessage.includes('verfügbar')) {
            reply = 'Leider können wir nicht alle Zahlungsarten anbieten.';
        }
        // wenn ist falches denn gibt 3 zufällig
        else {
            const randomReplies = [
                'Entschuldigung, ich verstehe die Frage nicht. Können Sie es anders formulieren?',
                'Es tut mir leid, ich kann dir bei dieser Frage leider nicht weiterhelfen. Versuch es noch einmal.',
                'Ich bin mir nicht sicher, was du meinst. Könntest du es bitte noch einmal anders sagen?'
            ];
            reply = randomReplies[Math.floor(Math.random() * randomReplies.length)];
        }
    }

    saveChatToFile(req.body.message, reply);

    res.json({ reply });
});

//setting bath wenn das index.html besuchen 
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'index.html'));
});

// server in 3001
const server = app.listen(3001, () => {
    console.log(`Server running on http://localhost:3001`);
});

// WebSocket (in localhost 8080)
const wss = new WebSocket.Server({ server });

wss.on('connection', function connection(ws) {
    console.log('A new WebSocket client connected.');

    // nachricht zum webs
    ws.send('Welcome to the WebSocket server!');

 
    ws.on('message', function incoming(message) {
        console.log('Received: %s', message);
    });

     //aus machen das kontakt ws
    ws.on('close', () => {
        console.log('A client disconnected.');
    });
});

console.log('WebSocket server running at ws://localhost:8080');