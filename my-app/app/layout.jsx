// app/layout.jsx
import "@/styles/global.css";
import SessionProviderWrapper from "@/components/SessionProviderWrapper";


const layout = ({ children }) => {
  return (
    <html lang="fr">
      <head>
        <script src="//cdn.conveythis.com/javascript/conveythis.js?api_key=pub_adeb41473f77976bf6b414cfaddcec95"></script>
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