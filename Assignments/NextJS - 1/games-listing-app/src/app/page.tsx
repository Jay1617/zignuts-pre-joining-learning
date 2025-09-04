"use client";
import React, { useState, useEffect, useMemo } from 'react';
import { Search, Star, Award, Filter, ChevronDown } from 'lucide-react';

// Types
interface Game {
  title: string;
  platform: string;
  score: number;
  genre: string;
  editors_choice: string;
}

// Loading Skeleton Component
const GameCardSkeleton: React.FC = () => {
  return (
    <div className="bg-white rounded-xl shadow-md overflow-hidden animate-pulse">
      <div className="p-6">
        <div className="h-6 bg-gray-200 rounded mb-3"></div>
        <div className="h-4 bg-gray-200 rounded mb-2 w-3/4"></div>
        <div className="h-4 bg-gray-200 rounded mb-4 w-1/2"></div>
        <div className="flex justify-between items-center">
          <div className="h-4 bg-gray-200 rounded w-1/4"></div>
          <div className="h-6 bg-gray-200 rounded w-12"></div>
        </div>
      </div>
    </div>
  );
};

// Editor's Choice Badge Component
const EditorChoiceBadge: React.FC = () => {
  return (
    <div className="inline-flex items-center px-2 py-1 rounded-full text-xs font-semibold bg-gradient-to-r from-yellow-400 to-orange-500 text-white shadow-md cursor-pointer">
      <Award className="w-3 h-3 mr-1" />
      Editor's Choice
    </div>
  );
};

// Game Card Component
interface GameCardProps {
  game: Game;
}

const GameCard: React.FC<GameCardProps> = ({ game }) => {
  const isEditorChoice = game.editors_choice?.toLowerCase() === 'yes';
  
  const getRatingClass = (score: number) => {
    if (score >= 8) return 'bg-green-100 text-green-800';
    if (score >= 6) return 'bg-yellow-100 text-yellow-800';
    if (score >= 4) return 'bg-orange-100 text-orange-800';
    return 'bg-red-100 text-red-800';
  };

  const getRatingText = (score: number) => {
    if (score >= 8) return 'Excellent';
    if (score >= 6) return 'Good';
    if (score >= 4) return 'Fair';
    return 'Poor';
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
            <span className="text-lg font-bold text-gray-800">{game.score}</span>
            <span className="text-sm text-gray-500 ml-1">/10</span>
          </div>
          
          <div className={`px-3 py-1 rounded-full text-sm font-medium ${getRatingClass(game.score)}`}>
            {getRatingText(game.score)}
          </div>
        </div>
      </div>
    </div>
  );
};

// Auto-complete Search Component
interface AutocompleteSearchProps {
  games: Game[];
  onSearch: (query: string) => void;
  searchQuery: string;
}

