import React, { useState, useEffect } from "react";
import { Button } from "./components/ui/button";
import { Card, CardContent } from "./components/ui/card";

export default function ZoomDiceGame() {
  const [diceResult, setDiceResult] = useState(null);
  const [currentQuestion, setCurrentQuestion] = useState(null);
  const [editMode, setEditMode] = useState(false);
  const [customQuestions, setCustomQuestions] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch("https://gist.githubusercontent.com/kpucapuc/ed789ed5ecabb334f357d2273148516a/raw/6f362887ac48fecceb2ef48d4ef8583c1816509a/questions.json")
      .then(res => res.json())
      .then(data => {
        setCustomQuestions(data);
        setLoading(false);
      })
      .catch(() => {
        // Если не удалось загрузить — подставим стандарт
        const fallback = Array.from({ length: 100 }, (_, i) => `Введите вопрос №${i + 1}`);
        setCustomQuestions(fallback);
        setLoading(false);
      });
  }, []);

  const rollDice = () => {
    const result = Math.floor(Math.random() * 100) + 1;
    setDiceResult(result);
    setCurrentQuestion(customQuestions[result - 1]);
  };

  const handleQuestionChange = (index, value) => {
    const updated = [...customQuestions];
    updated[index] = value;
    setCustomQuestions(updated);
  };

  if (loading) return <p className="text-center mt-10">Загрузка вопросов...</p>;

  return (
    <div className="min-h-screen p-8 bg-gray-100 text-center">
      <h1 className="text-3xl font-bold mb-6">🎲 Поделись со мной</h1>

      <div className="mb-8 flex justify-center space-x-4">
        <Button onClick={() => setEditMode(false)} variant={!editMode ? "default" : "outline"}>
          Колода
        </Button>
        <Button onClick={() => setEditMode(true)} variant={editMode ? "default" : "outline"}>
          Каталог карт
        </Button>
      </div>

      {!editMode ? (
        <div>
          <div className="flex justify-center mb-6">
            <Button onClick={rollDice}>Бросить d100</Button>
          </div>

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
