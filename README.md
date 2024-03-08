<!-- markdownlint-project-tree -->

```bash
|-- ..
|   |-- .editorconfig
|   |-- .env
|   |-- .env.sample
|   |-- .eslintignore
|   |-- .eslintrc.json
|   |-- assets
|       |-- hexagonal_draw.png
|   |-- CODE_OF_CONDUCT.md
|   |-- compose.yml
|   |-- CONTRIBUTING.md
|   |-- DB
|       |-- DatabaseAllShcema.sql
|   |-- jest.config.ts
|   |-- LICENSE.md
|   |-- package.json
|   |-- prisma
|       |-- schema.prisma
|   |-- README.md
|   |-- SECURITY.md
|   |-- src
|   |   |-- core
|   |       |-- User
|   |       |   |-- application
|   |       |   |   |-- repositoryImplementations
|   |       |   |   |   |-- FindUser.ts
|   |       |   |   |   |-- SaveUser.ts
|   |       |   |       |-- UpdateUser.ts
|   |       |       |-- UseCases
|   |       |       |   |-- UserCodePhoneValidate.ts
|   |       |       |   |-- UserCreateProfile.ts
|   |       |           |-- UserSendPhoneValidate.ts
|   |       |   |-- domain
|   |       |   |   |-- IUser.ts
|   |       |   |   |-- IUserApplicationImplementations.ts
|   |       |   |   |-- IUserApplicationUserCases.ts
|   |       |   |   |-- IUserRepository.ts
|   |       |       |-- UserBodyRequest.ts
|   |           |-- infraestructure
|   |           |   |-- containers
|   |           |   |   |-- UserCasesContainer.ts
|   |           |       |-- UserRespositorysContainer.ts
|   |           |   |-- DTOs
|   |           |   |   |-- UserCodePhoneValidate.ts
|   |           |       |-- UserSendPhoneValidate.ts
|   |           |   |-- repositorys
|   |           |       |-- PrismaUserRepository.ts
|   |               |-- strategys
|   |                   |-- UserJwt.ts
|   |   |-- lib
|   |       |-- cli-genetator-files
|   |       |   |-- index.mts
|   |           |-- utils.ts
|   |   |-- main
|   |   |   |-- env.d.ts
|   |       |-- providers
|   |       |   |-- ApplicationProvider.ts
|   |       |   |-- ErrorHandlerProvider.ts
|   |       |   |-- LocalsProvider.ts
|   |       |   |-- MiddlewaresProvider.ts
|   |       |   |-- PrismaProvider.ts
|   |       |   |-- RouterProvider.ts
|   |           |-- Routes
|   |               |-- User.routes.ts
|   |   |-- server.ts
|       |-- shared
|       |   |-- CustomErrors
|       |       |-- CustomErrors.ts
|       |   |-- PassportProvider
|       |       |-- infraestructure
|       |           |-- passportConfig.ts
|       |   |-- providers
|       |   |   |-- HashProvider
|       |   |   |   |-- domain
|       |   |   |       |-- IHashProvider.ts
|       |   |       |-- infraestructure
|       |   |           |-- hashprovider.ts
|       |   |   |-- JwtProvider
|       |   |   |   |-- domain
|       |   |   |       |-- TJwtProvider.ts
|       |   |       |-- infraestructure
|       |   |           |-- JwtProvider.ts
|       |   |   |-- Logger
|       |   |   |   |-- application
|       |   |   |       |-- ConsoleLog.ts
|       |   |   |   |-- domain
|       |   |   |       |-- ILogger.ts
|       |   |       |-- infraestructure
|       |   |           |-- ConsoleLogger.ts
|       |       |-- Response
|       |       |   |-- domain
|       |       |       |-- IResponse.ts
|       |           |-- infraestructure
|       |               |-- Response.ts
|       |   |-- Types
|       |   |   |-- IFilter.ts
|       |       |-- TNullable.ts
|           |-- utils
|               |-- RandomNumber.ts
|   |-- tsconfig.json
    |-- yarn.lock

```

<!-- end-markdownlint-project-tree -->
