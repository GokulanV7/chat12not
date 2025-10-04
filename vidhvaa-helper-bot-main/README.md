# Vidhvaa Helper Bot

An interactive chatbot for Vidhvaa's 50 Days Challenge educational platform. This bot helps users get instant answers about the challenge, provides guided question flows, and connects users with human support when needed.

## Features

- 🤖 **Interactive Chatbot**: Get instant answers to common questions about the 50 Days Challenge
- 📱 **Responsive Design**: Works seamlessly across desktop and mobile devices
- 🎯 **Smart Question Flow**: Progressive question system with 4-question sets and answer tracking
- 💬 **WhatsApp Integration**: Connect with human support via WhatsApp within 10 minutes
- 🎨 **Modern UI**: Built with shadcn-ui components and Tailwind CSS
- ⚡ **Fast Performance**: Powered by Vite and React with TypeScript

## Getting Started

### Prerequisites

- Node.js (v16 or higher)
- npm or yarn

### Installation

```bash
# Clone the repository
git clone <repository-url>

# Navigate to the project directory
cd vidhvaa-helper-bot

# Install dependencies
npm install

# Start the development server
npm run dev
```

The application will be available at `http://localhost:8080`

## Technologies Used

- **Frontend Framework**: React 18 with TypeScript
- **Build Tool**: Vite
- **UI Components**: shadcn-ui
- **Styling**: Tailwind CSS
- **Icons**: Lucide React
- **State Management**: React Hooks (useState, useEffect)

## Project Structure

```
src/
├── components/
│   ├── ChatWidget.tsx      # Main chatbot component
│   └── ui/                 # shadcn-ui components
├── pages/
│   ├── Index.tsx           # Landing page
│   └── NotFound.tsx        # 404 page
├── hooks/                  # Custom React hooks
├── lib/
│   └── utils.ts           # Utility functions
└── App.tsx                # Main application component
```

## Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run preview` - Preview production build
- `npm run lint` - Run ESLint

## Chatbot Features

### Question Flow System
- **7 Question Sets**: Each containing 4 related questions about the 50 Days Challenge
- **Progressive Navigation**: Users can move through sets at their own pace
- **Answer Tracking**: System tracks which questions have been answered
- **Smart Filtering**: Answered questions are hidden from current set

### User Journey
1. **Welcome**: Greet user and collect basic information (name, phone)
2. **Support Choice**: User chooses between human support or self-service questions
3. **Human Support**: Promises WhatsApp contact within 10 minutes
4. **Question Guide**: Progressive 4-question sets with completion tracking
5. **Thank You**: Final acknowledgment with option to restart

## Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## License

This project is licensed under the MIT License.

## Support

For support, contact the Vidhvaa team or open an issue in this repository.
