export type QAAnswers = { [key: number]: number };

export const questions = [
  {
    id: 1,
    question: "What Did You Learn ??......",
    options: [
      "Learn the Basic of IOT",
      "Learn the Basic of IOT",
      "Learn the Basic of IOT",
      "Learn the Basic of IOT",
    ],
  },
  {
    id: 2,
    question: "Which protocol is commonly used in IOT devices?",
    options: ["HTTP", "MQTT", "FTP", "SMTP"],
  },
  {
    id: 3,
    question: "What is the main purpose of sensors in IOT?",
    options: [
      "Data storage",
      "Data processing",
      "Data collection",
      "Data transmission",
    ],
  },
  {
    id: 4,
    question: "Which component acts as the brain of an IOT device?",
    options: ["Sensor", "Actuator", "Microcontroller", "Gateway"],
  },
  {
    id: 5,
    question: "What does IOT stand for?",
    options: [
      "Internet of Technology",
      "Internet of Things",
      "Integration of Things",
      "Intelligence of Things",
    ],
  },
] as const;

export const TIME_LIMIT = 30 * 60; // 30 minutes
