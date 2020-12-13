# TheCountOfMoney
![Client](https://github.com/Lucashw68/TheCountOfMoney/workflows/Client/badge.svg)
![API](https://github.com/Lucashw68/TheCountOfMoney/workflows/API/badge.svg)
![Project](https://github.com/Lucashw68/TheCountOfMoney/workflows/Project/badge.svg)
![Deployment](https://github.com/Lucashw68/TheCountOfMoney/workflows/Deploy/badge.svg)

# Build && run

```
docker-compose up --build
```

# Running

- Client web: https://thecountofmoney.nuage.best
- API: https://api.thecountofmoney.nuage.best

# Running dev

 ! For running the back-end locally you must change the node_env variable in the docker-compose file to dev

- Client web: http://localhost:3000
```
npm run dev
```
- API: http://localhost:8081
```
docker-compose up --build api
```
