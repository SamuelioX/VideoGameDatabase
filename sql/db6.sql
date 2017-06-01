-- MySQL dump 10.13  Distrib 5.7.9, for Win64 (x86_64)
--
-- Host: 127.0.0.1    Database: videogame
-- ------------------------------------------------------
-- Server version	5.7.12-log

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8 */;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;

--
-- Table structure for table `game_genre`
--

DROP TABLE IF EXISTS `game_genre`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `game_genre` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `game_id` int(11) DEFAULT NULL,
  `genre_id` int(11) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `game_genre`
--

LOCK TABLES `game_genre` WRITE;
/*!40000 ALTER TABLE `game_genre` DISABLE KEYS */;
/*!40000 ALTER TABLE `game_genre` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `game_status_info`
--

DROP TABLE IF EXISTS `game_status_info`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `game_status_info` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `user_id` int(11) DEFAULT NULL,
  `status_type` int(11) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `game_status_info`
--

LOCK TABLES `game_status_info` WRITE;
/*!40000 ALTER TABLE `game_status_info` DISABLE KEYS */;
/*!40000 ALTER TABLE `game_status_info` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `game_status_type`
--

DROP TABLE IF EXISTS `game_status_type`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `game_status_type` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `type` varchar(45) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=6 DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `game_status_type`
--

LOCK TABLES `game_status_type` WRITE;
/*!40000 ALTER TABLE `game_status_type` DISABLE KEYS */;
INSERT INTO `game_status_type` VALUES (1,'Started'),(2,'Completed'),(3,'Dropped'),(4,'Interested'),(5,'Plan to Play');
/*!40000 ALTER TABLE `game_status_type` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `game_system`
--

DROP TABLE IF EXISTS `game_system`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `game_system` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `game_id` int(11) DEFAULT NULL,
  `system_id` int(11) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=6 DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `game_system`
--

LOCK TABLES `game_system` WRITE;
/*!40000 ALTER TABLE `game_system` DISABLE KEYS */;
INSERT INTO `game_system` VALUES (1,1,1),(2,1,2),(3,1,3),(4,2,3),(5,2,2);
/*!40000 ALTER TABLE `game_system` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `genre_info`
--

DROP TABLE IF EXISTS `genre_info`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `genre_info` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `genre` varchar(45) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `genre_info`
--

LOCK TABLES `genre_info` WRITE;
/*!40000 ALTER TABLE `genre_info` DISABLE KEYS */;
/*!40000 ALTER TABLE `genre_info` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `review`
--

DROP TABLE IF EXISTS `review`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `review` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `user_id` int(11) DEFAULT NULL,
  `game_id` int(11) DEFAULT NULL,
  `review_text` mediumtext,
  `review_score` int(10) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=2 DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `review`
--

LOCK TABLES `review` WRITE;
/*!40000 ALTER TABLE `review` DISABLE KEYS */;
INSERT INTO `review` VALUES (1,1,1,'game is good',10);
/*!40000 ALTER TABLE `review` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `system_info`
--

DROP TABLE IF EXISTS `system_info`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `system_info` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `name` varchar(45) DEFAULT NULL,
  `year` varchar(45) DEFAULT NULL,
  `publisher` varchar(45) DEFAULT NULL,
  `art` blob,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=4 DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `system_info`
--

LOCK TABLES `system_info` WRITE;
/*!40000 ALTER TABLE `system_info` DISABLE KEYS */;
INSERT INTO `system_info` VALUES (1,'Super Nintendo','1991','Nintendo',NULL),(2,'PS2','2000','Sony',NULL),(3,'Gamecube','2001','Nintendo',NULL);
/*!40000 ALTER TABLE `system_info` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `user`
--

DROP TABLE IF EXISTS `user`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `user` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `user_type` int(11) DEFAULT NULL,
  `username` varchar(45) DEFAULT NULL,
  `user_join_date` date DEFAULT NULL,
  `email` varchar(45) DEFAULT NULL,
  `salt` varchar(2056) DEFAULT NULL,
  `password` varchar(2056) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=7 DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `user`
--

LOCK TABLES `user` WRITE;
/*!40000 ALTER TABLE `user` DISABLE KEYS */;
INSERT INTO `user` VALUES (1,4,'admin',NULL,'admin@videogamedb.com','0',NULL),(2,4,'samuelio',NULL,'samuelio@videogamedb.com','0',NULL),(3,1,'\'sam\'','2015-07-23','\'samueliox@gmail.com\'','269fb3f61347aa9d','3e02e87cd5b5e3fbb7ffbb55b5c0df1ea498d3228049156b01afb8a8f8e5cac97cbc435e74eb5b290d9cb9e90eaca39c1a415f75be723c7077e94b7781dd5cc5'),(4,1,'sam','2017-05-28','samueliox@gmail.com','724cbb5d46ef4ed0','c9959dc3772b160d561eb65b122e1f0a8a6a313f69c4ff618e67f95ee711e2261890bc980981653164dc166a3e6e450fbc2bbfa16d9bf10322aabdbdc94a43bb'),(5,1,'samtest','2017-05-31','samtest@gmail.com','88ef899fbde8ffda','7e959dc5aa46d08e5f51bbc9f8b2eb97ae94625606d595709c36edb861a5ae97404336787cec11c2ce4f4aa1e5665e72b2e9b2a8bf4915b2d191cd40d9d9edd5'),(6,1,'samtest1','2017-06-01','samtest1@gmail.com','ce3e74447f2e8558','afb2e0fe9b69f856f47338e9e7b0dd8a80207c90f2ce98facf2677cb24cacd8a022ac5d89e9b42190907d17389de07c8554f44fb8252e43019431bc7b3c73eb9');
/*!40000 ALTER TABLE `user` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `video_game_info`
--

DROP TABLE IF EXISTS `video_game_info`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `video_game_info` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `name` varchar(45) DEFAULT NULL,
  `developer` varchar(45) DEFAULT NULL,
  `publisher` varchar(45) DEFAULT NULL,
  `boxart` blob,
  `rating` double DEFAULT NULL,
  `players` int(11) DEFAULT NULL,
  `coop` tinyint(1) NOT NULL,
  `ESRBrating` varchar(1) DEFAULT NULL,
  `year` year(4) DEFAULT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `name_UNIQUE` (`name`)
) ENGINE=InnoDB AUTO_INCREMENT=7 DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `video_game_info`
--

LOCK TABLES `video_game_info` WRITE;
/*!40000 ALTER TABLE `video_game_info` DISABLE KEYS */;
INSERT INTO `video_game_info` VALUES (1,'Mega Man X2','Capcom','Capcom',NULL,10,2,0,'E',1995),(2,'Mega Man X3','Capcom','Capcom',NULL,7,2,0,'E',1996),(3,'Mega Man X','Capcom','Capcom',NULL,10,2,0,'E',1994),(4,'Mega Man X4','Capcom','Capcom',NULL,7,2,0,'E',NULL),(6,'Mega Man','Capcom','Capcom',NULL,8,2,0,'E',1987);
/*!40000 ALTER TABLE `video_game_info` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2017-06-01 13:42:21
