## 설명

마음연구소 백엔드 과제

## DB 세팅

```bash
# Docker
$ brew install docker

# PostgreSQL
$ docker pull postgres
$ docker run -p 5432:5432 --name test-postgres \-e POSTGRES_PASSWORD=qwer1234 \-e TZ=Asia/Seoul \-v /home/testuser/pgdata:/var/lib/postgresql/data \-d postgres:latest
$ docker exec -it [container-id] bash
$ psql -U postgres
$ CREATE DATABASE test_db;
$ CREATE ROLE test_user WITH LOGIN PASSWORD 'test1234';
$ ALTER USER test_user WITH SUPERUSER;
$ GRANT ALL PRIVILEGES ON DATABASE test_db TO test_user;
```

## 설치

```bash
$ pnpm install
```

## 실행

```bash
# development
$ pnpm run start

# watch mode
$ pnpm run start:dev

# production mode
$ pnpm run start:prod
```

## 테스트

```bash
# unit tests
$ pnpm run test

# e2e tests
$ pnpm run test:e2e

# test coverage
$ pnpm run test:cov
```

## 라이센스

[MIT licensed](LICENSE).
