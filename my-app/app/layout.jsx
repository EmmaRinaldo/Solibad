// app/layout.jsx
"use client";

import "@/styles/globals.css";
import Provider from "@/components/Provider";
import "@app/i18n";

const layout = ({ children }) => {
  return (
    <html lang="fr">
      <head>
        <title>My App</title>
      </head>
      <body>
        <Provider>
          <main>{children}</main>
        </Provider>
      </body>
    </html>
  );
};

export default layout;
