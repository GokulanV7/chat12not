import { useState, useEffect, useRef } from "react";
import { MessageCircle, X, Send, User, Phone } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { ScrollArea } from "@/components/ui/scroll-area";

type ChatStep = "welcome" | "start_questions" | "name" | "phone" | "human" | "faq" | "answer" | "thankyou";

interface Message {
  type: "bot" | "user";
  content: string;
}

interface UserAnswer {
  question: string;
  answer: string;
}

// Organize FAQs into groups of 4
const faqGroups = [
  [
    {
      question: "What is the 50 Days Challenge?",
      answer: "The 50 Days Challenge is an examination conducted by Vidhvaa to enhance the intelligence and discipline of candidates. It is held daily at 6 AM for 50 days to help candidates self-evaluate."
    },
    {
      question: "What is the syllabus for the 50 Days Challenge?",
      answer: "The syllabus includes important daily current affairs useful for entrance exams. Study material is uploaded to the Vidhvaa Careermate App 24 hours in advance."
    },
    {
      question: "How many questions will be included in the 50 Days Challenge?",
      answer: "30 questions will be asked each day."
    },
    {
      question: "How should I write the 50 Days Challenge exam?",
      answer: "The Exam Panel opens 30 minutes early. Log in 15 minutes before 6 AM, go to the 'Schedule Exam' section, and enter your Mpin and Register Number. Late entry leads to elimination."
    }
  ],
  [
    {
      question: "Where will the 50 Days Challenge exam be conducted?",
      answer: "The exam will be conducted in the 'Schedule Exam' section of the Vidhvaa Careermate App."
    },
    {
      question: "How to get the study materials for the 50 Days Challenge?",
      answer: "Study materials are available 24 hours in advance in the '50 Days Challenge' section under the 'Current Affairs' tab in the app."
    },
    {
      question: "How to participate/pay the registration fee for the 50 Days Challenge?",
      answer: "You can register and pay ₹250 through the '50 Days Challenge' section on the app or the Vidhvaa website."
    },
    {
      question: "If I participate in the exam without fail for all 50 days, will the registration fee be given back as double?",
      answer: "Yes. If you attend all 50 exams and answer at least 27 questions daily (right or wrong), your registration fee will be refunded as double."
    }
  ],
  [
    {
      question: "What type of questions will be included in the 50 Days Challenge?",
      answer: "Questions are objective type — one correct answer out of four options. They can be Direct, Statement (Reason & Assertion), or Matching type."
    },
    {
      question: "For how long will the 50 Days Challenge exam be held?",
      answer: "Each question gets 18–30 seconds depending on difficulty. The test runs for 10–20 minutes daily."
    },
    {
      question: "Will a model exam be held before the 50 Days Challenge exam?",
      answer: "Yes, model exams will be held on November 1 and 2, 2025, at 6 AM. All rules will apply to these model tests."
    },
    {
      question: "Should I compulsorily participate in the exam for all 50 days?",
      answer: "Yes, participation is mandatory for all 50 days. Missing even one exam causes disqualification."
    }
  ],
  [
    {
      question: "What are the eligibility criteria for the 50 Days Challenge exam?",
      answer: "Anyone above 15 years of age can participate."
    },
    {
      question: "What is the benefit of participating in the 50 Days Challenge exam?",
      answer: "The challenge builds early-rising habits, self-discipline, time management, intelligence, decision-making, and quick-thinking skills."
    },
    {
      question: "What is the minimum number of questions to be answered in the 50 Days Challenge exam?",
      answer: "You must answer at least 27 questions daily. Skipping more than 3 questions results in disqualification."
    },
    {
      question: "In the 50 Days Challenge exam, from which day's current affairs will the questions be asked each day?",
      answer: "Questions are based on current affairs from up to 48 hours before the exam."
    }
  ],
  [
    {
      question: "How is the rank list for the 50 Days Challenge exam determined?",
      answer: "Ranking depends on marks and answering time. If scores tie, the faster participant ranks higher."
    },
    {
      question: "Can I take the exam again after it is finished each day?",
      answer: "Yes, you can retake the exam 30 minutes later using the 'Revision Test' option, but ranks won't be published for retests."
    },
    {
      question: "Have you conducted any exams before this?",
      answer: "Yes, Vidhvaa has conducted similar events such as Women's Day Quiz, Constitution Day, Independence Day, and TNPSC Mission 2025."
    },
    {
      question: "Will the previous first three prize winners of the 50 Days Challenge exam participate this time?",
      answer: "Yes, previous winners can participate again. Competing with them reveals your potential, and new achievers can emerge."
    }
  ],
  [
    {
      question: "Where will the final exam for the prize money of the 50 Days Challenge be held?",
      answer: "The final exam will be held in the 'LIVE ON LIVE EXAM' section of the Vidhvaa Careermate App."
    },
    {
      question: "What should I do if I forget my M-PIN and Register Number?",
      answer: "You can retrieve your M-PIN and Register Number by clicking the Bell icon on the home page or contacting Vidhvaa support."
    },
    {
      question: "Who are eligible for the final exam for the prize money of the 50 Days Challenge?",
      answer: "Only those who attended all 50 days and answered at least 27 questions daily are eligible for the final exam."
    },
    {
      question: "How to download the Vidhvaa Careermate App?",
      answer: "The Vidhvaa Careermate App can be downloaded from the Google Play Store and App Store."
    }
  ],
  [
    {
      question: "What is the prize money for the winners of the 50 Days Challenge?",
      answer: "1st Prize – ₹5,00,000 (Bumper Prize ₹10,00,000); 2nd Prize – ₹2,50,000; 3rd Prize – ₹1,00,000; 4th Prize – ₹50,000; Next 100 competitors – ₹1,000 each."
    },
    {
      question: "What is the Bumper Prize?",
      answer: "The ₹10,00,000 Bumper Prize goes to a participant who answers 28–30 questions correctly each day for all 50 days and secures 1st rank in the Achievers' Challenge Exam."
    },
    {
      question: "How to trust this exam?",
      answer: "Vidhvaa has conducted several verified exams and distributed prizes on time. Proof videos: http://www.youtube.com/watch?v=0fuoe8u4hEE, http://www.youtube.com/watch?v=D3-gP0rwgL0, http://www.youtube.com/watch?v=q19rfPoGmis"
    }
  ]
];

