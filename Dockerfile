# Use the official image as a parent image.
FROM node:current-slim
WORKDIR /root/frontend
COPY ./ /root/frontend
RUN npm install
RUN npm install ip --save-dev 
RUN npm run build

CMD /bin/sh -c "npm run express"