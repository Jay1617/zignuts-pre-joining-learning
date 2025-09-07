// src/components/UI/EmptyState.tsx
import { Package, ShoppingBag, Search } from "lucide-react";

interface EmptyStateProps {
  icon?: "package" | "bag" | "search";
  title: string;
  description: string;
  action?: {
    label: string;
    onClick: () => void;
  };
}

export function EmptyState({ icon = "package", title, description, action }: EmptyStateProps) {
  const icons = {
    package: Package,
    bag: ShoppingBag,
    search: Search
  };
  
  const Icon = icons[icon];

  return (
    <div className="text-center py-16">
      <div className="w-20 h-20 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-6">
        <Icon className="w-10 h-10 text-gray-400" />
      </div>
      <h3 className="text-xl font-semibold text-gray-900 mb-2">{title}</h3>
      <p className="text-gray-600 mb-6 max-w-sm mx-auto">{description}</p>
      {action && (
        <button
          onClick={action.onClick}
          className="px-6 py-3 bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white font-medium rounded-lg transition-all duration-200 transform hover:scale-105 shadow-lg hover:shadow-xl"
        >
          {action.label}
        </button>
      )}
    </div>
  );
}