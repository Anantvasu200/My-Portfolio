pipeline {
    agent any

    environment {
        IMAGE_NAME = 'my-portfolio'
        IMAGE_TAG  = 'latest'
    }

    stages {

        stage('Checkout') {
            steps {
                echo '📥 Code clone ho raha hai...'
                checkout scm
            }
        }

        stage('Install & Build') {
            agent {
                docker {
                    image 'node:20-alpine'
                    args '--user root'
                    reuseNode true
                }
            }
            steps {
                sh 'npm ci --prefer-offline || npm install'
                sh 'npm run build'
                sh 'ls -la dist/'
            }
        }

        stage('SCA — npm audit') {
            agent {
                docker {
                    image 'node:20-alpine'
                    args '--user root'
                    reuseNode true
                }
            }
            steps {
                sh 'npm audit --audit-level=high || true'
            }
        }

        stage('Docker Image Build') {
    steps {
        sh "docker build -t ${IMAGE_NAME}:${IMAGE_TAG} ."
        sh "docker images | grep ${IMAGE_NAME}"
    }
}

        stage('Container Scan — Trivy') {
    steps {
        echo '🔒 Trivy se image scan ho rahi hai...'
        sh '''
            trivy image \
              --severity HIGH,CRITICAL \
              --exit-code 0 \
              my-portfolio:latest
        '''
    }
}

        stage('Deploy') {
            steps {
                sh '''
                    docker stop portfolio-live || true
                    docker rm   portfolio-live || true
                    docker run -d \
                      --name portfolio-live \
                      -p 80:80 \
                      ${IMAGE_NAME}:${IMAGE_TAG}
                '''
                echo '✅ Portfolio live on port 80!'
            }
        }
    }

    post {
        always {
            echo '🧹 Cleaning workspace...'
            sh 'docker system prune -f || true'
            cleanWs()
        }
        success {
            echo '🎉 DevSecOps Pipeline Complete!'
        }
        failure {
            echo '❌ Pipeline fail — check logs!'
        }
    }
}