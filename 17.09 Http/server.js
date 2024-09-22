const http = require('http');
const fs = require('fs');

const server = http.createServer((req, res) => {
  if (req.method === 'GET' && req.url === '/') {
    // Обробка GET запиту
    res.writeHead(200, { 'Content-Type': 'text/html; charset=utf-8' });
    res.end(`
      <!DOCTYPE html>
      <html lang="uk">
      <head>
        <meta charset="UTF-8">
        <title>Форма реєстрації</title>
      </head>
      <body>
        <form id="registrationForm">
          <label for="name">Ім'я:</label>
          <input type="text" id="name" name="name" required><br><br>
          <label for="email">Email:</label>
          <input type="email" id="email" name="email" required><br><br>
          <label for="pwd">Пароль:</label>
          <input type="password" id="pwd" name="pwd" required><br><br>
          <input type="submit" value="Відправити">
        </form>
        <script>
          document.getElementById('registrationForm').addEventListener('submit', function(e) {
            e.preventDefault();
            const formData = {
              name: document.getElementById('name').value,
              email: document.getElementById('email').value,
              pwd: document.getElementById('pwd').value
            };
            fetch('/', {
              method: 'POST',
              headers: {
                'Content-Type': 'application/json',
              },
              body: JSON.stringify(formData),
            })
            .then(response => {
              if(response.status === 201) {
                alert('Дані успішно збережено!');
              } else {
                alert('Виникла помилка при збереженні даних.');
              }
            });
          });
        </script>
      </body>
      </html>
    `);
  } else if (req.method === 'POST' && req.url === '/') {
    // Обробка POST запиту
    let body = '';
    req.on('data', chunk => {
      body += chunk.toString();
    });
    req.on('end', () => {
      try {
        const data = JSON.parse(body);
        if (!data.name || !data.email || !data.pwd) {
          throw new Error('Неповні дані');
        }
        const logEntry = JSON.stringify(data) + '\n';
        
        fs.appendFile('users.log', logEntry, (err) => {
          if (err) {
            console.error('Помилка при збереженні даних:', err);
            res.writeHead(500, { 'Content-Type': 'text/plain' });
            res.end('Внутрішня помилка сервера');
          } else {
            res.writeHead(201, { 'Content-Type': 'text/plain' });
            res.end('Created');
          }
        });
      } catch (error) {
        console.error('Помилка при обробці даних:', error);
        res.writeHead(400, { 'Content-Type': 'text/plain' });
        res.end('Неправильний формат даних');
      }
    });
  } else {
    res.writeHead(404, { 'Content-Type': 'text/plain' });
    res.end('Not Found');
  }
});

const PORT = 3000;
server.listen(PORT, () => {
  console.log(`Сервер запущено на http://localhost:${PORT}/`);
});