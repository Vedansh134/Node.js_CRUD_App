// Define the pipeline
pipeline{
    agent any

    // Define global environment variables and credentials
    environment{
        // Docker
        DOCKERHUB_CREDENTIALS = credentials('docker-hub-credentials')
        DOCKER_IMAGE = "kvedansh/node-crud-app"
        DOCKER_TAG = "${BUILD_NUMBER}"
    }

    // Define the different stages
    stages{
        stage("Workspace Cleanup"){
            steps{
                cleanWs()
            }
        }
        stage("Git : Checkout Code"){
            steps{
                echo "Getting code for Github..."
                git url: "https://github.com/Vedansh134/Node.js_CRUD_App.git", branch: "main"
                echo "clone repository successfully"
            }
        }
        stage("List files"){
            steps{
                echo "files in workspace"
                sh 'ls -llah'
            }
        }
        stage("Install dependencies"){
            steps{
                echo "Installing Node.js dependency..."
                sh 'npm install'
            }
        }
        stage("Build : Docker image"){
            steps{
                echo "Building Docker Image Using Docker-Compose..."

                // Stop and remove any existing containers
                sh "docker-compose down || true"

                // Clean up old images to save space
                sh "docker image prune -f || true"

                // Build images
                sh "docker-compose build --memory='1g'"

                // Starting containers
                sh "docker-compose up -d"

                // wait and verify
                sh "sleep 10"
                sh "docker-compose ps"

                // check docker container logs
                sh "docker-compose logs --tail=20 backend || true"
                
                echo "Docker Compose build completed and contaoiners are running..."
            }
        }
        stage("Push : Docker image"){
            steps{
                echo "Pushing Docker Image to Docker Hub..."
                withCredentials([usernamePassword(credentialsId : 'docker-hub-credentials', usernameVariable: 'DOCKERHUB_USER', passwordVariable : 'DOCKERHUB_PASS')])
                {
                    // docker login
                    sh "echo $DOCKERHUB_PASS | docker login -u $DOCKERHUB_USER --password-stdin"

                    // List all images first (debugging)
                    sh 'docker images'

                    // tagging docker image
                    sh "docker tag ${DOCKER_IMAGE}:latest ${DOCKER_IMAGE}:${DOCKER_TAG}"

                    // push docker images
                    sh "docker push ${DOCKER_IMAGE}:latest"

                    echo "Push docker image successfully"
                }
            }
        }
    }

    post {
    success {
        emailltext(
            to: 'vedansh.kumar134@gmail.com',
            subject: "✅ Success: ${env.JOB_NAME} - #${env.BUILD_NUMBER}",
            body: """
                <html>
                <body>
                    <h2 style="color:green">Build Passed!</h2>
                    <p>Job: ${env.JOB_NAME}</p>
                    <p>Build: ${env.BUILD_NUMBER}</p>
                    <p>URL: ${env.BUILD_URL}</p>
                </body>
                </html>
            """,
            mimeType: 'text/html'
        )
    }
    failure {
        emailltext(
            to: 'vedansh.kumar134@gmail.com',
            subject: "❌ Failure: ${env.JOB_NAME} - #${env.BUILD_NUMBER}",
            body: """
                <html>
                <body>
                    <h2 style="color:red">Build Failed!</h2>
                    <p>Job: ${env.JOB_NAME}</p>
                    <p>Build: ${env.BUILD_NUMBER}</p>
                    <p>URL: ${env.BUILD_URL}</p>
                </body>
                </html>
            """,
            mimeType: 'text/html'
        )
    }
}