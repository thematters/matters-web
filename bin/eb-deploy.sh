#!/bin/bash
APP_DEVELOP="matters-stage"
ENV_DEVELOP="matters-client-web-develop"
REGION_DEVELOP="ap-southeast-1"

APP_LIKECOIN="matters-stage"
ENV_LIKECOIN="matters-client-web-likecoin"
REGION_LIKECOIN="ap-southeast-1"

APP_STAGING="matters-stage"
ENV_STAGING="matters-client-web-stage"
REGION_STAGING="ap-southeast-1"

APP_PRODUCTION="matters-prod"
ENV_PRODUCTION="matters-client-web-prod"
REGION_PRODUCTION="ap-southeast-1"

if [[ $1 == 'develop' ]]
then
    echo "Deploying to development environment..."
    printf '\n\n' | eb init $APP_DEVELOP --region $REGION_DEVELOP
    # only apply in develop/staging environments
    # https://forums.aws.amazon.com/message.jspa?messageID=855383#855383
    # https://stackoverflow.com/a/30389695
    cp .ebextensions/http-basic-auth.config.dev .ebextensions/http-basic-auth.config
    eb deploy $ENV_DEVELOP
elif [[ $1 == 'likecoin' ]]
then
    echo "Deploying to likecoin development environment..."
    printf '\n\n' | eb init $APP_LIKECOIN --region $REGION_LIKECOIN
    cp .ebextensions/http-basic-auth.config.dev .ebextensions/http-basic-auth.config
    eb deploy $ENV_LIKECOIN
elif [[ $1 == 'staging' ]]
then
    echo "Deploying to staging environment..."
    printf '\n\n' | eb init $APP_STAGING --region $REGION_STAGING
    cp .ebextensions/http-basic-auth.config.dev .ebextensions/http-basic-auth.config
    eb deploy $ENV_STAGING
elif [[ $1 == 'prod' ]]
then
    echo "Deploying to production environment..."
    printf '\n\n' | eb init $APP_PRODUCTION --region $REGION_PRODUCTION
    eb deploy $ENV_PRODUCTION
else
    echo "Usage: bin/eb-deploy.sh [develop|likecoin|staging|prod]"
fi

