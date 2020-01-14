SET SQL_MODE="NO_AUTO_VALUE_ON_ZERO";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8 */;

--
-- Database: `magazin`
--
CREATE DATABASE `catalog` DEFAULT CHARACTER SET latin1 COLLATE latin1_swedish_ci;
USE `catalog`;

-- --------------------------------------------------------

--
-- Table structure for table `categories`
--

CREATE TABLE IF NOT EXISTS `categories` (
  `id` smallint(5) NOT NULL AUTO_INCREMENT,
  `name` varchar(30) DEFAULT NULL,
  `description` varchar(100) DEFAULT NULL,
  `createdAt` timestamp,
  `updatedAt` timestamp,
  PRIMARY KEY (`id`),
  KEY `id` (`id`)
) ENGINE=MyISAM  DEFAULT CHARSET=latin1 AUTO_INCREMENT=1 ;

CREATE TABLE IF NOT EXISTS `reviews` (
  `id` smallint(5) NOT NULL AUTO_INCREMENT,
  `book_id` smallint(5) DEFAULT NULL,
  `name` varchar(50) DEFAULT NULL,
  `content` text DEFAULT NULL,
  `score` smallint(5) DEFAULT NULL,
  `createdAt` timestamp,
  `updatedAt` timestamp,
  PRIMARY KEY (`id`),
  KEY `id` (`id`)
) ENGINE=MyISAM  DEFAULT CHARSET=latin1 AUTO_INCREMENT=1;

-- --------------------------------------------------------

--
-- Table structure for table `books`
--

CREATE TABLE IF NOT EXISTS `books` (
  `id` smallint(5) unsigned NOT NULL AUTO_INCREMENT,
  `category_id` smallint(5) DEFAULT NULL,
  `name` varchar(30) DEFAULT NULL,
  `author` varchar(30) DEFAULT NULL,
  `description` varchar(100) DEFAULT NULL,
  `price` int(11) NOT NULL,
  `image` varchar(100) DEFAULT NULL,
  `createdAt` timestamp,
  `updatedAt` timestamp,
  PRIMARY KEY (`id`),
  KEY `id_books` (`id`)
) ENGINE=MyISAM  DEFAULT CHARSET=latin1 AUTO_INCREMENT=1 ;



