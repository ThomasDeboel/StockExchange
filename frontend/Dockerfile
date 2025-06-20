# Use Node.js LTS for building
FROM node:18 as build

WORKDIR /app
COPY package.json /app/package.json
RUN npm install

COPY . .
RUN npm run build

# Serve build with a static server
FROM nginx:alpine
COPY --from=build /app/build /usr/share/nginx/html

# Expose frontend port
EXPOSE 80

CMD ["nginx", "-g", "daemon off;"]