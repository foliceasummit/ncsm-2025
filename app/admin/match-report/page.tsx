'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';

interface Goal {
  minute: string;
  scorer: string;
  assist?: string;
  team: 'home' | 'away';
}

interface Substitution {
  minute: string;
  playerOut: string;
  playerIn: string;
  team: 'home' | 'away';
}

interface Card {
  minute: string;
  playerName: string;
  team: 'home' | 'away';
  type: 'yellow' | 'red';
  reason: string;
}

interface MatchReport {
  matchId: string;
  date: string;
  kickoffTime: string;
  venue: string;
  group: string;
  homeTeam: string;
  awayTeam: string;
  finalScoreHome: string;
  finalScoreAway: string;
  referee: string;
  assistant1: string;
  assistant2: string;
  fourthOfficial: string;
  matchCommissioner: string;
  otherOfficials: string;
  homeStarting11: string[];
  awayStarting11: string[];
  homeSubstitutes: string[];
  awaySubstitutes: string[];
  homeCaptain: string;
  awayCaptain: string;
  goals: Goal[];
  substitutions: Substitution[];
  cards: Card[];
  matchConduct: string;
  pitchCondition: string;
  weather: string;
  crowdBehavior: string;
  injuries: string;
  refereeSignature: string;
  commissionerSignature: string;
}

