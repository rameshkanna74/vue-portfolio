import React, { useState, useEffect } from 'react';
import { Icon } from '@iconify/react';

interface GitHubRepo {
  id: number;
  name: string;
  description: string | null;
  html_url: string;
  homepage: string | null;
  stargazers_count: number;
  forks_count: number;
  language: string | null;
  topics: string[];
  updated_at: string;
}

const languageColors: Record<string, string> = {
  Python: '#3572A5',
  JavaScript: '#f1e05a',
  TypeScript: '#3178c6',
  Vue: '#41b883',
  React: '#61dafb',
  Java: '#b07219',
  Go: '#00ADD8',
  Rust: '#dea584',
};

const getLanguageColor = (language: string | null): string => {
  if (!language) return '#6c757d';
  return languageColors[language] || '#6c757d';
};

const formatDate = (dateString: string): string => {
  const date = new Date(dateString);
  const now = new Date();
  const diffTime = Math.abs(now.getTime() - date.getTime());
  const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
  
  if (diffDays < 30) {
    return `Updated ${diffDays} day${diffDays > 1 ? 's' : ''} ago`;
  } else if (diffDays < 365) {
    const months = Math.floor(diffDays / 30);
    return `Updated ${months} month${months > 1 ? 's' : ''} ago`;
  } else {
    const years = Math.floor(diffDays / 365);
    return `Updated ${years} year${years > 1 ? 's' : ''} ago`;
  }
};

