-- Session tracking table
-- Run this to enable session persistence

CREATE TABLE IF NOT EXISTS _sessions (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  project_slug TEXT NOT NULL,
  started_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  ended_at TIMESTAMP WITH TIME ZONE,
  status TEXT DEFAULT 'active', -- active, completed, abandoned
  
  -- Context fields
  current_focus TEXT,           -- What we're working on
  accomplished TEXT,            -- What got done this session
  decisions TEXT,               -- Key decisions made
  blockers TEXT,                -- Open questions/blockers
  next_steps TEXT,              -- Suggested next actions
  
  -- Metadata
  files_touched TEXT,           -- Comma-separated file paths
  entities_modified TEXT,       -- Entities worked on
  notes TEXT                    -- Free-form notes
);

CREATE INDEX idx_sessions_project ON _sessions(project_slug);
CREATE INDEX idx_sessions_ended ON _sessions(ended_at DESC);
