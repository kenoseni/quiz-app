import { shuffleArray } from "./utils";

export type QuizData = {
  category: string;
  correct_answer: string;
  difficulty: string;
  incorrect_answers: string[];
  question: string;
  type: string;
};

export type QuestionState = QuizData & { answers: string[] };

export enum Difficulty {
  EASY = "easy",
  MEDIUM = "medium",
  HARD = "hard",
}
export const FetchQuizData = async (amount: number, difficulty: Difficulty) => {
  const endpoint = `https://opentdb.com/api.php?amount=${amount}&type=multiple&difficulty=${difficulty}`;

  const data = await (await fetch(endpoint)).json();
  return data.results.map((quizData: QuizData) => ({
    ...quizData,
    answers: shuffleArray([
      ...quizData.incorrect_answers,
      quizData.correct_answer,
    ]),
  }));
};
