/*
Erstelle deine eigene Datenbank

Du hast den Auftrag bekommen, eine neue Datenbank für deine Firma zu entwerfen.

Deine Firma besitzt viele *Bücher* mit Fachwissen unterschiedlicher Bereiche.
Diese Bücher sind allerdings nicht sortiert und auf viele verschiedene *Räume* aufgeteilt.
In jedem Raum stehen außerdem gleich mehrere *Regale* für Bücher.

Das macht es sehr schwierig für die Mitarbeiter, ein bestimmtes Buch zu finden.

Erstelle eine Datenbank in der du den genauen *Standort* eines Buches eintragen kannst.
Mit dieser Datenbank können die Mitarbeiter ihr Buch schneller finden.

Überlege dir, welche *Informationen* du benötigst und wie du diese am besten als *Daten* speichern kannst
*/


-- Erstelle eine neue Datenbank.
CREATE DATABASE BuecherAlongo
;
GO

-- Verbinde dich zu deiner Datenbank.
USE BuecherAlongo
;


-- Erstelle eine Tabelle in der Datenbank.
CREATE TABLE BuchStandort (
    Titel nvarchar(100) NOT NULL,
    Autor nvarchar(100) NOT NULL,
    RaumNummer nvarchar(50) NOT NULL,
    RegalNummer int NOT NULL
);


-- Füge eine neue Spalte in die Tabelle ein.
ALTER TABLE BuchStandort
    ADD ISBN char(13) NULL
;


-- Füge drei neue Datensätze in die Tabelle ein.
INSERT INTO BuchStandort (Titel, Autor, RaumNummer, RegalNummer)
VALUES ('Windows Server 2019', 'Peter Kloep', 102, 2),
       ('Linux', 'Michael Kofler', 201, 1),
       ('Sichere Windows-Infrastrukturen', 'Karsten Weigel', 310, 5)
;


-- Lösche einen der neuen Datensätze.
DELETE
FROM BuchStandort
WHERE Titel = 'Windows Server 2019'
;


-- Frage einige Daten mit dem `SELECT` Befehl ab.
SELECT *
FROM BuchStandort
;

SELECT *
FROM BuchStandort
WHERE Autor = 'Michael Kofler'
;

SELECT *
FROM BuchStandort
WHERE RaumNummer = 310
;

SELECT *
FROM BuchStandort
WHERE Titel LIKE '%windows%'
;
