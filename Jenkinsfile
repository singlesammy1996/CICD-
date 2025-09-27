// Jenkinsfile
pipeline {
    agent any
    tools {
        nodejs 'node-20'
    }
    environment {
        BUILD_DIR = 'dist'
        DEPLOY_PATH = '/var/www/html/vue3-ts-learning'
    }
    stages {
        stage('Checkout Code') {
            steps {
                git url: 'https://github.com/singlesammy1996/CICD-.git', branch: 'main'
            }
        }

        stage('Install Dependencies') {
            steps {
                sh 'npm install'
            }
        }
        stage('Build Project') {
            steps {
                sh 'npm run build'
            }
        }
        stage('Deploy') {
            steps {
                echo 'Deploying to local machine...'
                sh "cp -r ${BUILD_DIR}/* ${DEPLOY_PATH}"
            }
        }
    }
}