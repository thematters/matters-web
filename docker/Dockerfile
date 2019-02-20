FROM node:10.15

# install os level packages
RUN apt-get update && apt-get -y install \
  curl \
  vim \
  wget

# install node dependencies
WORKDIR /var/app
COPY package*.json ./
RUN npm i

CMD ["npm", "run", "start"]
