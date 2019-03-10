#!/bin/bash
APP_DEVELOP="matters-stage"
ENV_DEVELOP="matters-client-web-develop"
REGION_DEVELOP="ap-southeast-1"

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
    eb deploy $ENV_DEVELOP
elif [[ $1 == 'staging' ]]
then
    echo "Deploying to staging environment..."
    printf '\n\n' | eb init $APP_STAGING --region $REGION_STAGING
    eb deploy $ENV_STAGING
elif [[ $1 == 'prod' ]]
then
    echo "Deploying to production environment..."
    printf '\n\n' | eb init $APP_PRODUCTION --region $REGION_PRODUCTION
    eb deploy $ENV_PRODUCTION
else
    echo "Usage: bin/eb-deploy.sh [develop|staging|prod]"
fi

