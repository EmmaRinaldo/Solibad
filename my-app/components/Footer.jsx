// components/Footer.jsx
"use client";
import Link from "next/link";

const Footer = () => {
  return (
    <footer id="footer" className="gradient-border-footer mt-9">
      <div className="mx-auto px-4 sm:px-6 md:px-8 lg:px-16 py-8 lg:py-16">
        {/* Wrapper global pour le contenu */}
        <div className="flex flex-wrap lg:flex-nowrap lg:items-start">
          {/* Logo */}
          <div className="w-full lg:w-2/6 mb-6 lg:mb-0">
            <Link
              className="text-2xl font-bold text-gray-800 flex"
              href="/"
            >
              <div className="h-[8vh]">
                {/* Logo pour petits écrans */}
                <img
                  src="/assets/logo-solibad-small.svg"
                  alt="Logo Solibad petit écran"
                  className="h-full w-auto object-contain xs:block sm:block md:hidden lg:hidden"
                />
                {/* Logo pour écrans moyens */}
                <img
                  src="/assets/logo-solibad-medium.svg"
                  alt="Logo Solibad écran moyen"
                  className="h-full w-auto object-contain hidden xs:hidden sm:hidden md:block lg:hidden"
                />
                {/* Logo pour grands écrans */}
                <img
                  src="/assets/logo-solibad-large.svg"
                  alt="Logo Solibad grand écran"
                  className="h-full w-auto object-contain hidden xs:hidden sm:hidden md:hidden lg:block"
                />
              </div>
            </Link>
          </div>

          {/* Espace vide pour bureau */}
          <div className="hidden lg:block lg:w-1/6"></div>

          {/* Liens Accéder */}
          <div className="w-full sm:w-1/2 lg:w-2/6 mb-6 sm:mb-0">
            <h5 className="text-lg font-semibold text-gray-700 mb-4">
              Accéder
            </h5>
            <ul className="space-y-2">
              <li>
                <Link
                  href="/conditions-generales-utilisation"
                  className="text-gray-600 hover:text-blue-700"
                  target="_blank"
                  aria-label="Lien vers les conditions générales d'utilisation"
                >
                  Conditions générales d'utilisation
                </Link>
              </li>
              <li>
                <Link
                  href="/mentions-legales"
                  className="text-gray-600 hover:text-blue-700"
                  target="_blank"
                  aria-label="Lien vers les mentions légales"
                >
                  Mentions légales
                </Link>
              </li>
              <li>
                <Link
                  href="/politique-de-confidentialite"
                  className="text-gray-600 hover:text-blue-700"
                  target="_blank"
                  aria-label="Lien vers la politique confidentialité"
                >
                  Politique de confidentialité
                </Link>
              </li>
            </ul>
          </div>

          {/* Réseaux sociaux */}
          <div className="w-full sm:w-1/2 lg:w-2/6">
            <h5 className="text-lg font-semibold text-gray-700 mb-4">
              Réseaux sociaux
            </h5>
            <div className="flex space-x-6">
              {/* Facebook */}
              <Link
                href="https://www.facebook.com/solibad.fr"
                aria-label="Lien vers Facebook"
              >
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="url(#gradient)" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-facebook">
                  <defs>
                    <linearGradient id="gradient" x1="0%" y1="0%" x2="100%" y2="0%">
                      <stop offset="0%" stopColor="rgba(229,65,41,1)" />
                      <stop offset="10%" stopColor="rgba(234,111,17,1)" />
                      <stop offset="25%" stopColor="rgba(255,231,24,1)" />
                      <stop offset="40%" stopColor="rgba(136,187,21,1)" />
                      <stop offset="55%" stopColor="rgba(53,159,43,1)" />
                      <stop offset="70%" stopColor="rgba(19,161,174,1)" />
                      <stop offset="85%" stopColor="rgba(16,139,200,1)" />
                      <stop offset="100%" stopColor="rgba(13,56,137,1)" />
                    </linearGradient>
                  </defs>
                  <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z" />
                </svg>
              </Link>

              {/* Instagram */}
              <Link
                href="https://www.instagram.com/Solibad_Charity/"
                aria-label="Lien vers Instagram"
              >
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="url(#gradient)" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-instagram">
                  <defs>
                    <linearGradient id="gradient" x1="0%" y1="0%" x2="100%" y2="0%">
                      <stop offset="0%" stopColor="rgba(229,65,41,1)" />
                      <stop offset="10%" stopColor="rgba(234,111,17,1)" />
                      <stop offset="25%" stopColor="rgba(255,231,24,1)" />
                      <stop offset="40%" stopColor="rgba(136,187,21,1)" />
                      <stop offset="55%" stopColor="rgba(53,159,43,1)" />
                      <stop offset="70%" stopColor="rgba(19,161,174,1)" />
                      <stop offset="85%" stopColor="rgba(16,139,200,1)" />
                      <stop offset="100%" stopColor="rgba(13,56,137,1)" />
                    </linearGradient>
                  </defs>
                  <rect width="20" height="20" x="2" y="2" rx="5" ry="5" />
                  <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
                  <line x1="17.5" x2="17.51" y1="6.5" y2="6.5" />
                </svg>
              </Link>

              {/* Twitter */}
              <Link
                href="https://x.com/i/flow/login?redirect_after_login=%2FSolibadFr"
                aria-label="Lien vers Twitter"
              >
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="url(#gradient)" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-twitter">
                  <defs>
                    <linearGradient id="gradient" x1="0%" y1="0%" x2="100%" y2="0%">
                      <stop offset="0%" stopColor="rgba(229,65,41,1)" />
                      <stop offset="10%" stopColor="rgba(234,111,17,1)" />
                      <stop offset="25%" stopColor="rgba(255,231,24,1)" />
                      <stop offset="40%" stopColor="rgba(136,187,21,1)" />
                      <stop offset="55%" stopColor="rgba(53,159,43,1)" />
                      <stop offset="70%" stopColor="rgba(19,161,174,1)" />
                      <stop offset="85%" stopColor="rgba(16,139,200,1)" />
                      <stop offset="100%" stopColor="rgba(13,56,137,1)" />
                    </linearGradient>
                  </defs>
                  <path d="M22 4s-.7 2.1-2 3.4c1.6 10-9.4 17.3-18 11.6 2.2.1 4.4-.6 6-2C3 15.5.5 9.6 3 5c2.2 2.6 5.6 4.1 9 4-.9-4.2 4-6.6 7-3.8 1.1 0 3-1.2 3-1.2z" />
                </svg>
              </Link>

              {/* YouTube */}
              <Link
                href="https://www.youtube.com/user/solibadnet"
                aria-label="Lien vers YouTube"
              >
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="url(#gradient)" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-youtube">
                  <defs>
                    <linearGradient id="gradient" x1="0%" y1="0%" x2="100%" y2="0%">
                      <stop offset="0%" stopColor="rgba(229,65,41,1)" />
                      <stop offset="10%" stopColor="rgba(234,111,17,1)" />
                      <stop offset="25%" stopColor="rgba(255,231,24,1)" />
                      <stop offset="40%" stopColor="rgba(136,187,21,1)" />
                      <stop offset="55%" stopColor="rgba(53,159,43,1)" />
                      <stop offset="70%" stopColor="rgba(19,161,174,1)" />
                      <stop offset="85%" stopColor="rgba(16,139,200,1)" />
                      <stop offset="100%" stopColor="rgba(13,56,137,1)" />
                    </linearGradient>
                  </defs>
                  <path d="M2.5 17a24.12 24.12 0 0 1 0-10 2 2 0 0 1 1.4-1.4 49.56 49.56 0 0 1 16.2 0A2 2 0 0 1 21.5 7a24.12 24.12 0 0 1 0 10 2 2 0 0 1-1.4 1.4 49.55 49.55 0 0 1-16.2 0A2 2 0 0 1 2.5 17" />
                  <path d="m10 15 5-3-5-3z" />
                </svg>
              </Link>
            </div>
          </div>
        </div>

        {/* Bas de footer */}
        <div className="mt-8 border-t border-gray-200 pt-4 text-center">
          <p className="text-gray-600">
            &copy; 2025 Solibad. Tous droits réservés.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;