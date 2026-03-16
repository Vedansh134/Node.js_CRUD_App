pipeline {
    // this script is for testing purpose only, it does not perform actual build or deployment tasks
    // only for triggering via webhook and testing jenkins pipeline setup
    agent any

    stages{
        stage("git : checkout code"){
            steps{
                echo 'Cloning repository...'
                checkout scm
            }
        }
        stage('Install Dependencies') {
            steps {
                echo 'Installing npm packages...'
                echo "for testing purpose only"
            }
        }
        stage('Build Application') {
            steps {
                echo 'Building the app...'
                sh '''
                    echo "Build started at $(date)"
                    # Add your build commands here
                    # For example: npm run build
                    touch build_success.txt
                    echo "Build completed at $(date)"
                '''
            }
        }
    }
    post {
        success {
            echo 'Build succeeded!'
        }
        failure {
            echo 'Build failed. Please check the logs.'
        }
    }
}