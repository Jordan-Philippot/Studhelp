<?php

declare(strict_types=1);

namespace DoctrineMigrations;

use Doctrine\DBAL\Schema\Schema;
use Doctrine\Migrations\AbstractMigration;

/**
 * Auto-generated Migration: Please modify to your needs!
 */
final class Version20210418144519 extends AbstractMigration
{
    public function getDescription() : string
    {
        return '';
    }

    public function up(Schema $schema) : void
    {
        // this up() migration is auto-generated, please modify it to your needs
        $this->addSql('CREATE TABLE association (id INT AUTO_INCREMENT NOT NULL, id_association VARCHAR(255) DEFAULT NULL, siret VARCHAR(255) DEFAULT NULL, date_creation DATE DEFAULT NULL, date_derniere_declaration DATE DEFAULT NULL, date_declaration_dissolution DATE DEFAULT NULL, titre VARCHAR(255) NOT NULL, titre_court VARCHAR(255) DEFAULT NULL, description TEXT DEFAULT NULL, adresse_siege VARCHAR(255) NOT NULL, site_web VARCHAR(255) DEFAULT NULL, created_at DATETIME NOT NULL, updated_at DATETIME NOT NULL, latitude VARCHAR(255) DEFAULT NULL, longitude VARCHAR(255) NOT NULL, PRIMARY KEY(id)) DEFAULT CHARACTER SET utf8mb4 COLLATE `utf8mb4_unicode_ci` ENGINE = InnoDB');
    }

    public function down(Schema $schema) : void
    {
        // this down() migration is auto-generated, please modify it to your needs
        $this->addSql('DROP TABLE association');
    }
}