export function ChatWidget() {
  const [isOpen, setIsOpen] = useState(false);
  const [step, setStep] = useState<ChatStep>("welcome");
  const [messages, setMessages] = useState<Message[]>([
    { type: "bot", content: "Welcome to Vidhvaa Support! 👋 I'm here to help you with any questions about the 50 Days Challenge." }
  ]);
  const [userName, setUserName] = useState("");
  const [userPhone, setUserPhone] = useState("");
  const [inputValue, setInputValue] = useState("");
  const [currentQuestionSet, setCurrentQuestionSet] = useState(0);
  const [userAnswers, setUserAnswers] = useState<UserAnswer[]>([]);
  const [answeredInCurrentSet, setAnsweredInCurrentSet] = useState<number[]>([]);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages, step]);

  const addMessage = (type: "bot" | "user", content: string) => {
    setMessages(prev => [...prev, { type, content }]);
  };

  const handleWelcome = () => {
    addMessage("bot", "May I know your name?");
    setStep("name");
  };

  const handleNameSubmit = () => {
    if (!inputValue.trim()) return;
    setUserName(inputValue);
    addMessage("user", inputValue);
    addMessage("bot", `Nice to meet you, ${inputValue}! Could you please share your phone number?`);
    setInputValue("");
    setStep("phone");
  };

  const handlePhoneSubmit = () => {
    if (!inputValue.trim()) return;
    setUserPhone(inputValue);
    addMessage("user", inputValue);
    addMessage("bot", "Thank you! Would you like to connect with a human representative?");
    setInputValue("");
    setStep("human");
  };

  const handleHumanChoice = (choice: boolean) => {
    if (choice) {
      addMessage("user", "Yes, connect me with a human");
      addMessage("bot", "Thank you for contacting us! Our team will contact you on WhatsApp within 10 minutes. Please stay available on your registered number.");
      setStep("thankyou");
    } else {
      addMessage("user", "No, I have some questions");
      addMessage("bot", "Perfect! Let me help you with some questions. Would you like to go through our question guide?");
      setStep("start_questions");
    }
  };

  const handleStartQuestions = (choice: boolean) => {
    if (choice) {
      addMessage("user", "Yes, let's go");
      setCurrentQuestionSet(0);
      addMessage("bot", `Great! Here are 4 questions for you. We have ${faqGroups.length} sets of questions total. Please select a question:`);
      setStep("faq");
    } else {
      addMessage("user", "No, thanks");
      addMessage("bot", "No problem! Feel free to reach out if you need any help later.");
      setStep("thankyou");
    }
  };

  const handleQuestionSelect = (faq: typeof faqGroups[0][0], questionIndex: number) => {
    addMessage("user", faq.question);
    addMessage("bot", faq.answer);
    
    // Track the user's answer
    setUserAnswers(prev => [...prev, { question: faq.question, answer: faq.answer }]);
    setAnsweredInCurrentSet(prev => [...prev, questionIndex]);
    
    setStep("answer");
    setTimeout(() => {
      const remainingInSet = 4 - answeredInCurrentSet.length - 1;
      const remainingSets = faqGroups.length - currentQuestionSet - (remainingInSet === 0 ? 1 : 0);
      
      if (remainingInSet > 0) {
        addMessage("bot", `You have ${remainingInSet} more questions in this set. Would you like to continue?`);
      } else if (remainingSets > 0) {
        addMessage("bot", `Great! You've completed this set. We have ${remainingSets} more sets available. Would you like to continue to the next set?`);
      } else {
        addMessage("bot", "Congratulations! You've gone through all our questions. Thank you for using our help system!");
        setStep("thankyou");
        return;
      }
    }, 1000);
  };

  const resetChat = () => {
    setStep("welcome");
    setMessages([
      { type: "bot", content: "Welcome to Vidhvaa Support! 👋 I'm here to help you with any questions about the 50 Days Challenge." }
    ]);
    setUserName("");
    setUserPhone("");
    setInputValue("");
    setCurrentQuestionSet(0);
    setUserAnswers([]);
    setAnsweredInCurrentSet([]);
  };

  const handleNextQuestion = () => {
    const remainingInSet = 4 - answeredInCurrentSet.length;
    
    if (remainingInSet === 0) {
      // Move to next set
      setCurrentQuestionSet(prev => prev + 1);
      setAnsweredInCurrentSet([]);
      addMessage("bot", "Moving to the next set of questions. Please select a question:");
    } else {
      addMessage("bot", "Please select another question from this set:");
    }
    
    setStep("faq");
  };

  const handleEndChat = () => {
    addMessage("user", "No, thank you");
    addMessage("bot", "Thank you for contacting Vidhvaa Support! We hope we've been helpful. Feel free to reach out anytime you have questions about the 50 Days Challenge. Good luck! 🎯");
    setStep("thankyou");
  };

  return (
    <>
      {!isOpen && (
        <div className="fixed bottom-6 right-6 z-40">
          {/* Help bubble */}
          <div className="absolute bottom-20 right-2 mb-4 animate-bounce">
            <div className="relative bg-blue-500 text-white px-3 py-2 rounded-xl rounded-br-sm shadow-lg whitespace-nowrap">
              <div className="text-sm font-medium">Need help?</div>
              <div className="text-xs opacity-90">Get instant answers</div>
              {/* Triangle pointer */}
              <div className="absolute -bottom-1 right-3 w-0 h-0 border-l-4 border-l-transparent border-r-4 border-r-transparent border-t-4 border-t-blue-500"></div>
            </div>
          </div>
          
          {/* Chat button */}
          <Button
            onClick={() => setIsOpen(true)}
            className="h-20 w-20 rounded-full shadow-[var(--shadow-chat)] hover:scale-110 transition-transform bg-gradient-to-r from-primary to-accent"
            size="icon"
          >
            <MessageCircle className="h-10 w-10" />
          </Button>
        </div>
      )}

      {isOpen && (
        <div className="fixed bottom-6 right-6 w-[400px] md:w-[450px] lg:w-[500px] h-[600px] bg-card rounded-2xl shadow-[var(--shadow-chat)] flex flex-col overflow-hidden border border-border animate-in slide-in-from-bottom-4 duration-300 z-50">
          {/* Header */}
          <div className="bg-gradient-to-r from-primary to-accent p-4 flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="h-10 w-10 rounded-full bg-white/20 backdrop-blur-sm flex items-center justify-center">
                <MessageCircle className="h-5 w-5 text-white" />
              </div>
              <div>
                <h3 className="font-semibold text-white">Vidhvaa Support</h3>
                <p className="text-xs text-white/80">Always here to help</p>
              </div>
            </div>
            <Button
              variant="ghost"
              size="icon"
              onClick={() => setIsOpen(false)}
              className="text-white hover:bg-white/20"
              title="Close Chat"
            >
              <X className="h-5 w-5" />
            </Button>
          </div>

          {/* Messages */}
          <ScrollArea className="flex-1 p-3">
            <div className="space-y-3 pb-4 max-w-full">
              {messages.map((msg, idx) => (
                <div
                  key={idx}
                  className={`flex ${msg.type === "user" ? "justify-end" : "justify-start"}`}
                >
                  <div
                    className={`max-w-[85%] rounded-2xl px-3 py-2.5 break-words ${
                      msg.type === "user"
                        ? "bg-gradient-to-r from-primary to-accent text-primary-foreground"
                        : "bg-muted text-foreground"
                    }`}
                  >
                    <p className="text-sm leading-relaxed break-words overflow-wrap-anywhere">{msg.content}</p>
                  </div>
                </div>
              ))}

              {/* Action buttons based on step */}
              {step === "welcome" && (
                <div className="flex justify-start animate-in fade-in duration-300">
                  <Button
                    onClick={handleWelcome}
                    size="lg"
                    className="bg-primary hover:bg-primary/90 shadow-sm"
                  >
                    Get Started
                  </Button>
                </div>
              )}

              {step === "human" && (
                <div className="flex gap-2 justify-start animate-in fade-in duration-300">
                  <Button
                    onClick={() => handleHumanChoice(true)}
                    size="lg"
                    className="bg-primary hover:bg-primary/90"
                  >
                    Yes
                  </Button>
                  <Button
                    onClick={() => handleHumanChoice(false)}
                    size="lg"
                    variant="outline"
                  >
                    No
                  </Button>
                </div>
              )}

              {step === "answer" && (
                <div className="flex gap-2 justify-start animate-in fade-in duration-300">
                  <Button
                    onClick={handleNextQuestion}
                    size="lg"
                    className="bg-primary hover:bg-primary/90"
                  >
                    Yes, Another Question
                  </Button>
                  <Button
                    onClick={handleEndChat}
                    size="lg"
                    variant="outline"
                  >
                    No, Thank You
                  </Button>
                </div>
              )}

              {step === "start_questions" && (
                <div className="flex gap-2 justify-start animate-in fade-in duration-300">
                  <Button
                    onClick={() => handleStartQuestions(true)}
                    size="lg"
                    className="bg-primary hover:bg-primary/90"
                  >
                    Yes, Let's Go
                  </Button>
                  <Button
                    onClick={() => handleStartQuestions(false)}
                    size="lg"
                    variant="outline"
                  >
                    No, Thanks
                  </Button>
                </div>
              )}

              {step === "faq" && (
                <div className="space-y-2 animate-in fade-in duration-300">
                  <p className="text-sm font-medium text-muted-foreground mb-2">
                    Question Set {currentQuestionSet + 1} of {faqGroups.length} - Select a question:
                  </p>
                  {faqGroups[currentQuestionSet]?.map((faq, idx) => {
                    if (answeredInCurrentSet.includes(idx)) return null;
                    return (
                      <Button
                        key={idx}
                        onClick={() => handleQuestionSelect(faq, idx)}
                        variant="outline"
                        className="w-full text-left h-auto py-3 px-3 justify-start hover:bg-muted"
                      >
                        <span className="text-sm leading-relaxed break-words whitespace-normal">{faq.question}</span>
                      </Button>
                    );
                  })}
                </div>
              )}

              {step === "thankyou" && (
                <div className="flex justify-start animate-in fade-in duration-300">
                  <Button
                    onClick={resetChat}
                    size="lg"
                    variant="outline"
                  >
                    Start New Conversation
                  </Button>
                </div>
              )}

              <div ref={messagesEndRef} />
            </div>
          </ScrollArea>

          {/* Input */}
          {(step === "name" || step === "phone") && (
            <div className="p-4 border-t border-border">
              <div className="flex gap-2">
                <div className="relative flex-1">
                  {step === "name" && (
                    <User className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                  )}
                  {step === "phone" && (
                    <Phone className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                  )}
                  <Input
                    value={inputValue}
                    onChange={(e) => setInputValue(e.target.value)}
                    onKeyPress={(e) => {
                      if (e.key === "Enter") {
                        if (step === "name") handleNameSubmit();
                        if (step === "phone") handlePhoneSubmit();
                      }
                    }}
                    placeholder={step === "name" ? "Enter your name" : "Enter your phone number"}
                    className="pl-10"
                  />
                </div>
                <Button
                  onClick={() => {
                    if (step === "name") handleNameSubmit();
                    if (step === "phone") handlePhoneSubmit();
                  }}
                  size="icon"
                  className="bg-primary hover:bg-primary/90"
                >
                  <Send className="h-4 w-4" />
                </Button>
              </div>
            </div>
          )}
        </div>
      )}
    </>
  );
}
