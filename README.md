# SmartMulti

## Scénario:

Dans un espace de coworking (ou des amphis d’une certaine école) le nombres d’appareils et souvent limités par rapport aux nombres de prises disponibles. Il existe la solution des multiprises mais avec cette solution il est possible de connecter qu’un nombre limité d’ordinateur portables sans risque pour le réseau électrique.

Notre objet connecté pourra répondre à ce problème en permettant de brancher un plus grand nombre d’ordinateurs sur la même prise. En effet, notre multiprise intelligente va permettre d’équilibrer le chargement de plus de 15 ordinateurs en fournissant ou non selon le niveau de chargement des différents appareils branchés.

Notre super multiprise peut gérer le cas où des appareils ayant toujours besoin de courant puissent être branché. On ne voudrait pas d’une lampe qui n’est pas allumable en permanence. Ceci n’est pas un problème car à travers une interface administrateur la direction du coworking peut paramètres la multiprise pour que certaines prises ne soit pas intégrées dans l’équilibrage. 

## Services de l'objet:
- Balancement du chargements des terminaux
- Suivis de la consommation de chaque utilisateur
- Mise en place d'exception
- Recuperation d'information sur la batterie

## Services d'orchestration :
- Mise en place de stratégies dynamiques de chargements basées sur le niveau de charge actuel
- Connaître la consommation des utilisateurs de la multiprise pour pouvoir facturer la consommation et établir des statistiques
- Éteindre les multiprises à partir d’une heure donné et selon les jours d’ouverture de l’espace récupéré via un google Agenda
- Gérer la puissance globale déployée par l'ensemble des SmartStrips dans un même système éléctrique
- Pouvoir mettre en place des stratégies d’optimisation énergétique (pouvoir plus consommé en heures creuses et moins en heures pleines) pour plus de rentabilité
- Permettre à l’utilisateur de placer une limite de consommation et le tenir informé de sa progression vers cette limite
- Permette à l’utilisateur de voir sa consommation électrique à travers différentes période de temps (par jour, ma semaine etc.)

## Architecture matérielle
### Liste du type de matériel envisagé:
- Raspberry PI : Intérêt de NodeRed
- Télérupteurs 5V
- Convertisseur 220V vers 5V Continu
- Connecteur USB
- Ampère-mètres

### Schéma
![alt text](/Archi_Mat_Smarmulti.png "Schema Architecture Matérielle")

## Architecture Logicielle
### Schéma
![alt text](/Schéma_architecture_logicielle.PNG "Schema Architecture Logicielle")

## Gantt v1
Sprint 1
- Assemblage
- Récupérer le niveau de la batterie d'un terminal
- Mise en place d’une stratégie de charge basée seulement sur courant total
(dans le but de ne pas dépasser la capacité de la multiprise)

Sprint 2
- Mise en place du serveur web
- Récupération du niveau de la batterie sur plusieurs terminaux (redondance avec web serveur ?)
- Mise en place de stratégies de charge basées sur le niveau de batterie

Sprint 3
- Mise en place de la base de données Firebase
- Mise en place du serveur gérant les multiprises dans une entreprise/organisation
- Mise en place de stratégies de charge basés sur le niveau de batterie  (2) (estimation de la vitesse de charge à partir du courant consommé)

Sprint 4
- Suivis de la consommation de chaque utilisateur ⇒ facturation

## Objectifs du premier sprint

Les objectifs du premier sprint seront de:
- Configurer la Raspberry avec Node Red
- Définir plus en détails les capteurs à commandé (Ampère-mètres etc.)
- Pouvoir contrôller le démarrage d'une prise
- Recolter une informations sur la charges d'un terminal (sans forcément l'utiliser)
- Mettre en place une stratégie basique de contrôle de la multiprise (limité le nombre de terminaux à 2 sur une multiprise avec 3 prises)

Membres de l'équipe : Calvin Audier, Aurélien Zintzmeyer, Ali Chaar
