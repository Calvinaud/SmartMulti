# Hoteley

Dans les hôtels (surtout dans les hôtels hauts de gammes) les chambres intègrent de plus en plus d’objets connectés (lumière, chauffage/clim, volet, parfumeur etc.) mais les objets connectés ont parfois beaucoup de protocoles de communications différents ce qui rend compliqué leur intégration. Notre projet résout ce problème en servant de passerelle à tous ces objets connectés et permettre de facilement les utiliser par nos services. De plus, avec une box par chambre chaque client peut lui même gérer sa chambre comme il le veut. Enfin, les boxs s'intègrent dans un réseau à plus grand échelle pour encore mieux servir les clients 

## Scénario:

???????????

## Services de l'objet:
- Communiquer avec des objets connectés déjà existant
- Pouvoir communiquer avec l’utilisateurs avec des messages vocaux/notifier en changeant la couleur de la box.
- Permettre au client de configurer des routines de réveil par exemple (ouverture progressive des volets, musique, …)
- Pouvoir se connecter à la box avec son téléphone et s’en servir de télécommande pour contrôler sa chambre.

## Services d'orchestration :
- Pouvoir ajouter des modules pour intégrer des nouveaux objets à l’ensemble des box
- Pouvoir envoyer des messages mails et vocaux à une chambre (Employés →  Client)
- Activer une routine pour accueillir les nouveaux arrivants en checkant l’agenda de l’hôtel (rafraîchir la chambre/lancer un parfum particulier) 
- Savoir quelles chambre sont vides pour que les femmes de ménages puissent travailler sans déranger les clients
- Gérer les accès aux différentes boxs pour que chaque box puisse exclusivement être utilisée par les usagers de la chambres (et le personnel)
- Pouvoir tenir au courant l’ensemble des clients quand un événement commence via la communication vocale

## Architecture matérielle
### Liste du type de matériel envisagé:


### Schéma
![alt text](/ArchiMatCoordinator.png "Schema Architecture Matérielle")

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
