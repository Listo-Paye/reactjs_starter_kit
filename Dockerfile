FROM node:current-alpine as development
WORKDIR /app
COPY . .
RUN npm install
EXPOSE 5173
CMD ["npm", "run", "dev"]

FROM node:current-alpine as build
# Create root directory
WORKDIR /app
# Copy the package.json from our project to the image
COPY package.json ./
# Install packages needed
RUN npm install
# Copy the whole project
COPY . .
# Build project in static directory
RUN npm run build

FROM nginx:stable-alpine as release
COPY --from=build /app/devops /usr/share/nginx/html
COPY devops/nginx.conf /etc/nginx/conf.d/default.conf
EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]
