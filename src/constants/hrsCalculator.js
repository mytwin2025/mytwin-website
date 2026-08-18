/**
 * 1. Questions Data Configuration
 * Includes flags for 'hasDontKnow' and 'requiresBMICalculator' for UI rendering.
 */
export const QUESTIONS_DATA = [
  {
    id: "Q1",
    question: "What is your current Age?",
    options: [
      "0 - Under 34 years",
      "1 - 35 to 49 years",
      "2 - 50 to 59 years",
      "3 - 60 years and above"
    ],
    hasDontKnow: false,
    domainWeights: { Metabolic: 0.4, Frailty: 0.4, "Body Resilience": 0.2 } // Example weights
  },
  {
    id: "Q2",
    question: "What is your blood sugar status (fasting glucose / HbA1c)?",
    options: [
      "0 - Normal (FBS <100 / HbA1c <5.7)",
      "1 - Borderline / pre-diabetic (100-125 / 5.7-6.4)",
      "2 - Diabetic, well controlled on medication",
      "3 - Diabetic, uncontrolled or on insulin"
    ],
    hasDontKnow: true,
    domainWeights: { Metabolic: 1.0 }
  },
  {
    id: "Q3",
    question: "Have you been diagnosed with blood pressure / known heart condition?",
    options: [
      "0 - Normal BP, no heart condition",
      "1 - Borderline / pre-hypertension",
      "2 - Hypertension controlled on medication",
      "3 - Uncontrolled BP or diagnosed heart disease"
    ],
    hasDontKnow: true,
    domainWeights: { Cardiovascular: 1.0 }
  },
  {
    id: "Q4",
    question: "Do you become unusually tired or short of breath during routine activities such as walking or climbing stairs?",
    options: [
      "0 - Never breathless",
      "1 - Only on heavy exertion",
      "2 - On moderate activity (climbing one flight of stairs)",
      "3 - On light activity or at rest"
    ],
    hasDontKnow: true,
    domainWeights: { Cardiovascular: 0.7, "Body Resilience": 0.3 }
  },
  {
    id: "Q5",
    question: "Have you experienced falls, tremors, stroke-like symptoms, or difficulty with movement in last 12 months? ",
    options: [
      "0 - No falls, steady on feet",
      "1 - Occasional unsteadiness, no falls",
      "2 - One fall, or needs support to walk",
      "3 - Two or more falls, or fear of falling"
    ],
    hasDontKnow: true,
    domainWeights: { Frailty: 0.6, Musculoskeletal: 0.4 }
  },
  {
    id: "Q6",
    question: "Have you noticed problems with memory, concentration, balance, or frequent confusion?",
    options: [
      "0 - No problems",
      "1 - Occasional forgetfulness",
      "2 - Frequent, affects daily tasks",
      "3 - Diagnosed impairment / needs help"
    ],
    hasDontKnow: true,
    domainWeights: { Neurological: 1.0 }
  },
  {
    id: "Q7",
    question: "Have you noticed dizziness, numbness or tingling in last 12 months?",
    options: [
      "0 - None",
      "1 - Rare and mild",
      "2 - Frequent episodes",
      "3 - Constant, or with weakness"
    ],
    hasDontKnow: true,
    domainWeights: { Neurological: 1.0 }
  },
  {
    id: "Q8",
    question: "Tell us more on strength, energy and walking speed?",
    options: [
      "0 - Strong, walks briskly",
      "1 - Slightly slower, tires easily",
      "2 - Noticeably weak or slow",
      "3 - Needs assistance, exhausted easily"
    ],
    hasDontKnow: false,
    domainWeights: { Frailty: 1.0 }
  },
  {
    id: "Q9",
    question: "Do joint, back, or knee problems limit your daily movement or activities? ",
    options: [
      "0 - No pain",
      "1 - Occasional mild pain",
      "2 - Frequent pain, limits some activity",
      "3 - Daily pain, limits most activity"
    ],
    hasDontKnow: false,
    domainWeights: { Musculoskeletal: 1.0 }
  },
  {
    id: "Q10",
    question: "How is your digestive health (appetite, acidity, bowel regularity)?",
    options: [
      "0 - Normal appetite and digestion",
      "1 - Occasional acidity or bloating",
      "2 - Frequent symptoms or irregular bowels",
      "3 - Daily symptoms or diagnosed GI condition"
    ],
    hasDontKnow: true,
    domainWeights: { Digestive: 1.0 }
  },
  {
    id: "Q11",
    question: "What is your body composition index (BMI / waist circumference) ",
    options: [
      "0 - Normal (BMI 18.5-22.9, normal waist)",
      "1 - Overweight (BMI 23-24.9)",
      "2 - Obese (BMI 25-29.9) or high waist",
      "3 - BMI 30+ or very high waist"
    ],
    hasDontKnow: false,
    requiresBMICalculator: true, // UI FLAG: Render BMI calculator inputs
    domainWeights: { "Body Resilience": 1.0 }
  },
  {
    id: "Q12",
    question: "How is your cholesterol / lipid profile?",
    options: [
      "0 - Normal lipid profile",
      "1 - Borderline high",
      "2 - High, on medication",
      "3 - Very high or uncontrolled"
    ],
    hasDontKnow: true,
    domainWeights: { Metabolic: 1.0 }
  },
  {
    id: "Q13",
    question: "Which of these lifestyle habits currently apply to you?(physical activity, smoking, alcohol)",
    options: [
      "0 - Mostly active,no smoking or no alcohol per week",
      "1 - Little active, 1 or 2 times alcohol or smoking per week",
      "2 - Sedentary or 2 or more times alcohol or smoking per week",
      "3 - Sedentary with heavy or regular alcohol or smoking per week"
    ],
    hasDontKnow: false,
    domainWeights: { Lifestyle: 1.0 }
  },
  {
    id: "Q14",
    question: "How would you rate your sleep quality and duration over the past few months?",
    options: [
      "0 - 7-8 hours, refreshing",
      "1 - 6-7 hours, mostly fine",
      "2 - 5-6 hours, disturbed sleep",
      "3 - Under 5 hours, insomnia or sleep apnoea"
    ],
    hasDontKnow: true,
    domainWeights: { Sleep: 1.0 }
  },
  {
    id: "Q15",
    question: "How often do you feel stressed, anxious, or emotionally low?",
    options: [
      "0 - Calm and positive",
      "1 - Occasional stress",
      "2 - Frequent stress, anxiety or low mood",
      "3 - Severe, affects daily life"
    ],
    hasDontKnow: true,
    domainWeights: { Emotional: 1.0 }
  }
];