const AutocompleteSearch: React.FC<AutocompleteSearchProps> = ({ 
  games, 
  onSearch, 
  searchQuery 
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const [inputValue, setInputValue] = useState(searchQuery);

  // Get filtered suggestions based on input
  const suggestions = useMemo(() => {
    if (!inputValue.trim()) return [];
    
    return games
      .filter(game => 
        game.title.toLowerCase().includes(inputValue.toLowerCase())
      )
      .slice(0, 5)
      .map(game => game.title);
  }, [games, inputValue]);

  const handleInputChange = (value: string) => {
    setInputValue(value);
    onSearch(value);
    setIsOpen(value.length > 0);
  };

  const handleSuggestionClick = (suggestion: string) => {
    setInputValue(suggestion);
    onSearch(suggestion);
    setIsOpen(false);
  };

  return (
    <div className="relative w-full max-w-md">
      <div className="relative">
        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
        <input
          type="text"
          placeholder="Search games..."
          value={inputValue}
          onChange={(e) => handleInputChange(e.target.value)}
          onFocus={() => setIsOpen(inputValue.length > 0)}
          onBlur={() => setTimeout(() => setIsOpen(false), 200)}
          className="w-full pl-10 pr-4 py-3 text-gray-border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-all duration-200 cursor-text"
        />
      </div>
      
      {isOpen && suggestions.length > 0 && (
        <div className="absolute top-full left-0 right-0 mt-1 bg-white border border-gray-200 rounded-lg shadow-lg z-50 max-h-60 overflow-y-auto">
          {suggestions.map((suggestion, index) => (
            <button
              key={index}
              onClick={() => handleSuggestionClick(suggestion)}
              className="w-full text-left px-4 py-3 hover:bg-gray-50 transition-colors duration-150 border-b border-gray-100 last:border-b-0 cursor-pointer"
            >
              <span className="text-gray-800">{suggestion}</span>
            </button>
          ))}
        </div>
      )}
    </div>
  );
};

// Platform Filter Component
interface PlatformFilterProps {
  platforms: string[];
  selectedPlatform: string;
  onPlatformChange: (platform: string) => void;
}

const PlatformFilter: React.FC<PlatformFilterProps> = ({ 
  platforms, 
  selectedPlatform, 
  onPlatformChange 
}) => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="relative">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center justify-between w-full px-4 py-3 bg-white border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors duration-200 min-w-[200px] cursor-pointer"
      >
        <div className="flex items-center">
          <Filter className="w-4 h-4 mr-2 text-gray-500" />
          <span className="text-gray-700">
            {selectedPlatform === 'all' ? 'All Platforms' : selectedPlatform}
          </span>
        </div>
        <ChevronDown className={`w-4 h-4 text-gray-500 transition-transform duration-200 ${isOpen ? 'rotate-180' : ''}`} />
      </button>
      
      {isOpen && (
        <div className="absolute top-full left-0 right-0 mt-1 bg-white border border-gray-200 rounded-lg shadow-lg z-50 max-h-60 overflow-y-auto">
          <button
            onClick={() => {
              onPlatformChange('all');
              setIsOpen(false);
            }}
            className={`w-full text-left px-4 py-3 hover:bg-gray-50 transition-colors duration-150 border-b border-gray-100 cursor-pointer ${
              selectedPlatform === 'all' ? 'bg-blue-50 text-blue-700' : 'text-gray-700'
            }`}
          >
            All Platforms
          </button>
          {platforms.map((platform) => (
            <button
              key={platform}
              onClick={() => {
                onPlatformChange(platform);
                setIsOpen(false);
              }}
              className={`w-full text-left px-4 py-3 hover:bg-gray-50 transition-colors duration-150 border-b border-gray-100 last:border-b-0 cursor-pointer ${
                selectedPlatform === platform ? 'bg-blue-50 text-blue-700' : 'text-gray-700'
              }`}
            >
              {platform}
            </button>
          ))}
        </div>
      )}
    </div>
  );
};

// Game Listing Component
interface GameListingProps {
  games: Game[];
  loading: boolean;
  initialLoad: boolean;
}

