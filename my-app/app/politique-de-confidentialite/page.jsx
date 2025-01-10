"use client";

import Footer from "../../components/Footer";
import Navbar from "../../components/Navbar";


const PolitiqueDeConfidentialite = () => {
    return (
        <>
            <title>Politique de Confidentialité - Solibad</title>
            <meta
                name="description"
                content="Découvrez comment Solibad collecte, utilise et protège vos données personnelles conformément à sa politique de confidentialité."
            />
            <meta
                name="keywords"
                content="politique de confidentialité, protection des données, RGPD, Solibad, données personnelles"
            />

            <Navbar />
            <main style={{
                backgroundImage: "url('/assets/banner-gradient.png')",
                backgroundSize: "cover",
                backgroundPosition: "center",
            }}>
                <div className="container mx-auto px-4 py-10 text-black">
                    <h1 className="text-4xl font-bold mb-6 text-center">
                        Politique de Confidentialité
                    </h1>

                    <section className="mb-10">
                        <h2 className="text-2xl font-semibold mb-4">1. Introduction</h2>
                        <p className="leading-relaxed">
                            Chez Solibad, nous nous engageons à protéger la confidentialité de vos données personnelles. Cette politique décrit les types de données que nous collectons, la façon dont nous les utilisons et les mesures mises en place pour garantir leur sécurité.
                        </p>
                    </section>

                    <section className="mb-10">
                        <h2 className="text-2xl font-semibold mb-4">2. Données collectées</h2>
                        <ul className="list-disc pl-5 leading-relaxed">
                            <li>Informations personnelles (nom, adresse, e-mail) lors de l’inscription ou des dons.</li>
                            <li>Données financières pour le traitement des paiements sécurisés.</li>
                            <li>Données techniques comme les cookies ou l’adresse IP pour l’analyse de navigation.</li>
                        </ul>
                    </section>

                    <section className="mb-10">
                        <h2 className="text-2xl font-semibold mb-4">3. Utilisation des données</h2>
                        <p className="leading-relaxed">
                            Vos données sont utilisées pour :
                        </p>
                        <ul className="list-disc pl-5 leading-relaxed">
                            <li>Gérer les transactions et enchères en ligne.</li>
                            <li>Envoyer des mises à jour et newsletters.</li>
                            <li>Personnaliser et améliorer votre expérience utilisateur.</li>
                        </ul>
                    </section>

                    <section className="mb-10">
                        <h2 className="text-2xl font-semibold mb-4">4. Partage des données</h2>
                        <p className="leading-relaxed">
                            Nous partageons vos données uniquement avec des prestataires de confiance (paiements sécurisés) et dans les cas requis par la loi.
                        </p>
                    </section>

                    <section className="mb-10">
                        <h2 className="text-2xl font-semibold mb-4">5. Sécurité des données</h2>
                        <p className="leading-relaxed">
                            Des mesures strictes de sécurité protègent vos données contre tout accès non autorisé. Cependant, nous rappelons que la transmission de données en ligne présente toujours un risque.
                        </p>
                    </section>

                    <section className="mb-10">
                        <h2 className="text-2xl font-semibold mb-4">6. Vos droits</h2>
                        <p className="leading-relaxed">
                            Vous avez le droit d'accéder, corriger ou supprimer vos données personnelles. Pour toute demande, contactez-nous à : <strong>[email de contact de Solibad]</strong>.
                        </p>
                    </section>

                    <section className="mb-10">
                        <h2 className="text-2xl font-semibold mb-4">7. Cookies</h2>
                        <p className="leading-relaxed">
                            Nous utilisons des cookies pour améliorer la navigation sur notre site. Vous pouvez les désactiver via les paramètres de votre navigateur, bien que certaines fonctionnalités puissent être limitées.
                        </p>
                    </section>

                    <section className="mb-10">
                        <h2 className="text-2xl font-semibold mb-4">8. Modifications</h2>
                        <p className="leading-relaxed">
                            Cette politique peut être mise à jour. Veuillez consulter cette page régulièrement pour vous tenir informé.
                        </p>
                    </section>

                    <section className="mb-10">
                        <h2 className="text-2xl font-semibold mb-4">9. Contact</h2>
                        <p className="leading-relaxed">
                            Pour toute question ou demande, contactez-nous à :
                            <br />
                            <strong>Adresse :</strong> 10 B Rue Favier, 94360 Bry-sur-Marne, France
                            <br />
                            <strong>Email :</strong> [email de contact de Solibad]
                        </p>
                    </section>
                </div>

            </main>
            <Footer />
        </>
    );
};

export default PolitiqueDeConfidentialite;
