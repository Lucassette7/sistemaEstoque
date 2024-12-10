-- --------------------------------------------------------
-- Servidor:                     127.0.0.1
-- Versão do servidor:           8.0.30 - MySQL Community Server - GPL
-- OS do Servidor:               Win64
-- HeidiSQL Versão:              12.1.0.6537
-- --------------------------------------------------------

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET NAMES utf8 */;
/*!50503 SET NAMES utf8mb4 */;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;


-- Copiando estrutura do banco de dados para estoque
CREATE DATABASE IF NOT EXISTS `estoque` /*!40100 DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci */ /*!80016 DEFAULT ENCRYPTION='N' */;
USE `estoque`;

-- Copiando estrutura para tabela estoque.categoria
CREATE TABLE IF NOT EXISTS `categoria` (
  `id_categoria` int NOT NULL AUTO_INCREMENT,
  `categoria` varchar(150) DEFAULT NULL,
  `id_empresa` int DEFAULT NULL,
  PRIMARY KEY (`id_categoria`)
) ENGINE=InnoDB AUTO_INCREMENT=2 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

-- Copiando dados para a tabela estoque.categoria: ~0 rows (aproximadamente)
INSERT INTO `categoria` (`id_categoria`, `categoria`, `id_empresa`) VALUES
	(1, 'tenis', 1);

-- Copiando estrutura para tabela estoque.empresa
CREATE TABLE IF NOT EXISTS `empresa` (
  `id_empresa` int NOT NULL AUTO_INCREMENT,
  `nome_empresa` varchar(150) NOT NULL,
  `cnpj` varchar(20) NOT NULL,
  `email` varchar(100) DEFAULT NULL,
  `telefone` varchar(20) DEFAULT NULL,
  `senha` varchar(100) DEFAULT NULL,
  PRIMARY KEY (`id_empresa`),
  UNIQUE KEY `cnpj` (`cnpj`),
  UNIQUE KEY `email` (`email`),
  UNIQUE KEY `telefone` (`telefone`)
) ENGINE=InnoDB AUTO_INCREMENT=3 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

-- Copiando dados para a tabela estoque.empresa: ~2 rows (aproximadamente)
INSERT INTO `empresa` (`id_empresa`, `nome_empresa`, `cnpj`, `email`, `telefone`, `senha`) VALUES
	(1, 'smartsky', '00000000000000', 'smartsky@gmail.com', '11946635241', '123'),
	(2, 'spobras', '11111111111111', 'lucas7mario@gmail.com', '11946635244', '123');

-- Copiando estrutura para tabela estoque.fornecedor
CREATE TABLE IF NOT EXISTS `fornecedor` (
  `id_fornecedor` int NOT NULL AUTO_INCREMENT,
  `id_empresa` int DEFAULT NULL,
  `nome` varchar(150) DEFAULT NULL,
  `cnpj` char(14) DEFAULT NULL,
  `email` varchar(150) DEFAULT NULL,
  `telefone` char(11) DEFAULT NULL,
  `cep` char(8) DEFAULT NULL,
  `estado` varchar(100) DEFAULT NULL,
  `cidade` varchar(100) DEFAULT NULL,
  `bairro` varchar(100) DEFAULT NULL,
  `rua` varchar(100) DEFAULT NULL,
  `numero` int DEFAULT NULL,
  PRIMARY KEY (`id_fornecedor`)
) ENGINE=InnoDB AUTO_INCREMENT=4 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

-- Copiando dados para a tabela estoque.fornecedor: ~0 rows (aproximadamente)
INSERT INTO `fornecedor` (`id_fornecedor`, `id_empresa`, `nome`, `cnpj`, `email`, `telefone`, `cep`, `estado`, `cidade`, `bairro`, `rua`, `numero`) VALUES
	(1, 1, 'Fornecedor 1', '11111111111111', 'fornecedor1@gmail.com', '00000000000', '07260500', 'São Paulo', 'Guarulhos', 'Jardim Angélica', 'Rua Maria Antonieta de Campos Arruda', 12),
	(2, 1, 'Fornecedor 2', '22222222222222', 'Fornecedor2@gmail.com', '33333333333', '07260500', 'São Paulo', 'Guarulhos', 'Jardim Angélica', 'Rua Maria Antonieta de Campos Arruda', 24),
	(3, 1, 'Fornecedor 3', '88888888888888', 'fornecedor3@gmail.com', '00000000222', '07260400', 'São Paulo', 'Guarulhos', 'Jardim Angélica', 'Rua José Caetano da Cruz', 34);

