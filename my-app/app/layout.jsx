// app/layout.jsx
// import "@/styles/globals.css";
import Provider from "@/components/Provider";

const layout = ({ children }) => {
  return (
    <html lang="fr">
      <head>
      
      </head>
      <body>
        <Provider>
          <main className="bg-darker">
            {children}
          </main>
        </Provider>
      </body>
    </html>
  );
};

export default layout;
