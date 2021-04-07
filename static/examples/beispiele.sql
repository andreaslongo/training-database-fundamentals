-- Eine neue Datenbank anlegen
CREATE DATABASE MeineNeueDatenbank
;
GO


-- Datenbank mit USE auswählen
USE [MeineNeueDatenbank]
;


-- Eine Tabelle erstellen
CREATE TABLE MitarbeiterKopie (
    MitarbeiterID int IDENTITY (1,1) NOT NULL,
    Vorname nvarchar(50) NOT NULL,
    Nachname nvarchar(50) NOT NULL,
    Job nvarchar(50) NULL,
    Email nvarchar(50) NOT NULL
);


-- Eine Spalten in eine Tabelle einfügen
ALTER TABLE MitarbeiterKopie
    ADD Gehalt money
;


-- Mehrere Spalten einfügen
ALTER TABLE MitarbeiterKopie
    ADD ZweiterVorname nvarchar(50),
        BonusProzent int,
        LeistungsBewertung int
;


-- Spalten aus aus einer Tabellen entfernen
ALTER TABLE MitarbeiterKopie
    DROP COLUMN Gehalt,
                ZweiterVorname,
		BonusProzent,
		Leistungsbewertung
;


-- Datensätze eintragen
INSERT INTO MitarbeiterKopie
    VALUES ('Martin', 'Hofer', 'IT Support', 'mhofer@example.com')
;


-- Datensätzen gezielt eintragen
INSERT INTO MitarbeiterKopie (Email, Vorname, Nachname)
    VALUES ('mpichler@example.com', 'Mathias', 'Pichler'),
           ('sscherer@example.com', 'Stefan', 'Scherer')
;


-- Einen Datensatz ändern
UPDATE MitarbeiterKopie
    SET Email = 'itsupport@example.com'
    WHERE Email = 'mhofer@example.com'
;


-- Mehrere Datensätze ändern
ALTER TABLE MitarbeiterKopie
    ADD Teilzeit char(4)    -- neue Spalte
;

UPDATE Mitarbeiter
    SET Teilzeit = 'nein'
;


-- Datensätze löschen
DELETE
    FROM KundenKopie
    WHERE KundenID = 5
;

DELETE
    FROM KundenKopie
    WHERE KundenID > 6
;
