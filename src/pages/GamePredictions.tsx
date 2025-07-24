import React from 'react';

export default function GamePredictions() {
  return (
    <div className="min-h-screen bg-background text-foreground p-6">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-4xl font-bold text-center mb-8 text-primary">
          Game Predictions
        </h1>
        
        <div className="bg-card rounded-lg p-6 border">
          <h2 className="text-2xl font-semibold mb-4 text-center">
            Match Predictions Game
          </h2>
          <p className="text-center text-muted-foreground mb-6">
            Predict the outcomes of upcoming matches and compete with other fans!
          </p>
          
          <div className="flex justify-center">
            <div className="bg-muted rounded-lg p-8 text-center">
              <p className="text-lg font-medium">
                Coming Soon!
              </p>
              <p className="text-muted-foreground mt-2">
                The predictions game is currently under development.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}