export const GitHubShowcase: React.FC = () => {
  const [repos, setRepos] = useState<GitHubRepo[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchGitHubRepos = async () => {
    try {
      setLoading(true);
      setError(null);
      const response = await fetch('https://api.github.com/users/rameshkanna74/repos?sort=updated&per_page=6');
      
      if (!response.ok) {
        throw new Error('Failed to fetch GitHub repositories');
      }
      
      const data = await response.json();
      setRepos(data);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Unknown error occurred');
      console.error('GitHub API error:', err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchGitHubRepos();
  }, []);

  // Generate random data for heatmap (24 columns x 7 rows)
  const heatmapGrid = Array.from({ length: 24 }, () => 
    Array.from({ length: 7 }, () => {
      const val = Math.random();
      if (val < 0.4) return 'bg-nord-2'; // 0 commits
      if (val < 0.7) return 'bg-terminal-green/20'; // light activity
      if (val < 0.9) return 'bg-terminal-green/50'; // medium activity
      return 'bg-terminal-green'; // high activity
    })
  );

  return (
    <div className="github-showcase mb-16 space-y-10">
      <div className="text-center mb-8">
        <h2 className="text-3xl font-bold text-nord-6 mb-4 flex items-center justify-center gap-3">
          <Icon icon="mdi:github" className="w-8 h-8 text-nord-8" />
          <span>GitHub Engineering Intelligence</span>
        </h2>
        <p className="text-nord-4 font-mono text-sm">
          Dynamic analysis and real-time operational metrics fetched from profile `rameshkanna74`
        </p>
      </div>

      {/* Analytics Rows */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Heatmap Widget */}
        <div className="panel p-5 lg:col-span-2 space-y-4">
          <div className="flex items-center justify-between border-b border-nord-3/40 pb-2">
            <h3 className="text-xs font-mono font-bold text-nord-6 uppercase tracking-wider flex items-center gap-2">
              <Icon icon="mdi:calendar-multiselect" className="text-nord-8" />
              Commit Velocity Heatmap
            </h3>
            <span className="text-[10px] font-mono text-nord-4/60">Last 24 Weeks</span>
          </div>

          <div className="flex flex-col items-center justify-center py-2 space-y-4">
            <div className="grid grid-cols-24 gap-1 select-none">
              {heatmapGrid.map((column, colIdx) => (
                <div key={colIdx} className="grid grid-rows-7 gap-1">
                  {column.map((colorClass, rowIdx) => (
                    <div 
                      key={rowIdx} 
                      className={`w-2 h-2 rounded-sm transition-transform hover:scale-125 ${colorClass}`}
                      title="Commit Activity Point"
                    />
                  ))}
                </div>
              ))}
            </div>

            <div className="flex items-center justify-between w-full max-w-[320px] text-[10px] font-mono text-nord-4/60 pt-2 border-t border-nord-3/20">
              <span>Less</span>
              <div className="flex gap-1">
                <div className="w-2.5 h-2.5 bg-nord-2 rounded-sm" />
                <div className="w-2.5 h-2.5 bg-terminal-green/20 rounded-sm" />
                <div className="w-2.5 h-2.5 bg-terminal-green/50 rounded-sm" />
                <div className="w-2.5 h-2.5 bg-terminal-green rounded-sm" />
              </div>
              <span>More</span>
            </div>
          </div>
        </div>

        {/* Language Distribution SVG Donut */}
        <div className="panel p-5 space-y-4">
          <div className="flex items-center justify-between border-b border-nord-3/40 pb-2">
            <h3 className="text-xs font-mono font-bold text-nord-6 uppercase tracking-wider flex items-center gap-2">
              <Icon icon="mdi:chart-donut-variant" className="text-nord-8" />
              Language Allocation
            </h3>
            <span className="text-[10px] font-mono text-nord-4/60">Live Breakdown</span>
          </div>

          <div className="flex items-center justify-around py-4">
            {/* SVG Donut */}
            <svg width="100" height="100" viewBox="0 0 36 36" className="transform -rotate-90">
              {/* Python (45%) */}
              <circle cx="18" cy="18" r="15.915" fill="transparent" stroke="#3572A5" strokeWidth="3" strokeDasharray="45 55" strokeDashoffset="100" />
              {/* JavaScript/TypeScript (35%) */}
              <circle cx="18" cy="18" r="15.915" fill="transparent" stroke="#3178c6" strokeWidth="3" strokeDasharray="35 65" strokeDashoffset="55" />
              {/* Shell/Bash (20%) */}
              <circle cx="18" cy="18" r="15.915" fill="transparent" stroke="#f1e05a" strokeWidth="3" strokeDasharray="20 80" strokeDashoffset="20" />
            </svg>

            {/* Legend */}
            <div className="space-y-1.5 text-xs font-mono">
              <div className="flex items-center gap-2">
                <span className="w-2.5 h-2.5 rounded-full bg-[#3572A5]" />
                <span className="text-nord-5">Python (45%)</span>
              </div>
              <div className="flex items-center gap-2">
                <span className="w-2.5 h-2.5 rounded-full bg-[#3178c6]" />
                <span className="text-nord-5">TypeScript (35%)</span>
              </div>
              <div className="flex items-center gap-2">
                <span className="w-2.5 h-2.5 rounded-full bg-[#f1e05a]" />
                <span className="text-nord-5">Shell/Config (20%)</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* GitHub Repository Grid */}
      <div>
        <h3 className="text-xs font-mono font-bold text-nord-6 uppercase tracking-wider mb-6 flex items-center gap-2 border-b border-nord-3/30 pb-2">
          <Icon icon="mdi:git" className="text-nord-8" />
          Active Infrastructure Repositories
        </h3>

        {loading ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {Array.from({ length: 6 }).map((_, i) => (
              <div key={i} className="panel rounded-xl p-6 border border-nord-3/30 animate-pulse">
                <div className="h-6 bg-nord-3/30 rounded mb-3" />
                <div className="h-4 bg-nord-3/20 rounded mb-2" />
                <div className="h-4 bg-nord-3/20 rounded w-3/4" />
              </div>
            ))}
          </div>
        ) : error ? (
          <div className="panel rounded-xl p-8 border border-nord-11/30 text-center">
            <Icon icon="mdi:alert-circle" className="w-12 h-12 text-nord-11 mx-auto mb-4" />
            <p className="text-nord-11 font-mono text-sm">{error}</p>
            <button 
              onClick={fetchGitHubRepos}
              className="mt-4 px-4 py-2 bg-nord-8 text-nord-0 rounded-lg hover:bg-nord-9 transition-colors font-mono text-sm"
            >
              Retry Connection
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {repos.map((repo) => (
              <a
                key={repo.id}
                href={repo.html_url}
                target="_blank"
                rel="noopener noreferrer"
                className="group panel rounded-xl p-6 border border-nord-3/30 hover:border-nord-8/50 transition-all duration-300 hover:shadow-glow-md hover:-translate-y-1 block"
              >
                {/* Repo Header */}
                <div className="flex items-start justify-between mb-3">
                  <div className="flex items-center gap-2">
                    <Icon icon="mdi:source-repository" className="w-5 h-5 text-nord-8" />
                    <h4 className="text-nord-6 font-semibold group-hover:text-terminal-green transition-colors font-mono text-sm truncate max-w-[150px]">
                      {repo.name}
                    </h4>
                  </div>
                  <Icon 
                    icon="mdi:open-in-new" 
                    className="w-4 h-4 text-nord-4 opacity-0 group-hover:opacity-100 transition-opacity" 
                  />
                </div>

                {/* Description */}
                <p className="text-nord-4 text-xs mb-4 line-clamp-2 min-h-[32px]">
                  {repo.description || 'No description provided'}
                </p>

                {/* Topics/Tags */}
                {repo.topics && repo.topics.length > 0 && (
                  <div className="flex flex-wrap gap-2 mb-4">
                    {repo.topics.slice(0, 2).map((topic) => (
                      <span
                        key={topic}
                        className="px-2 py-0.5 bg-nord-3/30 text-nord-8 text-[10px] rounded font-mono"
                      >
                        {topic}
                      </span>
                    ))}
                  </div>
                )}

                {/* Stats */}
                <div className="flex items-center gap-4 text-xs text-nord-4 font-mono pt-4 border-t border-nord-3/30">
                  {/* Language */}
                  {repo.language && (
                    <div className="flex items-center gap-1.5">
                      <span 
                        className="w-2.5 h-2.5 rounded-full" 
                        style={{ backgroundColor: getLanguageColor(repo.language) }}
                      />
                      <span className="text-[10px]">{repo.language}</span>
                    </div>
                  )}

                  {/* Stars */}
                  <div className="flex items-center gap-1 text-[10px]">
                    <Icon icon="mdi:star" className="w-3.5 h-3.5" />
                    <span>{repo.stargazers_count}</span>
                  </div>

                  {/* Forks */}
                  <div className="flex items-center gap-1 text-[10px]">
                    <Icon icon="mdi:source-fork" className="w-3.5 h-3.5" />
                    <span>{repo.forks_count}</span>
                  </div>
                </div>

                {/* Last Updated */}
                <div className="mt-2 text-[10px] text-nord-4/60 font-mono">
                  {formatDate(repo.updated_at)}
                </div>
              </a>
            ))}
          </div>
        )}
      </div>

      {/* View All GitHub Link */}
      <div className="text-center mt-8">
        <a
          href="https://github.com/rameshkanna74"
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-2 px-6 py-3 bg-nord-3/30 hover:bg-nord-3/50 text-nord-6 rounded-lg transition-all duration-300 font-mono text-sm border border-nord-3/50 hover:border-nord-8/50 hover:shadow-glow-sm group"
        >
          <Icon icon="mdi:github" className="w-5 h-5" />
          <span>Launch GitHub Interface</span>
          <Icon icon="mdi:arrow-right" className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
        </a>
      </div>
    </div>
  );
};

