import { Injectable } from '@nestjs/common';
import { appName, port } from './app.settings';
import { docsPath } from './swagger/swagger-config';

@Injectable()
export class AppService {
  getHello(): string {
    const docsLink = `http://localhost:${port}/${docsPath}`;

    return `
      <html>
        <body>
          <div style="max-width: 1420px; margin: auto;">
            <h1>Welcome to the ${appName}!</h1>
            <p>You can access the documentation at:
              <a href="${docsLink}">${docsLink}</a>
            </p>
          </div>
        </body>
      </html>
    `;
  }
}
