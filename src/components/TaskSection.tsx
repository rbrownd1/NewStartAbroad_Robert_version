import { TaskCard } from './TaskCard';
import type { Task } from '@/data/mockData';

interface TaskSectionProps {
  label: string;
  tasks: Task[];
  completedTasks: string[];
  onToggle: (id: string) => void;
}

export const TaskSection = ({ label, tasks, completedTasks, onToggle }: TaskSectionProps) => {
  if (tasks.length === 0) return null;

  const completed = tasks.filter(t => completedTasks.includes(t.id)).length;

  return (
    <div className="space-y-3">
      <div className="flex items-center justify-between">
        <h3 className="font-heading font-semibold text-lg">{label}</h3>
        <span className="text-sm text-muted-foreground">{completed}/{tasks.length} done</span>
      </div>
      <div className="space-y-2">
        {tasks.map(task => (
          <TaskCard
            key={task.id}
            id={task.id}
            title={task.title}
            description={task.description}
            category={task.category}
            completed={completedTasks.includes(task.id)}
            onToggle={onToggle}
          />
        ))}
      </div>
    </div>
  );
};