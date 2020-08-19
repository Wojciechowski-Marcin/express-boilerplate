#!/bin/sh

docker login -u $PR_USER -p $PR_PASS $ARTIFACTORY_REPOSITORY && \
docker build --tag $ARTIFACTORY_REPOSITORY/$CI_PROJECT_NAME/$CONTAINER_NAME:latest \
             --tag $ARTIFACTORY_REPOSITORY/$CI_PROJECT_NAME/$CONTAINER_NAME:$CI_COMMIT_TAG . && \
docker push $ARTIFACTORY_REPOSITORY/$CI_PROJECT_NAME/$CONTAINER_NAME:latest && \
docker push $ARTIFACTORY_REPOSITORY/$CI_PROJECT_NAME/$CONTAINER_NAME:$CI_COMMIT_TAG
