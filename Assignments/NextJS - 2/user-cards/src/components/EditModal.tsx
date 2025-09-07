// EditModal.tsx
"use client";

import React, { useEffect, useState } from "react";
import type { UIUser } from "./UserCard";
import { FaTimes, FaUser, FaEnvelope, FaPhone, FaGlobe, FaBuilding, FaMapMarkerAlt, FaSave } from "react-icons/fa";

type Editable = Pick<
  UIUser,
  | "id"
  | "name"
  | "email"
  | "phone"
  | "website"
  | "username"
  | "address"
  | "company"
>;

export default function EditModal({
  isOpen,
  user,
  onClose,
  onSave,
}: {
  isOpen: boolean;
  user: Editable | null;
  onClose: () => void;
  onSave: (payload: Editable) => void;
}) {
  const [state, setState] = useState<Editable | null>(null);

  useEffect(() => {
    setState(user);
  }, [user]);

  if (!isOpen || !state) return null;

  const update = (path: string, value: string) => {
    setState((prev) => {
      if (!prev) return prev;
      const next: any = structuredClone(prev);
      const keys = path.split(".");
      let ref = next;
      for (let i = 0; i < keys.length - 1; i++) ref = ref[keys[i]];
      ref[keys[keys.length - 1]] = value;
      return next;
    });
  };

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 p-4 backdrop-blur-sm transition-opacity duration-300"
      onClick={onClose}
    >
      <div
        onClick={(e) => e.stopPropagation()}
        className="w-full max-w-2xl rounded-xl bg-white shadow-2xl border border-gray-100 overflow-hidden transform scale-100 opacity-100 transition-all duration-300"
      >
        {/* Header */}
        <div className="flex items-center justify-between border-b border-gray-200 px-6 py-4 bg-gray-50">
          <h3 className="text-xl font-semibold text-gray-800 flex items-center gap-2">
            <FaUser className="text-blue-500" />
            Edit User Profile
          </h3>
          <button
            onClick={onClose}
            className="text-gray-400 hover:text-gray-600 transition-colors duration-200 cursor-pointer p-1 hover:bg-gray-100 rounded-full"
            title="Close"
          >
            <FaTimes className="w-5 h-5" />
          </button>
        </div>

        {/* Form */}
        <form
          onSubmit={(e) => {
            e.preventDefault();
            if (state) onSave(state);
          }}
          className="px-6 py-5 space-y-6 max-h-[70vh] overflow-y-auto"
        >
          {/* Basic Info */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            <label className="flex flex-col">
              <span className="text-gray-700 mb-2 font-medium flex items-center gap-1.5">
                <FaUser className="text-blue-500 w-3.5 h-3.5" />
                Name
              </span>
              <input
                className="rounded-lg border border-gray-300 px-4 py-2.5 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-colors duration-200 text-gray-800"
                value={state.name}
                onChange={(e) => update("name", e.target.value)}
              />
            </label>
            <label className="flex flex-col">
              <span className="text-gray-700 mb-2 font-medium flex items-center gap-1.5">
                <FaUser className="text-blue-500 w-3.5 h-3.5" />
                Username
              </span>
              <input
                className="rounded-lg border border-gray-300 px-4 py-2.5 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-colors duration-200 text-gray-800"
                value={state.username}
                onChange={(e) => update("username", e.target.value)}
              />
            </label>
            <label className="flex flex-col">
              <span className="text-gray-700 mb-2 font-medium flex items-center gap-1.5">
                <FaEnvelope className="text-blue-500 w-3.5 h-3.5" />
                Email
              </span>
              <input
                type="email"
                className="rounded-lg border border-gray-300 px-4 py-2.5 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-colors duration-200 text-gray-800"
                value={state.email}
                onChange={(e) => update("email", e.target.value)}
              />
            </label>
            <label className="flex flex-col">
              <span className="text-gray-700 mb-2 font-medium flex items-center gap-1.5">
                <FaPhone className="text-blue-500 w-3.5 h-3.5" />
                Phone
              </span>
              <input
                className="rounded-lg border border-gray-300 px-4 py-2.5 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-colors duration-200 text-gray-800"
                value={state.phone}
                onChange={(e) => update("phone", e.target.value)}
              />
            </label>
            <label className="flex flex-col">
              <span className="text-gray-700 mb-2 font-medium flex items-center gap-1.5">
                <FaGlobe className="text-blue-500 w-3.5 h-3.5" />
                Website
              </span>
              <input
                className="rounded-lg border border-gray-300 px-4 py-2.5 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-colors duration-200 text-gray-800"
                value={state.website}
                onChange={(e) => update("website", e.target.value)}
              />
            </label>
            <label className="flex flex-col">
              <span className="text-gray-700 mb-2 font-medium flex items-center gap-1.5">
                <FaBuilding className="text-blue-500 w-3.5 h-3.5" />
                Company
              </span>
              <input
                className="rounded-lg border border-gray-300 px-4 py-2.5 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-colors duration-200 text-gray-800"
                value={state.company.name}
                onChange={(e) => update("company.name", e.target.value)}
              />
            </label>
          </div>

          {/* Address */}
          <fieldset className="rounded-xl border border-gray-300 px-5 py-4 bg-gray-50">
            <legend className="text-sm text-gray-700 font-medium px-2 flex items-center gap-2">
              <FaMapMarkerAlt className="text-blue-500" />
              Address
            </legend>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-5 mt-4">
              <label className="flex flex-col">
                <span className="text-gray-700 mb-2">Street</span>
                <input
                  className="rounded-lg border border-gray-300 px-4 py-2.5 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-colors duration-200 text-gray-800"
                  value={state.address.street}
                  onChange={(e) => update("address.street", e.target.value)}
                />
              </label>
              <label className="flex flex-col">
                <span className="text-gray-700 mb-2">Suite</span>
                <input
                  className="rounded-lg border border-gray-300 px-4 py-2.5 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-colors duration-200 text-gray-800"
                  value={state.address.suite}
                  onChange={(e) => update("address.suite", e.target.value)}
                />
              </label>
              <label className="flex flex-col">
                <span className="text-gray-700 mb-2">City</span>
                <input
                  className="rounded-lg border border-gray-300 px-4 py-2.5 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-colors duration-200 text-gray-800"
                  value={state.address.city}
                  onChange={(e) => update("address.city", e.target.value)}
                />
              </label>
              <label className="flex flex-col">
                <span className="text-gray-700 mb-2">Zipcode</span>
                <input
                  className="rounded-lg border border-gray-300 px-4 py-2.5 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-colors duration-200 text-gray-800"
                  value={state.address.zipcode}
                  onChange={(e) => update("address.zipcode", e.target.value)}
                />
              </label>
            </div>
          </fieldset>

          {/* Footer Actions */}
          <div className="flex justify-end gap-3 border-t border-gray-200 pt-5">
            <button
              type="button"
              onClick={onClose}
              className="rounded-lg border border-gray-300 px-5 py-2.5 text-gray-700 bg-white hover:bg-gray-50 transition-colors duration-200 cursor-pointer font-medium"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="rounded-lg px-5 py-2.5 bg-blue-600 text-white hover:bg-blue-700 transition-colors duration-200 cursor-pointer font-medium flex items-center gap-2"
            >
              <FaSave className="w-4 h-4" />
              Save Changes
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}