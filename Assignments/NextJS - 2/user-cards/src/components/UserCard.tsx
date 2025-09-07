// UserCard.tsx
import React from "react";
import { FaHeart, FaRegHeart, FaEdit, FaTrash, FaEnvelope, FaPhone, FaGlobe, FaMapMarkerAlt, FaBuilding } from "react-icons/fa";

export type UIUser = {
  id: number;
  username: string;
  name: string;
  email: string;
  phone: string;
  website: string;
  address: { street: string; suite: string; city: string; zipcode: string };
  company: { name: string };
  liked?: boolean;
};

function avatarUrl(username: string) {
  return `https://api.dicebear.com/9.x/personas/svg?seed=${encodeURIComponent(
    username
  )}`;
}

export default function UserCard({
  user,
  onLike,
  onEdit,
  onRemove,
}: {
  user: UIUser;
  onLike: () => void;
  onEdit: () => void;
  onRemove: () => void;
}) {
  return (
    <article className="bg-white border border-gray-200 rounded-xl p-6 hover:shadow-lg transition-all duration-300 transform hover:-translate-y-1 group">
      {/* Avatar and Name Section */}
      <div className="flex flex-col items-center mb-5">
        <div className="relative mb-4">
          <img
            src={avatarUrl(user.username)}
            alt={`${user.username} avatar`}
            className="w-24 h-24 rounded-full bg-gray-100 border-4 border-white shadow-md group-hover:border-blue-100 transition-colors duration-300"
          />
          <div className="absolute -bottom-1 -right-1 bg-white rounded-full p-1 shadow-md">
            <button
              onClick={onLike}
              className={`p-2 rounded-full transition-all duration-200 ${
                user.liked
                  ? "text-red-500 hover:text-red-600"
                  : "text-gray-400 hover:text-red-500"
              }`}
              title={user.liked ? "Unlike" : "Like"}
            >
              {user.liked ? (
                <FaHeart className="w-5 h-5" />
              ) : (
                <FaRegHeart className="w-5 h-5" />
              )}
            </button>
          </div>
        </div>

        <h3 className="text-xl font-bold text-gray-800 text-center mb-1">
          {user.name}
        </h3>
        <p className="text-sm text-gray-500 mb-4">@{user.username}</p>
        
        {/* Company Info */}
        <div className="flex items-center gap-2 text-sm text-gray-600 bg-blue-50 px-3 py-1.5 rounded-full">
          <FaBuilding className="text-blue-500 w-3.5 h-3.5" />
          <span className="text-blue-700">{user.company.name}</span>
        </div>
      </div>

      {/* Contact Info */}
      <div className="space-y-3 text-sm text-gray-600 mb-5">
        <div className="flex items-center gap-3 p-2 rounded-lg hover:bg-gray-50 transition-colors duration-150">
          <FaEnvelope className="text-blue-500 w-4 h-4 flex-shrink-0" />
          <span className="truncate">{user.email}</span>
        </div>
        <div className="flex items-center gap-3 p-2 rounded-lg hover:bg-gray-50 transition-colors duration-150">
          <FaPhone className="text-blue-500 w-4 h-4 flex-shrink-0" />
          <span>{user.phone}</span>
        </div>
        <div className="flex items-center gap-3 p-2 rounded-lg hover:bg-gray-50 transition-colors duration-150">
          <FaGlobe className="text-blue-500 w-4 h-4 flex-shrink-0" />
          <span className="truncate text-blue-600 hover:text-blue-800 transition-colors duration-150 cursor-pointer">
            {user.website}
          </span>
        </div>
        <div className="flex items-start gap-3 p-2 rounded-lg hover:bg-gray-50 transition-colors duration-150">
          <FaMapMarkerAlt className="text-blue-500 w-4 h-4 mt-0.5 flex-shrink-0" />
          <div className="flex flex-col">
            <span>{user.address.street}</span>
            <span className="text-gray-500">
              {user.address.city}, {user.address.zipcode}
            </span>
          </div>
        </div>
      </div>

      {/* Action Buttons */}
      <div className="flex justify-center gap-4 pt-4 border-t border-gray-100">
        <button
          onClick={onEdit}
          className="flex items-center justify-center gap-1.5 px-4 py-2 rounded-lg text-blue-600 hover:bg-blue-50 transition-colors duration-200 cursor-pointer"
          title="Edit"
        >
          <FaEdit className="w-4 h-4" />
          <span className="text-sm font-medium">Edit</span>
        </button>

        <button
          onClick={onRemove}
          className="flex items-center justify-center gap-1.5 px-4 py-2 rounded-lg text-red-600 hover:bg-red-50 transition-colors duration-200 cursor-pointer"
          title="Remove"
        >
          <FaTrash className="w-4 h-4" />
          <span className="text-sm font-medium">Remove</span>
        </button>
      </div>
    </article>
  );
}