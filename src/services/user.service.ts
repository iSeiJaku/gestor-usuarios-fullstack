import { PrismaClient } from '@prisma/client';
import bcrypt from 'bcryptjs';

const prisma = new PrismaClient();

export const getAllUsers = async () => {
  return await prisma.user.findMany({
    select: { id: true, name: true, email: true, createdAt: true }, // Ocultamos la contraseña por seguridad
    orderBy: { createdAt: 'desc' }
  });
};

export const createUser = async (name: string, email: string, passwordRaw: string) => {
  // Encriptar la contraseña antes de guardarla
  const hashedPassword = await bcrypt.hash(passwordRaw, 10);
  
  return await prisma.user.create({
    data: { 
      name, 
      email, 
      password: hashedPassword 
    },
    select: { id: true, name: true, email: true }
  });
};

export const findUserByEmail = async (email: string) => {
  return await prisma.user.findUnique({
    where: { email }
  });
};

export const deleteUser = async (id: string) => {
  return await prisma.user.delete({
    where: { id }
  });
};