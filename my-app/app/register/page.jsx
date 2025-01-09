//app/register/page.jsx

"use client";

import { useEffect, useState } from "react";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "../../components/ui/popover";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "../../components/ui/command";
import { Button } from "../../components/ui/button";
import { Check, ChevronsUpDown } from "lucide-react";

export default function Register() {
  const [form, setForm] = useState({
    name: "",
    lastName: "",
    email: "",
    telephone: "",
    phoneCode: "",
    password: "",
    confirmPassword: "",
    country: "",
    city: "",
    paymentAgreement: false,
    callbackUrl: "/",
  });
  const [error, setError] = useState("");

  const [countries, setCountries] = useState([]);
  const [cities, setCities] = useState([]);
  const [phoneCodes, setPhoneCodes] = useState([]);

  // Fetch countries from API
  useEffect(() => {
    const fetchCountries = async () => {
      try {
        const response = await fetch(
          "https://countriesnow.space/api/v0.1/countries"
        );
        const data = await response.json();
        const countryList = data.data.map((country) => ({
          value: country.country,
          label: country.country,
        }));
        setCountries(countryList);
      } catch (error) {
        console.error("Erreur lors de la récupération des pays :", error);
      }
    };
    fetchCountries();
  }, []);

  // Fetch cities from API
  useEffect(() => {
    const fetchCities = async () => {
      try {
        const response = await fetch(
          "https://countriesnow.space/api/v0.1/countries/population/cities"
        );
        const data = await response.json();
        const cityList = data.data.map((city) => ({
          value: city.city,
          label: city.city,
        }));
        setCities(cityList);
      } catch (error) {
        console.error("Erreur lors de la récupération des villes :", error);
      }
    };
    fetchCities();
  }, []);

  // Fetch phone codes
  useEffect(() => {
    const fetchPhoneCodes = async () => {
      try {
        const response = await fetch(
          "https://countriesnow.space/api/v0.1/countries/codes"
        );
        const data = await response.json();
        const codeList = data.data.map((country) => ({
          value: country.dial_code,
          label: `${country.dial_code} (${country.name})`,
        }));
        setPhoneCodes(codeList);
      } catch (error) {
        console.error("Erreur lors de la récupération des codes téléphoniques :", error);
      }
    };
    fetchPhoneCodes();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
  
    if (form.password !== form.confirmPassword) {
      return setError("Les mots de passe ne correspondent pas.");
    }
  
    if (!form.paymentAgreement) {
      return setError("Vous devez accepter l'engagement de paiement en cas de gain.");
    }
  
    try {
  
      // Requête POST pour enregistrer l'utilisateur
      const response = await fetch("/api/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: form.name,
          lastname: form.lastName,
          email: form.email,
          telephone: form.telephone,
          password:  `${form.phoneCode}${form.telephone}`,
          country: form.country,
          city: form.city,
        }),
      });
  
      const data = await response.json();
      if (response.ok) {
        alert("Inscription réussie !");
      } else {
        setError(data.error || "Une erreur est survenue.");
      }
    } catch (error) {
      console.error("Erreur lors de l'inscription :", error);
      setError("Une erreur est survenue.");
    }
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-gray-100">
      <form
        className="w-full max-w-md bg-white p-6 rounded-lg shadow-md"
        onSubmit={handleSubmit}
      >
        <h1 className="text-2xl font-bold mb-4 text-center">Inscription</h1>
        {error && <p className="text-red-500 text-center">{error}</p>}
        <div className="space-y-4">
          {/* First Name Input */}
          <div>
            <label>Prénom</label>
            <input
              type="text"
              required
              value={form.name}
              onChange={(e) => setForm({ ...form, name: e.target.value })}
              className="w-full p-2 border rounded"
            />
          </div>

          {/* Last Name Input */}
          <div>
            <label>Nom de famille</label>
            <input
              type="text"
              required
              value={form.lastName}
              onChange={(e) => setForm({ ...form, lastName: e.target.value })}
              className="w-full p-2 border rounded"
            />
          </div>

          {/* Email Input */}
          <div>
            <label>Email</label>
            <input
              type="email"
              required
              value={form.email}
              onChange={(e) => setForm({ ...form, email: e.target.value })}
              className="w-full p-2 border rounded"
            />
          </div>

          {/* Phone Code */}
          <div>
            <label>Code Téléphonique</label>
            <Combobox
              options={phoneCodes}
              selected={form.phoneCode}
              onChange={(value) => setForm({ ...form, phoneCode: value })}
            />
          </div>

          {/* Phone Input */}
          <div>
            <label>Téléphone</label>
            <input
              type="tel"
              required
              value={form.telephone}
              onChange={(e) => setForm({ ...form, telephone: e.target.value })}
              className="w-full p-2 border rounded"
            />
          </div>

          {/* Password Inputs */}
          <div>
            <label>Mot de passe</label>
            <input
              type="password"
              required
              value={form.password}
              onChange={(e) => setForm({ ...form, password: e.target.value })}
              className="w-full p-2 border rounded"
            />
          </div>
          <div>
            <label>Confirmez le mot de passe</label>
            <input
              type="password"
              required
              value={form.confirmPassword}
              onChange={(e) =>
                setForm({ ...form, confirmPassword: e.target.value })
              }
              className="w-full p-2 border rounded"
            />
          </div>

          {/* Country Combobox */}
          <div>
            <label>Pays</label>
            <Combobox
              options={countries}
              selected={form.country}
              onChange={(value) => setForm({ ...form, country: value })}
            />
          </div>

          {/* City Combobox */}
          <div>
            <label>Ville</label>
            <Combobox
              options={cities}
              selected={form.city}
              onChange={(value) => setForm({ ...form, city: value })}
            />
          </div>

          {/* Payment Agreement Checkbox */}
          <div>
            <label>
              <input
                type="checkbox"
                required
                checked={form.paymentAgreement}
                onChange={(e) =>
                  setForm({ ...form, paymentAgreement: e.target.checked })
                }
              />
              J'accepte l'engagement de paiement en cas de gain.
            </label>
          </div>

          <div
            className="g-recaptcha"
            data-sitekey={process.env.NEXT_PUBLIC_RECAPTCHA_SITE_KEY}
          ></div>


          <button
            type="submit"
            className="w-full py-2 px-4 bg-blue-600 text-white rounded"
          >
            S'inscrire
          </button>
        </div>
      </form>
    </div>
  );
}

function Combobox({ options, selected, onChange }) {
  const [open, setOpen] = useState(false);

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Button
          variant="outline"
          role="combobox"
          aria-expanded={open}
          className="w-full justify-between"
        >
          {selected || "Sélectionnez une option"}
          <ChevronsUpDown className="opacity-50" />
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-full p-0">
        <Command>
          <CommandInput placeholder="Rechercher..." />
          <CommandList>
            <CommandEmpty>Pas de résultat</CommandEmpty>
            <CommandGroup>
              {options.map((option) => (
                <CommandItem
                  key={option.value}
                  onSelect={() => {
                    onChange(option.value);
                    setOpen(false);
                  }}
                >
                  {option.label}
                  <Check
                    className={
                      selected === option.value ? "opacity-100" : "opacity-0"
                    }
                  />
                </CommandItem>
              ))}
            </CommandGroup>
          </CommandList>
        </Command>
      </PopoverContent>
    </Popover>
  );
}
