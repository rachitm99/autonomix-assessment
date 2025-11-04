const express = require('express');
const Task = require('../models/Task');
const Transcript = require('../models/Transcript');
const authMiddleware = require('../middleware/auth');
const { GoogleGenerativeAI } = require('@google/generative-ai');

const router = express.Router();
const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);

// Get all tasks for current user
router.get('/', authMiddleware, async (req, res) => {
  try {
    const tasks = await Task.find({ userId: req.userId })
      .sort({ createdAt: -1 });
    
    res.json({ tasks });
  } catch (error) {
    console.error('Get tasks error:', error);
    res.status(500).json({ error: 'Failed to fetch tasks' });
  }
});

// Generate tasks from transcript
router.post('/generate', authMiddleware, async (req, res) => {
  try {
    const { transcript } = req.body;

    if (!transcript || typeof transcript !== 'string') {
      return res.status(400).json({ error: 'Transcript is required' });
    }

    // Save transcript
    const savedTranscript = new Transcript({
      userId: req.userId,
      content: transcript,
    });
    await savedTranscript.save();

    // Generate tasks with AI
    const model = genAI.getGenerativeModel({ model: 'gemini-pro' });

    const prompt = `You are an AI assistant that analyzes meeting transcripts and extracts actionable tasks.

For each task, you must:
1. Identify clear, specific action items
2. Assign a priority level (high, medium, or low) based on:
   - High: Critical blockers, deadlines within a week, P0 issues
   - Medium: Important but not urgent, standard work items
   - Low: Nice-to-haves, future considerations, backlog items
3. Extract team tags (e.g., @Engineering, @Marketing, @QA, @Design) from the context
4. Keep each task concise and clear

Return the tasks as a JSON array with this exact format:
[
  {
    "text": "Task description",
    "priority": "high" | "medium" | "low",
    "tags": ["Engineering", "Marketing"]
  }
]

Only return the JSON array, no additional text.

Meeting Transcript:
${transcript}`;

    const result = await model.generateContent(prompt);
    const response = await result.response;
    const content = response.text();

    // Extract JSON from response
    let jsonContent = content.trim();
    if (jsonContent.startsWith('```json')) {
      jsonContent = jsonContent.replace(/```json\n?/g, '').replace(/```\n?/g, '');
    }

    const aiTasks = JSON.parse(jsonContent);

    // Save tasks to database
    const tasksToSave = aiTasks.map(task => ({
      userId: req.userId,
      text: task.text,
      priority: task.priority || 'medium',
      tags: task.tags || [],
      transcriptId: savedTranscript._id,
      status: 'pending',
    }));

    const savedTasks = await Task.insertMany(tasksToSave);

    res.json({
      message: 'Tasks generated successfully',
      tasks: savedTasks,
    });
  } catch (error) {
    console.error('Generate tasks error:', error);
    res.status(500).json({ error: 'Failed to generate tasks' });
  }
});

// Update task
router.patch('/:id', authMiddleware, async (req, res) => {
  try {
    const { status, priority, text, tags } = req.body;
    
    const task = await Task.findOne({
      _id: req.params.id,
      userId: req.userId,
    });

    if (!task) {
      return res.status(404).json({ error: 'Task not found' });
    }

    // Update fields
    if (status) task.status = status;
    if (priority) task.priority = priority;
    if (text) task.text = text;
    if (tags) task.tags = tags;

    await task.save();

    res.json({ message: 'Task updated successfully', task });
  } catch (error) {
    console.error('Update task error:', error);
    res.status(500).json({ error: 'Failed to update task' });
  }
});

// Delete task
router.delete('/:id', authMiddleware, async (req, res) => {
  try {
    const task = await Task.findOneAndDelete({
      _id: req.params.id,
      userId: req.userId,
    });

    if (!task) {
      return res.status(404).json({ error: 'Task not found' });
    }

    res.json({ message: 'Task deleted successfully' });
  } catch (error) {
    console.error('Delete task error:', error);
    res.status(500).json({ error: 'Failed to delete task' });
  }
});

// Delete all tasks
router.delete('/', authMiddleware, async (req, res) => {
  try {
    await Task.deleteMany({ userId: req.userId });
    res.json({ message: 'All tasks deleted successfully' });
  } catch (error) {
    console.error('Delete all tasks error:', error);
    res.status(500).json({ error: 'Failed to delete tasks' });
  }
});

// Export tasks as JSON
router.get('/export', authMiddleware, async (req, res) => {
  try {
    const tasks = await Task.find({ userId: req.userId }).sort({ createdAt: -1 });
    
    res.setHeader('Content-Type', 'application/json');
    res.setHeader('Content-Disposition', 'attachment; filename=tasks.json');
    res.json(tasks);
  } catch (error) {
    console.error('Export tasks error:', error);
    res.status(500).json({ error: 'Failed to export tasks' });
  }
});

module.exports = router;
