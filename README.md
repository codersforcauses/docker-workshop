# docker-workshop-template

What you'll need:

- Docker
- Node.js

## Preview

To see the completed application, run the following commands, then navigate to `http://localhost:3000` in your browser.

```bash
npm install
npm run dev
```

## How it *should* run

Refer to the [workshop](https://workshops.codersforcauses.org/) for how to do complete this.

```bash
# backend
docker build -t docker-workshop-backend ./apps/backend
docker run -p 3001:3001 docker-workshop-backend

# frontend
docker build -t docker-workshop-frontend ./apps/frontend
docker run -p 3000:3000 docker-workshop-frontend
```
