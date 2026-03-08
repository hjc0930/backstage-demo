import { useState } from 'react';
import {
  Box,
  Typography,
  TextField,
  IconButton,
  makeStyles,
  Paper,
  Chip,
} from '@material-ui/core';
import SendIcon from '@material-ui/icons/Send';
import ChatBubbleIcon from '@material-ui/icons/ChatBubble';
import PersonIcon from '@material-ui/icons/Person';

interface Message {
  id: number;
  type: 'ai' | 'user';
  content: string;
}

const mockMessages: Message[] = [
  {
    id: 1,
    type: 'ai',
    content:
      "Hi! I'm your AI assistant. I can help you find APIs, services, and documentation. What are you looking for?",
  },
];

const useChatStyles = makeStyles(theme => ({
  chatContainer: {
    backgroundColor: '#fff',
    borderRadius: theme.shape.borderRadius,
    height: '400px',
    display: 'flex',
    flexDirection: 'column',
    border: '1px solid #e0e0e0',
  },
  chatHeader: {
    padding: theme.spacing(1.5, 2),
    borderBottom: '1px solid #e0e0e0',
    display: 'flex',
    alignItems: 'center',
    gap: theme.spacing(1),
    backgroundColor: '#f5f5f5',
    borderRadius: `${theme.shape.borderRadius}px ${theme.shape.borderRadius}px 0 0`,
  },
  chatTitle: {
    fontWeight: 600,
    fontSize: '1.1rem',
    color: '#333',
  },
  chatMessages: {
    flex: 1,
    overflowY: 'auto',
    padding: theme.spacing(2),
    display: 'flex',
    flexDirection: 'column',
    gap: theme.spacing(1.5),
  },
  message: {
    display: 'flex',
    gap: theme.spacing(1),
    alignItems: 'flex-start',
  },
  userMessage: {
    flexDirection: 'row-reverse',
  },
  avatar: {
    width: 32,
    height: 32,
    borderRadius: '50%',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    flexShrink: 0,
  },
  aiAvatar: {
    backgroundColor: '#0052CC',
    color: '#fff',
  },
  userAvatar: {
    backgroundColor: '#e0e0e0',
    color: '#666',
  },
  messageBubble: {
    padding: theme.spacing(1, 1.5),
    borderRadius: theme.shape.borderRadius,
    maxWidth: '80%',
    fontSize: '0.9rem',
    lineHeight: 1.5,
  },
  aiBubble: {
    backgroundColor: '#f0f4f8',
    color: '#333',
  },
  userBubble: {
    backgroundColor: '#0052CC',
    color: '#fff',
  },
  chatInput: {
    padding: theme.spacing(1.5, 2),
    borderTop: '1px solid #e0e0e0',
    display: 'flex',
    gap: theme.spacing(1),
    alignItems: 'center',
  },
  inputField: {
    flex: 1,
    '& .MuiOutlinedInput-root': {
      borderRadius: 24,
      backgroundColor: '#f5f5f5',
    },
  },
  sendButton: {
    backgroundColor: '#0052CC',
    color: '#fff',
    '&:hover': {
      backgroundColor: '#003d99',
    },
  },
  quickExamples: {
    display: 'flex',
    alignItems: 'center',
    padding: theme.spacing(1.5, 2),
    borderTop: '1px solid #e0e0e0',
    backgroundColor: '#fafafa',
    borderRadius: `0 0 ${theme.shape.borderRadius}px ${theme.shape.borderRadius}px`,
  },
  quickExamplesTitle: {
    fontSize: '0.75rem',
    color: '#666',
    marginBottom: theme.spacing(1),
  },
  quickExamplesList: {
    display: 'flex',
    flexWrap: 'wrap',
    gap: theme.spacing(0.75),
  },
  quickExampleChip: {
    backgroundColor: '#e3f2fd',
    color: '#0052CC',
    fontSize: '0.75rem',
    cursor: 'pointer',
    '&:hover': {
      backgroundColor: '#bbdefb',
    },
  },
}));

const AiChatModule = () => {
  const classes = useChatStyles();
  const [messages] = useState<Message[]>(mockMessages);
  const [inputValue, setInputValue] = useState('');

  const handleSend = () => {
    if (inputValue.trim()) {
      setInputValue('');
    }
  };

  return (
    <Paper className={classes.chatContainer} elevation={0}>
      <Box className={classes.chatHeader}>
        <ChatBubbleIcon style={{ color: '#0052CC' }} />
        <Typography className={classes.chatTitle}>AI Assistant</Typography>
        <Chip
          label="Beta"
          size="small"
          style={{
            backgroundColor: '#ff9800',
            color: '#fff',
            fontSize: '0.7rem',
            height: 20,
            marginLeft: 8,
          }}
        />
      </Box>
      <Box className={classes.chatMessages}>
        {messages.map(msg => (
          <Box
            key={msg.id}
            className={`${classes.message} ${
              msg.type === 'user' ? classes.userMessage : ''
            }`}
          >
            <Box
              className={`${classes.avatar} ${
                msg.type === 'ai' ? classes.aiAvatar : classes.userAvatar
              }`}
            >
              {msg.type === 'ai' ? (
                <ChatBubbleIcon style={{ fontSize: 18 }} />
              ) : (
                <PersonIcon style={{ fontSize: 18 }} />
              )}
            </Box>
            <Box
              className={`${classes.messageBubble} ${
                msg.type === 'ai' ? classes.aiBubble : classes.userBubble
              }`}
            >
              {msg.content}
            </Box>
          </Box>
        ))}
      </Box>
      <Box className={classes.chatInput}>
        <TextField
          className={classes.inputField}
          variant="outlined"
          size="small"
          placeholder="Ask me anything..."
          value={inputValue}
          onChange={e => setInputValue(e.target.value)}
          onKeyPress={e => e.key === 'Enter' && handleSend()}
        />
        <IconButton
          className={classes.sendButton}
          onClick={handleSend}
          size="small"
        >
          <SendIcon />
        </IconButton>
      </Box>
      <Box className={classes.quickExamples}>
        <Typography className={classes.quickExamplesTitle}>
          Quick Examples:
        </Typography>
        <Box className={classes.quickExamplesList}>
          {[
            'Find user service API',
            'Show all microservices',
            'List available APIs',
            'Search documentation',
          ].map(example => (
            <Chip
              key={example}
              label={example}
              size="small"
              className={classes.quickExampleChip}
              onClick={() => setInputValue(example)}
            />
          ))}
        </Box>
      </Box>
    </Paper>
  );
};

export default AiChatModule;