const GameListing: React.FC<GameListingProps> = ({ games, loading, initialLoad }) => {
  if (initialLoad) {
    return (
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {Array.from({ length: 6 }).map((_, index) => (
          <GameCardSkeleton key={index} />
        ))}
      </div>
    );
  }

  if (games.length === 0) {
    return (
      <div className="text-center py-12">
        <div className="text-gray-400 text-6xl mb-4">🎮</div>
        <h3 className="text-xl font-semibold text-gray-600 mb-2">No games found</h3>
        <p className="text-gray-500">Try adjusting your search or filter criteria</p>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {games.map((game, index) => (
        <GameCard key={`${game.title}-${game.platform}-${index}`} game={game} />
      ))}
    </div>
  );
};

// Main App Component
const GameBrowserApp: React.FC = () => {
  const [games, setGames] = useState<Game[]>([]);
  const [loading, setLoading] = useState(true);
  const [initialLoad, setInitialLoad] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedPlatform, setSelectedPlatform] = useState('all');

  // Fetch games data
  useEffect(() => {
    const fetchGames = async () => {
      try {
        setLoading(true);
        const response = await fetch('https://s3-ap-southeast-1.amazonaws.com/he-public-data/gamesarena274f2bf.json');
        
        if (!response.ok) {
          throw new Error('Failed to fetch games data');
        }
        
        const data = await response.json();
        
        if (!Array.isArray(data)) {
          throw new Error('Invalid data format received from API');
        }

        // Filter out any empty objects and ensure required fields exist
        const validGames = data.slice(1).filter(game => 
          game && game.title && game.platform && game.score !== undefined
        );

        setGames(validGames);
      } catch (err) {
        setError(err instanceof Error ? err.message : 'An error occurred');
      } finally {
        setLoading(false);
        setInitialLoad(false);
      }
    };

    fetchGames();
  }, []);

  // Get unique platforms for filter
  const platforms = useMemo(() => {
    const uniquePlatforms = [...new Set(games.map(game => game.platform))];
    return uniquePlatforms.sort();
  }, [games]);

  // Filter and search games
  const filteredGames = useMemo(() => {
    let filtered = [...games];

    // Apply platform filter
    if (selectedPlatform !== 'all') {
      filtered = filtered.filter(game => game.platform === selectedPlatform);
    }

    // Apply search filter
    if (searchQuery.trim()) {
      filtered = filtered.filter(game =>
        game.title.toLowerCase().includes(searchQuery.toLowerCase())
      );
    }

    // Sort by score (highest first), then by editor's choice
    filtered.sort((a, b) => {
      // Editor's choice games first
      const aEditorChoice = a.editors_choice?.toLowerCase() === 'yes';
      const bEditorChoice = b.editors_choice?.toLowerCase() === 'yes';
      
      if (aEditorChoice && !bEditorChoice) return -1;
      if (!aEditorChoice && bEditorChoice) return 1;
      
      // Then by score
      return b.score - a.score;
    });

    return filtered;
  }, [games, selectedPlatform, searchQuery]);

  // Statistics
  const stats = useMemo(() => {
    const totalGames = filteredGames.length;
    const editorChoiceCount = filteredGames.filter(
      game => game.editors_choice?.toLowerCase() === 'yes'
    ).length;
    const averageScore = totalGames > 0 
      ? (filteredGames.reduce((sum, game) => sum + game.score, 0) / totalGames).toFixed(1)
      : '0';

    return { totalGames, editorChoiceCount, averageScore };
  }, [filteredGames]);

  if (error) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 flex items-center justify-center">
        <div className="text-center">
          <div className="text-red-500 text-6xl mb-4">⚠️</div>
          <h2 className="text-2xl font-bold text-gray-800 mb-2">Error Loading Games</h2>
          <p className="text-gray-600">{error}</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100">
      {/* Header */}
      <header className="bg-white shadow-lg border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="py-6">
            <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-6">
              <div>
                <h1 className="text-3xl font-bold text-gray-900 mb-2 cursor-default">
                  🎮 Game Arena
                </h1>
                <p className="text-gray-600 cursor-default">
                  Discover and explore amazing games across all platforms
                </p>
              </div>
              
              <div className="flex flex-col sm:flex-row gap-4 items-stretch sm:items-center">
                <AutocompleteSearch 
                  games={games}
                  onSearch={setSearchQuery}
                  searchQuery={searchQuery}
                />
                <PlatformFilter
                  platforms={platforms}
                  selectedPlatform={selectedPlatform}
                  onPlatformChange={setSelectedPlatform}
                />
              </div>
            </div>
          </div>
        </div>
      </header>

      {/* Stats Bar */}
      <div className="bg-white border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex flex-wrap gap-6 text-sm">
            <div className="flex items-center cursor-default">
              <span className="text-gray-600">Total Games:</span>
              <span className="ml-2 font-bold text-blue-600">{stats.totalGames}</span>
            </div>
            <div className="flex items-center cursor-default">
              <span className="text-gray-600">Editor's Choice:</span>
              <span className="ml-2 font-bold text-yellow-600">{stats.editorChoiceCount}</span>
            </div>
            <div className="flex items-center cursor-default">
              <span className="text-gray-600">Average Score:</span>
              <span className="ml-2 font-bold text-green-600">{stats.averageScore}</span>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Active Filters */}
        {(selectedPlatform !== 'all' || searchQuery) && (
          <div className="mb-6 flex flex-wrap gap-2">
            <span className="text-sm text-gray-600 cursor-default">Active filters:</span>
            {selectedPlatform !== 'all' && (
              <button
                onClick={() => setSelectedPlatform('all')}
                className="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-blue-100 text-blue-800 hover:bg-blue-200 transition-colors duration-200 cursor-pointer"
              >
                Platform: {selectedPlatform}
                <span className="ml-1 text-blue-600">×</span>
              </button>
            )}
            {searchQuery && (
              <button
                onClick={() => setSearchQuery('')}
                className="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-green-100 text-green-800 hover:bg-green-200 transition-colors duration-200 cursor-pointer"
              >
                Search: "{searchQuery}"
                <span className="ml-1 text-green-600">×</span>
              </button>
            )}
          </div>
        )}

        {/* Game Listing */}
        <GameListing games={filteredGames} loading={loading} initialLoad={initialLoad} />
      </main>

      {/* Footer */}
      <footer className="bg-white border-t border-gray-200 mt-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 text-center text-gray-600 cursor-default">
          <p>© 2025 Game Arena - Your ultimate gaming destination</p>
        </div>
      </footer>
    </div>
  );
};

export default GameBrowserApp;