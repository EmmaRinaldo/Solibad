// components/Footer.jsx
"use client";
import React from 'react';

const Footer = () => {

    return (
        <footer id="footer" className="gradient-border-footer">
            <div className="row">
                <div className="col-xs-12 col-sm-12 col-md-6 col-lg-5 mb-3">
                    <a className="navbar-brand"id="footer-heading" href="/">
                        <img 
                            className="d-xs-block d-sm-block d-md-none d-lg-none" 
                            src="/assets/logo-solibad-small.svg" 
                            alt="Petit logo Solibad"
                        />
                        <img 
                            className="d-none d-xs-none d-sm-none d-md-block d-lg-block" 
                            src="/assets/logo-solibad.svg" 
                            alt="Logo Solibad"
                            height={30}
                        />
                    </a>
                </div>
                <div className="col-xs-12 col-sm-12 col-md-3 col-lg-3 offset-lg-1 mb-3">
                    <h5>Accéder</h5>
                    <ul className="nav flex-column">
                        <li className="nav-item mb-2">
                            <a href="/conditions-generales-utilisation" className="nav-link p-0" target="_blank" aria-label="Lien vers les conditions générales d'utilisation">
                                CGU
                            </a>
                        </li>
                        <li className="nav-item mb-2">
                            <a href="/mentions-legales" className="nav-link p-0" target="_blank" aria-label="Lien vers les mentions légales">
                                Mentions légales
                            </a>
                        </li>
                        <li className="nav-item mb-2">
                            <a href="/politique-de-confidentialite" className="nav-link p-0" target="_blank" aria-label="Lien vers la politique confidentialité">
                                Politique de confidentialité
                            </a>
                        </li>
                    </ul>
                </div>
                <div className="col-xs-12 col-sm-12 col-md-3 col-lg-3 mb-3">
                    <h5>Réseaux sociaux</h5>
                    <ul className="nav flex-column">
                        <li className="nav-item mb-2">
                            <a href="https://www.facebook.com/solibad.fr" className="nav-link p-0" target="_blank" aria-label="Lien vers Facebook">
                                Facebook
                            </a>
                        </li>
                        <li className="nav-item mb-2">
                            <a href="https://www.instagram.com/Solibad_Charity/" className="nav-link p-0" target="_blank" aria-label="Lien vers Instagram">
                                Instagram
                            </a>
                        </li>
                        <li className="nav-item mb-2">
                            <a href="https://x.com/i/flow/login?redirect_after_login=%2FSolibadFr" className="nav-link p-0" target="_blank" aria-label="Lien vers Twitter">
                                Twitter
                            </a>
                        </li>
                        <li className="nav-item mb-2">
                            <a href="https://www.youtube.com/user/solibadnet" className="nav-link p-0" target="_blank" aria-label="Lien vers YouTube">
                                YouTube
                            </a>
                        </li>
                    </ul>
                </div>
            </div>
            <div className="d-flex flex-column flex-sm-row justify-content-center text-center py-4 border-top">
                <p>&copy; 2024 Solibad Tout droits réservés.</p>
            </div>
        </footer>
    );
}

export default Footer;
