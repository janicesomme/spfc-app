import React, { useState } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { Button } from './ui/button';
import { Input } from './ui/input';

export const WeeklyShoutSubscription = () => {
  const [email, setEmail] = useState('');
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const validateEmail = (email: string): boolean => {
    return email.includes('@') && email.includes('.');
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    if (!validateEmail(email)) {
      setError('Please enter a valid email address');
      return;
    }

    setIsLoading(true);

    try {
      const { error: insertError } = await (supabase as any)
        .from('email_subscribers')
        .insert([{ 
          email: email.trim().toLowerCase(), 
          source: 'home_module' 
        }]);

      if (insertError) {
        // Check if it's a duplicate email error (code 23505)
        if (insertError.code === '23505') {
          // Treat duplicate as success
          setIsSubmitted(true);
        } else {
          setError('Something went wrong. Please try again.');
        }
      } else {
        setIsSubmitted(true);
      }
    } catch (error) {
      setError('Something went wrong. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="w-full max-w-[340px] sm:max-w-4xl mx-auto rounded-lg border border-white p-4 sm:p-6 mb-6 mt-6" style={{ backgroundColor: '#1a1a2e' }}>
      <div className="text-center space-y-4">
        <h3 className="text-white font-bold text-lg sm:text-xl">
          Join the FUTV Family
        </h3>
        <p className="text-white/90 text-sm leading-relaxed">
          Behind-the-scenes stories that never make YouTube. Adam's matchday snapshots, and all the best fan comments from the week!
        </p>
        
        {!isSubmitted ? (
          <>
            <form onSubmit={handleSubmit} className="space-y-3">
              <div className="flex flex-col sm:flex-row gap-3">
                <Input
                  type="email"
                  placeholder="Enter your email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="flex-1 bg-white text-black"
                  disabled={isLoading}
                />
                <Button
                  type="submit"
                  disabled={isLoading}
                  className="bg-red-600 hover:bg-red-700 text-white font-bold px-6 py-2"
                >
                  {isLoading ? 'Joining...' : 'Become an inner-circle member today!'}
                </Button>
              </div>
              {error && (
                <p className="text-red-400 text-sm">{error}</p>
              )}
            </form>
            <p className="text-white/80 text-sm">
              One email every Friday. Unsubscribe anytime.
            </p>
          </>
        ) : (
          <div className="space-y-3">
            <p className="text-green-400 font-medium">
              You're in! First Friday drop lands soon.
            </p>
            <Button
              disabled
              className="bg-gray-600 text-white font-bold px-6 py-2 cursor-not-allowed"
            >
              Subscribed
            </Button>
          </div>
        )}
      </div>
    </div>
  );
};