/**
 * 2. Core Calculation Engine
 * 
 * @param {Object} userAnswers - An object mapping question IDs to the selected point value (0, 1, 2, 3, or 4 for Don't Know).
 *                               Example: { Q1: 1, Q2: 4, Q3: 2, ... }
 * @returns {Object} The calculated raw points, domain scores, and percentages.
 */
export function calculateHRS(userAnswers) {
  let totalRawPoints = 0;
  let totalPossiblePoints = 0; // Dynamic max points depending on "Don't Know" answers
  
  // Initialize domain scores and max possible domain scores at 0
  const domainScores = {
    Metabolic: 0, Cardiovascular: 0, Neurological: 0, Frailty: 0,
    "Body Resilience": 0, Musculoskeletal: 0, Lifestyle: 0,
    Sleep: 0, Emotional: 0, Digestive: 0
  };
  
  const domainMaxPossible = { ...domainScores };

  // 1. Distribute points to domains based on weights
  QUESTIONS_DATA.forEach(question => {
    const rawAnswer = userAnswers[question.id];
    
    // Treat undefined or '4' (Don't Know) as skipped for scoring purposes
    const isAnswered = rawAnswer !== undefined && rawAnswer !== 4;
    const pointsScored = isAnswered ? rawAnswer : 0;
    
    if (isAnswered) {
      totalRawPoints += pointsScored;
      totalPossiblePoints += 3; // Max points per question is 3
    }

    // Apportion points and calculate dynamic max domain score
    if (question.domainWeights) {
      Object.entries(question.domainWeights).forEach(([domain, weight]) => {
        if (isAnswered) {
          domainScores[domain] += (pointsScored * weight);
          domainMaxPossible[domain] += (3 * weight); // Max possible points for this domain mapping
        }
      });
    }
  });

  // 2. Calculate Domain Risk Percentages dynamically based on answered questions
  const domainRiskPercentages = {};
  Object.keys(domainScores).forEach(domain => {
    const maxScore = domainMaxPossible[domain];
    const actualScore = domainScores[domain];
    
    // Protect against division by zero if all questions in a domain were "Don't Know"
    domainRiskPercentages[domain] = maxScore > 0 
      ? (actualScore / maxScore) * 100 
      : 0;
  });

  // 3. Calculate Overall Scores (Linear fallback using dynamic max points)
  // Prevents "Don't Know" answers from artificially lowering the risk score
  const overallRiskScoreLinear = totalPossiblePoints > 0 
    ? (totalRawPoints / totalPossiblePoints) * 100 
    : 0;
    
  const overallHealthScoreLinear = 100 - overallRiskScoreLinear;

  return {
    totalRawPoints,
    domainScores,             // The raw weighted points per domain
    domainRiskPercentages,    // The % risk per domain (0-100)
    overallRiskScore: overallRiskScoreLinear,
    overallHealthScore: overallHealthScoreLinear
  };
}