import React from "react";
import i18n from "../i18n";


export default function LanguageSelector() {
  return (
    <select
      onChange={(e) => i18n.changeLanguage(e.target.value)}
      value={i18n.language}
      className="bg-white text-green-700 px-2 py-1 rounded text-sm"
    >
      <option value="en">EN</option>
      <option value="ta">தமிழ்</option>
      <option value="ml">മലയാളം</option>
      <option value="hi">हिन्दी</option>
    </select>
  );
}