const MatchReportForm: React.FC = () => {
  const router = useRouter();
  const [currentStep, setCurrentStep] = useState(1);
  const [report, setReport] = useState<MatchReport>({
    matchId: `MR-${Date.now()}`,
    date: '',
    kickoffTime: '',
    venue: '',
    group: '',
    homeTeam: '',
    awayTeam: '',
    finalScoreHome: '',
    finalScoreAway: '',
    referee: '',
    assistant1: '',
    assistant2: '',
    fourthOfficial: '',
    matchCommissioner: '',
    otherOfficials: '',
    homeStarting11: [''],
    awayStarting11: [''],
    homeSubstitutes: [''],
    awaySubstitutes: [''],
    homeCaptain: '',
    awayCaptain: '',
    goals: [{ minute: '', scorer: '', team: 'home' }],
    substitutions: [{ minute: '', playerOut: '', playerIn: '', team: 'home' }],
    cards: [{ minute: '', playerName: '', team: 'home', type: 'yellow', reason: '' }],
    matchConduct: '',
    pitchCondition: '',
    weather: '',
    crowdBehavior: '',
    injuries: '',
    refereeSignature: '',
    commissionerSignature: ''
  });

  const groups = ['A', 'B', 'C', 'D'];
  const counties = [
    'Bong', 'Montserrado', 'Nimba', 'Bomi', 'Grand Bassa', 'Gbarpolu',
    'Grand Gedeh', 'Grand Kru', 'Lofa', 'Maryland', 'Margibi', 'River Gee', 'Rivercess', 'Sinoe'
  ];

  // Add CSS for better input field visibility
  React.useEffect(() => {
    const style = document.createElement('style');
    style.textContent = `
      input, select, textarea {
        color: #111827 !important;
      }
      input:disabled {
        color: #374151 !important;
      }
    `;
    document.head.appendChild(style);
    return () => document.head.removeChild(style);
  }, []);

  const updateField = (field: keyof MatchReport, value: any) => {
    setReport(prev => ({ ...prev, [field]: value }));
  };

  const addGoal = () => {
    setReport(prev => ({
      ...prev,
      goals: [...prev.goals, { minute: '', scorer: '', team: 'home' }]
    }));
  };

  const removeGoal = (index: number) => {
    setReport(prev => ({
      ...prev,
      goals: prev.goals.filter((_, i) => i !== index)
    }));
  };

  const updateGoal = (index: number, field: keyof Goal, value: any) => {
    setReport(prev => ({
      ...prev,
      goals: prev.goals.map((goal, i) => 
        i === index ? { ...goal, [field]: value } : goal
      )
    }));
  };

  const addSubstitution = () => {
    setReport(prev => ({
      ...prev,
      substitutions: [...prev.substitutions, { minute: '', playerOut: '', playerIn: '', team: 'home' }]
    }));
  };

  const removeSubstitution = (index: number) => {
    setReport(prev => ({
      ...prev,
      substitutions: prev.substitutions.filter((_, i) => i !== index)
    }));
  };

  const updateSubstitution = (index: number, field: keyof Substitution, value: any) => {
    setReport(prev => ({
      ...prev,
      substitutions: prev.substitutions.map((sub, i) => 
        i === index ? { ...sub, [field]: value } : sub
      )
    }));
  };

  const addCard = () => {
    setReport(prev => ({
      ...prev,
      cards: [...prev.cards, { minute: '', playerName: '', team: 'home', type: 'yellow', reason: '' }]
    }));
  };

  const removeCard = (index: number) => {
    setReport(prev => ({
      ...prev,
      cards: prev.cards.filter((_, i) => i !== index)
    }));
  };

  const updateCard = (index: number, field: keyof Card, value: any) => {
    setReport(prev => ({
      ...prev,
      cards: prev.cards.map((card, i) => 
        i === index ? { ...card, [field]: value } : card
      )
    }));
  };

  const addPlayer = (field: 'homeStarting11' | 'awayStarting11' | 'homeSubstitutes' | 'awaySubstitutes') => {
    setReport(prev => ({
      ...prev,
      [field]: [...prev[field], '']
    }));
  };

  const removePlayer = (field: 'homeStarting11' | 'awayStarting11' | 'homeSubstitutes' | 'awaySubstitutes', index: number) => {
    setReport(prev => ({
      ...prev,
      [field]: prev[field].filter((_, i) => i !== index)
    }));
  };

  const updatePlayer = (field: 'homeStarting11' | 'awayStarting11' | 'homeSubstitutes' | 'awaySubstitutes', index: number, value: string) => {
    setReport(prev => ({
      ...prev,
      [field]: prev[field].map((player, i) => i === index ? value : player)
    }));
  };

  const handleSubmit = async () => {
    try {
      // Here you would typically send the data to your API
      console.log('Submitting report:', report);
      alert('Match report submitted successfully!');
      router.push('/dashboard/match-official');
    } catch (error) {
      console.error('Error submitting report:', error);
      alert('Error submitting report. Please try again.');
    }
  };

  const renderStep1 = () => (
    <div className="space-y-6">
      <h2 className="text-xl font-bold text-gray-900">1. Match Details</h2>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Match ID / Report ID
          </label>
                      <input
              type="text"
              value={report.matchId}
              disabled
              className="w-full px-3 py-2 border border-gray-300 rounded-lg bg-gray-50 text-gray-900"
            />
        </div>
        
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Date *
          </label>
                      <input
              type="date"
              value={report.date}
              onChange={(e) => updateField('date', e.target.value)}
              required
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500 text-gray-900"
            />
        </div>
        
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Kick-off Time *
          </label>
          <input
            type="time"
            value={report.kickoffTime}
            onChange={(e) => updateField('kickoffTime', e.target.value)}
            required
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500"
          />
        </div>
        
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Venue / Stadium *
          </label>
          <input
            type="text"
            value={report.venue}
            onChange={(e) => updateField('venue', e.target.value)}
            required
            placeholder="e.g., SKD Sports Complex"
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500"
          />
        </div>
        
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Group *
          </label>
          <select
            value={report.group}
            onChange={(e) => updateField('group', e.target.value)}
            required
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500"
          >
            <option value="">Select Group</option>
            {groups.map(group => (
              <option key={group} value={group}>Group {group}</option>
            ))}
          </select>
        </div>
        
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Home Team *
          </label>
          <select
            value={report.homeTeam}
            onChange={(e) => updateField('homeTeam', e.target.value)}
            required
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500"
          >
            <option value="">Select Home Team</option>
            {counties.map(county => (
              <option key={county} value={county}>{county}</option>
            ))}
          </select>
        </div>
        
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Away Team *
          </label>
          <select
            value={report.awayTeam}
            onChange={(e) => updateField('awayTeam', e.target.value)}
            required
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500"
          >
            <option value="">Select Away Team</option>
            {counties.map(county => (
              <option key={county} value={county}>{county}</option>
            ))}
          </select>
        </div>
        
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Final Score (Home) *
          </label>
          <input
            type="number"
            min="0"
            value={report.finalScoreHome}
            onChange={(e) => updateField('finalScoreHome', e.target.value)}
            required
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500"
          />
        </div>
        
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Final Score (Away) *
          </label>
          <input
            type="number"
            min="0"
            value={report.finalScoreAway}
            onChange={(e) => updateField('finalScoreAway', e.target.value)}
            required
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500"
          />
        </div>
      </div>
    </div>
  );

  const renderStep2 = () => (
    <div className="space-y-6">
      <h2 className="text-xl font-bold text-gray-900">2. Match Officials</h2>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Referee (Name & County) *
          </label>
          <input
            type="text"
            value={report.referee}
            onChange={(e) => updateField('referee', e.target.value)}
            required
            placeholder="e.g., John Doe - Bong County"
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500"
          />
        </div>
        
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Assistant Referee 1 *
          </label>
          <input
            type="text"
            value={report.assistant1}
            onChange={(e) => updateField('assistant1', e.target.value)}
            required
            placeholder="e.g., Jane Smith - Montserrado"
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500"
          />
        </div>
        
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Assistant Referee 2 *
          </label>
          <input
            type="text"
            value={report.assistant2}
            onChange={(e) => updateField('assistant2', e.target.value)}
            required
            placeholder="e.g., Mike Johnson - Nimba"
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500"
          />
        </div>
        
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Fourth Official *
          </label>
          <input
            type="text"
            value={report.fourthOfficial}
            onChange={(e) => updateField('fourthOfficial', e.target.value)}
            required
            placeholder="e.g., Sarah Wilson - Grand Bassa"
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500"
          />
        </div>
        
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Match Commissioner *
          </label>
          <input
            type="text"
            value={report.matchCommissioner}
            onChange={(e) => updateField('matchCommissioner', e.target.value)}
            required
            placeholder="e.g., David Brown - Lofa"
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500"
          />
        </div>
        
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Other Officials (if any)
          </label>
          <input
            type="text"
            value={report.otherOfficials}
            onChange={(e) => updateField('otherOfficials', e.target.value)}
            placeholder="e.g., Security, Medical Staff"
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500"
          />
        </div>
      </div>
    </div>
  );

  const renderStep3 = () => (
    <div className="space-y-6">
      <h2 className="text-xl font-bold text-gray-900">3. Team Line-Up Summary</h2>
      
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Home Team */}
        <div className="space-y-4">
          <h3 className="text-lg font-semibold text-gray-800">{report.homeTeam || 'Home Team'}</h3>
          
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Starting 11 *
            </label>
            {report.homeStarting11.map((player, index) => (
              <div key={index} className="flex space-x-2 mb-2">
                <input
                  type="text"
                  value={player}
                  onChange={(e) => updatePlayer('homeStarting11', index, e.target.value)}
                  required
                  placeholder={`Player ${index + 1}`}
                  className="flex-1 px-3 py-2 border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500"
                />
                {report.homeStarting11.length > 1 && (
                  <button
                    type="button"
                    onClick={() => removePlayer('homeStarting11', index)}
                    className="px-3 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700"
                  >
                    Remove
                  </button>
                )}
              </div>
            ))}
            <button
              type="button"
              onClick={() => addPlayer('homeStarting11')}
              className="mt-2 px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700"
            >
              Add Player
            </button>
          </div>
          
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Substitutes
            </label>
            {report.homeSubstitutes.map((player, index) => (
              <div key={index} className="flex space-x-2 mb-2">
                <input
                  type="text"
                  value={player}
                  onChange={(e) => updatePlayer('homeSubstitutes', index, e.target.value)}
                  placeholder={`Substitute ${index + 1}`}
                  className="flex-1 px-3 py-2 border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500"
                />
                <button
                  type="button"
                  onClick={() => removePlayer('homeSubstitutes', index)}
                  className="px-3 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700"
                >
                  Remove
                </button>
              </div>
            ))}
            <button
              type="button"
              onClick={() => addPlayer('homeSubstitutes')}
              className="mt-2 px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700"
            >
              Add Substitute
            </button>
          </div>
          
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Captain *
            </label>
            <input
              type="text"
              value={report.homeCaptain}
              onChange={(e) => updateField('homeCaptain', e.target.value)}
              required
              placeholder="Captain's name"
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500"
            />
          </div>
        </div>
        
        {/* Away Team */}
        <div className="space-y-4">
          <h3 className="text-lg font-semibold text-gray-800">{report.awayTeam || 'Away Team'}</h3>
          
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Starting 11 *
            </label>
            {report.awayStarting11.map((player, index) => (
              <div key={index} className="flex space-x-2 mb-2">
                <input
                  type="text"
                  value={player}
                  onChange={(e) => updatePlayer('awayStarting11', index, e.target.value)}
                  required
                  placeholder={`Player ${index + 1}`}
                  className="flex-1 px-3 py-2 border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500"
                />
                {report.awayStarting11.length > 1 && (
                  <button
                    type="button"
                    onClick={() => removePlayer('awayStarting11', index)}
                    className="px-3 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700"
                  >
                    Remove
                  </button>
                )}
              </div>
            ))}
            <button
              type="button"
              onClick={() => addPlayer('awayStarting11')}
              className="mt-2 px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700"
            >
              Add Player
            </button>
          </div>
          
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Substitutes
            </label>
            {report.awaySubstitutes.map((player, index) => (
              <div key={index} className="flex space-x-2 mb-2">
                <input
                  type="text"
                  value={player}
                  onChange={(e) => updatePlayer('awaySubstitutes', index, e.target.value)}
                  placeholder={`Substitute ${index + 1}`}
                  className="flex-1 px-3 py-2 border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500"
                />
                <button
                  type="button"
                  onClick={() => removePlayer('awaySubstitutes', index)}
                  className="px-3 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700"
                >
                  Remove
                </button>
              </div>
            ))}
            <button
              type="button"
              onClick={() => addPlayer('awaySubstitutes')}
              className="mt-2 px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700"
            >
              Add Substitute
            </button>
          </div>
          
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Captain *
            </label>
            <input
              type="text"
              value={report.awayCaptain}
              onChange={(e) => updateField('awayCaptain', e.target.value)}
              required
              placeholder="Captain's name"
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500"
            />
          </div>
        </div>
      </div>
    </div>
  );

  const renderStep4 = () => (
    <div className="space-y-6">
      <h2 className="text-xl font-bold text-gray-900">4. Match Incidents</h2>
      
      {/* Goals */}
      <div>
        <h3 className="text-lg font-semibold text-gray-800 mb-4">Goals</h3>
        {report.goals.map((goal, index) => (
          <div key={index} className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-4 p-4 border border-gray-200 rounded-lg">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Minute</label>
              <input
                type="text"
                value={goal.minute}
                onChange={(e) => updateGoal(index, 'minute', e.target.value)}
                placeholder="e.g., 15'"
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Scorer</label>
              <input
                type="text"
                value={goal.scorer}
                onChange={(e) => updateGoal(index, 'scorer', e.target.value)}
                placeholder="Scorer's name"
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Assist (optional)</label>
              <input
                type="text"
                value={goal.assist || ''}
                onChange={(e) => updateGoal(index, 'assist', e.target.value)}
                placeholder="Assist player"
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Team</label>
              <select
                value={goal.team}
                onChange={(e) => updateGoal(index, 'team', e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500"
              >
                <option value="home">{report.homeTeam || 'Home'}</option>
                <option value="away">{report.awayTeam || 'Away'}</option>
              </select>
            </div>
            {report.goals.length > 1 && (
              <button
                type="button"
                onClick={() => removeGoal(index)}
                className="md:col-span-4 px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700"
              >
                Remove Goal
              </button>
            )}
          </div>
        ))}
        <button
          type="button"
          onClick={addGoal}
          className="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700"
        >
          Add Goal
        </button>
      </div>
      
      {/* Substitutions */}
      <div>
        <h3 className="text-lg font-semibold text-gray-800 mb-4">Substitutions</h3>
        {report.substitutions.map((sub, index) => (
          <div key={index} className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-4 p-4 border border-gray-200 rounded-lg">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Minute</label>
              <input
                type="text"
                value={sub.minute}
                onChange={(e) => updateSubstitution(index, 'minute', e.target.value)}
                placeholder="e.g., 45'"
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Player Out</label>
              <input
                type="text"
                value={sub.playerOut}
                onChange={(e) => updateSubstitution(index, 'playerOut', e.target.value)}
                placeholder="Player going out"
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Player In</label>
              <input
                type="text"
                value={sub.playerIn}
                onChange={(e) => updateSubstitution(index, 'playerIn', e.target.value)}
                placeholder="Player coming in"
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Team</label>
              <select
                value={sub.team}
                onChange={(e) => updateSubstitution(index, 'team', e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500"
              >
                <option value="home">{report.homeTeam || 'Home'}</option>
                <option value="away">{report.awayTeam || 'Away'}</option>
              </select>
            </div>
            {report.substitutions.length > 1 && (
              <button
                type="button"
                onClick={() => removeSubstitution(index)}
                className="md:col-span-4 px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700"
              >
                Remove Substitution
              </button>
            )}
          </div>
        ))}
        <button
          type="button"
          onClick={addSubstitution}
          className="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700"
        >
          Add Substitution
        </button>
      </div>
      
      {/* Cards */}
      <div>
        <h3 className="text-lg font-semibold text-gray-800 mb-4">Yellow & Red Cards</h3>
        {report.cards.map((card, index) => (
          <div key={index} className="grid grid-cols-1 md:grid-cols-5 gap-4 mb-4 p-4 border border-gray-200 rounded-lg">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Minute</label>
              <input
                type="text"
                value={card.minute}
                onChange={(e) => updateCard(index, 'minute', e.target.value)}
                placeholder="e.g., 23'"
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Player Name</label>
              <input
                type="text"
                value={card.playerName}
                onChange={(e) => updateCard(index, 'playerName', e.target.value)}
                placeholder="Player's name"
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Team</label>
              <select
                value={card.team}
                onChange={(e) => updateCard(index, 'team', e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500"
              >
                <option value="home">{report.homeTeam || 'Home'}</option>
                <option value="away">{report.awayTeam || 'Away'}</option>
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Card Type</label>
              <select
                value={card.type}
                onChange={(e) => updateCard(index, 'type', e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500"
              >
                <option value="yellow">Yellow</option>
                <option value="red">Red</option>
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Reason</label>
              <input
                type="text"
                value={card.reason}
                onChange={(e) => updateCard(index, 'reason', e.target.value)}
                placeholder="Reason for card"
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500"
              />
            </div>
            {report.cards.length > 1 && (
              <button
                type="button"
                onClick={() => removeCard(index)}
                className="md:col-span-5 px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700"
              >
                Remove Card
              </button>
            )}
          </div>
        ))}
        <button
          type="button"
          onClick={addCard}
          className="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700"
        >
          Add Card
        </button>
      </div>
    </div>
  );

  const renderStep5 = () => (
    <div className="space-y-6">
      <h2 className="text-xl font-bold text-gray-900">5. Referee's Notes</h2>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            General Match Conduct *
          </label>
          <select
            value={report.matchConduct}
            onChange={(e) => updateField('matchConduct', e.target.value)}
            required
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500"
          >
            <option value="">Select Conduct</option>
            <option value="Fair">Fair</option>
            <option value="Aggressive">Aggressive</option>
            <option value="Poor Sportsmanship">Poor Sportsmanship</option>
          </select>
        </div>
        
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Pitch Condition *
          </label>
          <select
            value={report.pitchCondition}
            onChange={(e) => updateField('pitchCondition', e.target.value)}
            required
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500"
          >
            <option value="">Select Condition</option>
            <option value="Good">Good</option>
            <option value="Bad">Bad</option>
            <option value="Wet">Wet</option>
            <option value="Dry">Dry</option>
          </select>
        </div>
        
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Weather *
          </label>
          <select
            value={report.weather}
            onChange={(e) => updateField('weather', e.target.value)}
            required
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500"
          >
            <option value="">Select Weather</option>
            <option value="Sunny">Sunny</option>
            <option value="Rainy">Rainy</option>
            <option value="Cloudy">Cloudy</option>
          </select>
        </div>
        
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Crowd Behavior *
          </label>
          <select
            value={report.crowdBehavior}
            onChange={(e) => updateField('crowdBehavior', e.target.value)}
            required
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500"
          >
            <option value="">Select Behavior</option>
            <option value="Peaceful">Peaceful</option>
            <option value="Disruptive">Disruptive</option>
            <option value="Intervention Needed">Intervention Needed</option>
          </select>
        </div>
      </div>
      
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">
          Injuries / Medical Attention Required
        </label>
        <textarea
          value={report.injuries}
          onChange={(e) => updateField('injuries', e.target.value)}
          rows={4}
          placeholder="Describe any injuries or medical incidents during the match..."
          className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500"
        />
      </div>
    </div>
  );

  const renderStep6 = () => (
    <div className="space-y-6">
      <h2 className="text-xl font-bold text-gray-900">6. Signatures & Approvals</h2>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Referee Signature (typed) *
          </label>
          <input
            type="text"
            value={report.refereeSignature}
            onChange={(e) => updateField('refereeSignature', e.target.value)}
            required
            placeholder="Type your full name as signature"
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500"
          />
        </div>
        
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Match Commissioner Signature *
          </label>
          <input
            type="text"
            value={report.commissionerSignature}
            onChange={(e) => updateField('commissionerSignature', e.target.value)}
            required
            placeholder="Type commissioner's full name as signature"
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500"
          />
        </div>
      </div>
      
      <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
        <p className="text-sm text-blue-800">
          <strong>Note:</strong> By submitting this report, you confirm that all information provided is accurate and complete. 
          The report will be locked after submission and can only be edited by administrators.
        </p>
      </div>
    </div>
  );

  const steps = [
    { number: 1, title: 'Match Details' },
    { number: 2, title: 'Match Officials' },
    { number: 3, title: 'Team Line-Up' },
    { number: 4, title: 'Match Incidents' },
    { number: 5, title: 'Referee Notes' },
    { number: 6, title: 'Signatures' }
  ];

  const canProceed = () => {
    switch (currentStep) {
      case 1:
        return report.date && report.kickoffTime && report.venue && report.group && 
               report.homeTeam && report.awayTeam && report.finalScoreHome && report.finalScoreAway;
      case 2:
        return report.referee && report.assistant1 && report.assistant2 && 
               report.fourthOfficial && report.matchCommissioner;
      case 3:
        return report.homeStarting11.every(p => p.trim()) && report.awayStarting11.every(p => p.trim()) &&
               report.homeCaptain && report.awayCaptain;
      case 4:
        return true; // Optional section
      case 5:
        return report.matchConduct && report.pitchCondition && report.weather && report.crowdBehavior;
      case 6:
        return report.refereeSignature && report.commissionerSignature;
      default:
        return false;
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 pt-20">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="bg-white rounded-lg shadow-sm p-6 mb-8">
          <div className="flex items-center justify-between mb-6">
            <div>
              <h1 className="text-3xl font-bold text-gray-900">Match Officials Report Form</h1>
              <p className="text-gray-600 mt-2">Complete match report after the game</p>
            </div>
            <button
              onClick={() => router.push('/dashboard/match-official')}
              className="px-4 py-2 text-gray-600 hover:text-gray-900 hover:bg-gray-100 rounded-lg transition-colors"
            >
              ← Back to Dashboard
            </button>
          </div>
          
          {/* Progress Steps */}
          <div className="flex items-center justify-between">
            {steps.map((step, index) => (
              <div key={step.number} className="flex items-center">
                <div className={`flex items-center justify-center w-8 h-8 rounded-full border-2 ${
                  currentStep >= step.number 
                    ? 'bg-blue-600 border-blue-600 text-white' 
                    : 'bg-white border-gray-300 text-gray-500'
                }`}>
                  {currentStep > step.number ? '✓' : step.number}
                </div>
                <span className={`ml-2 text-sm font-medium ${
                  currentStep >= step.number ? 'text-blue-600' : 'text-gray-500'
                }`}>
                  {step.title}
                </span>
                {index < steps.length - 1 && (
                  <div className={`w-16 h-0.5 mx-4 ${
                    currentStep > step.number ? 'bg-blue-600' : 'bg-gray-300'
                  }`} />
                )}
              </div>
            ))}
          </div>
        </div>

        {/* Form Content */}
        <div className="bg-white rounded-lg shadow-sm p-8">
          {currentStep === 1 && renderStep1()}
          {currentStep === 2 && renderStep2()}
          {currentStep === 3 && renderStep3()}
          {currentStep === 4 && renderStep4()}
          {currentStep === 5 && renderStep5()}
          {currentStep === 6 && renderStep6()}
          
          {/* Navigation Buttons */}
          <div className="flex justify-between mt-8 pt-6 border-t border-gray-200">
            <button
              onClick={() => setCurrentStep(Math.max(1, currentStep - 1))}
              disabled={currentStep === 1}
              className={`px-6 py-2 rounded-lg transition-colors ${
                currentStep === 1
                  ? 'bg-gray-300 text-gray-500 cursor-not-allowed'
                  : 'bg-gray-600 text-white hover:bg-gray-700'
              }`}
            >
              Previous
            </button>
            
            {currentStep < 6 ? (
              <button
                onClick={() => setCurrentStep(currentStep + 1)}
                disabled={!canProceed()}
                className={`px-6 py-2 rounded-lg transition-colors ${
                  canProceed()
                    ? 'bg-blue-600 text-white hover:bg-blue-700'
                    : 'bg-gray-300 text-gray-500 cursor-not-allowed'
                }`}
              >
                Next
              </button>
            ) : (
              <button
                onClick={handleSubmit}
                disabled={!canProceed()}
                className={`px-6 py-2 rounded-lg transition-colors ${
                  canProceed()
                    ? 'bg-green-600 text-white hover:bg-green-700'
                    : 'bg-gray-300 text-gray-500 cursor-not-allowed'
                }`}
              >
                Submit Report
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default MatchReportForm;
