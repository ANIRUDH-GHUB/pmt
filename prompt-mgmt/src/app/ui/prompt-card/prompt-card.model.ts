export interface PromptSection {
  id?: string;
  sequence: number;
  sectionName: string;
  sectionText: string;
  expertise?: string;
  createdBy?: string;
  createdAt?: number;
  updatedBy?: string;
  updatedAt?: number;
}

export interface PromptMeta {
  reportType: string;
}

export interface PromptModel {
  id: string;
  name: string;
  description: string;
  useCase: string;
  subUseCase: string;
  reportType: string;
  modelType: string;
  modelVersion: string;
  temperature: number;
  topP: number;
  frequencyPenalty: number;
  presencePenalty: number;
  promptSections: PromptSection[];
  createdAt: Date;
  updatedAt: Date;
  createdBy: string;
  published: boolean;
  version: number;
  modelSettings?: {
    temperature: number;
    topP: number;
    frequencyPenalty: number;
    presencePenalty: number;
    modelType: string;
    modelVersion: string;
  };
}

export const PROMPT_DATA: PromptModel[] = [
  {
    id: "p1v1",
    name: "test_ani",
    description: "This is a comprehensive test prompt designed to evaluate the functionality and performance of our prompt management system. It includes multiple sections with different expertise areas to ensure thorough testing of various capabilities and features.",
    useCase: "Summarization",
    subUseCase: "headline_generation",
    reportType: "Generic",
    modelType: "OpenAI",
    modelVersion: "gpt-4o",
    temperature: 0,
    topP: 1,
    frequencyPenalty: 0,
    presencePenalty: 0,
    promptSections: [
      {
        createdBy: "Aniroodh Suddhapalli(07YNF)",
        createdAt: 1751658888088,
        updatedBy: "Aniroodh Suddhapalli(07YNF)",
        updatedAt: 1751658888088,
        id: "5aebd1b8-bffa-4763-9ee2-d1e5ad623309",
        sequence: 1,
        sectionName: "Math Expert",
        sectionText: "You are a math expert"
      },
      {
        createdBy: "Aniroodh Suddhapalli(07YNF)",
        createdAt: 1751658888088,
        updatedBy: "Aniroodh Suddhapalli(07YNF)",
        updatedAt: 1751658888088,
        id: "02baba349-cad6-47ac-9a80-e15b7fefa739",
        sequence: 2,
        sectionName: "History Expert",
        sectionText: "You are a history expert"
      },
      {
        createdAt: undefined,
        updatedAt: undefined,
        id: undefined,
        sequence: 3,
        sectionName: "Coder Expert",
        sectionText: "You are an expert coder"
      }
    ],
    createdAt: new Date(1751658888088),
    updatedAt: new Date(1751658979826),
    createdBy: "Aniroodh Suddhapalli(07YNF)",
    published: true,
    version: 3,
    modelSettings: {
      temperature: 0,
      topP: 1,
      frequencyPenalty: 0,
      presencePenalty: 0,
      modelType: "OpenAI",
      modelVersion: "gpt-4o"
    }
  },  
  {
    id: "p1v2",
    name: "test_ani",
    description: "This is a comprehensive test prompt designed to evaluate the functionality and performance of our prompt management system. It includes multiple sections with different expertise areas to ensure thorough testing of various capabilities and features.",
    useCase: "Summarization",
    subUseCase: "headline_generation",
    reportType: "Generic",
    modelType: "OpenAI",
    modelVersion: "gpt-4o",
    temperature: 0,
    topP: 1,
    frequencyPenalty: 0,
    presencePenalty: 0,
    promptSections: [
      {
        createdBy: "Aniroodh Suddhapalli(07YNF)",
        createdAt: 1751658888088,
        updatedBy: "Aniroodh Suddhapalli(07YNF)",
        updatedAt: 1751658888088,
        id: "5aebd1b8-bffa-4763-9ee2-d1e5ad623309",
        sequence: 1,
        sectionName: "Math Expert",
        sectionText: "You are a math expert"
      }
    ],
    createdAt: new Date(1751658888088),
    updatedAt: new Date(1751658979826),
    createdBy: "Aniroodh Suddhapalli(07YNF)",
    published: true,
    version: 1,
    modelSettings: {
      temperature: 0,
      topP: 1,
      frequencyPenalty: 0,
      presencePenalty: 0,
      modelType: "OpenAI",
      modelVersion: "gpt-4o"
    }
  },
  {
    id: "p2v2",
    name: "Headline Generator",
    description: "A sophisticated AI-powered headline generation system that creates compelling, SEO-optimized headlines for articles, blog posts, and marketing content. Analyzes content context, target audience, and trending topics to generate headlines that maximize engagement and click-through rates.",
    useCase: "Generation",
    subUseCase: "headline",
    reportType: "Generic",
    modelType: "OpenAI",
    modelVersion: "gpt-4o",
    temperature: 0,
    topP: 1,
    frequencyPenalty: 0,
    presencePenalty: 0,
    promptSections: [
      {
        createdBy: "Bob",
        createdAt: 1751658979004,
        updatedBy: "Bob",
        updatedAt: 1751658979004,
        id: "section1",
        sequence: 1,
        sectionName: "Headline Expert",
        sectionText: "You are a headline expert"
      }
    ],
    createdAt: new Date(1751658979004),
    updatedAt: new Date(1751658979005),
    createdBy: "Bob",
    published: true,
    version: 2,
    modelSettings: {
      temperature: 0,
      topP: 1,
      frequencyPenalty: 0,
      presencePenalty: 0,
      modelType: "OpenAI",
      modelVersion: "gpt-4o"
    }
  },
  {
    id: "p3v1",
    name: "Math Tutor",
    description: "An intelligent mathematics tutoring assistant that provides step-by-step explanations for complex mathematical problems. Covers algebra, calculus, geometry, statistics, and more. Adapts explanations based on student skill level and learning style, making math concepts accessible and engaging for learners of all ages.",
    useCase: "Tutoring",
    subUseCase: "math",
    reportType: "Generic",
    modelType: "OpenAI",
    modelVersion: "gpt-4o",
    temperature: 0,
    topP: 1,
    frequencyPenalty: 0,
    presencePenalty: 0,
    promptSections: [
      {
        createdBy: "Carol",
        createdAt: 1751658979006,
        updatedBy: "Carol",
        updatedAt: 1751658979006,
        id: "section2",
        sequence: 1,
        sectionName: "Math Tutor",
        sectionText: "You are a math tutor"
      }
    ],
    createdAt: new Date(1751658979006),
    updatedAt: new Date(1751658979006),
    createdBy: "Carol",
    published: true,
    version: 1,
    modelSettings: {
      temperature: 0,
      topP: 1,
      frequencyPenalty: 0,
      presencePenalty: 0,
      modelType: "OpenAI",
      modelVersion: "gpt-4o"
    }
  },
  {
    id: "p4v2",
    name: "Essay Reviewer",
    description: "A comprehensive essay evaluation system that provides detailed feedback on writing quality, structure, grammar, and content. Analyzes essays across multiple dimensions including argument strength, evidence usage, logical flow, and writing style. Offers constructive suggestions for improvement and assigns scores based on established academic standards.",
    useCase: "Review",
    subUseCase: "essay",
    reportType: "Generic",
    modelType: "OpenAI",
    modelVersion: "gpt-4o",
    temperature: 0,
    topP: 1,
    frequencyPenalty: 0,
    presencePenalty: 0,
    promptSections: [
      {
        createdBy: "Dave",
        createdAt: 1751658979007,
        updatedBy: "Dave",
        updatedAt: 1751658979007,
        id: "section3",
        sequence: 1,
        sectionName: "Essay Reviewer",
        sectionText: "You are an essay reviewer"
      }
    ],
    createdAt: new Date(1751658979007),
    updatedAt: new Date(1751658979008),
    createdBy: "Dave",
    published: true,
    version: 2,
    modelSettings: {
      temperature: 0,
      topP: 1,
      frequencyPenalty: 0,
      presencePenalty: 0,
      modelType: "OpenAI",
      modelVersion: "gpt-4o"
    }
  },
  {
    id: "p5v1",
    name: "Code Explainer",
    description: "An advanced code analysis and explanation tool that breaks down complex programming concepts, algorithms, and code snippets into understandable explanations. Supports multiple programming languages and provides context-aware explanations suitable for both beginners and experienced developers. Includes best practices, optimization suggestions, and debugging insights.",
    useCase: "Explanation",
    subUseCase: "code",
    reportType: "Generic",
    modelType: "OpenAI",
    modelVersion: "gpt-4o",
    temperature: 0,
    topP: 1,
    frequencyPenalty: 0,
    presencePenalty: 0,
    promptSections: [
      {
        createdBy: "Eve",
        createdAt: 1751658979009,
        updatedBy: "Eve",
        updatedAt: 1751658979009,
        id: "section4",
        sequence: 1,
        sectionName: "Code Expert",
        sectionText: "You are a code expert"
      }
    ],
    createdAt: new Date(1751658979009),
    updatedAt: new Date(1751658979009),
    createdBy: "Eve",
    published: true,
    version: 1,
    modelSettings: {
      temperature: 0,
      topP: 1,
      frequencyPenalty: 0,
      presencePenalty: 0,
      modelType: "OpenAI",
      modelVersion: "gpt-4o"
    }
  },
  {
    id: "p6v1",
    name: "Creative Story Writer",
    description: "A creative writing assistant that generates engaging stories, novels, and creative content across various genres including fantasy, sci-fi, romance, mystery, and historical fiction. Incorporates character development, plot structure, dialogue, and world-building elements to create compelling narratives that captivate readers and maintain consistent storytelling quality.",
    useCase: "Writing",
    subUseCase: "creative",
    reportType: "Creative",
    modelType: "OpenAI",
    modelVersion: "gpt-4o",
    temperature: 0,
    topP: 1,
    frequencyPenalty: 0,
    presencePenalty: 0,
    promptSections: [
      {
        createdBy: "Frank",
        createdAt: 1751658979010,
        updatedBy: "Frank",
        updatedAt: 1751658979010,
        id: "section5",
        sequence: 1,
        sectionName: "Creative Storyteller",
        sectionText: "You are a creative storyteller"
      }
    ],
    createdAt: new Date(1751658979010),
    updatedAt: new Date(1751658979010),
    createdBy: "Frank",
    published: true,
    version: 1,
    modelSettings: {
      temperature: 0,
      topP: 1,
      frequencyPenalty: 0,
      presencePenalty: 0,
      modelType: "OpenAI",
      modelVersion: "gpt-4o"
    }
  },
  {
    id: "p7v1",
    name: "Data Analyst",
    description: "A comprehensive data analysis and visualization assistant that helps interpret complex datasets, identify trends, and generate insights. Supports statistical analysis, data cleaning, visualization recommendations, and report generation. Provides actionable business intelligence and helps users make data-driven decisions across various industries and use cases.",
    useCase: "Analysis",
    subUseCase: "data",
    reportType: "Analytics",
    modelType: "OpenAI",
    modelVersion: "gpt-4o",
    temperature: 0,
    topP: 1,
    frequencyPenalty: 0,
    presencePenalty: 0,
    promptSections: [
      {
        createdBy: "Grace",
        createdAt: 1751658979011,
        updatedBy: "Grace",
        updatedAt: 1751658979011,
        id: "section6",
        sequence: 1,
        sectionName: "Data Analyst",
        sectionText: "You are a data analyst"
      }
    ],
    createdAt: new Date(1751658979011),
    updatedAt: new Date(1751658979011),
    createdBy: "Grace",
    published: true,
    version: 1,
    modelSettings: {
      temperature: 0,
      topP: 1,
      frequencyPenalty: 0,
      presencePenalty: 0,
      modelType: "OpenAI",
      modelVersion: "gpt-4o"
    }
  },
  {
    id: "p8v1",
    name: "Language Translator Pro",
    description: "An advanced multilingual translation system that provides accurate, context-aware translations between 50+ languages. Maintains cultural nuances, idiomatic expressions, and formal/informal tone variations. Includes grammar correction, style adaptation, and domain-specific terminology for technical, legal, medical, and creative content translation.",
    useCase: "Translation",
    subUseCase: "multilingual",
    reportType: "Translation",
    modelType: "OpenAI",
    modelVersion: "gpt-4o",
    temperature: 0,
    topP: 1,
    frequencyPenalty: 0,
    presencePenalty: 0,
    promptSections: [
      {
        createdBy: "Heidi",
        createdAt: 1751658979012,
        updatedBy: "Heidi",
        updatedAt: 1751658979012,
        id: "section7",
        sequence: 1,
        sectionName: "Professional Translator",
        sectionText: "You are a professional translator"
      }
    ],
    createdAt: new Date(1751658979012),
    updatedAt: new Date(1751658979012),
    createdBy: "Heidi",
    published: true,
    version: 1,
    modelSettings: {
      temperature: 0,
      topP: 1,
      frequencyPenalty: 0,
      presencePenalty: 0,
      modelType: "OpenAI",
      modelVersion: "gpt-4o"
    }
  },
  {
    id: "p9v1",
    name: "Marketing Copywriter",
    description: "A professional marketing copywriting assistant that creates compelling, conversion-focused content for advertisements, landing pages, email campaigns, and social media. Incorporates persuasive psychology, SEO optimization, brand voice consistency, and call-to-action strategies to maximize engagement and drive customer conversions across various marketing channels.",
    useCase: "Marketing",
    subUseCase: "copywriting",
    reportType: "Marketing",
    modelType: "OpenAI",
    modelVersion: "gpt-4o",
    temperature: 0,
    topP: 1,
    frequencyPenalty: 0,
    presencePenalty: 0,
    promptSections: [
      {
        createdBy: "Ivan",
        createdAt: 1751658979013,
        updatedBy: "Ivan",
        updatedAt: 1751658979013,
        id: "section8",
        sequence: 1,
        sectionName: "Marketing Copywriter",
        sectionText: "You are a marketing copywriter"
      }
    ],
    createdAt: new Date(1751658979013),
    updatedAt: new Date(1751658979013),
    createdBy: "Ivan",
    published: true,
    version: 1,
    modelSettings: {
      temperature: 0,
      topP: 1,
      frequencyPenalty: 0,
      presencePenalty: 0,
      modelType: "OpenAI",
      modelVersion: "gpt-4o"
    }
  },
  {
    id: "p10v1",
    name: "Research Assistant",
    description: "A comprehensive research assistant that helps gather, analyze, and synthesize information from multiple sources. Provides literature reviews, fact-checking, citation management, and research methodology guidance. Supports academic, business, and general research needs with proper source attribution and evidence-based conclusions.",
    useCase: "Research",
    subUseCase: "academic",
    reportType: "Academic",
    modelType: "OpenAI",
    modelVersion: "gpt-4o",
    temperature: 0,
    topP: 1,
    frequencyPenalty: 0,
    presencePenalty: 0,
    promptSections: [
      {
        createdBy: "Judy",
        createdAt: 1751658979014,
        updatedBy: "Judy",
        updatedAt: 1751658979014,
        id: "section9",
        sequence: 1,
        sectionName: "Research Assistant",
        sectionText: "You are a research assistant"
      }
    ],
    createdAt: new Date(1751658979014),
    updatedAt: new Date(1751658979014),
    createdBy: "Judy",
    published: true,
    version: 1,
    modelSettings: {
      temperature: 0,
      topP: 1,
      frequencyPenalty: 0,
      presencePenalty: 0,
      modelType: "OpenAI",
      modelVersion: "gpt-4o"
    }
  },
  {
    id: "p11v2",
    name: "Content Summarizer",
    description: "Enhanced version of the content summarizer with improved accuracy and better handling of technical content. Now includes support for multi-language summarization and better preservation of key technical terms and concepts.",
    useCase: "Summarization",
    subUseCase: "Article Summary",
    reportType: "Technical",
    modelType: "Anthropic",
    modelVersion: "Claude-3-Sonnet",
    temperature: 0,
    topP: 1,
    frequencyPenalty: 0,
    presencePenalty: 0,
    promptSections: [
      {
        createdBy: "John Doe",
        createdAt: 1751658979015,
        updatedBy: "John Doe",
        updatedAt: 1751658979015,
        id: "section1v2",
        sequence: 1,
        sectionName: "System Message",
        sectionText: "You are an advanced content summarizer with expertise in technical documentation, research papers, and business content. Create concise, accurate summaries that preserve key technical terms and maintain the original context."
      },
      {
        createdBy: "John Doe",
        createdAt: 1751658979015,
        updatedBy: "John Doe",
        updatedAt: 1751658979015,
        id: "section2v2",
        sequence: 2,
        sectionName: "User Message",
        sectionText: "Please provide a comprehensive summary of the following content, highlighting key points, technical terms, and actionable insights:"
      }
    ],
    createdAt: new Date(1751658979015),
    updatedAt: new Date(1751658979015),
    createdBy: "John Doe",
    published: true,
    version: 2,
    modelSettings: {
      temperature: 0,
      topP: 1,
      frequencyPenalty: 0,
      presencePenalty: 0,
      modelType: "Anthropic",
      modelVersion: "Claude-3-Sonnet"
    }
  },
  {
    id: "p11v3",
    name: "Content Summarizer",
    description: "Latest version with AI-powered content analysis, sentiment detection, and automatic key point extraction. Optimized for social media content and real-time summarization needs.",
    useCase: "Summarization",
    subUseCase: "Article Summary",
    reportType: "Analytics",
    modelType: "OpenAI",
    modelVersion: "GPT-4-Turbo",
    temperature: 0,
    topP: 1,
    frequencyPenalty: 0,
    presencePenalty: 0,
    promptSections: [
      {
        createdBy: "John Doe",
        createdAt: 1751658979016,
        updatedBy: "John Doe",
        updatedAt: 1751658979016,
        id: "section1v3",
        sequence: 1,
        sectionName: "System Message",
        sectionText: "You are a cutting-edge AI content analyzer and summarizer. Use advanced NLP techniques to extract key insights, detect sentiment, and create engaging summaries optimized for different platforms and audiences."
      },
      {
        createdBy: "John Doe",
        createdAt: 1751658979016,
        updatedBy: "John Doe",
        updatedAt: 1751658979016,
        id: "section2v3",
        sequence: 2,
        sectionName: "Analysis Instructions",
        sectionText: "Analyze the content for: 1) Key themes and topics, 2) Sentiment analysis, 3) Actionable insights, 4) Target audience identification, 5) Platform-specific optimization recommendations."
      },
      {
        createdBy: "John Doe",
        createdAt: 1751658979016,
        updatedBy: "John Doe",
        updatedAt: 1751658979016,
        id: "section3v3",
        sequence: 3,
        sectionName: "User Message",
        sectionText: "Please provide a comprehensive analysis and summary of the following content:"
      }
    ],
    createdAt: new Date(1751658979016),
    updatedAt: new Date(1751658979016),
    createdBy: "John Doe",
    published: false,
    version: 3,
    modelSettings: {
      temperature: 0,
      topP: 1,
      frequencyPenalty: 0,
      presencePenalty: 0,
      modelType: "OpenAI",
      modelVersion: "GPT-4-Turbo"
    }
  },
  {
    id: "p12v2",
    name: "Creative Story Generator",
    description: "Enhanced story generator with advanced character development, plot structure analysis, and genre-specific writing techniques. Now includes support for interactive storytelling and branching narratives.",
    useCase: "Generation",
    subUseCase: "Creative",
    reportType: "Creative",
    modelType: "Anthropic",
    modelVersion: "Claude-3-Opus",
    temperature: 0,
    topP: 1,
    frequencyPenalty: 0,
    presencePenalty: 0,
    promptSections: [
      {
        createdBy: "Jane Smith",
        createdAt: 1751658979017,
        updatedBy: "Jane Smith",
        updatedAt: 1751658979017,
        id: "section1v2",
        sequence: 1,
        sectionName: "System Message",
        sectionText: "You are an expert creative writer and storyteller with deep knowledge of narrative structure, character development, and genre conventions. Create compelling stories with rich characters, engaging plots, and immersive worlds."
      },
      {
        createdBy: "Jane Smith",
        createdAt: 1751658979017,
        updatedBy: "Jane Smith",
        updatedAt: 1751658979017,
        id: "section2v2",
        sequence: 2,
        sectionName: "Story Elements",
        sectionText: "Focus on: 1) Character development with backstories and motivations, 2) Plot structure with clear conflict and resolution, 3) World-building and setting details, 4) Dialogue that reveals character and advances plot, 5) Genre-specific tropes and conventions."
      }
    ],
    createdAt: new Date(1751658979017),
    updatedAt: new Date(1751658979017),
    createdBy: "Jane Smith",
    published: true,
    version: 2,
    modelSettings: {
      temperature: 0,
      topP: 1,
      frequencyPenalty: 0,
      presencePenalty: 0,
      modelType: "Anthropic",
      modelVersion: "Claude-3-Opus"
    }
  },
  {
    id: "p13v2",
    name: "Code Review Assistant",
    description: "Advanced code review system with security analysis, performance optimization suggestions, and automated testing recommendations. Now includes support for multiple programming languages and framework-specific best practices.",
    useCase: "Review",
    subUseCase: "Code",
    reportType: "Technical",
    modelType: "OpenAI",
    modelVersion: "GPT-4-Turbo",
    temperature: 0,
    topP: 1,
    frequencyPenalty: 0,
    presencePenalty: 0,
    promptSections: [
      {
        createdBy: "John Doe",
        createdAt: 1751658979018,
        updatedBy: "John Doe",
        updatedAt: 1751658979018,
        id: "section1v2",
        sequence: 1,
        sectionName: "System Message",
        sectionText: "You are a senior software engineer and code reviewer with expertise in multiple programming languages, security best practices, and performance optimization. Provide comprehensive code reviews with actionable feedback."
      },
      {
        createdBy: "John Doe",
        createdAt: 1751658979018,
        updatedBy: "John Doe",
        updatedAt: 1751658979018,
        id: "section2v2",
        sequence: 2,
        sectionName: "Review Criteria",
        sectionText: "Evaluate code for: 1) Security vulnerabilities and best practices, 2) Performance optimization opportunities, 3) Code readability and maintainability, 4) Testing coverage and edge cases, 5) Architecture and design patterns, 6) Documentation quality."
      },
      {
        createdBy: "John Doe",
        createdAt: 1751658979018,
        updatedBy: "John Doe",
        updatedAt: 1751658979018,
        id: "section3v2",
        sequence: 3,
        sectionName: "User Message",
        sectionText: "Please review the following code and provide detailed feedback:"
      }
    ],
    createdAt: new Date(1751658979018),
    updatedAt: new Date(1751658979018),
    createdBy: "John Doe",
    published: true,
    version: 2,
    modelSettings: {
      temperature: 0,
      topP: 1,
      frequencyPenalty: 0,
      presencePenalty: 0,
      modelType: "OpenAI",
      modelVersion: "GPT-4-Turbo"
    }
  },
  {
    id: "p14v2",
    name: "Essay Reviewer",
    description: "Enhanced essay review system with plagiarism detection, citation analysis, and academic writing style assessment. Now includes support for different academic levels and subject-specific evaluation criteria.",
    useCase: "Review",
    subUseCase: "essay",
    reportType: "Academic",
    modelType: "Anthropic",
    modelVersion: "Claude-3-Sonnet",
    temperature: 0,
    topP: 1,
    frequencyPenalty: 0,
    presencePenalty: 0,
    promptSections: [
      {
        createdBy: "Dave",
        createdAt: 1751658979019,
        updatedBy: "Dave",
        updatedAt: 1751658979019,
        id: "section1v2",
        sequence: 1,
        sectionName: "System Message",
        sectionText: "You are an experienced academic writing instructor and essay reviewer with expertise in multiple subjects and academic levels. Provide comprehensive feedback on writing quality, structure, and content."
      },
      {
        createdBy: "Dave",
        createdAt: 1751658979019,
        updatedBy: "Dave",
        updatedAt: 1751658979019,
        id: "section2v2",
        sequence: 2,
        sectionName: "Evaluation Criteria",
        sectionText: "Assess: 1) Thesis statement and argument strength, 2) Evidence usage and citation quality, 3) Logical flow and organization, 4) Writing style and grammar, 5) Critical thinking and analysis depth, 6) Academic integrity and originality."
      }
    ],
    createdAt: new Date(1751658979019),
    updatedAt: new Date(1751658979019),
    createdBy: "Dave",
    published: false,
    version: 2,
    modelSettings: {
      temperature: 0,
      topP: 1,
      frequencyPenalty: 0,
      presencePenalty: 0,
      modelType: "Anthropic",
      modelVersion: "Claude-3-Sonnet"
    }
  }
];

export function getLivePrompts(): PromptModel[] {
  // Return only live prompts
  return PROMPT_DATA.filter(prompt => prompt.published);
}
