const N8N_BASE_URL = import.meta.env.VITE_N8N_WEBHOOK_URL || 'http://localhost:5678';

// ─── Type Definitions ───────────────────────────────────────────────

export interface QuizAnswers {
  sex: string;
  age: string;
  height: number;
  weight: number;
  shape: string;
}

export interface WorkoutExercise {
  name: string;
  sets: number;
  reps: string;
  rest: string;
  notes?: string;
}

export interface WorkoutDay {
  day: string;
  focus: string;
  exercises: WorkoutExercise[];
}

export interface WorkoutPlan {
  title: string;
  description: string;
  frequency: string;
  duration: string;
  level: string;
  days: WorkoutDay[];
  tips: string[];
}

export interface SubmitQuizResponse {
  requestId: string;
}

export interface PollStatusResponse {
  status: 'processing' | 'completed' | 'error';
  progress?: number;
  workoutPlan?: WorkoutPlan;
  error?: string;
}

// ─── API Functions ──────────────────────────────────────────────────

/**
 * Submits quiz answers to N8N webhook and receives a requestId for polling.
 */
export async function submitQuizToN8N(answers: QuizAnswers): Promise<SubmitQuizResponse> {
  const response = await fetch(`${N8N_BASE_URL}/webhook/protocol-w-generate1`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(answers),
  });

  if (!response.ok) {
    throw new Error(`Failed to submit quiz: ${response.statusText}`);
  }

  return response.json();
}

/**
 * Polls N8N for the status of the workout generation.
 */
export async function pollWorkoutStatus(requestId: string): Promise<PollStatusResponse> {
  const response = await fetch(
    `${N8N_BASE_URL}/webhook/protocol-w-status1?requestId=${requestId}`,
    { method: 'GET' }
  );

  if (!response.ok) {
    throw new Error(`Failed to poll status: ${response.statusText}`);
  }

  return response.json();
}
