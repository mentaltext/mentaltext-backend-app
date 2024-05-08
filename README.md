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
|   |   |-- DatabaseAllShcema.sql
|       |-- getChatParticipants.sql
|   |-- jest.config.ts
|   |-- LICENSE.md
|   |-- package.json
|   |-- prisma
|       |-- schema.prisma
|   |-- README.md
|   |-- SECURITY.md
|   |-- src
|   |   |-- core
|   |   |   |-- Chat
|   |   |   |   |-- application
|   |   |   |   |   |-- repositoryImplementations
|   |   |   |   |       |-- SaveChat.ts
|   |   |   |       |-- UseCases
|   |   |   |           |-- CreateChat.ts
|   |   |   |   |-- domain
|   |   |   |   |   |-- ChatBodyRequest.ts
|   |   |   |   |   |-- IChat.ts
|   |   |   |   |   |-- IChatApplicationImplementations.ts
|   |   |   |   |   |-- IChatApplicationUserCases.ts
|   |   |   |       |-- IChatRepository.ts
|   |   |       |-- infrastructure
|   |   |       |   |-- containers
|   |   |       |   |   |-- ChatRespositorysContainer.ts
|   |   |       |       |-- ChatUseCasesContainer.ts
|   |   |       |   |-- DTOs
|   |   |       |       |-- CreateChatDto.ts
|   |   |           |-- repositorys
|   |   |               |-- PrismaChatRepository.ts
|   |   |   |-- ChatParticipants
|   |   |   |   |-- application
|   |   |   |   |   |-- repositoryImplementations
|   |   |   |   |   |   |-- FindChatParticipants.ts
|   |   |   |   |       |-- SaveChatParticipants.ts
|   |   |   |       |-- UseCases
|   |   |   |   |-- domain
|   |   |   |   |   |-- IChatParticipants.ts
|   |   |   |   |   |-- IChatParticipantsApplicationImplementations.ts
|   |   |   |       |-- IChatParticipantsRepository.ts
|   |   |       |-- infrastructure
|   |   |       |   |-- containers
|   |   |       |       |-- ChatParticipantsRespositorysContainer.ts
|   |   |       |   |-- DTOs
|   |   |           |-- repositorys
|   |   |               |-- PrismaChatParticipantsRepository.ts
|   |   |   |-- ChatSettings
|   |   |   |   |-- application
|   |   |   |   |   |-- repositoryImplementations
|   |   |   |   |       |-- SaveChatSettings.ts
|   |   |   |       |-- UseCases
|   |   |   |   |-- domain
|   |   |   |   |   |-- IChatSettings.ts
|   |   |   |   |   |-- IChatSettingsApplicationImplementations.ts
|   |   |   |       |-- IChatSettingsRepository.ts
|   |   |       |-- infrastructure
|   |   |       |   |-- containers
|   |   |       |       |-- ChatSettingsRespositorysContainer.ts
|   |   |       |   |-- DTOs
|   |   |           |-- repositorys
|   |   |               |-- PrismaChatSettingsRepository.ts
|   |   |   |-- Message
|   |   |   |   |-- application
|   |   |   |   |   |-- repositoryImplementations
|   |   |   |   |       |-- SaveMessage.ts
|   |   |   |       |-- UseCases
|   |   |   |       |   |-- MessageGetMessages.ts
|   |   |   |           |-- SendMessage.ts
|   |   |   |   |-- domain
|   |   |   |   |   |-- IMessage.ts
|   |   |   |   |   |-- IMessageApplicationImplementations.ts
|   |   |   |   |   |-- IMessageApplicationUserCases.ts
|   |   |   |   |   |-- IMessageRepository.ts
|   |   |   |       |-- MessageBodyRequest.ts
|   |   |       |-- infrastructure
|   |   |       |   |-- containers
|   |   |       |       |-- MessageUseCasesContainer.ts
|   |   |       |   |-- DTOs
|   |   |       |       |-- SendMessageDto.ts
|   |   |           |-- repositorys
|   |   |               |-- PrismaMessageRepository.ts
|   |   |   |-- MessageStatus
|   |   |   |   |-- application
|   |   |   |   |   |-- repositoryImplementations
|   |   |   |   |       |-- SaveMessageStatus.ts
|   |   |   |       |-- UseCases
|   |   |   |   |-- domain
|   |   |   |   |   |-- IMessageStatus.ts
|   |   |   |   |   |-- IMessageStatusApplicationImplementations.ts
|   |   |   |       |-- IMessageStatusRepository.ts
|   |   |       |-- infrastructure
|   |   |       |   |-- containers
|   |   |       |   |-- DTOs
|   |   |           |-- repositorys
|   |   |               |-- PrismaMessageStatusRepository.ts
|   |   |   |-- RetainedMessages
|   |   |   |   |-- application
|   |   |   |   |   |-- repositoryImplementations
|   |   |   |   |       |-- SaveRetainedMessages.ts
|   |   |   |       |-- UseCases
|   |   |   |   |-- domain
|   |   |   |   |   |-- IRetainedMessages.ts
|   |   |   |   |   |-- IRetainedMessagesApplicationImplementations.ts
|   |   |   |       |-- IRetainedMessagesRepository.ts
|   |   |       |-- infrastructure
|   |   |       |   |-- containers
|   |   |       |   |-- DTOs
|   |   |           |-- repositorys
|   |   |               |-- PrismaRetainedMessagesRepository.ts
|   |   |   |-- User
|   |   |   |   |-- application
|   |   |   |   |   |-- repositoryImplementations
|   |   |   |   |   |   |-- FindUser.ts
|   |   |   |   |   |   |-- SaveUser.ts
|   |   |   |   |       |-- UpdateUser.ts
|   |   |   |       |-- UseCases
|   |   |   |       |   |-- UserCodePhoneValidate.ts
|   |   |   |       |   |-- UserCreateProfile.ts
|   |   |   |       |   |-- UserGetProfile.ts
|   |   |   |       |   |-- UserRefreshToken.ts
|   |   |   |           |-- UserSendPhoneValidate.ts
|   |   |   |   |-- domain
|   |   |   |   |   |-- IUser.ts
|   |   |   |   |   |-- IUserApplicationImplementations.ts
|   |   |   |   |   |-- IUserApplicationUserCases.ts
|   |   |   |   |   |-- IUserRepository.ts
|   |   |   |       |-- UserBodyRequest.ts
|   |   |       |-- infraestructure
|   |   |       |   |-- containers
|   |   |       |   |   |-- UserCasesContainer.ts
|   |   |       |       |-- UserRespositorysContainer.ts
|   |   |       |   |-- DTOs
|   |   |       |   |   |-- UserCodePhoneValidate.ts
|   |   |       |   |   |-- UserCreateProfile.ts
|   |   |       |   |   |-- UserRefreshToken.ts
|   |   |       |       |-- UserSendPhoneValidate.ts
|   |   |       |   |-- repositorys
|   |   |       |       |-- PrismaUserRepository.ts
|   |   |           |-- strategys
|   |   |               |-- UserJwt.ts
|   |   |   |-- UserProfile
|   |   |   |   |-- application
|   |   |   |   |   |-- repositoryImplementations
|   |   |   |   |       |-- SaveUserProfile.ts
|   |   |   |       |-- UseCases
|   |   |   |   |-- domain
|   |   |   |   |   |-- IUserProfile.ts
|   |   |   |   |   |-- IUserProfileApplicationImplementations.ts
|   |   |   |       |-- IUserProfileRepository.ts
|   |   |       |-- infraestructure
|   |   |       |   |-- containers
|   |   |       |       |-- UserProfileRespositorysContainer.ts
|   |   |           |-- repositorys
|   |   |               |-- PrismaUserProfileRepository.ts
|   |       |-- UserSettings
|   |       |   |-- application
|   |       |   |   |-- repositoryImplementations
|   |       |   |       |-- SaveUserSettings.ts
|   |       |       |-- UseCases
|   |       |   |-- domain
|   |       |   |   |-- IUserSettingsApplicationImplementations.ts
|   |       |   |   |-- IUserSettingsRepository.ts
|   |       |       |-- IUserSettingsSettingsProfile.ts
|   |           |-- infraestructure
|   |           |   |-- containers
|   |           |       |-- UserSettingsRespositorysContainer.ts
|   |               |-- repositorys
|   |                   |-- PrismaUserSettingsRepository.ts
|   |   |-- lib
|   |   |   |-- cli-genetator-core-module
|   |   |   |   |-- index.mts
|   |   |       |-- utils.ts
|   |       |-- cli-genetator-files
|   |       |   |-- index.mts
|   |           |-- utils.ts
|   |   |-- main
|   |   |   |-- env.d.ts
|   |       |-- providers
|   |       |   |-- ApplicationProvider.ts
|   |       |   |-- AwsProvider.ts
|   |       |   |-- ErrorHandlerProvider.ts
|   |       |   |-- LocalsProvider.ts
|   |       |   |-- MiddlewaresProvider.ts
|   |       |   |-- MulterProvider.ts
|   |       |   |-- PrismaProvider.ts
|   |       |   |-- RouterProvider.ts
|   |       |   |-- Routes
|   |       |   |   |-- Chat.routes.ts
|   |       |   |   |-- Messages.routes.ts
|   |       |       |-- User.routes.ts
|   |       |   |-- SocketActions
|   |       |   |   |-- index.ts
|   |       |       |-- User.actions.ts
|   |           |-- SocketServerProvider.ts
|   |   |-- server.ts
|       |-- shared
|       |   |-- constants
|       |       |-- CommonConstants.ts
|       |   |-- CustomErrors
|       |       |-- CustomErrors.ts
|       |   |-- PassportProvider
|       |       |-- infraestructure
|       |           |-- passportConfig.ts
|       |   |-- providers
|       |   |   |-- FileUploader
|       |   |   |   |-- application
|       |   |   |       |-- FileRepository.ts
|       |   |   |   |-- domain
|       |   |   |       |-- IFileRepository.ts
|       |   |       |-- infraestructure
|       |   |           |-- FileContainer.ts
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
|       |   |   |-- PhoneMessaging
|       |   |       |-- infraestructure
|       |   |           |-- Twilio.ts
|       |       |-- Response
|       |       |   |-- domain
|       |       |       |-- IResponse.ts
|       |           |-- infraestructure
|       |               |-- Response.ts
|       |   |-- Types
|       |   |   |-- IFilter.ts
|       |   |   |-- Jwt.ts
|       |       |-- TNullable.ts
|           |-- utils
|           |   |-- ensurePhonePrefix.ts
|           |   |-- hasExpiredToken.ts
|               |-- RandomNumber.ts
|   |-- tsconfig.json
|   |-- yarn-error.log
    |-- yarn.lock

```

<!-- end-markdownlint-project-tree -->
