import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

const createChat = async ({ userId, message }) => {
  const newChat = {
    user_id: userId,
    content: message,
    date: new Date(),
  };

  await prisma.chat.create({
    data: newChat,
  });
};

export { createChat };
