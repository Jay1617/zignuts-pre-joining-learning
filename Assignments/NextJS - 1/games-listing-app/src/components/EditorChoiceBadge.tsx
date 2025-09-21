import { Award } from "lucide-react";

export const EditorChoiceBadge: React.FC = () => {
  return (
    <div className="inline-flex items-center px-2 py-1 rounded-full text-xs font-semibold bg-gradient-to-r from-yellow-400 to-orange-500 text-white shadow-md cursor-pointer">
      <Award className="w-3 h-3 mr-1" />
      Editor's Choice
    </div>
  );
};