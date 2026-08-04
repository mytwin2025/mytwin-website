/**
 * hrsCalculator.js
 * Contains the data structures and calculation logic for the Health Risk Score.
 */

// 1. Questionnaire Data & Domain Weights
// Maps each question to its available points (0-3) and how those points are apportioned across domains.


export const QUESTIONS_DATA = [
  {
    id: "Q1",
    question: "Age group",
    options: [
      "0 - Under 34 years", 
      "1 - 35 to 49 years", 
      "2 - 50 to 59 years", 
      "3 - 60 years and above"
    ],
    domainWeights: { Metabolic: 0.4, Frailty: 0.4, "Body Resilience": 0.2 }
  },
  {
    id: "Q2",
    question: "Blood sugar status (fasting glucose / HbA1c)",
    options: [
      "0 - Normal (FBS <100 / HbA1c <5.7)", 
      "1 - Borderline / pre-diabetic (100-125 / 5.7-6.4)", 
      "2 - Diabetic, well controlled on medication", 
      "3 - Diabetic, uncontrolled or on insulin"
    ],
    domainWeights: { Metabolic: 1.0 }
  },
  {
    id: "Q3",
    question: "Blood pressure / known heart condition",
    options: [
      "0 - Normal BP, no heart condition", 
      "1 - Borderline / pre-hypertension", 
      "2 - Hypertension controlled on medication", 
      "3 - Uncontrolled BP or diagnosed heart disease"
    ],
    domainWeights: { Cardiovascular: 1.0 }
  },
  {
    id: "Q4",
    question: "Breathlessness on exertion",
    options: [
      "0 - Never breathless", 
      "1 - Only on heavy exertion", 
      "2 - On moderate activity (climbing one flight of stairs)", 
      "3 - On light activity or at rest"
    ],
    domainWeights: { Cardiovascular: 0.7, "Body Resilience": 0.3 }
  },
  {
    id: "Q5",
    question: "Falls and balance in the last 12 months",
    options: [
      "0 - No falls, steady on feet", 
      "1 - Occasional unsteadiness, no falls", 
      "2 - One fall, or needs support to walk", 
      "3 - Two or more falls, or fear of falling"
    ],
    domainWeights: { Frailty: 0.6, Musculoskeletal: 0.4 }
  },
  {
    id: "Q6",
    question: "Memory and concentration",
    options: [
      "0 - No problems", 
      "1 - Occasional forgetfulness", 
      "2 - Frequent, affects daily tasks", 
      "3 - Diagnosed impairment / needs help"
    ],
    domainWeights: { Neurological: 1.0 }
  },
  {
    id: "Q7",
    question: "Dizziness, numbness or tingling",
    options: [
      "0 - None", 
      "1 - Rare and mild", 
      "2 - Frequent episodes", 
      "3 - Constant, or with weakness"
    ],
    domainWeights: { Neurological: 1.0 }
  },
  {
    id: "Q8",
    question: "Strength, energy and walking speed",
    options: [
      "0 - Strong, walks briskly", 
      "1 - Slightly slower, tires easily", 
      "2 - Noticeably weak or slow", 
      "3 - Needs assistance, exhausted easily"
    ],
    domainWeights: { Frailty: 1.0 }
  },
  {
    id: "Q9",
    question: "Joint and muscle pain",
    options: [
      "0 - No pain", 
      "1 - Occasional mild pain", 
      "2 - Frequent pain, limits some activity", 
      "3 - Daily pain, limits most activity"
    ],
    domainWeights: { Musculoskeletal: 1.0 }
  },
  {
    id: "Q10",
    question: "Digestive health (appetite, acidity, bowel regularity)",
    options: [
      "0 - Normal appetite and digestion", 
      "1 - Occasional acidity or bloating", 
      "2 - Frequent symptoms or irregular bowels", 
      "3 - Daily symptoms or diagnosed GI condition"
    ],
    domainWeights: { Digestive: 1.0 }
  },
  {
    id: "Q11",
    question: "Body composition (BMI / waist circumference)",
    options: [
      "0 - Normal (BMI 18.5-22.9, normal waist)", 
      "1 - Overweight (BMI 23-24.9)", 
      "2 - Obese (BMI 25-29.9) or high waist", 
      "3 - BMI 30+ or very high waist"
    ],
    domainWeights: { "Body Resilience": 1.0 }
  },
  {
    id: "Q12",
    question: "Cholesterol / lipid profile",
    options: [
      "0 - Normal lipid profile", 
      "1 - Borderline high", 
      "2 - High, on medication", 
      "3 - Very high or uncontrolled"
    ],
    domainWeights: { Metabolic: 1.0 }
  },
  {
    id: "Q13",
    question: "Lifestyle (physical activity,smoking,alcohol) per week",
    options: [
      "0 - Mostly active,no smoking or no alcohol per week", 
      "1 - Little active, 1 or 2 times alcohol or smoking per week", 
      "2 - Sedentary or 2 or more times alcohol or smoking per week", 
      "3 - Sedentary with heavy or regular alcohol or smoking per week"
    ],
    domainWeights: { Lifestyle: 1.0 }
  },
  {
    id: "Q14",
    question: "Sleep quality and duration",
    options: [
      "0 - 7-8 hours, refreshing", 
      "1 - 6-7 hours, mostly fine", 
      "2 - 5-6 hours, disturbed sleep", 
      "3 - Under 5 hours, insomnia or sleep apnoea"
    ],
    domainWeights: { Sleep: 1.0 }
  },
  {
    id: "Q15",
    question: "Emotional wellbeing and stress",
    options: [
      "0 - Calm and positive", 
      "1 - Occasional stress", 
      "2 - Frequent stress, anxiety or low mood", 
      "3 - Severe, affects daily life"
    ],
    domainWeights: { Emotional: 1.0 }
  }
];

