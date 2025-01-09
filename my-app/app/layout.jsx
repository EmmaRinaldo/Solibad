// app/layout.jsx
"use client";

import "../styles/global.css";
import SessionProviderWrapper from "../components/SessionProviderWrapper";



const layout = ({ children }) => {
  

  return (
    <html lang="fr">
      <head>
        <script src="//cdn.conveythis.com/javascript/conveythis.js?api_key=pub_adeb41473f77976bf6b414cfaddcec95"></script>
        <link rel="icon" href="../assets/favicon.ico" type="image/x-icon" />
      </head>
      <body>
        <SessionProviderWrapper>
          <main>
            {children}
          </main>
        </SessionProviderWrapper>
      </body>
    </html>
  );
};

export default layout;