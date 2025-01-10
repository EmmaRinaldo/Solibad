"use client";

import Footer from "../../components/Footer";
import Navbar from "../../components/Navbar";

const CGU = () => {
    return (
        <>
            <title>Conditions Générales d'Utilisation - Solibad</title>
            <meta
                name="description"
                content="Consultez les conditions générales d'utilisation (CGU) du site Solibad. Découvrez les règles d'utilisation, les engagements des utilisateurs, et les informations importantes concernant l'utilisation du site et des services de Solibad."
            />
            <meta
                name="keywords"
                content="CGU, Solibad, conditions générales d'utilisation, association, badminton, enchères, site web, utilisateurs, responsabilité"
            />

            <Navbar />
            <main style={{
                backgroundImage: "url('/assets/banner-gradient.png')",
                backgroundSize: "cover",
                backgroundPosition: "center",
            }}>
                <div className="container mx-auto px-4 py-12 " >
                    <h1 className="text-4xl font-extrabold text-black mb-8 text-center">
                        Conditions Générales d'Utilisation
                    </h1>

                    <div className="space-y-10">
                        {/* Section 1 */}
                        <section>
                            <h2 className="text-2xl font-semibold text-black mb-4">1. Introduction</h2>
                            <p className="text-gray-700 leading-relaxed">
                                Les présentes conditions générales d'utilisation (CGU) régissent l'accès et
                                l'utilisation du site internet de Solibad, accessible à l'adresse{" "}
                                <a
                                    href="https://www.solibad.fr/"
                                    className="text-indigo-600 font-semibold hover:underline"
                                >
                                    https://www.solibad.fr/
                                </a>{" "}
                                ainsi que tout autre site ou service associé (le "Site"). En accédant à ce Site,
                                vous acceptez sans réserve les présentes conditions d'utilisation. Si vous n'êtes
                                pas d'accord avec ces conditions, veuillez ne pas utiliser ce Site.
                            </p>
                        </section>

                        {/* Section 2 */}
                        <section>
                            <h2 className="text-2xl font-semibold text-black mb-4">2. Objet du Site</h2>
                            <p className="text-gray-700 leading-relaxed">
                                Le Site de Solibad est destiné à informer le public sur les actions de
                                l'association Solibad - Badminton Sans Frontières, collecter des fonds pour ses
                                projets et permettre la vente d'objets liés à ses activités, notamment à travers
                                des enchères en ligne. Le Site permet également aux utilisateurs de soutenir
                                l'association via des dons et de s'informer sur les actions caritatives menées
                                par Solibad.
                            </p>
                        </section>

                        {/* Section 3 */}
                        <section>
                            <h2 className="text-2xl font-semibold text-black mb-4">3. Accès au Site</h2>
                            <p className="text-gray-700 leading-relaxed">
                                L'accès au Site est libre et gratuit. Cependant, certains services (comme les
                                enchères) peuvent nécessiter un enregistrement préalable des utilisateurs,
                                l'acceptation des conditions spécifiques et l'adhésion à certaines règles.
                                Solibad s'efforce d'assurer l'accessibilité du Site, mais ne garantit pas
                                l'absence d'interruptions ou de dysfonctionnements.
                            </p>
                        </section>

                        {/* Section 4 */}
                        <section>
                            <h2 className="text-2xl font-semibold text-black mb-4">4. Utilisation des Services</h2>
                            <p className="text-gray-700 leading-relaxed">
                                En utilisant les services proposés sur le Site, vous vous engagez à :
                            </p>
                            <ul className="list-disc pl-6 text-gray-700 leading-relaxed">
                                <li>Respecter les lois et règlements en vigueur,</li>
                                <li>Ne pas utiliser le Site à des fins illégales ou nuisibles,</li>
                                <li>
                                    Respecter les droits d'auteur et la propriété intellectuelle de Solibad et des
                                    autres utilisateurs,
                                </li>
                                <li>Ne pas perturber le bon fonctionnement du Site,</li>
                                <li>
                                    Fournir des informations exactes lors de l'enregistrement sur le Site (le cas
                                    échéant).
                                </li>
                            </ul>
                        </section>

                        {/* Section 5 */}
                        <section>
                            <h2 className="text-2xl font-semibold text-black mb-4">5. Responsabilité de l'utilisateur</h2>
                            <p className="text-gray-700 leading-relaxed">
                                L'utilisateur est seul responsable de l'utilisation qu'il fait du Site et des
                                services associés. Solibad ne pourra être tenu responsable des dommages directs
                                ou indirects résultant de l'utilisation du Site, y compris en cas de
                                dysfonctionnement, perte de données ou interruption du service.
                            </p>
                        </section>

                        {/* Ajout des sections restantes */}
                        <section>
                            <h2 className="text-2xl font-semibold text-black mb-4">6. Propriété intellectuelle</h2>
                            <p className="text-gray-700 leading-relaxed">
                                Tous les contenus présents sur le Site (textes, images, vidéos, logos, etc.) sont
                                la propriété de Solibad ou de leurs auteurs respectifs. Toute reproduction,
                                distribution, modification ou utilisation sans autorisation préalable est
                                strictement interdite.
                            </p>
                        </section>

                        {/* Ajoutez d'autres sections si nécessaire */}

                    </div>
                </div>
            </main>
            <Footer />
        </>
    );
};

export default CGU;