// 2. Maximum possible points per domain
// Calculated as: (Sum of Domain Weights across all questions) * 3 max points
export const DOMAIN_MAX_SCORES = {
  Metabolic: 7.2,           // (0.4 + 1.0 + 1.0) * 3
  Cardiovascular: 5.1,      // (1.0 + 0.7) * 3
  Neurological: 6.0,        // (1.0 + 1.0) * 3
  Frailty: 6.0,             // (0.4 + 0.6 + 1.0) * 3
  "Body Resilience": 4.5,   // (0.2 + 0.3 + 1.0) * 3
  Musculoskeletal: 4.2,     // (0.4 + 1.0) * 3
  Lifestyle: 3.0,           // 1.0 * 3
  Sleep: 3.0,               // 1.0 * 3
  Emotional: 3.0,           // 1.0 * 3
  Digestive: 3.0,           // 1.0 * 3
};

/**
 * 3. Core Calculation Engine
 * 
 * @param {Object} userAnswers - An object mapping question IDs to the selected point value (0, 1, 2, or 3).
 *                               Example: { Q1: 1, Q2: 0, Q3: 2, ... }
 * @returns {Object} The calculated raw points, domain scores, and percentages.
 */
export function calculateHRS(userAnswers) {
  let totalRawPoints = 0;
  
  // Initialize domain scores at 0
  const domainScores = {
    Metabolic: 0,
    Cardiovascular: 0,
    Neurological: 0,
    Frailty: 0,
    "Body Resilience": 0,
    Musculoskeletal: 0,
    Lifestyle: 0,
    Sleep: 0,
    Emotional: 0,
    Digestive: 0
  };

  // 1. Distribute points to domains based on weights
  QUESTIONS_DATA.forEach(question => {
    // Default to 0 if the question hasn't been answered yet
    const pointsScored = userAnswers[question.id] || 0; 
    totalRawPoints += pointsScored;

    // Multiply the points scored by the apportioning percentage for that specific question
    Object.entries(question.domainWeights).forEach(([domain, weight]) => {
      domainScores[domain] += (pointsScored * weight);
    });
  });

  // 2. Calculate Domain Risk Percentages
  const domainRiskPercentages = {};
  Object.keys(DOMAIN_MAX_SCORES).forEach(domain => {
    const maxScore = DOMAIN_MAX_SCORES[domain];
    const actualScore = domainScores[domain];
    
    // Protect against division by zero, though maxScore should never be 0
    domainRiskPercentages[domain] = maxScore > 0 
      ? (actualScore / maxScore) * 100 
      : 0;
  });

  // 3. Calculate Overall Scores (Linear fallback)
  // Note: The sheet shows 2 points = ~3.2% risk. If your dashboard uses a specific 
  // non-linear curve or weighted average for the final score, apply that math here.
  const MAX_TOTAL_POINTS = 45;
  const overallRiskScoreLinear = (totalRawPoints / MAX_TOTAL_POINTS) * 100;
  const overallHealthScoreLinear = 100 - overallRiskScoreLinear;

  return {
    totalRawPoints,
    domainScores,             // The raw weighted points per domain
    domainRiskPercentages,    // The % risk per domain (0-100)
    overallRiskScore: overallRiskScoreLinear,
    overallHealthScore: overallHealthScoreLinear
  };
}