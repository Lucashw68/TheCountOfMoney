# Git organization for the project

Main branches:
  - main
    - develop

# Créer une nouvelle branche pour rajouter une feature

```
$ git checkout -b mafeature develop
```

# Rajouter la feature sur develop une fois terminée

```
$ git checkout develop
$ git merge --no-ff mafeature
$ git branch -d mafeature
$ git push origin develop
```

# Une fois que la branche develop est fonctionnelle, créer un branche release et la merge sur la branche main avec le script release.sh

```
$ ./release.sh [release type]

release type = major || minor || patch
```
Le script va:
  - Créer une nouvelle branche nommé release-x.x.x selon la version présente dans les fichiers package.json
  - Incrémenter la valeur de la version de 1 selon le type de release:
    - Major: x+1.x.x
    - Minor: x.x+1.x
    - Patch: x.x.x+1
  - Merge la release à la branche main
  - Merge la release à la branche develop
  - Supprimer la branche release-x.x.x

# Si il y a un bug à corriger rapidement sur la branche main (hotfix)

- Créer une branche hotfix
```
$ git checkout -b hotfix master
$ git commit -a -m "Hotfix"

```
- Corriger le bug

- Intégrer la correction à la branche main puis la supprimer
```
$ git commit -m "Fix bug"
$ git checkout master
$ git merge --no-ff hotfix
$ git checkout develop
$ git merge --no-ff hotfix
$ git branch -d hotfix
```

# Script release.sh

  Usage: ./release.sh [TYPE]
  OPTION:
    -h    display usage
    TYPE  major | minor | patch
