FROM debian:latest
RUN apt-get update &&\
	apt-get install -y git curl &&\
	apt-get clean &&\
	curl -sL https://deb.nodesource.com/setup_18.x | bash - &&\
	apt-get install -y nodejs &&\
	node -v &&\
	cd /home &&\
	git clone https://github.com/MatiasVilche/Inventario-Biosur-TallerDesarrollo &&\
	cd Inventario-Biosur-TallerDesarrollo/Backend
# Copiar el archivo .env al directorio /home/Inventario-Biosur-TallerDesarrollo/Backend en el contenedor
COPY .env /home/Inventario-Biosur-TallerDesarrollo/Backend/.env

WORKDIR /home/Inventario-Biosur-TallerDesarrollo/Backend

# Se levanta el backend
RUN npm i

EXPOSE 5000

ENTRYPOINT ["node", "scriptArranque.js"]