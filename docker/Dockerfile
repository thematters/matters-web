FROM node:18

# install os level packages
RUN apt-get update && apt-get -y install \
  curl \
  vim \
  wget

# install node dependencies
WORKDIR /var/app
COPY package*.json ./
COPY .npmrc ./
RUN npm i

CMD ["npm", "run", "start"]
