import { app, PORT } from './server.ts';

app.listen(PORT, () => {
  console.log(`Ironclad OS backend running on port ${PORT}`);
  console.log(`Health check available at http://localhost:${PORT}/health`);
});
