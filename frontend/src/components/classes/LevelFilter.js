import React from 'react';

const LevelFilter = ({ selectedLevel, onLevelChange, levels }) => {
  return (
    <div className="mb-8">
      <h3 className="text-lg font-semibold text-gray-800 mb-4">난이도별 필터</h3>
      <div className="flex flex-wrap gap-3">
        <button
          onClick={() => onLevelChange('all')}
          className={`px-4 py-2 rounded-full text-sm font-medium transition-colors ${
            selectedLevel === 'all'
              ? 'bg-green-500 text-white'
              : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
          }`}
        >
          전체 ({levels.total || 0})
        </button>
        {levels.map((level) => (
          <button
            key={level.id}
            onClick={() => onLevelChange(level.id)}
            className={`px-4 py-2 rounded-full text-sm font-medium transition-colors ${
              selectedLevel === level.id
                ? 'bg-green-500 text-white'
                : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
            }`}
          >
            {level.name} ({level.count})
          </button>
        ))}
      </div>
    </div>
  );
};

export default LevelFilter;



