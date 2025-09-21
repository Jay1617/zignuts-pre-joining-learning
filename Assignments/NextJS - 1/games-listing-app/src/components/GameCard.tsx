import { Star } from "lucide-react";
import { EditorChoiceBadge } from "./EditorChoiceBadge";

interface Game {
  title: string;
  platform: string;
  score: number;
  genre: string;
  editors_choice: string;
}
interface GameCardProps {
  game: Game;
}

export const GameCard: React.FC<GameCardProps> = ({ game }) => {
  const isEditorChoice = game.editors_choice?.toLowerCase() === "yes";

  const getRatingClass = (score: number) => {
    if (score >= 8) return "bg-green-100 text-green-800";
    if (score >= 6) return "bg-yellow-100 text-yellow-800";
    if (score >= 4) return "bg-orange-100 text-orange-800";
    return "bg-red-100 text-red-800";
  };

  const getRatingText = (score: number) => {
    if (score >= 8) return "Excellent";
    if (score >= 6) return "Good";
    if (score >= 4) return "Fair";
    return "Poor";
  };

  return (
    <div className="bg-white rounded-xl shadow-md overflow-hidden transition-all duration-300 hover:shadow-xl hover:scale-105 hover:-translate-y-1 border border-gray-100 cursor-pointer">
      <div className="p-6">
        <div className="flex justify-between items-start mb-3">
          <h3 className="text-xl font-bold text-gray-800 line-clamp-2 flex-1 mr-2">
            {game.title}
          </h3>
          {isEditorChoice && <EditorChoiceBadge />}
        </div>

        <div className="space-y-2 mb-4">
          <div className="flex items-center text-sm text-gray-600">
            <span className="font-medium">Platform:</span>
            <span className="ml-2 px-2 py-1 bg-blue-100 text-blue-800 rounded-full text-xs font-medium">
              {game.platform}
            </span>
          </div>

          <div className="flex items-center text-sm text-gray-600">
            <span className="font-medium">Genre:</span>
            <span className="ml-2 px-2 py-1 bg-purple-100 text-purple-800 rounded-full text-xs font-medium">
              {game.genre}
            </span>
          </div>
        </div>

        <div className="flex justify-between items-center">
          <div className="flex items-center">
            <Star className="w-4 h-4 text-yellow-500 mr-1 fill-current" />
            <span className="text-lg font-bold text-gray-800">
              {game.score}
            </span>
            <span className="text-sm text-gray-500 ml-1">/10</span>
          </div>

          <div
            className={`px-3 py-1 rounded-full text-sm font-medium ${getRatingClass(
              game.score
            )}`}
          >
            {getRatingText(game.score)}
          </div>
        </div>
      </div>
    </div>
  );
};
