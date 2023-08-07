FROM debian:latest

RUN apt-get update && apt-get install -y curl git

RUN curl https://raw.githubusercontent.com/creationix/nvm/master/install.sh | bash

# Add NVM directory to PATH
ENV NVM_DIR /root/.nvm
RUN . "$NVM_DIR/nvm.sh"

# Install Node.js using NVM
ENV NODE_VERSION 18.16.0
RUN bash -c "source $NVM_DIR/nvm.sh && nvm install 18.16.0"

# Set default Node.js version
RUN bash -c "source $NVM_DIR/nvm.sh && nvm alias default 18.16.0"

# Set environment variables
ENV NODE_PATH $NVM_DIR/versions/node/v18.16.0/lib/node_modules
ENV PATH $NVM_DIR/versions/node/v18.16.0/bin:$PATH

RUN cd /home &&\
	git clone https://github.com/MatiasVilche/Inventario-Biosur-TallerDesarrollo.git &&\
	cd Inventario-Biosur-TallerDesarrollo/frontend
# Copiar el archivo .env al directorio /home/Inventario-Biosur-TallerDesarrollo/Backend en el contenedor
COPY .env /home/Inventario-Biosur-TallerDesarrollo/frontend/.env

WORKDIR /home/Inventario-Biosur-TallerDesarrollo/frontend

# Se levanta el backend

RUN rm package-lock.json
RUN rm -r node_modules
RUN npm i
RUN npm run build

EXPOSE 3000

ENTRYPOINT ["npm", "start"]