-- Creación de Enums
CREATE TYPE GroupRole AS ENUM ('MEMBER', 'ADMIN', 'OWNER');
CREATE TYPE MessageType AS ENUM ('TEXT', 'IMAGE', 'AUDIO', 'VIDEO');
CREATE TYPE QueueStatus AS ENUM ('PENDING', 'SENT', 'FAILED');
CREATE TYPE MessageReadStatus AS ENUM ('SENT', 'DELIVERED', 'READ');
CREATE TYPE UserStatus  AS ENUM ('ONLINE', 'OFFLINE', 'INVISIBLE');

-- Creación de Tablas
CREATE TABLE "User" (
    phoneNumber VARCHAR PRIMARY KEY,
    name VARCHAR NOT NULL,
    profilePhoto VARCHAR,
    language VARCHAR,
    phoneCode VARCHAR
);

CREATE TABLE UserProfile (
    phoneNumber VARCHAR PRIMARY KEY REFERENCES "User"(phoneNumber),
    bio TEXT,
    lastSeen TIMESTAMP,
    status UserStatus
    -- Otros campos relevantes para el perfil
    -- Asegúrate de definir el tipo de dato para UserStatus si es necesario
);

CREATE TABLE UserSettings (
    userId VARCHAR PRIMARY KEY REFERENCES "User"(phoneNumber),
    notificationsEnabled BOOLEAN
);

CREATE TABLE Chat (
    id VARCHAR PRIMARY KEY,
    lastConnectionId VARCHAR REFERENCES Connections(id)
);

CREATE TABLE ChatSettings (
    chatId VARCHAR PRIMARY KEY REFERENCES Chat(id),
    iaEnabled BOOLEAN DEFAULT false,
    updatedAt TIMESTAMP,
    updatedBy VARCHAR REFERENCES "User"(phoneNumber)
);

CREATE TABLE ChatParticipants (
    chatId VARCHAR REFERENCES Chat(id),
    userId VARCHAR REFERENCES "User"(phoneNumber),
    id SERIAL PRIMARY KEY,
    UNIQUE(chatId, userId)
);

CREATE TABLE Message (
    id VARCHAR PRIMARY KEY,
    chatId VARCHAR REFERENCES Chat(id),
    ownerId VARCHAR REFERENCES "User"(phoneNumber),
    content VARCHAR,
    type MessageType,
    createdAt TIMESTAMP,
    themes VARCHAR[] -- PostgreSQL soporta arrays, pero asegúrate de que esta es la estructura que deseas
);

CREATE TABLE RetainedMessages (
    id VARCHAR PRIMARY KEY,
    chatId VARCHAR REFERENCES Chat(id),
    ownerId VARCHAR REFERENCES "User"(phoneNumber),
    content VARCHAR,
    type MessageType,
    createdAt TIMESTAMP,
    status QueueStatus
);

CREATE TABLE MessageStatus (
    messageId VARCHAR REFERENCES Message(id),
    recipientId VARCHAR REFERENCES "User"(phoneNumber),
    status MessageReadStatus,
    updatedAt TIMESTAMP,
    PRIMARY KEY (messageId, recipientId)
);

CREATE TABLE FavoriteMessages (
    id VARCHAR PRIMARY KEY,
    userId VARCHAR REFERENCES "User"(phoneNumber),
    messageId VARCHAR REFERENCES Message(id),
    createdAt TIMESTAMP,
    UNIQUE(userId, messageId)
);

CREATE TABLE GroupChat (
    id VARCHAR PRIMARY KEY,
    name VARCHAR,
    createdAt TIMESTAMP,
    createdBy VARCHAR REFERENCES "User"(phoneNumber)
);

CREATE TABLE GroupParticipants (
    groupId VARCHAR REFERENCES GroupChat(id),
    userId VARCHAR REFERENCES "User"(phoneNumber),
    joinedAt TIMESTAMP,
    role GroupRole,
    PRIMARY KEY (groupId, userId)
);

CREATE TABLE BlockedUsers (
    id VARCHAR PRIMARY KEY,
    blockerId VARCHAR REFERENCES "User"(phoneNumber),
    blockedId VARCHAR REFERENCES "User"(phoneNumber),
    createdAt TIMESTAMP,
    UNIQUE(blockerId, blockedId)
);

CREATE TABLE Connections (
    id VARCHAR PRIMARY KEY,
    chatId VARCHAR REFERENCES Chat(id),
    occurredAt TIMESTAMP
);
