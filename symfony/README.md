# Token package
### composer require "lexik/jwt-authentication-bundle"

# generate SSl Key
### mkdir -p config/jwt
### openssl genrsa -out config/jwt/private.pem -aes256 4096
### openssl rsa -pubout -in config/jwt/private.pem -out config/jwt/public.pem



## For Create User Entity with security & rôles :

#### composer require symfony/security-bundle
#### php bin/console make:user
##### And change entity with 
##### php bin/console make:entity




## More entity & Controller :
#### php bin/console make:entity
#### php bin/console make:controller




## Database & migrations : 

## Generate a new database with .env name 
### php bin/console doctrine:database:create

## Generate migration in dir ./migrations
### php bin/console make:migration

## Do the migration in your database
### php bin/console doctrine:migrations:migrate
 
## Paginator in twig template
### composer require knplabs/knp-paginator-bundle



## Google Auth Client
#### composer require google/apiclient:"^2.7"




## Explainations: 

###### School is for student school name or organisation name