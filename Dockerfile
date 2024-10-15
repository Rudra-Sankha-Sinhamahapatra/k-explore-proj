# Use Node.js as the base image
FROM node:16

# Set the working directory
WORKDIR /app

# Copy package.json and package-lock.json for both frontend and backend
COPY backend/package*.json ./backend/
COPY frontend/package*.json ./frontend/

# Install backend dependencies
RUN npm install --prefix ./backend

# Install frontend dependencies
RUN npm install --prefix ./frontend

# Copy the rest of the application code
COPY ./backend ./backend
COPY ./frontend ./frontend

# Expose ports for backend and frontend
EXPOSE 3000 5173

# Define a command that can run both services
CMD ["sh", "-c", "npm run dev --prefix ./backend & npm run dev --prefix ./frontend"]
