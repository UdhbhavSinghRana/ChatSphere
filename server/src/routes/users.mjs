import express from 'express';
const router = express.Router();

router.get('/', (_req, res) => {
    res.send('Hello World');
});

router.get('/:id', (req, res) => {
    res.send(`Hello, ${req.params.id}`);
});

router.post('/', (req, res) => {
    res.send('POST request received');
});

export default router;
