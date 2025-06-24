import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";

const questions = Array.from({ length: 100 }, (_, i) => `Введите вопрос №${i + 1}`);

export default function ZoomDiceGame() {
  const [diceResult, setDiceResult] = useState<number | null>(null);
  const [currentQuestion, setCurrentQuestion] = useState<string | null>(null);
  const [editMode, setEditMode] = useState(false);
  const [customQuestions, setCustomQuestions] = useState([...questions]);

  const rollDice = () => {
    const result = Math.floor(Math.random() * 100) + 1;
    setDiceResult(result);
    setCurrentQuestion(customQuestions[result - 1]);
  };

  const handleQuestionChange = (index: number, value: string) => {
    const updated = [...customQuestions];
    updated[index] = value;
    setCustomQuestions(updated);
  };

  return (
    <div className="min-h-screen p-8 bg-gray-100 text-center">
      <h1 className="text-3xl font-bold mb-6">🎲 Поделись со мной</h1>

      <div className="mb-8 space-x-4">
        <Button onClick={() => setEditMode(false)} variant={!editMode ? "default" : "outline"}>Колода</Button>
        <Button onClick={() => setEditMode(true)} variant={editMode ? "default" : "outline"}>Каталог карт</Button>
      </div>

      {!editMode ? (
        <div>
          <Button className="mb-6" onClick={rollDice}>Бросить d100</Button>
          {diceResult && (
            <Card className="max-w-xl mx-auto">
              <CardContent className="p-6">
                <p className="text-lg font-semibold">🎲 Выпало: {diceResult}</p>
                <p className="mt-4">{currentQuestion}</p>
              </CardContent>
            </Card>
          )}
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 max-w-4xl mx-auto">
          {customQuestions.map((q, idx) => (
            <Card key={idx}>
              <CardContent className="p-4">
                <p className="font-bold mb-2">Вопрос #{idx + 1}</p>
                <textarea
                  className="w-full border rounded p-2"
                  value={q}
                  rows={2}
                  onChange={(e) => handleQuestionChange(idx, e.target.value)}
                />
              </CardContent>
            </Card>
          ))}
        </div>
      )}
    </div>
  );
}
