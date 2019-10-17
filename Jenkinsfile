pipeline {
    agent any
    environment {
        HOME                = "."
        AWS_CF_DISTRIBUTION = credentials("aws-cf-distribution")
        AWS_S3              = credentials("aws-s3")
        AWS_S3_BUCKET       = credentials("aws-s3-bucket")
        AWS_CFG_REGION      = credentials("aws-cfg-region")
        USER_HOME           = credentials("ec2-user-home")
    }
    stages {
        stage("Install") {
            steps {
                echo "Installing..."
            }
        }
        stage("Build") {
            steps {
                echo "Building..."
            }
        }
        stage("Test") {
            steps {
                echo "Testing..."
            }
        }
        stage("Deploy Master") {
            when {
                allOf {
                    environment name: "CHANGE_ID", value: ""
                    branch "master"
                }
            }
            steps {
                sh "AWS_ACCESS_KEY_ID=$AWS_S3_USR"
                sh "AWS_SECRET_ACCESS_KEY=$AWS_S3_PSW"
                sh "AWS_CONFIG_FILE=$USER_HOME/.aws/config"
                sh "AWS_SHARED_CREDENTIALS_FILE=$USER_HOME/.aws/credentials"
                sh "aws configure set profile jenkins"
                sh "aws configure set aws_access_key_id $AWS_S3_USR --profile jenkins"
                sh "aws configure set aws_secret_access_key $AWS_S3_PSW --profile jenkins"
                sh "aws configure set region $AWS_CFG_REGION --profile jenkins"
                sh "aws configure set output json --profile jenkins"
                sh 'aws s3 sync $WORKSPACE/ s3://$AWS_S3_BUCKET/ --exclude="*" --exclude="*.git*" --include="*.html" --include="*.css" --acl=public-read --profile jenkins'
                sh 'aws cloudfront create-invalidation --distribution-id $DISTRIBUTION --path "/*.*" --profile jenkins'
            }
        }
    }
}