export type Topic = { name: string; isNew?: boolean };
export type Section = { name: string; topics: Topic[] };
export type Level = {
  level: string;
  short: string;
  tagline: string;
  icon: "rocket" | "code" | "database" | "sigma" | "brain" | "network" | "languages" | "sparkles" | "bot" | "layers" | "cloud" | "telescope" | "trophy" | "flag";
  sections: Section[];
};

const N = true;

const t = (name: string, isNew?: boolean): Topic => ({ name, isNew });

export const ROADMAP: Level[] = [
  {
    level: "Level 0 — Foundation",
    short: "Foundation",
    tagline: "Computer & programming basics — the launchpad.",
    icon: "rocket",
    sections: [
      { name: "Computer basics", topics: ["OS basics","Terminal","File systems","Git & GitHub","VS Code","Package managers"].map(x => t(x)) },
      { name: "Programming logic", topics: ["Variables","Conditions","Loops","Functions","Arrays","Objects","OOP","Async programming"].map(x => t(x)) },
    ],
  },
  {
    level: "Level 1 — Python complete",
    short: "Python",
    tagline: "Master Python end-to-end for AI engineering.",
    icon: "code",
    sections: [
      { name: "Python basics", topics: ["Syntax","Data types","Loops","Functions","Modules","Exception handling"].map(x => t(x)) },
      { name: "Advanced Python", topics: ["OOP","Decorators","Generators","Iterators","Context managers","Multithreading","Asyncio"].map(x => t(x)) },
      { name: "Python for backend", topics: [t("APIs"),t("JSON"),t("Requests"),t("File handling"),t("Virtual env"),t("Pip"),t("Logging"),t("Type hints",N),t("Pydantic",N),t("Testing (pytest)",N),t("SQLAlchemy",N),t("Redis basics",N)] },
      { name: "Python projects", topics: ["Calculator","API caller","File processor","Chat CLI"].map(x => t(x)) },
    ],
  },
  {
    level: "Level 2 — Data handling",
    short: "Data",
    tagline: "Wrangle, shape and visualise data fluently.",
    icon: "database",
    sections: [
      { name: "NumPy", topics: ["Arrays","Matrix operations","Broadcasting"].map(x => t(x)) },
      { name: "Pandas", topics: ["DataFrames","CSV","Cleaning","Filtering","Grouping"].map(x => t(x)) },
      { name: "Data visualization", topics: ["Matplotlib","Graphs","Charts"].map(x => t(x)) },
    ],
  },
  {
    level: "Level 3 — Maths for AI",
    short: "Maths",
    tagline: "The mathematical intuition every AI engineer needs.",
    icon: "sigma",
    sections: [
      { name: "Statistics", topics: ["Mean","Median","Variance","Standard deviation"].map(x => t(x)) },
      { name: "Probability", topics: ["Conditional probability","Bayes theorem"].map(x => t(x)) },
      { name: "Linear algebra", topics: ["Vectors","Matrices","Dot products"].map(x => t(x)) },
      { name: "Calculus basics", topics: ["Derivatives","Gradient descent"].map(x => t(x)) },
    ],
  },
  {
    level: "Level 4 — Machine learning",
    short: "ML",
    tagline: "Classical ML from regression to ensembles.",
    icon: "brain",
    sections: [
      { name: "ML basics", topics: ["AI vs ML vs DL","Features","Labels","Training","Testing","Overfitting","Accuracy"].map(x => t(x)) },
      { name: "Supervised learning", topics: ["Linear regression","Logistic regression","Decision trees","Random forest"].map(x => t(x)) },
      { name: "Advanced ML", topics: [t("XGBoost",N),t("LightGBM",N),t("CatBoost",N),t("Feature engineering",N),t("Hyperparameter tuning",N)] },
      { name: "Unsupervised learning", topics: ["Clustering","K-Means","PCA"].map(x => t(x)) },
      { name: "Model evaluation", topics: ["Precision","Recall","F1 score","Confusion matrix"].map(x => t(x)) },
      { name: "ML projects", topics: ["Spam classifier","House price predictor","Recommendation system"].map(x => t(x)) },
    ],
  },
  {
    level: "Level 5 — Deep learning",
    short: "Deep Learning",
    tagline: "Neural networks, CNNs, RNNs and Transformers.",
    icon: "network",
    sections: [
      { name: "Neural networks", topics: ["Neurons","Layers","Weights","Bias"].map(x => t(x)) },
      { name: "Activation functions", topics: ["ReLU","Sigmoid","Softmax"].map(x => t(x)) },
      { name: "Training fundamentals", topics: [t("Batch normalization",N),t("Dropout",N),t("Loss functions",N),t("Optimizers",N),t("Adam optimizer",N),t("Learning rate scheduling",N)] },
      { name: "TensorFlow", topics: ["Tensors","Training models","Saving models"].map(x => t(x)) },
      { name: "PyTorch", topics: ["Tensor ops","Datasets","Training loops"].map(x => t(x)) },
      { name: "CNN", topics: ["Image processing","Object detection"].map(x => t(x)) },
      { name: "RNN & LSTM", topics: ["Sequence learning","Text generation"].map(x => t(x)) },
      { name: "Transformers", topics: [t("Attention"),t("Encoder"),t("Decoder"),t("Self attention",N),t("Positional encoding",N),t("Tokenizers",N),t("BERT",N),t("GPT architecture",N)] },
    ],
  },
  {
    level: "Level 6 — NLP",
    short: "NLP",
    tagline: "Make machines understand human language.",
    icon: "languages",
    sections: [
      { name: "NLP basics", topics: ["Tokenization","Stemming","Lemmatization"].map(x => t(x)) },
      { name: "Text processing", topics: ["Sentiment analysis","Text classification"].map(x => t(x)) },
      { name: "Embeddings", topics: ["Word2Vec","Sentence transformers"].map(x => t(x)) },
    ],
  },
  {
    level: "Level 7 — Generative AI",
    short: "GenAI",
    tagline: "LLMs, prompting, RAG and fine-tuning.",
    icon: "sparkles",
    sections: [
      { name: "LLM basics", topics: ["Tokens","Context window","Temperature","Hallucination"].map(x => t(x)) },
      { name: "Prompt engineering", topics: [t("Zero-shot"),t("Few-shot"),t("Chain of thought"),t("Structured prompting"),t("Prompt optimization",N),t("Context engineering",N)] },
      { name: "OpenAI APIs", topics: [t("Chat completion"),t("Function calling"),t("Streaming"),t("Tool schemas",N),t("JSON mode",N),t("Structured output",N)] },
      { name: "AI evaluation & safety", topics: [t("AI evaluation",N),t("Guardrails",N)] },
      { name: "Embeddings", topics: ["Semantic search","Similarity search"].map(x => t(x)) },
      { name: "Vector databases", topics: ["FAISS","ChromaDB","Pinecone"].map(x => t(x)) },
      { name: "RAG", topics: [t("Chunking"),t("Retrieval"),t("Context injection"),t("Hybrid search",N),t("Re-ranking",N),t("Metadata filtering",N),t("Context compression",N),t("Parent-child chunking",N)] },
      { name: "Fine tuning", topics: ["LoRA","PEFT","QLoRA"].map(x => t(x)) },
      { name: "Local LLM", topics: ["Ollama","LM Studio","GGUF models"].map(x => t(x)) },
    ],
  },
  {
    level: "Level 8 — AI agents",
    short: "Agents",
    tagline: "Autonomous, reasoning, tool-using systems.",
    icon: "bot",
    sections: [
      { name: "Agent basics", topics: [t("Planning"),t("Reasoning"),t("Tool calling"),t("ReAct pattern",N),t("Planning algorithms",N)] },
      { name: "LangChain", topics: ["Chains","Memory","Tools"].map(x => t(x)) },
      { name: "LangGraph", topics: ["Multi-agent workflows","State management"].map(x => t(x)) },
      { name: "Agent frameworks", topics: [t("CrewAI",N),t("AutoGen",N)] },
      { name: "Agent architectures", topics: [t("Planner agent"),t("Executor agent"),t("Reflection agent"),t("Agent memory persistence",N),t("Human-in-the-loop systems",N)] },
      { name: "MCP", topics: ["Model Context Protocol","Tool integrations"].map(x => t(x)) },
      { name: "Multi-agent systems", topics: ["Communication","Task orchestration"].map(x => t(x)) },
    ],
  },
  {
    level: "Level 9 — AI application development",
    short: "AI Apps",
    tagline: "Ship production AI apps end-to-end.",
    icon: "layers",
    sections: [
      { name: "AI backend", topics: ["FastAPI","WebSockets","Streaming"].map(x => t(x)) },
      { name: "AI frontend", topics: ["React","Chat UI","Voice UI"].map(x => t(x)) },
      { name: "Real-time AI", topics: ["Live responses","Notifications"].map(x => t(x)) },
      { name: "AI security", topics: [t("Prompt injection"),t("Validation"),t("Rate limiting"),t("Jailbreak prevention",N),t("Prompt injection defense",N),t("API security",N),t("Data privacy",N),t("AI safety",N)] },
    ],
  },
  {
    level: "Level 10 — Deployment & infra",
    short: "Deploy",
    tagline: "Containers, GPUs, clouds and CI/CD.",
    icon: "cloud",
    sections: [
      { name: "Docker", topics: ["Containers","Docker compose"].map(x => t(x)) },
      { name: "Cloud", topics: ["AWS basics","Vercel","Railway"].map(x => t(x)) },
      { name: "GPU basics", topics: ["CUDA","VRAM","Quantization"].map(x => t(x)) },
      { name: "AI infrastructure", topics: [t("vLLM",N),t("TensorRT",N),t("ONNX",N),t("Kubernetes basics",N),t("GPU serving",N)] },
      { name: "CI/CD", topics: ["GitHub Actions","Auto deployment"].map(x => t(x)) },
    ],
  },
  {
    level: "Level 11 — Advanced AI",
    short: "Advanced",
    tagline: "Multimodal, observability and AI system design.",
    icon: "telescope",
    sections: [
      { name: "Fine-tuning", topics: ["Custom datasets","RLHF basics"].map(x => t(x)) },
      { name: "Multimodal AI", topics: ["Vision AI","Voice AI","OCR"].map(x => t(x)) },
      { name: "Voice AI", topics: [t("Whisper",N),t("TTS",N),t("STT",N),t("Real-time voice pipeline",N)] },
      { name: "Vision AI", topics: [t("OCR pipelines",N),t("YOLO",N),t("OpenCV",N),t("Image embeddings",N)] },
      { name: "AI observability", topics: [t("LangSmith",N),t("Observability",N),t("Tracing",N),t("Token tracking",N),t("Cost optimization",N)] },
      { name: "AI research", topics: [t("Papers"),t("Benchmarks"),t("Evaluation"),t("Research paper reading",N)] },
      { name: "AI system design", topics: [t("Scalability"),t("Memory systems"),t("Agent orchestration"),t("AI architecture design",N),t("Scaling AI systems",N)] },
    ],
  },
  {
    level: "Level 12 — Expert level",
    short: "Expert",
    tagline: "Build products, models, brand & contributions.",
    icon: "trophy",
    sections: [
      { name: "Build own AI products", topics: [t("AI SaaS"),t("AI ERP"),t("AI assistant"),t("AI product thinking",N),t("AI monetization",N)] },
      { name: "Build own models", topics: ["Training pipelines","Dataset prep"].map(x => t(x)) },
      { name: "Open source contribution", topics: ["Hugging Face","LangChain","PyTorch"].map(x => t(x)) },
      { name: "Personal brand", topics: ["GitHub","Portfolio","LinkedIn","Technical content"].map(x => t(x)) },
    ],
  },
  {
    level: "Final projects",
    short: "Capstones",
    tagline: "Ten capstones that prove you're production-ready.",
    icon: "flag",
    sections: [
      { name: "Projects", topics: ["AI Chatbot","AI Agent","PDF QA","Voice Assistant","AI Search Engine","AI Coding Assistant","AI ERP Assistant","Multi-Agent Workflow","AI Recommendation Engine","AI Automation Platform"].map(x => t(x)) },
    ],
  },
];

export const TOTAL_TOPICS = ROADMAP.reduce(
  (a, l) => a + l.sections.reduce((b, s) => b + s.topics.length, 0),
  0
);
