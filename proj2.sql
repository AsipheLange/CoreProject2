-- MySQL dump 10.13  Distrib 8.0.44, for Win64 (x86_64)
--
-- Host: localhost    Database: employee_data
-- ------------------------------------------------------
-- Server version	8.0.44

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!50503 SET NAMES utf8 */;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;

--
-- Table structure for table `employee.attendance`
--

DROP TABLE IF EXISTS `employee_attendance`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `employee_attendance` (
  `attendance_id` int NOT NULL,
  `employee_id` int NOT NULL,
  `attendance_date` date NOT NULL,
  `status` varchar(100) NOT NULL,
  PRIMARY KEY (`attendance_id`),
  KEY `employee_id_idx` (`employee_id`),
  CONSTRAINT `employee_id` FOREIGN KEY (`employee_id`) REFERENCES `employees` (`employee_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `employee.attendance`
--

LOCK TABLES `employee_attendance` WRITE;
/*!40000 ALTER TABLE `employee_attendance` DISABLE KEYS */;
INSERT INTO `employee_attendance` VALUES (1,1,'2025-07-25','Present'),(2,1,'2025-07-26','Absent'),(3,1,'2025-07-27','Present'),(4,1,'2025-07-28','Present'),(5,1,'2025-07-29','Present'),(6,2,'2025-07-25','Present'),(7,2,'2025-07-26','Present'),(8,2,'2025-07-27','Absent'),(9,2,'2025-07-28','Present'),(10,2,'2025-07-29','Present'),(11,3,'2025-07-25','Present'),(12,3,'2025-07-26','Present'),(13,3,'2025-07-27','Present'),(14,3,'2025-07-28','Absent'),(15,3,'2025-07-29','Present'),(16,4,'2025-07-25','Absent'),(17,4,'2025-07-26','Present'),(18,4,'2025-07-27','Present'),(19,4,'2025-07-28','Present'),(20,4,'2025-07-29','Present'),(21,5,'2025-07-25','Present'),(22,5,'2025-07-26','Present'),(23,5,'2025-07-27','Absent'),(24,5,'2025-07-28','Present'),(25,5,'2025-07-29','Present'),(26,6,'2025-07-25','Present'),(27,6,'2025-07-26','Present'),(28,6,'2025-07-27','Absent'),(29,6,'2025-07-28','Present'),(30,6,'2025-07-29','Present'),(31,7,'2025-07-25','Present'),(32,7,'2025-07-26','Present'),(33,7,'2025-07-27','Present'),(34,7,'2025-07-28','Absent'),(35,7,'2025-07-29','Present'),(36,8,'2025-07-25','Present'),(37,8,'2025-07-26','Absent'),(38,8,'2025-07-27','Present'),(39,8,'2025-07-28','Present'),(40,8,'2025-07-29','Present'),(41,9,'2025-07-25','Present'),(42,9,'2025-07-26','Present'),(43,9,'2025-07-27','Present'),(44,9,'2025-07-28','Absent'),(45,9,'2025-07-29','Present'),(46,10,'2025-07-25','Present'),(47,10,'2025-07-26','Present'),(48,10,'2025-07-27','Absent'),(49,10,'2025-07-28','Present'),(50,10,'2025-07-29','Present');
/*!40000 ALTER TABLE `employee_attendance` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `employees`
--

DROP TABLE IF EXISTS `employees`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `employees` (
  `employee_id` int NOT NULL AUTO_INCREMENT,
  `name` varchar(100) NOT NULL,
  `position` varchar(225) NOT NULL,
  `department` varchar(225) NOT NULL,
  `salary` int NOT NULL,
  `employmentHistory` varchar(225) NOT NULL,
  `contact` varchar(225) NOT NULL,
  PRIMARY KEY (`employee_id`)
) ENGINE=InnoDB AUTO_INCREMENT=11 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `employees`
--

LOCK TABLES `employees` WRITE;
/*!40000 ALTER TABLE `employees` DISABLE KEYS */;
INSERT INTO `employees` VALUES (1,'Sibongile Nkosi','Software Development','Development',70000,'Joined in 2015, promoted to Senior in 2018','sibongile.nkosi@moderntech.com'),(2,'Lungile Moyo','HR Manager','HR',80000,'Joined in 2013, promoted to Manager in 2017','lungile.moyomoderntech.com'),(3,'Thabo Molefe','Quality Analyst','QA',55000,'Joined in 2018','thabo.molefe@moderntech.com'),(4,'Keshav Naidoo','Sales Representative','Sales',60000,'Joined in 2020','keshav.naidoo@moderntech.com'),(5,'Zanele Khumalo','Marketing Specialist','Marketing',58000,'Joined in 2019','zanele.khumalo@moderntech.com'),(6,'Sipho Zulu','UI/UX Designer','Designer',65000,'Joined in 2016','sipho.zulu@moderntech.com'),(7,'Naledi Moeketsi','DevOps Engineer','IT',72000,'Joined in 2017','naledi.moeketsi@moderntech.com'),(8,'Farai Gumbo','Content Strategist','Marketing',56000,'Joined in 2021','farai.gumbo@moderntech.com'),(9,'Karabo Dlamini','Accountant','Finance',62000,'Joined in 2018','karabo.dlamini@moderntech.com'),(10,'Fatima Patel','Customer Support Lead','Support',58000,'Joined in 2016','fatima.patel@moderntech.com');
/*!40000 ALTER TABLE `employees` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `leave_request`
--

DROP TABLE IF EXISTS `leave_request`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `leave_request` (
  `leave_id` int NOT NULL AUTO_INCREMENT,
  `employee_id` int NOT NULL,
  `leave_date` date NOT NULL,
  `reason` varchar(255) NOT NULL,
  `status` varchar(45) NOT NULL,
  PRIMARY KEY (`leave_id`),
  KEY `fk_leave_employee_idx` (`employee_id`),
  CONSTRAINT `fk_leave_employee` FOREIGN KEY (`employee_id`) REFERENCES `employees` (`employee_id`)
) ENGINE=InnoDB AUTO_INCREMENT=14 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `leave_request`
--

LOCK TABLES `leave_request` WRITE;
/*!40000 ALTER TABLE `leave_request` DISABLE KEYS */;
INSERT INTO `leave_request` VALUES (1,1,'2025-07-22','Sick Leave','Approved'),(2,1,'2024-12-01','Personal','Pending'),(3,2,'2025-07-15','Family responsibility','Denied'),(4,2,'2024-12-02','Vacation','Approved'),(5,3,'2025-07-10','Medical Appoinment','approved'),(6,3,'2024-12-05','Personal','Pending'),(7,4,'2025-07-20','Bereavment','Approved'),(8,5,'2024-12-01','Childcare','Pending'),(9,6,'2025-07-18','Sick Leave','Approved'),(10,7,'2025-07-22','Vacation','Pending'),(11,8,'2024-12-02','Medical Appointment','Approved'),(12,9,'2025-07-19','Childcare','Denied'),(13,10,'2024-12-03','Vacation','Pending');
/*!40000 ALTER TABLE `leave_request` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `payroll_data`
--

DROP TABLE IF EXISTS `payroll_data`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `payroll_data` (
  `employee_id` int NOT NULL AUTO_INCREMENT,
  `hoursWorked` int NOT NULL,
  `leaveDeductions` int NOT NULL,
  `finalSalary` int NOT NULL,
  PRIMARY KEY (`employee_id`)
) ENGINE=InnoDB AUTO_INCREMENT=11 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `payroll_data`
--

LOCK TABLES `payroll_data` WRITE;
/*!40000 ALTER TABLE `payroll_data` DISABLE KEYS */;
INSERT INTO `payroll_data` VALUES (1,160,8,69500),(2,150,10,79000),(3,170,4,54800),(4,165,6,59700),(5,158,5,57850),(6,168,2,64800),(7,175,3,71800),(8,160,0,56000),(9,155,5,61500),(10,162,4,57750);
/*!40000 ALTER TABLE `payroll_data` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2026-02-04 10:05:13



ALTER TABLE `employee_data`.`leave_request` 
DROP FOREIGN KEY `fk_leave_employee`;
ALTER TABLE `employee_data`.`leave_request` 
ADD CONSTRAINT `fk_leave_employee`
  FOREIGN KEY (`employee_id`)
  REFERENCES `employee_data`.`employees` (`employee_id`)
  ON DELETE CASCADE
  ON UPDATE CASCADE;


ALTER TABLE `employee_data`.`employee_attendance` 
DROP FOREIGN KEY `fk_attendance_employee_id`;
ALTER TABLE `employee_data`.`employee_attendance` 
ADD CONSTRAINT `fk_attendance_employee_id`
  FOREIGN KEY (`employee_id`)
  REFERENCES `employee_data`.`employees` (`employee_id`)
  ON DELETE CASCADE
  ON UPDATE CASCADE;
