"use client";

import Footer from "../../components/Footer";
import Navbar from "../../components/Navbar";


const MentionsLegales = () => {
    return (
        <>
            <title>Mentions Légales - Solibad</title>
            <meta
                name="description"
                content="Découvrez les mentions légales de Solibad, l'association caritative du Badminton Sans Frontières, incluant les informations légales, l'hébergement et la propriété intellectuelle."
            />
            <meta
                name="keywords"
                content="Solibad, mentions légales, association, badminton, propriété intellectuelle, données personnelles, hébergement, SIREN, SIRET"
            />

            <Navbar />

            <main style={{
                backgroundImage: "url('/assets/banner-gradient.png')",
                backgroundSize: "cover",
                backgroundPosition: "center",
            }}>
                <div className="container mx-auto px-6 py-10 text-black">
                    <h1 className="text-4xl font-bold mb-8 text-center">
                        Mentions Légales
                    </h1>

                    <section className="mb-12">
                        <h2 className="text-2xl font-semibold mb-4">1. Identification de l'association</h2>
                        <ul className="leading-relaxed list-none">
                            <li><strong>Nom de l'association :</strong> Solibad - Badminton Sans Frontières</li>
                            <li><strong>Forme juridique :</strong> Association Loi 1901</li>
                            <li><strong>Adresse :</strong> 10 B Rue Favier, 94360 Bry-sur-Marne, France</li>
                            <li><strong>SIREN :</strong> 794513069</li>
                            <li><strong>SIRET :</strong> 79451306900011</li>
                            <li><strong>Numéro de TVA :</strong> FR26794513069</li>
                            <li><strong>Numéro RNA :</strong> W942003340</li>
                            <li><strong>Code NAF / APE :</strong> Action sociale sans hébergement n.c.a. (8899B)</li>
                        </ul>
                    </section>

                    <section className="mb-12">
                        <h2 className="text-2xl font-semibold mb-4">2. Hébergement du site</h2>
                        <p className="leading-relaxed">
                            <strong>Nom de l’hébergeur :</strong> Vercel
                        </p>
                        <p className="leading-relaxed">
                            <strong>Adresse :</strong> Vercel Inc., 340 S Lemon Ave #4133, Walnut, CA 91789, USA
                        </p>
                        <p className="leading-relaxed">
                            <strong>Contact :</strong> support@vercel.com
                        </p>
                    </section>

                    <section className="mb-12">
                        <h2 className="text-2xl font-semibold mb-4">3. Propriété intellectuelle</h2>
                        <p className="leading-relaxed">
                            Tous les éléments présents sur ce site (textes, images, vidéos, logos, etc.) sont la propriété exclusive de Solibad ou de leurs auteurs respectifs. Toute reproduction, modification ou utilisation non autorisée est interdite.
                        </p>
                    </section>

                    <section className="mb-12">
                        <h2 className="text-2xl font-semibold mb-4">4. Responsabilité</h2>
                        <p className="leading-relaxed">
                            Solibad s'efforce de fournir des informations exactes sur ce site, mais ne peut garantir l'absence d'erreurs ou d'omissions. Solibad se réserve le droit de modifier les contenus à tout moment sans préavis.
                        </p>
                    </section>

                    <section className="mb-12">
                        <h2 className="text-2xl font-semibold mb-4">5. Liens externes</h2>
                        <p className="leading-relaxed">
                            Le site peut contenir des liens vers d’autres sites. Solibad décline toute responsabilité quant au contenu ou aux conséquences de leur utilisation.
                        </p>
                    </section>

                    <section className="mb-12">
                        <h2 className="text-2xl font-semibold mb-4">6. Données personnelles</h2>
                        <p className="leading-relaxed">
                            Solibad respecte la vie privée de ses utilisateurs. Les informations collectées sont traitées conformément à notre <a href="/politique-de-confidentialite" className="text-blue-600 underline">politique de confidentialité</a>.
                        </p>
                    </section>

                    <section className="mb-12">
                        <h2 className="text-2xl font-semibold mb-4">7. Droit applicable</h2>
                        <p className="leading-relaxed">
                            Les présentes mentions légales sont régies par le droit français. En cas de litige, seuls les tribunaux français sont compétents.
                        </p>
                    </section>

                    <section className="mb-12">
                        <h2 className="text-2xl font-semibold mb-4">8. Modifications des mentions légales</h2>
                        <p className="leading-relaxed">
                            Solibad peut modifier ces mentions légales à tout moment. Les utilisateurs sont invités à consulter régulièrement cette page.
                        </p>
                    </section>
                </div>

            </main>

            <Footer />
        </>

    );
};

export default MentionsLegales;
