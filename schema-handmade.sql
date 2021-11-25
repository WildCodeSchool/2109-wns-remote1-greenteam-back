-- Créer la BDD
CREATE DATABASE collabee_essais CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- Donner les droits d'accès à un utilisateur (valere_collabee)
GRANT ALL PRIVILEGES ON collabee_essais.* TO "valere_collabee";
FLUSH PRIVILEGES;

USE collabee_essais;

-- Créer une table pour stocker les utilisateurs
CREATE TABLE user (
  id INTEGER NOT NULL PRIMARY KEY AUTO_INCREMENT,
  last_name VARCHAR(255),
  first_name VARCHAR(255),
  email VARCHAR(255),
  password VARCHAR(60),
  picture VARCHAR(255)
);