import { useState } from 'react';
import { Layout } from '@/components/layout/Layout';
import { ProgressHeader } from '@/components/ProgressHeader';
import { TaskSection } from '@/components/TaskSection';
import { useAppState } from '@/context/AppContext';
import { tasks, timeframeLabels } from '@/data/mockData';

const timeframes = ['before', 'week1', 'month1', 'month3'] as const;

const Plan = () => {
  const { state, toggleTask } = useAppState();
  const [activeTab, setActiveTab] = useState<string>('before');

  const persona = state.persona || 'student';
  const city = state.city || 'London';

  const relevantTasks = tasks.filter(t => t.persona === 'both' || t.persona === persona);
  const progress = relevantTasks.length > 0
    ? (state.completedTasks.filter(id => relevantTasks.some(t => t.id === id)).length / relevantTasks.length) * 100
    : 0;

  const tabTasks = relevantTasks.filter(t => t.timeframe === activeTab);

  return (
    <Layout>
      <div className="container mx-auto px-4 py-8 md:py-12 max-w-3xl">
        <ProgressHeader
          title="Your first 90 days plan"
          subtitle={`${persona === 'student' ? 'Student' : 'Professional'} in ${city}`}
          progress={progress}
        />

        <div className="mt-8 flex gap-2 overflow-x-auto pb-2 scrollbar-hide">
          {timeframes.map(tf => (
            <button
              key={tf}
              onClick={() => setActiveTab(tf)}
              className={`px-4 py-2.5 rounded-full text-sm font-medium whitespace-nowrap transition-colors ${
                activeTab === tf
                  ? 'bg-primary text-primary-foreground'
                  : 'bg-muted text-muted-foreground hover:bg-muted/80'
              }`}
            >
              {timeframeLabels[tf]}
            </button>
          ))}
        </div>

        <div className="mt-6">
          <TaskSection
            label={timeframeLabels[activeTab]}
            tasks={tabTasks}
            completedTasks={state.completedTasks}
            onToggle={toggleTask}
          />
          {tabTasks.length === 0 && (
            <div className="text-center py-12 text-muted-foreground">
              <p>No tasks in this timeframe for your profile.</p>
            </div>
          )}
        </div>
      </div>
    </Layout>
  );
};

export default Plan;
