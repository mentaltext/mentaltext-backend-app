SELECT u.*
FROM "User" u
JOIN "ChatParticipants" cp ON u."phoneNumber" = cp."userId"
WHERE cp."chatId" = 'chatId';