-- Copiando estrutura para tabela estoque.produto
CREATE TABLE IF NOT EXISTS `produto` (
  `id_produto` int NOT NULL AUTO_INCREMENT,
  `id_categoria` int DEFAULT NULL,
  `id_empresa` int DEFAULT NULL,
  `produto` varchar(150) NOT NULL,
  `marca` varchar(150) NOT NULL,
  `cor` varchar(150) DEFAULT NULL,
  `valor` varchar(150) DEFAULT NULL,
  `descricao` longtext,
  PRIMARY KEY (`id_produto`)
) ENGINE=InnoDB AUTO_INCREMENT=2 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

-- Copiando dados para a tabela estoque.produto: ~0 rows (aproximadamente)
INSERT INTO `produto` (`id_produto`, `id_categoria`, `id_empresa`, `produto`, `marca`, `cor`, `valor`, `descricao`) VALUES
	(1, 1, 1, 'airmax', 'nike', 'preto', '500', 'tenis airmax');

-- Copiando estrutura para view estoque.view_fornecedor
-- Criando tabela temporária para evitar erros de dependência de VIEW
CREATE TABLE `view_fornecedor` (
	`id_fornecedor` INT(10) NOT NULL,
	`id_empresa` INT(10) NULL,
	`nome` VARCHAR(150) NULL COLLATE 'utf8mb4_0900_ai_ci',
	`cnpj` CHAR(14) NULL COLLATE 'utf8mb4_0900_ai_ci',
	`email` VARCHAR(150) NULL COLLATE 'utf8mb4_0900_ai_ci',
	`telefone` CHAR(11) NULL COLLATE 'utf8mb4_0900_ai_ci',
	`cep` CHAR(8) NULL COLLATE 'utf8mb4_0900_ai_ci',
	`estado` VARCHAR(100) NULL COLLATE 'utf8mb4_0900_ai_ci',
	`cidade` VARCHAR(100) NULL COLLATE 'utf8mb4_0900_ai_ci',
	`bairro` VARCHAR(100) NULL COLLATE 'utf8mb4_0900_ai_ci',
	`rua` VARCHAR(100) NULL COLLATE 'utf8mb4_0900_ai_ci',
	`numero` INT(10) NULL
) ENGINE=MyISAM;

-- Copiando estrutura para view estoque.view_fornecedor
-- Removendo tabela temporária e criando a estrutura VIEW final
DROP TABLE IF EXISTS `view_fornecedor`;
CREATE ALGORITHM=UNDEFINED SQL SECURITY DEFINER VIEW `view_fornecedor` AS select `fornecedor`.`id_fornecedor` AS `id_fornecedor`,`fornecedor`.`id_empresa` AS `id_empresa`,`fornecedor`.`nome` AS `nome`,`fornecedor`.`cnpj` AS `cnpj`,`fornecedor`.`email` AS `email`,`fornecedor`.`telefone` AS `telefone`,`fornecedor`.`cep` AS `cep`,`fornecedor`.`estado` AS `estado`,`fornecedor`.`cidade` AS `cidade`,`fornecedor`.`bairro` AS `bairro`,`fornecedor`.`rua` AS `rua`,`fornecedor`.`numero` AS `numero` from `fornecedor`;

/*!40103 SET TIME_ZONE=IFNULL(@OLD_TIME_ZONE, 'system') */;
/*!40101 SET SQL_MODE=IFNULL(@OLD_SQL_MODE, '') */;
/*!40014 SET FOREIGN_KEY_CHECKS=IFNULL(@OLD_FOREIGN_KEY_CHECKS, 1) */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40111 SET SQL_NOTES=IFNULL(@OLD_SQL_NOTES, 1) */;
